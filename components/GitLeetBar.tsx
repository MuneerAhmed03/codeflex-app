import { LeetCodeIcon, GithubIcon } from "./ui/icons";

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
        <LeetCodeIcon
          style={{ width: "3rem", height: "3rem", marginRight: "0.25rem" }}
        />
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
        <GithubIcon
          style={{ width: "3rem", height: "3rem", marginRight: "0.25rem" }}
        />
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