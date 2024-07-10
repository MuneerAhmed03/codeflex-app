import { CompareBox } from "@/components/compare-box";
import { fetchGithubPage } from "@/lib/github";
import { userSchema } from "@/lib/utils";
<<<<<<< Updated upstream:app/compare/page.tsx
import { lcData,LeetcodeResponse } from "@/actions/types";

export const runtime = "edge";

=======
import { lcData, UserSchema } from "@/actions/types";
import Link from "next/link";
import { GithubIcon, LeetCodeIcon } from "@/components/ui/icons";
import { fetchLeetCode } from "@/lib/lc";
import { Metadata } from "next";
import { getRatioText } from "@/lib/utils";
import axios from "axios";
export const runtime = "edge";
const BASE_URL = process.env.NODE_ENV
  ? "https://codeflex.pages.dev"
  : "http://localhost:3000";
>>>>>>> Stashed changes:src/app/compare/page.tsx
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
<<<<<<< Updated upstream:app/compare/page.tsx
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
=======
>>>>>>> Stashed changes:src/app/compare/page.tsx

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

<<<<<<< Updated upstream:app/compare/page.tsx
=======
async function fetchData(props: Props) {

  const { leetcode, github } = parse(props);
  try {
    const fethced = await axios.get(
      "https://codeflex-db.muneerahmed00916.workers.dev/user?" +
        new URLSearchParams({ lc: leetcode, gh: github }).toString()
    );
    const user = fethced.data[0] as UserSchema;
    console.log("called db")
    return user;
  } catch (err) {
  console.log(err);
    return;
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { leetcode, github } = parse(props);

  const data = await getData(props);

  if (!data.user) {
    return {};
  }
  const imgurl = new URLSearchParams({
    avatar: data.user.avatar,
    github: data.user.totalContributions.toString(),
    lc: data.user.totalSubmissions.toString(),
    name: data.user.name,
  });

  return {
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: `${data.user.name}'s LeetCode and GitHub comparison`,
      description: `Compare the coding activity of ${data.user.name} on LeetCode and GitHub.`,
      type: "website",
      url: `https://codeflex.pages.dev/compare?leetcode=${leetcode}&github=${github}`,
      images: [{ url: `${BASE_URL}/api/og/compare?${imgurl.toString()}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.user.name}'s LeetCode and GitHub comparison`,
      description: `Compare the coding activity of ${data.user.name} on LeetCode and GitHub.`,
    },
  };
}
>>>>>>> Stashed changes:src/app/compare/page.tsx

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
  let github_id = "";
  let lc_id = "";
  let imageUrl = "";
  let txt = "";

  const response = await fetchData(props);
  if (response) {
    github_id = response.github_id;
    lc_id = response.lc_id;
    imageUrl = new URLSearchParams({
      avatar: response.avatar,
      github: response.totalContributions.toString(),
      lc: response.totalSubmissions.toString(),
      name: response.name,
    }).toString();
    console.log(imageUrl);
    txt = getRatioText({
      submissions: response.totalSubmissions,
      commits: response.totalContributions,
      displayName: response.name,
    });
  } else {
    const pageData = await getData(props);
    if (!pageData.user) {
      return (
        <div>
          <h1> {pageData.status}</h1>
        </div>
      );
    }
    github_id = pageData.user.github_id;
    lc_id = pageData.user.lc_id;
    imageUrl = new URLSearchParams({
      avatar: pageData.user.avatar,
      github: pageData.user.totalContributions.toString(),
      lc: pageData.user.totalSubmissions.toString(),
      name: pageData.user.name,
    }).toString();

    txt = getRatioText({
      submissions: pageData.user.totalSubmissions,
      commits: pageData.user.totalContributions,
      displayName: pageData.user.name,
    });
  }
<<<<<<< Updated upstream:app/compare/page.tsx
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
=======
  console.log("url : ",imageUrl);
  return (
    <>
      <div className="flex md:flex-row flex-col justify-between mx-4 min-h-screen">
        <div className="flex flex-col py-24 items-start justify-start relative">
          <div
            id="profile"
            className="flex md:flex-col flex-row items-center justify-start relative"
          >
            <div className="flex flex-col items-start h-full px-4 py-2">
              <img
                src={`https://avatars.githubusercontent.com/${github}`}
                width="100"
                height="100"
                alt="avatar"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className="flex flex-col p items-start text-[18px] font-medium ">
              <Link
                href={`https://leetcode.com/u/${lc_id}`}
                className="inline-flex items-center justify-center py-3 hover:underline"
                prefetch={false}
              >
                <LeetCodeIcon className="mx-2 w-6 h-6 " />
                {lc_id}
              </Link>
              <Link
                href={`https://github.com/${github_id}/`}
                className="inline-flex items-center justify-center py-2 hover:underline "
                prefetch={false}
              >
                <GithubIcon className="mx-2" />
                {github_id}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center min-h-screen p-6">
          <CompareBox
            src={`${BASE_URL}/api/og/compare?${imageUrl}`}
            txt={txt}
            github={github}
            leetCode={leetcode}
          />
        </div>
      </div>
    </>
>>>>>>> Stashed changes:src/app/compare/page.tsx
  );
}
