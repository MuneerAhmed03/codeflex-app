import { GithubMetadata, UserSchema, lcData } from "@/actions/types";
import { LeetCodeIcon } from "@/components/ui/icons";
import { type ClassValue, clsx } from "clsx";
import { Verified } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function userSchema(props: {
  totalContributions: number;
  github: GithubMetadata;
  leetCode: lcData;
}): UserSchema {
  return {
    name: props.github.name ?? props.leetCode.username,
    avatar: props.github.avatar_url,
    github_id: props.github.login,
    lc_id: props.leetCode.username,
    lc_github: props.leetCode.githubUrl,
    totalContributions: props.totalContributions,
    totalSubmissions: props.leetCode.totalSub,
    Verified:
      props.github.login === props.leetCode.username ||
      props.github.login === props.leetCode.githubUrl,
  };
}

export function getText(input: {
  submission: number;
  commits: number;
  displayName: string;
}) {
  const { submission, commits, displayName } = input;
  if (submission == 0) {
    return `${displayName} is silently commit-ed to solving real world problems`;
  }
  if (commits == 0) {
    return `${displayName} is still searching where he can find test cases for their e-commerce project`;
  }
  if (submission === commits) {
    return `${displayName}'s life is perfectly balanced, as all things should be`;
  }
  const percentageSub = Math.abs(
    (submission / commits) * 100 - 100
  ).toFixed();
  const percentageCommit = Math.abs(
    (commits / submission) * 100 - 100
  ).toFixed();
  return generateTag(
    {
      name:displayName,
      percentage: submission > commits ? percentageSub : percentageCommit,
      arr: submission > commits ? lcvsgit : gitvslc
    }
  )
}

function generateTag(props: {
  name: string;
  percentage: string;
  arr: {
    text: string;
  }[];
}) {
  const { name, percentage, arr } = props;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex].text.replace("{name}", name).replace("{percentage}", percentage);
}

const gitvslc = [
  {
    text: "{name} spends {percentage}% more time git pushing than brain pushing",
  },
  {
    text: "{name} spends {percentage}% more time committing code than committing algorithm solutions to memory",
  },
  {
    text: "{name} spends {percentage}% more time branching out in Git than branching out in binary trees",
  },
  {
    text: "{name} spends {percentage}% more time merging pull requests than merging sorted arrays",
  },
  {
    text: '{name} spends {percentage}% more time resolving merge conflicts than resolving "NullPointerException: brain not found"',
  },
  {
    text: '{name} spends {percentage}% more time writing commit messages than writing "return 0" in defeat',
  },
  {
    text: "{name} spends {percentage}% more time debugging real code than debugging why their LeetCode solution works on paper but not in practice",
  },
  {
    text: '{name} spends {percentage}% more time implementing features than implementing "features" of a linked list (spoiler: there aren\'t many)',
  },
  {
    text: "{name} spends {percentage}% more time optimizing queries than optimizing their chances of solving a hard LeetCode problem",
  },
  {
    text: "{name} spends {percentage}% more time deploying to production than deploying their sanity while staring at LeetCode's runtime error messages",
  },
  {
    text: '{name} spends {percentage}% more time writing unit tests than writing "print statements" to debug their LeetCode solutions',
  },
  {
    text: "{name} spends {percentage}% more time in code reviews than in reviewing why their perfectly good solution exceeds the time limit",
  },
  {
    text: "{name} spends {percentage}% more time fixing real bugs than fixing their wounded pride after a failed submission",
  },
  {
    text: "{name} spends {percentage}% more time scaling systems than scaling the heights of LeetCode's leaderboard",
  },
  {
    text: "{name} spends {percentage}% more time refactoring code than refactoring their life choices after the 50th failed medium problem",
  },
  {
    text: "{name} spends {percentage}% more time building REST APIs than getting rest after an all-night LeetCode binge",
  },
  {
    text: '{name} spends {percentage}% more time optimizing database indices than optimizing their index finger for faster "Run Code" button clicks',
  },
  {
    text: "{name} spends {percentage}% more time dealing with real-world hash collisions than colliding with their keyboard in frustration over hash table problems",
  },
  {
    text: "{name} spends {percentage}% more time balancing team workloads than balancing binary search trees (because let's face it, the trees are easier)",
  },
];

const lcvsgit = [
  {
    text: "{name} solves {percentage}% more LeetCode problems than making meaningful Git commits",
  },
  {
    text: "{name} spends {percentage}% more time optimizing runtime than optimizing actual running code",
  },
  {
    text: "{name} crafts {percentage}% more perfect binary trees than branching strategies",
  },
  {
    text: "{name} traverses {percentage}% more graphs than their own codebase",
  },
  {
    text: "{name} balances {percentage}% more AVL trees than work-life priorities",
  },
  {
    text: "{name} implements {percentage}% more sorting algorithms than sorting out project dependencies",
  },
  {
    text: "{name} solves {percentage}% more dynamic programming problems than they dynamically program",
  },
  {
    text: "{name} designs {percentage}% more number of efficient algorithms than efficient CI/CD pipelines",
  },
  {
    text: "{name} reverses {percentage}% more linked lists than bad commits",
  },
  {
    text: "{name} writes {percentage}% more recursive solutions than recursive Git blame calls",
  },
  {
    text: "{name} optimizes {percentage}% more space complexities than actual disk space usage",
  },
  {
    text: "{name} solves {percentage}% more two-pointer problems than they point out in code reviews",
  },
  {
    text: "{name} masters {percentage}% more sliding window techniques than actual window management in their IDE",
  },
  {
    text: "{name} performs {percentage}% more depth-first searches than searching for the root cause of bugs",
  },
  {
    text: "{name} excels at {percentage}% more greedy algorithms than greedily implementing new project features",
  },
  {
    text: "{name} understands {percentage}% more about NP-completeness than about completing non-LeetCode related tasks",
  },
];
