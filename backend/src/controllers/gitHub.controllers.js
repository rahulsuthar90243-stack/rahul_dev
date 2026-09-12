import "dotenv/config";

const githubEndpoint = "https://api.github.com/graphql";

const githubQuery = `
	query GithubProfile($username: String!) {
		user(login: $username) {
			repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
				nodes {
					stargazerCount
					languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
						edges {
							size
							node { name }
						}
					}
				}
			}
			contributionsCollection {
				totalCommitContributions
				totalPullRequestContributions
				totalIssueContributions
				totalRepositoriesWithContributedCommits
			}
		}
	}
`;

const getGithubData = async (request, response) => {
	const username = request.query.username || process.env.GITHUB_USERNAME;
	const token = process.env.GITHUB_TOKEN;

	if (!username || !token) {
		return response.status(500).json({
			error: "Set GITHUB_USERNAME and GITHUB_TOKEN in the backend environment",
		});
	}

	try {
		const githubResponse = await fetch(githubEndpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query: githubQuery, variables: { username } }),
		});

		const body = await githubResponse.json();
		if (!githubResponse.ok || body.errors?.length) {
			return response.status(502).json({
				error: body.errors?.[0]?.message || "GitHub request failed",
			});
		}

		const user = body.data.user;
		const repositories = user.repositories.nodes;
		const languages = {};

		for (const repository of repositories) {
			for (const language of repository.languages.edges) {
				languages[language.node.name] = (languages[language.node.name] || 0) + language.size;
			}
		}

		const totalLanguageBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
		const languagePercentages = Object.entries(languages)
			.map(([name, bytes]) => ({
				name,
				percentage: Number(((bytes / totalLanguageBytes) * 100).toFixed(1)),
			}))
			.sort((first, second) => second.percentage - first.percentage);

		const contributions = user.contributionsCollection;
		return response.json({
			totalStars: repositories.reduce((sum, repository) => sum + repository.stargazerCount, 0),
			totalCommits: contributions.totalCommitContributions,
			totalPRs: contributions.totalPullRequestContributions,
			totalIssues: contributions.totalIssueContributions,
			contributedTo: contributions.totalRepositoriesWithContributedCommits,
			languages: languagePercentages,
		});
	} catch (error) {
		return response.status(502).json({ error: error.message || "Unable to reach GitHub" });
	}
};

export default getGithubData;