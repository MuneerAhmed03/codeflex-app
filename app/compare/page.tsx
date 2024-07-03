
import { CompareBox } from "@/components/compare-box";
import { fetchGithubPage } from "@/lib/github";
import { userSchema } from "@/lib/utils";
import { lcData } from "@/actions/types";
import axios from "axios";
import getConfig from 'next/config';
import { useSearchParams } from "next/navigation";

export const runtime = 'edge';

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

async function getData(props: Props) {
  const { leetcode, github } = parse(props);
  const { totalContributions, metadata: githubMetadata } =
    await fetchGithubPage(github);
  console.log(leetcode)
  let leetcodeData: lcData = {
    username: "",
    githubUrl: "",
    totalSub: 0,
  };

  try {
    const response = await axios.get(
      `http://localhost:3000/api/submission?username=${encodeURIComponent(leetcode)}`
    );
    leetcodeData = response.data;
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return {
      status: `LeetCode profile not found. Go to https://leetcode.com/${leetcode} to make sure it exists and is set to public`,
    } as const;
  }

  if (!githubMetadata) {
    return {
      status: `GitHub profile not found. Go to https://github.com/${github} to make sure it exists and is set to public`,
    } as const;
  }
  if (totalContributions === undefined) {
    return {
      status: `GitHub contributions not found. Go to https://github.com/${github} to make sure it exists and is set to public`,
    } as const;
  }
  console.log(leetcodeData);
  const user = userSchema({
    totalContributions,
    github: githubMetadata,
    leetCode: leetcodeData,
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
      <CompareBox src={`http://localhost:3000/api/og/compare?${imgurl.toString()}`} />
    </div>
  );
}
