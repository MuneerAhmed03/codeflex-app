import type { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { GithubIcon, LeetCodeIcon } from "../../../../components/ui/icons";
import { GitTweetBars } from "@/components/GitLeetBar";
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
  const txt = `${name} spends ${Math.round(
    (commits / solved) * 100
  )}% more time pushing code than solving DSA`;
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
  // return new ImageResponse ((
  //   <div style={{
  //     width: 1200,
  //     height: 630,
  //     display: 'flex',
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     padding: "40px",
  //     fontSize: '25px',
  //     backgroundColor: 'hsl(240, 4%, 10%)',
  //   }}>
  //     <div style={{
  //       display: 'flex',
  //       alignItems: 'center',
  //       justifyContent: 'space-between',
  //       width: '100%'
  //     }}>
  //       <div id="data" style={{
  //         display: 'flex',
  //         alignItems: 'center',
  //       }}>
  //         <div style={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //           justifyContent: 'center'
  //         }}>
  //           <div style={{
  //             display: 'flex',
  //             height: '5rem',
  //             width: '5rem',
  //             borderRadius: '50%',
  //             overflow: 'hidden'
  //           }}>
  //             <img
  //               src={avatar}
  //               alt={name}
  //               style={{
  //                 width: '100%',
  //                 height: '100%',
  //                 objectFit: 'cover'
  //               }}
  //             />
  //           </div>
  //         </div>
  //         <div style={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           marginLeft: '1rem'
  //         }}>
  //           <h1 style={{
  //             display: 'flex',
  //             fontSize: '1.25rem',
  //             fontWeight: '600',
  //             margin: '0 0 0.5rem 0'
  //           }}>{name}</h1>
  //           <div style={{
  //             display: 'flex',
  //             alignItems: 'center',
  //             fontSize: '0.875rem',
  //             color: 'hsl(240, 5%, 25%)',
  //             marginBottom: '0.25rem'
  //           }}>
  //             <GithubIcon style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
  //             <span>{`${github} commits`}</span>
  //           </div>
  //           <div style={{
  //             display: 'flex',
  //             alignItems: 'center',
  //             fontSize: '0.875rem',
  //             color: 'hsl(240, 5%, 25%)'
  //           }}>
  //             <LeetCodeIcon style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
  //             <span>{`${lc} solved`}</span>
  //           </div>
  //         </div>
  //       </div>
  //       <div id="bars" style={{
  //         display: 'flex',
  //         alignItems: 'center',
  //         marginTop: '1rem'
  //       }}>
  //         <div style={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           padding: '1rem',
  //           alignItems: 'center',
  //           justifyContent: 'flex-end',
  //           height: '8rem'
  //         }}>
  //           <GithubIcon style={{ width: '1.5rem', height: '1.5rem', marginBottom: '0.25rem', color: 'hsl(240, 0%, 90%)' }} />
  //           <div id="ghbar" style={{
  //             width: '2rem',
  //             height: '6rem',
  //             backgroundColor: '#22c55e'
  //           }} />
  //         </div>
  //         <div style={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //           padding: '1rem',
  //           justifyContent: 'flex-end',
  //           height: '8rem'
  //         }}>
  //           <LeetCodeIcon style={{ width: '1.5rem', height: '1.5rem', marginBottom: '0.25rem', color: 'hsl(240, 0%, 90%)' }} />
  //           <div id="lcbar" style={{
  //             width: '2rem',
  //             height: '1.5rem',
  //             backgroundColor: '#3b82f6'
  //           }} />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // // </div>
  //  ),{

  // })
}
