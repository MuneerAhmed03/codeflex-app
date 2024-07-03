import { UserSchema } from "@/actions/types";
import { LeetCodeIcon, GithubIcon } from "./ui/icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function GitTweetBars(props: {
  commits:number;
  submissions:number;
  barHeight: number;
}) {
  const { commits, submissions, barHeight } = props;
  // const { barHeight, iconSize = 48, barWidth = 100 } = props;
  // const { totalSubmissions , totalContributions :commits} = user;
  const lcBarHeight =
    submissions + commits > 0 ? barHeight * (submissions / (submissions + commits)) : 0;
  const commitBarHeight =
    submissions + commits > 0 ? barHeight * (commits / (submissions + commits)) : 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: `${barHeight}px`,
        gap: "20px",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <LeetCodeIcon width={45}  height={45} />
        <div
          style={{
            width: `100px`,
            height: `${lcBarHeight}px`,
            backgroundColor: "#ce7e00",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <GithubIcon width={48}  height={48} />
        <div
          style={{
            width: `100px`,
            height: `${commitBarHeight}px`,
            backgroundColor: "#26a641",
          }}
        />
      </div>
    </div>
  );
}