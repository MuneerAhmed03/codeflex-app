import { CompareBox } from "@/components/compare-box";
import { fetchGithubPage } from "@/lib/github";
import { userSchema } from "@/lib/utils";
import { lcData,LeetcodeResponse } from "@/actions/types";

export const runtime = "edge";

type Props = {
  searchParams: {
    leetcode: string;
    github: string;
  };
};

function parse(props: Props) {
  return {
    leetcode: props.searchParams.leetcode.toLowerCase(),
    github: props.searchParams.github.toLowerCase(),
  };
}
async function fetchLeetCode(username: string) {
  const query = `
        query { 
            matchedUser(username: "${username}") {
            githubUrl
            submitStats {
                acSubmissionNum{
                    difficulty
                    count
            }
        }
      }
  }  `;
  const submission = await fetch("https://leetcode.com/graphql", {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const submissionData: LeetcodeResponse = await submission.json();
  if (submissionData.errors) {
    console.log(`Failed to fetch leetcode profile for ${username}`)
    return;
  }
  const totalSub =
    submissionData.data.matchedUser.submitStats?.acSubmissionNum?.find(
      (entry) => entry.difficulty === "All"
    )?.count || null;
  return {
    username,
    githubUrl: submissionData.data.matchedUser.githubUrl,
    totalSub: totalSub,
  } as lcData;
}

async function getData(props: Props) {
  const { leetcode, github } = parse(props);

  const [githubData, leetcodeData] = await Promise.all([
    fetchGithubPage(github),
    fetchLeetCode(leetcode).catch((error) => {
      console.error("Error fetching LeetCode data:", error);
      return {
        status: `LeetCode profile not found. Go to https://leetcode.com/${leetcode} to make sure it exists and is set to public`,
      } as const;
    }),
  ]);

  if (!githubData.metadata) {
    return {
      status: `GitHub profile not found. Go to https://github.com/${github} to make sure it exists and is set to public`,
    } as const;
  }
  if (githubData.totalContributions === undefined) {
    return {
      status: `GitHub contributions not found. Go to https://github.com/${github} to make sure it exists and is set to public`,
    } as const;
  }

  const leetCodeData: lcData = leetcodeData && !('status' in leetcodeData) ? leetcodeData : {
    username: "",
    githubUrl: "",
    totalSub: 0,
  };

  const user = userSchema({
    totalContributions: githubData.totalContributions,
    github: githubData.metadata,
    leetCode: leetCodeData
  });

  return {
    status: "success",
    user,
  } as const;
}


export default async function Page(props: Props) {
  let github: string;
  let leetcode: string;
  try {
    const p = parse(props);
    github = p.github;
    leetcode = p.leetcode;
  } catch (error) {
    return <div>Invalid URL {JSON.stringify(props.searchParams)}</div>;
  }
  const pageData = await getData(props);
  if (!pageData.user) {
    return (
      <div>
        <h1> {pageData.status}</h1>
      </div>
    );
  }
  const imgurl = new URLSearchParams({
    avatar: pageData.user.avatar,
    github: pageData.user.totalContributions.toString(),
    lc: pageData.user.totalSubmissions.toString(),
    name: pageData.user.name,
  });
  return (
    <div>
      <CompareBox
        src={`http://localhost:3001/api/og/compare?${imgurl.toString()}`}
      />
    </div>
  );
}
