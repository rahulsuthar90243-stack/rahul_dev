import { useEffect, useState } from "react";

const emptyStats = {
	totalStars: 0,
	totalCommits: 0,
	totalPRs: 0,
	totalIssues: 0,
	contributedTo: 0,
	languages: [],
};

export default function Github({
	username = "rahulsuthar90243-stack",
	endpoint = "http://localhost:4000/api/github",
	className = "",
}) {
	const [stats, setStats] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController();
		const query = username ? `?username=${encodeURIComponent(username)}` : "";

		async function loadGithubStats() {
			try {
				const response = await fetch(`${endpoint}${query}`, {
					signal: controller.signal,
					headers: { Accept: "application/json" },
				});
				if (!response.ok) throw new Error("GitHub request failed");
				setStats({ ...emptyStats, ...(await response.json()) });
			} catch (requestError) {
				if (requestError.name !== "AbortError") setError("GitHub stats unavailable.");
			}
		}

		loadGithubStats();
		return () => controller.abort();
	}, [endpoint, username]);

	const data = stats || emptyStats;

	return (
		<section className={`github-card ${className}`} aria-labelledby="github-title">
			<div className="github-heading">
				<span className="github-icon" aria-hidden="true">◉</span>
				<h2 id="github-title">GitHub</h2>
				{!stats && !error && <span className="github-loading" aria-label="Loading GitHub stats" />}
			</div>

			{error && <p className="github-message" role="status">{error}</p>}

			<div className="github-stats">
				{[
					["⭐", data.totalStars, "Total Stars Earned"],
					["💻", data.totalCommits, "Total Commits"],
					["🔀", data.totalPRs, "Total PRs"],
					["❗", data.totalIssues, "Total Issues"],
					["📊", data.contributedTo, "Contributed to"],
				].map(([icon, value, label]) => (
					<div className="github-stat" key={label}>
						<span className="github-stat-icon" aria-hidden="true">{icon}</span>
						<strong>{stats ? Number(value).toLocaleString() : "—"}</strong>
						<span>{label}</span>
					</div>
				))}
			</div>

			<div className="github-languages">
				<div className="github-section-title"><span>🟦</span><strong>Languages %</strong></div>
				{data.languages.map((language) => (
					<div className="github-language" key={language.name}>
						<div><span>{language.name}</span><strong>{language.percentage}%</strong></div>
						<div className="github-language-track"><span style={{ width: `${language.percentage}%` }} /></div>
					</div>
				))}
				{!stats && <div className="github-language-placeholder">Loading languages...</div>}
				{stats && !data.languages.length && <div className="github-language-placeholder">No language data found.</div>}
			</div>
		</section>
	);
}

const styles = `
	.github-card { box-sizing:border-box; width:100%; max-width:550px; min-width:0; margin:0 auto; padding:clamp(16px, 3vw, 20px); color:#f7f8ff; background:#17191e; border:1px solid #3b3f47; border-radius:20px; box-shadow:0 18px 50px rgba(0,0,0,.3); font-family:inherit; transition:transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
	.github-card:hover { transform:translateY(-4px); border-color:#676d79; box-shadow:0 24px 58px rgba(0,0,0,.42); }
	.github-heading { display:flex; align-items:center; gap:10px; min-height:28px; }.github-heading h2 { margin:0; font-size:22px; letter-spacing:-.03em; color:#f5f7fa; }.github-icon { display:grid; place-items:center; width:25px; height:25px; color:#58a6ff; font-size:21px; }.github-loading { width:52px; height:3px; margin-left:auto; overflow:hidden; border-radius:99px; background:#30343c; }.github-loading::after { content:""; display:block; width:42%; height:100%; background:#58a6ff; animation:github-load 1s ease-in-out infinite; }
	.github-message { margin:12px 0 -2px; color:#aeb5c1; font-size:12px; }.github-stats { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:8px; margin-top:20px; }.github-stat { min-width:0; min-height:92px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; background:#24272e; border:1px solid #424751; border-radius:13px; text-align:center; }.github-stat-icon { font-size:17px; }.github-stat strong { font-size:19px; letter-spacing:-.035em; }.github-stat span:last-child { color:#b4bbc6; font-size:10px; line-height:1.2; }
	.github-languages { display:grid; gap:12px; margin-top:22px; }.github-section-title { display:flex; align-items:center; gap:7px; font-size:13px; }.github-language { display:grid; gap:6px; }.github-language > div:first-child { display:flex; justify-content:space-between; color:#c3c9d2; font-size:12px; }.github-language strong { color:#fff; }.github-language-track { height:8px; overflow:hidden; border-radius:999px; background:#363a42; }.github-language-track span { display:block; height:100%; border-radius:inherit; background:linear-gradient(90deg,#58a6ff,#25d6a2); transition:width .65s ease; }.github-language-placeholder { color:#8f98a6; font-size:12px; }
	@keyframes github-load { from { transform:translateX(-120%); } to { transform:translateX(290%); } } @media (max-width:540px) { .github-card { border-radius:16px; }.github-stats { grid-template-columns:repeat(3,minmax(0,1fr)); }.github-stat { min-height:78px; }.github-stat strong { font-size:16px; }.github-stat span:last-child { font-size:9px; } }
`;

if (typeof document !== "undefined" && !document.getElementById("github-card-styles")) {
	const style = document.createElement("style");
	style.id = "github-card-styles";
	style.textContent = styles;
	document.head.appendChild(style);
}
