import { useEffect, useId, useState } from "react";

const toNumber = (value) => (value == null || value === "" ? null : (Number.isFinite(Number(value)) ? Number(value) : null));

function normaliseProfile(profile = {}) {
  const difficultyList = Array.isArray(profile.difficulties) ? profile.difficulties : [];
  const findDifficulty = (name) => difficultyList.find((difficulty) => difficulty?.name?.toLowerCase() === name.toLowerCase()) ?? {};
  const easy = profile.easy ?? profile.easySolved ?? profile.difficulties?.easy ?? findDifficulty("Easy");
  const medium = profile.medium ?? profile.mediumSolved ?? profile.difficulties?.medium ?? findDifficulty("Medium");
  const hard = profile.hard ?? profile.hardSolved ?? profile.difficulties?.hard ?? findDifficulty("Hard");
  const makeDifficulty = (name, value, color) => ({
    name,
    solved: toNumber(value?.solved ?? value?.count ?? value),
    total: toNumber(value?.total),
    beats: toNumber(value?.beats ?? value?.beatenPercent),
    color,
  });

  return {
    solved: toNumber(profile.solved ?? profile.totalSolved ?? profile.submitStats?.acSubmissionNum?.[0]?.count),
    total: toNumber(profile.total ?? profile.totalQuestions),
    rank: toNumber(profile.rank ?? profile.ranking ?? profile.profile?.ranking),
    badges: toNumber(profile.badges ?? profile.badgeCount ?? profile.badgesCount),
    reputation: toNumber(profile.reputation ?? profile.profile?.reputation),
    difficulties: [
      makeDifficulty("Easy", easy, "#25d6b3"),
      makeDifficulty("Medium", medium, "#25d6a2"),
      makeDifficulty("Hard", hard, "#25e6a2"),
    ],
  };
}

 const glows = [
    // "-top-10 -left-10 w-[360px] h-[360px] opacity-2 blur-[120px]",
    // "bottom-0 right-10 w-[420px] h-[420px] opacity-9 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]"
  ]

/**
 * A LeetCode profile card that reads data from the local GraphQL proxy.
 * Keep LeetCode requests in the backend, never in this component.
 */
export default function LeetCode({
  username = import.meta.env.VITE_LEETCODE_USERNAME,
  endpoint = "/api/leetcode",
  className = "",
}) {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const gradientId = useId().replace(/:/g, "");
  const solvedPercent = stats ? Math.min(((stats.solved ?? 0) / Math.max(stats.total ?? 0, 1)) * 100, 100) : 0;

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function loadProfile() {
      setStatus("loading");
      setError("");
      try {
        const query = username ? `?username=${encodeURIComponent(username)}` : "";
        const response = await fetch(`${endpoint}${query}`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error(`Profile request failed (${response.status})`);
        const payload = await response.json();
        if (!cancelled) setStats(normaliseProfile(payload.data ?? payload));
      } catch (requestError) {
        if (!cancelled && requestError.name !== "AbortError") {
          setError("Live profile unavailable.");
          setStats(null);
        }
      } finally {
        if (!cancelled) setStatus("ready");
      }
    }

    loadProfile();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [endpoint, username]);

  return (
    <section className={`leetcode-card ${className}`} aria-labelledby="leetcode-title" aria-busy={status === "loading"}>
      <div className="absolute inset-0 pointer-events-none">
              {glows.map((c, i) => (
                <div
                  key={i}
                  className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#08a17b] to-[#109793] animate-pulse ${c}`}
                />
              ))}
      </div>

      <style>{styles}</style>
      <div className="leetcode-heading">
        <span className="leetcode-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M2 20h20M8 9l-2 2 2 2m3 0h3" /></svg>
        </span>
        <h2 id="leetcode-title ">LeetCode</h2>
        {status === "loading" && <span className="loading-line" aria-label="Loading LeetCode profile" />}
      </div>

      {error && <p className="leetcode-message" role="status">{error}</p>}

      <div className="leetcode-overview">
        <div className={`progress-orb ${status === "loading" ? "is-skeleton" : ""}`} aria-label={`${stats?.solved ?? "—"} of ${stats?.total ?? "—"} problems solved`}>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <defs><linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%"><stop stopColor="#23d7fa" /><stop offset=".5" stopColor="#4089ff" /><stop offset="1" stopColor="#a855f7" /></linearGradient></defs>
            <circle className="orb-track" cx="60" cy="60" r="51" />
            <circle className="orb-value" cx="60" cy="60" r="51" pathLength="100" style={{ stroke: `url(#${gradientId})`, strokeDasharray: `${solvedPercent} 100` }} />
          </svg>
          <div className="orb-copy"><strong>{stats?.solved?.toLocaleString() ?? "—"}</strong><span>{stats?.total?.toLocaleString() ?? "—"}</span></div>
        </div>

        <div className="stat-grid" aria-label="LeetCode profile statistics">
          {[{ value: stats?.rank, label: "Rank" }, { value: stats?.badges, label: "Badges" }, { value: stats?.reputation, label: "Reputation" }].map((stat) => (
            <div className={`stat-box ${status === "loading" ? "is-skeleton" : ""}`} key={stat.label}>
              <strong>{stat.value?.toLocaleString() ?? "—"}</strong><span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="difficulty-list">
        {stats?.difficulties?.map((difficulty) => {
          const percentage = Math.min(((difficulty.solved ?? 0) / 70) * 100, 100);
          return <div className={`difficulty-row ${status === "loading" ? "is-skeleton" : ""}`} key={difficulty.name}>
            <div className="difficulty-meta"><strong>{difficulty.name}</strong><span>{difficulty.solved ?? "—"}/{difficulty.total ?? "—"} <i>•</i> Beats: {difficulty.beats ?? "—"}%</span></div>
            <div className="difficulty-track" role="progressbar" aria-label={`${difficulty.name}: ${difficulty.solved ?? "—"} of ${difficulty.total ?? "—"} solved, beats ${difficulty.beats ?? "—"} percent`} aria-valuemin="0" aria-valuemax={difficulty.total ?? 0} aria-valuenow={difficulty.solved ?? 0}>
              <span style={{ width: `${percentage}%`, background: `linear-gradient(90deg, ${difficulty.color}, ${difficulty.name === "Hard" ? "#ff9b7f" : difficulty.name === "Medium" ? "#29b9bd" : "#7169ff"})` }} />
            </div>
          </div>;
        })}
      </div>
    </section>
  );
}

const styles = `
  .leetcode-card { box-sizing:border-box; width:100%; max-width:550px; min-width:0; margin:0 auto; padding:clamp(16px, 3vw, 20px); color:#f7f8ff; background:#17191e; border:1px solid #3b3f47; border-radius:20px; box-shadow:0 18px 50px rgba(0,0,0,.3); font-family:inherit; transition:transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
  .leetcode-card:hover { transform:translateY(-4px); border-color:#676d79; box-shadow:0 24px 58px rgba(0,0,0,.42); }
  .leetcode-heading { display:flex; align-items:center; gap:10px; min-height:28px; }
  .leetcode-heading h2 { margin:0; font:700 22px/1.2 inherit; letter-spacing:-.03em; background:linear-gradient(90deg,#25d9fa,#8a62ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .leetcode-icon { display:grid; place-items:center; width:25px; height:25px; color:#32d5fb; }.leetcode-icon svg { width:100%; height:100%; }
  .loading-line { width:52px; height:3px; margin-left:auto; overflow:hidden; border-radius:99px; background:#30343c; }.loading-line::after { content:""; display:block; width:42%; height:100%; border-radius:inherit; background:#58d9ff; animation:leetcode-load 1s ease-in-out infinite; }
  .leetcode-message { margin:12px 0 -2px; color:#aeb5c1; font-size:12px; }.leetcode-overview { display:grid; grid-template-columns:minmax(84px, 104px) minmax(0, 1fr); gap:clamp(12px, 3vw, 20px); align-items:center; margin-top:20px; }
  .progress-orb { position:relative; width:104px; height:104px; }.progress-orb svg { width:100%; height:100%; transform:rotate(-90deg); }.orb-track,.orb-value { fill:none; stroke-width:9; }.orb-track { stroke:#2c3038; }.orb-value { stroke-linecap:round; transition:stroke-dasharray .6s ease; }.orb-copy { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }.orb-copy strong { font-size:23px; letter-spacing:-.05em; }.orb-copy span { margin-top:1px; color:#4c535f; font-size:12px; font-weight:700; }
  .stat-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; min-width:0; }.stat-box { min-width:0; min-height:82px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; background:#24272e; border:1px solid #424751; border-radius:13px; transition:background .2s ease, transform .2s ease; }.stat-box:hover { background:#2a2e36; transform:translateY(-2px); }.stat-box strong { max-width:100%; overflow:hidden; text-overflow:ellipsis; font-size:19px; letter-spacing:-.035em; }.stat-box span { color:#b4bbc6; font-size:12px; }
  .difficulty-list { display:grid; gap:14px; margin-top:22px; }.difficulty-meta { display:flex; justify-content:space-between; gap:14px; margin-bottom:7px; font-size:12px; }.difficulty-meta strong { font-size:13px; }.difficulty-meta span { color:#bac1cb; white-space:nowrap; }.difficulty-meta i { color:#646b76; font-style:normal; padding:0 2px; }.difficulty-track { height:8px; overflow:hidden; border-radius:999px; background:#363a42; }.difficulty-track span { display:block; height:100%; border-radius:inherit; transition:width .65s ease; }
  .is-skeleton { animation:leetcode-pulse 1.3s ease-in-out infinite; }.progress-orb.is-skeleton .orb-value { stroke:#555b67 !important; }.stat-box.is-skeleton strong,.stat-box.is-skeleton span,.difficulty-row.is-skeleton .difficulty-meta { color:transparent; border-radius:5px; background:#363b45; }.difficulty-row.is-skeleton .difficulty-track span { width:45% !important; background:#4b5260 !important; }
  @keyframes leetcode-load { from { transform:translateX(-120%); } to { transform:translateX(290%); } } @keyframes leetcode-pulse { 50% { opacity:.55; } }
  @media (max-width:540px) { .leetcode-card { border-radius:16px; }.leetcode-overview { grid-template-columns:86px minmax(0, 1fr); gap:12px; }.progress-orb { width:86px; height:86px; }.stat-grid { gap:6px; }.stat-box { min-height:64px; border-radius:10px; }.stat-box strong { font-size:16px; }.stat-box span { font-size:10px; }.difficulty-list { gap:12px; margin-top:18px; }.difficulty-meta { gap:3px; }.difficulty-meta span { white-space:normal; } }
  @media (prefers-reduced-motion:reduce) { .leetcode-card,.stat-box,.orb-value,.difficulty-track span { transition:none; }.loading-line::after,.is-skeleton { animation:none; } }
`;
