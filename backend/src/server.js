import "dotenv/config";
import cors from "cors";    
import express from "express";

const app = express();
const port = Number(process.env.PORT) || 4000;
const leetcodeEndpoint = process.env.LEETCODE_ENDPOINT || "https://leetcode.com/graphql/";

app.use(cors());
app.use(express.json());

const profileQuery = `
  query userPublicProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        reputation
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      badges {
        id
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

const findCount = (items = [], difficulty) => items.find((item) => item.difficulty === difficulty)?.count ?? null;

function toDifficulty(submissions, questions, name, color) {
  const solved = findCount(submissions, name);
  const total = findCount(questions, name);
  return {
    name: name[0] + name.slice(1).toLowerCase(),
    solved,
    total,
    beats: null,
    color,
  };
}

function normaliseLeetCodeResponse(body) {
  const profile = body?.data?.matchedUser;
  const questionCounts = body?.data?.allQuestionsCount ?? [];
  const submissions = profile?.submitStats?.acSubmissionNum ?? [];

  if (!profile) {
    throw new Error("LeetCode user was not found");
  }

  return {
    solved: findCount(submissions, "All"),
    total: findCount(questionCounts, "All"),
    rank: profile.profile?.ranking ?? null,
    badges: profile.badges?.length ?? null,
    reputation: profile.profile?.reputation ?? null,
    difficulties: [
      toDifficulty(submissions, questionCounts, "Easy", "#21d4fd"),
      toDifficulty(submissions, questionCounts, "Medium", "#25d6a2"),
      toDifficulty(submissions, questionCounts, "Hard", "#ff7668"),
    ],
  };
}

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.get("/api/leetcode", async (request, response) => {
  const username = String(request.query.username || process.env.LEETCODE_USERNAME || "").trim();

  if (!username) {
    return response.status(400).json({ error: "Set LEETCODE_USERNAME or pass ?username=..." });
  }

  try {
    const leetcodeResponse = await fetch(leetcodeEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "rahul-dev-portfolio/1.0",
      },
      body: JSON.stringify({ query: profileQuery, variables: { username } }),
    });

    const body = await leetcodeResponse.json();
    if (!leetcodeResponse.ok || body.errors?.length) {
      const message = body.errors?.[0]?.message || `LeetCode request failed (${leetcodeResponse.status})`;
      return response.status(502).json({ error: message });
    }

    return response.json({ data: normaliseLeetCodeResponse(body) });
  } catch (error) {
    return response.status(502).json({ error: error.message || "Unable to reach LeetCode" });
  }
});

app.listen(port, () => {
  console.log(`LeetCode backend running at http://localhost:${port}`);
});
