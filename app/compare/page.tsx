import { CompareBox } from "@/components/compare-box";
import { fetchGithubPage } from "@/lib/github";
import { userSchema } from "@/lib/utils";
import { lcData, UserSchema } from "@/actions/types";
import Link from "next/link";
import { GithubIcon, LeetCodeIcon } from "@/components/ui/icons";
import { fetchLeetCode } from "@/lib/lc";
import { Metadata } from "next";
import { LeaderBoard } from "@/components/leader-board"
import { leaderboard } from "@/actions/types";;

export const runtime = "edge";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL!
    : process.env.NEXT_PUBLIC_LOCAL_URL!;
const DB_URL = process.env.NEXT_PUBLIC_DB_URL!;
type Props = {
  searchParams: {
    leetcode: string;
    github: string;
  };
};

async function getLeaderBoard(){
  const response = await fetch(`${DB_URL}/lb`, {next : { revalidate : 0} });
  if (!response.ok) {
      console.error(`Failed to fetch leaderboard ${response.status}`);
      return;
  }
  const json :leaderboard = await response.json();
  return json;
}

function parse(props: Props) {
  return {
    leetcode: props.searchParams.leetcode.toLowerCase(),
    github: props.searchParams.github.toLowerCase(),
  };
}

function getRatioText(input: {
  submissions: number;
  commits: number;
  displayName: string;
}) {
  const { submissions, commits, displayName } = input;

  // edge cases
  if (submissions === 0 && commits === 0) {
    return `${displayName} is a mysterious creature`;
  }
  if (submissions === 0) {
    return `${displayName} is locked into coding`;
  }
  if (commits === 0) {
    return `${displayName} is a Twitter addict`;
  }
  if (submissions === commits) {
    return `${displayName}'s life is perfectly balanced, as all things should be`;
  }

  const percentageSub = Math.abs((submissions / commits) * 100 - 100).toFixed();
  const percentageCommits = Math.abs(
    (commits / submissions) * 100 - 100
  ).toFixed();
  const txt =
    percentageCommits == percentageSub
      ? `${displayName} spends equal time tweeting and coding`
      : submissions > commits
      ? `${displayName} spends ${percentageSub}% more time grinding LeetCode than pushing code`
      : `${displayName} spends ${percentageCommits}% more time pushing code than grinding LeetCode`;
  return txt;
}


async function fetchUserData(props:Props) {
  try {
    const { github, leetcode } = parse(props);
    const response = await fetchData(props);
    
    if (response) {
      return { github, leetcode, userData: response };
    }

    const pageData = await getData(props);
    if (!pageData.user) {
      return { github, leetcode, userData: null, status: pageData.status };
    }

    await postUserData(pageData.user);
    return { github, leetcode, userData: pageData.user, status: 'success' };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { github: '', leetcode: '', userData: null };
  }
}

async function postUserData(user:UserSchema) {
  try {
    await fetch(`${DB_URL}/post`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  } catch (error) {
    console.error('Error posting user data:', error);
  }
}

async function fetchData(props: Props) {
  const { leetcode, github } = parse(props);
  try {
    const response = await fetch(
      `${DB_URL}/user?` +
        new URLSearchParams({ lc: leetcode, gh: github }).toString()
    );
    const data: UserSchema[] = await response.json();
    const user = data[0];
    return user;
  } catch (err) {
    console.log(err);
    return;
  }
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

  const leetCodeData: lcData =
    leetcodeData && !("status" in leetcodeData)
      ? leetcodeData
      : {
          username: "",
          githubUrl: "",
          totalSub: 0,
        };

  const user = userSchema({
    totalContributions: githubData.totalContributions,
    github: githubData.metadata,
    leetCode: leetCodeData,
  });
  return {
    status: "success",
    user,
  } as const;
}

function buildImageUrl(userData: UserSchema) {
  return new URLSearchParams({
    avatar: userData.avatar,
    github: userData.totalContributions.toString(),
    lc: userData.totalSubmissions.toString(),
    name: userData.name,
  }).toString();
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
      url: `${BASE_URL}/compare?leetcode=${leetcode}&github=${github}`,
      images: [{ url: `${BASE_URL}/api/og/compare?${imgurl.toString()}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.user.name}'s LeetCode and GitHub comparison`,
      description: `Compare the coding activity of ${data.user.name} on LeetCode and GitHub.`,
    },
  };
}

export default async function Page(props: Props) {
  const leaderboardResult = await getLeaderBoard();
  let leaderboard: leaderboard | null;
  if (!leaderboardResult) {
    leaderboard = null;
  } else {
    leaderboard = leaderboardResult;
  }
  const { github, leetcode, userData, status } = await fetchUserData(props);
  if (!userData) {
    return (
      <div>
        <h1>{status}</h1>
      </div>
    );
  }
  const imageUrl = buildImageUrl(userData);
  const txt = getRatioText({
    submissions: userData.totalSubmissions,
    commits: userData.totalContributions,
    displayName: userData.name,
  });
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex lg:flex-row flex-col lg:justify-between min-h-screen -mt-8">
        <ProfileSection github={github} userData={userData} />
        <CompareSection imageUrl={imageUrl} ratioText={txt} github={github} leetcode={leetcode} />
      </div>
      {leaderboard && <LeaderboardSection leaderboard={leaderboard} />}
    </div>
  );
}

function ProfileSection({ github, userData }: { github: string; userData: UserSchema }) {
  return (
    <div className="flex flex-col justify-center lg:items-center items-start lg:min-h-screen min-h-96 lg:p-6 p-2">
      <div id="profile" className="flex lg:flex-row flex-col lg:items-center items-start justify-start relative">
        <div className="flex flex-col items-start h-full py-2 px-2 lg:px-4 lg:py-2">
          <img
            src={`https://avatars.githubusercontent.com/${github}`}
            alt="avatar"
            className="lg:w-36 lg:h-36 w-24 h-24 rounded-full"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="flex flex-col p items-start text-[18px] font-medium">
          <ProfileLink href={`https://github.com/${userData.github_id}/`} icon={<GithubIcon className="mx-2" />} text={userData.github_id} />
          <ProfileLink href={`https://leetcode.com/u/${userData.lc_id}`} icon={<LeetCodeIcon className="mx-2 w-6 h-6" />} text={userData.lc_id} />
        </div>
      </div>
    </div>
  );
}

function ProfileLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <Link href={href} className="inline-flex items-center justify-center py-2 hover:underline" prefetch={false}>
      {icon}
      {text}
    </Link>
  );
}

function CompareSection({ imageUrl, ratioText, github, leetcode }: { imageUrl: string; ratioText: string; github: string; leetcode: string }) {
  return (
    <div className="flex justify-center items-center lg:min-h-screen px-1 lg:p-6">
      <CompareBox
        src={`${BASE_URL}/api/og/compare?${imageUrl}`}
        txt={ratioText}
        github={github}
        leetCode={leetcode}
      />
    </div>
  );
}

function LeaderboardSection({ leaderboard }: { leaderboard: any }) {
  return (
    <div className="flex lg:flex-row max-w-full flex-col items-center justify-around my-20">
      <div className="w-[334px]">
        <LeaderBoard users={leaderboard.grinders} table="lc" />
      </div>
      <div className="w-[334px]">
        <LeaderBoard users={leaderboard.contributors} table="gh" />
      </div>
    </div>
  );
}
