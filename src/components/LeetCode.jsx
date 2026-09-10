import { useEffect, useId, useState } from "react";

const FALLBACK_STATS = {
  solved: 1000,
  total: 3000,
  rank: 12000,
  badges: 41,
  reputation: 386,
  difficulties: [
    { name: "Easy", solved: 300, total: 1000, beats: 84, color: "#21d4fd" },
    { name: "Medium", solved: 350, total: 1000, beats: 92, color: "#25d6a2" },
    { name: "Hard", solved: 250, total: 1000, beats: 87, color: "#ff7668" },
  ],
};

const toNumber = (value, fallback) => (Number.isFinite(Number(value)) ? Number(value) : fallback);

function normaliseProfile(profile = {}) {
  const easy = profile.easy ?? profile.easySolved ?? profile.difficulties?.easy ?? {};
  const medium = profile.medium ?? profile.mediumSolved ?? profile.difficulties?.medium ?? {};
  const hard = profile.hard ?? profile.hardSolved ?? profile.difficulties?.hard ?? {};
  const makeDifficulty = (name, value, fallback) => ({
    ...fallback,
    name,
    solved: toNumber(value?.solved ?? value?.count ?? value, fallback.solved),
    total: toNumber(value?.total, fallback.total),
    beats: toNumber(value?.beats ?? value?.beatenPercent, fallback.beats),
  });

  return {
    solved: toNumber(profile.solved ?? profile.totalSolved ?? profile.submitStats?.acSubmissionNum?.[0]?.count, FALLBACK_STATS.solved),
    total: toNumber(profile.total ?? profile.totalQuestions, FALLBACK_STATS.total),
    rank: toNumber(profile.rank ?? profile.ranking ?? profile.profile?.ranking, FALLBACK_STATS.rank),
    badges: toNumber(profile.badges ?? profile.badgeCount ?? profile.badgesCount, FALLBACK_STATS.badges),
    reputation: toNumber(profile.reputation ?? profile.profile?.reputation, FALLBACK_STATS.reputation),
    difficulties: [
      makeDifficulty("Easy", easy, FALLBACK_STATS.difficulties[0]),
      makeDifficulty("Medium", medium, FALLBACK_STATS.difficulties[1]),
      makeDifficulty("Hard", hard, FALLBACK_STATS.difficulties[2]),
    ],
  };
}

/**
 * A LeetCode profile card that reads data from a server-side domy_api proxy.
 * Keep API credentials in that backend route, never in this component.
 */
export default function LeetCode({
  username,
  endpoint = "/api/domy_api/leetcode",
  className = "",
}) {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const gradientId = useId().replace(/:/g, "");
  const solvedPercent = Math.min((stats.solved / Math.max(stats.total, 1)) * 100, 100);

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
          setError("Live profile unavailable — showing portfolio stats.");
          setStats(FALLBACK_STATS);
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
      <style>{styles}</style>
      <div className="leetcode-heading">
        <span className="leetcode-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M2 20h20M8 9l-2 2 2 2m3 0h3" /></svg>
        </span>
        <h2 id="leetcode-title">LeetCode</h2>
        {status === "loading" && <span className="loading-line" aria-label="Loading LeetCode profile" />}
      </div>

      {error && <p className="leetcode-message" role="status">{error}</p>}

      <div className="leetcode-overview">
        <div className={`progress-orb ${status === "loading" ? "is-skeleton" : ""}`} aria-label={`${stats.solved} of ${stats.total} problems solved`}>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <defs><linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%"><stop stopColor="#23d7fa" /><stop offset=".5" stopColor="#4089ff" /><stop offset="1" stopColor="#a855f7" /></linearGradient></defs>
            <circle className="orb-track" cx="60" cy="60" r="51" />
            <circle className="orb-value" cx="60" cy="60" r="51" pathLength="100" style={{ stroke: `url(#${gradientId})`, strokeDasharray: `${solvedPercent} 100` }} />
          </svg>
          <div className="orb-copy"><strong>{stats.solved.toLocaleString()}</strong><span>{stats.total.toLocaleString()}</span></div>
        </div>

        <div className="stat-grid" aria-label="LeetCode profile statistics">
          {[{ value: stats.rank, label: "Rank" }, { value: stats.badges, label: "Badges" }, { value: stats.reputation, label: "Reputation" }].map((stat) => (
            <div className={`stat-box ${status === "loading" ? "is-skeleton" : ""}`} key={stat.label}>
              <strong>{stat.value.toLocaleString()}</strong><span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="difficulty-list">
        {stats.difficulties.map((difficulty) => {
          const percentage = Math.min((difficulty.solved / Math.max(difficulty.total, 1)) * 100, 100);
          return <div className={`difficulty-row ${status === "loading" ? "is-skeleton" : ""}`} key={difficulty.name}>
            <div className="difficulty-meta"><strong>{difficulty.name}</strong><span>{difficulty.solved}/{difficulty.total} <i>•</i> Beats: {difficulty.beats}%</span></div>
            <div className="difficulty-track" role="progressbar" aria-label={`${difficulty.name}: ${difficulty.solved} of ${difficulty.total} solved, beats ${difficulty.beats} percent`} aria-valuemin="0" aria-valuemax={difficulty.total} aria-valuenow={difficulty.solved}>
              <span style={{ width: `${percentage}%`, background: `linear-gradient(90deg, ${difficulty.color}, ${difficulty.name === "Hard" ? "#ff9b7f" : difficulty.name === "Medium" ? "#29b9bd" : "#7169ff"})` }} />
            </div>
          </div>;
        })}
      </div>
    </section>
  );
}

const styles = `
  .leetcode-card { box-sizing:border-box; width:min(100%, 690px); margin:0 auto; padding:26px; color:#f7f8ff; background:#17191e; border:1px solid #3b3f47; border-radius:25px; box-shadow:0 18px 50px rgba(0,0,0,.3); font-family:inherit; transition:transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
  .leetcode-card:hover { transform:translateY(-4px); border-color:#676d79; box-shadow:0 24px 58px rgba(0,0,0,.42); }
  .leetcode-heading { display:flex; align-items:center; gap:10px; min-height:28px; }
  .leetcode-heading h2 { margin:0; font:700 22px/1.2 inherit; letter-spacing:-.03em; background:linear-gradient(90deg,#25d9fa,#8a62ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .leetcode-icon { display:grid; place-items:center; width:25px; height:25px; color:#32d5fb; }.leetcode-icon svg { width:100%; height:100%; }
  .loading-line { width:52px; height:3px; margin-left:auto; overflow:hidden; border-radius:99px; background:#30343c; }.loading-line::after { content:""; display:block; width:42%; height:100%; border-radius:inherit; background:#58d9ff; animation:leetcode-load 1s ease-in-out infinite; }
  .leetcode-message { margin:12px 0 -2px; color:#aeb5c1; font-size:12px; }.leetcode-overview { display:grid; grid-template-columns:130px 1fr; gap:28px; align-items:center; margin-top:27px; }
  .progress-orb { position:relative; width:126px; height:126px; }.progress-orb svg { width:100%; height:100%; transform:rotate(-90deg); }.orb-track,.orb-value { fill:none; stroke-width:9; }.orb-track { stroke:#2c3038; }.orb-value { stroke-linecap:round; transition:stroke-dasharray .6s ease; }.orb-copy { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }.orb-copy strong { font-size:27px; letter-spacing:-.05em; }.orb-copy span { margin-top:1px; color:#4c535f; font-size:13px; font-weight:700; }
  .stat-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; }.stat-box { min-height:82px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; background:#24272e; border:1px solid #424751; border-radius:13px; transition:background .2s ease, transform .2s ease; }.stat-box:hover { background:#2a2e36; transform:translateY(-2px); }.stat-box strong { font-size:19px; letter-spacing:-.035em; }.stat-box span { color:#b4bbc6; font-size:12px; }
  .difficulty-list { display:grid; gap:17px; margin-top:30px; }.difficulty-meta { display:flex; justify-content:space-between; gap:14px; margin-bottom:8px; font-size:13px; }.difficulty-meta strong { font-size:14px; }.difficulty-meta span { color:#bac1cb; white-space:nowrap; }.difficulty-meta i { color:#646b76; font-style:normal; padding:0 2px; }.difficulty-track { height:10px; overflow:hidden; border-radius:999px; background:#363a42; }.difficulty-track span { display:block; height:100%; border-radius:inherit; transition:width .65s ease; }
  .is-skeleton { animation:leetcode-pulse 1.3s ease-in-out infinite; }.progress-orb.is-skeleton .orb-value { stroke:#555b67 !important; }.stat-box.is-skeleton strong,.stat-box.is-skeleton span,.difficulty-row.is-skeleton .difficulty-meta { color:transparent; border-radius:5px; background:#363b45; }.difficulty-row.is-skeleton .difficulty-track span { width:45% !important; background:#4b5260 !important; }
  @keyframes leetcode-load { from { transform:translateX(-120%); } to { transform:translateX(290%); } } @keyframes leetcode-pulse { 50% { opacity:.55; } }
  @media (max-width:540px) { .leetcode-card { padding:22px 18px; border-radius:21px; }.leetcode-overview { grid-template-columns:1fr; justify-items:center; gap:22px; }.stat-grid { width:100%; grid-template-columns:1fr; gap:9px; }.stat-box { min-height:66px; }.difficulty-meta { align-items:flex-start; flex-direction:column; gap:3px; }.difficulty-meta span { white-space:normal; } }
  @media (prefers-reduced-motion:reduce) { .leetcode-card,.stat-box,.orb-value,.difficulty-track span { transition:none; }.loading-line::after,.is-skeleton { animation:none; } }
`;

