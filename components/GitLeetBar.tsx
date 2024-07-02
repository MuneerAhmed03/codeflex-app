import { UserSchema } from "@/actions/types";
import { LeetCodeIcon } from "./ui/icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function GitTweetBars(props: {
  user: Pick<UserSchema, "totalContributions" | "totalSubmissions">;
  barHeight: number;
  barWidth?: number;
  iconSize?: number;
}) {
  const { user } = props;
  const { barHeight, iconSize = 48, barWidth = 100 } = props;
  const { totalSubmissions , totalContributions :commits} = user;
  const tweetBarHeight =
    totalSubmissions + commits > 0 ? barHeight * (totalSubmissions / (totalSubmissions + commits)) : 0;
  const commitBarHeight =
    totalSubmissions + commits > 0 ? barHeight * (commits / (totalSubmissions + commits)) : 0;

  return (
    <div className="flex flex-row gap-5 justify-end items-end" style={{ height: `${barHeight}px` }}>
      <div className="flex flex-col gap-2.5 items-center">
        <LeetCodeIcon/>
        <div
          className="bg-blue-400"
          style={{ width: `${barWidth}px`, height: `${tweetBarHeight}px` }}
        />
      </div>
      <div className="flex flex-col gap-2.5 items-center">
        <GitHubLogoIcon/>
        <div
          className="bg-green-600"
          style={{ width: `${barWidth}px`, height: `${commitBarHeight}px` }}
        />
      </div>
    </div>
  );
}