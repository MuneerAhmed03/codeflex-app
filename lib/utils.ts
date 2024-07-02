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
  leetCode : lcData
}) : UserSchema {
  return {
    name: props.github.name,
    avatar: props.github.avatar_url,
    github_id:props.github.login,
    lc_id: props.leetCode.username,
    lc_github: props.leetCode.githubUrl,
    totalContributions: props.totalContributions,
    totalSubmissions: props.leetCode.totalSub,
    Verified : props.github.login === props.leetCode.username || props.github.login === props.leetCode.githubUrl
  }
}
