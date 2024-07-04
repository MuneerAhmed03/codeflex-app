import type { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { GithubIcon, LeetCodeIcon } from "../../../../components/ui/icons";
import { GitTweetBars } from "@/components/GitLeetBar";
import { getText } from "@/lib/utils";
export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const parsed = new URL(req.url).searchParams;
  const avatar = parsed.get("avatar");
  const github = parsed.get("github");
  const lc = parsed.get("lc");
  const name = parsed.get("name");
  if (!github || !lc || !name || !avatar) {
    return new Response("Missing parameters", { status: 400 });
  }
  const commits = Number(github);
  const solved = Number(lc);
  const txt = getText({
    submission: solved,
    commits: commits,
    displayName: name,
  })
  const UserMetadata = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "25px",
      }}
    >
      <h1>{name}</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
          justifyContent: "flex-start",
          fontSize: "2rem",
          paddingBottom: "15px",
          fontWeight: "bold",
        }}
      >
        <GithubIcon
          style={{ width: "3rem", height: "3rem", marginRight: "0.25rem" }}
        />
        <span>
          {`${commits} commits`}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
          justifyContent: "flex-start",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        <LeetCodeIcon
          style={{ width: "3rem", height: "3rem", marginRight: "0.25rem" }}
        />
        <span>{`${solved} solved`}</span>
        
      </div>
    </div>
  );
  const UserInfo = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <img
          src={avatar}
          width="220"
          height="220"
          alt="avatar"
          style={{
            width: "220px",
            height: "220px",
            borderRadius: "50%",
          }}
        />
      </div>
      <UserMetadata />
    </div>
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "hsl(240, 4%, 10%)",
          padding: "40px",
          color : "hsl(60, 5%, 90%)"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: "40px",
            paddingTop: "50px",
            paddingBottom: "50px",
            maxWidth: "750px",
          }}
        >
          <UserInfo />
          <span
            style={{
              fontSize: "35px",
              fontWeight: "medium",
            }}
          >
            {txt}
          </span>
        </div>
        {/* two rectangle divs both starting at the bottom next to each other, one that is blue for tweets on that is green for commits */}
        <div
          id="bars"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <GitTweetBars
            commits={commits}
            submissions={solved}
            barHeight={500}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
