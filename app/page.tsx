import { Profile } from "@/components/profile";
import { GithubIcon } from "@/components/ui/icons";
import { leaderboard } from "@/actions/types";
import { LeaderBoard } from "@/components/leader-board";
import dynamic from 'next/dynamic';

// export const revalidate = 600;

// const DB_URL = process.env.NEXT_PUBLIC_DB_URL!;

// const DynamicLeaderboardSection = dynamic(() => import('../components/LeaderBoardSection'), {
//   loading: () => <p>Loading leaderboard...</p>,
//   ssr: false 
// });

// async function getLeaderBoard(){
//   const response = await fetch(`${DB_URL}/lb`, {next : { revalidate : 0} });
//   if (!response.ok) {
//       console.error(`Failed to fetch leaderboard ${response.status}`);
//       return;
//   }
//   const json :leaderboard = await response.json();
//   return json;
// }

export default async function Home() {

  // const leaderboardResult = await getLeaderBoard()
  // let leaderboard: leaderboard | null;
  // if (!leaderboardResult) {
  //   leaderboard = null;
  // } else {
  //   leaderboard = leaderboardResult;
  // }

  return (
    <div className="flex flex-col  px-2  min-h-screen ">
    <div id="logo" className="flex flex-col items-center justify-center py-5">
      <div className="flex flex-row items-center gap-2">
      <h1 className="-ml-1.5 text-4xl font-bold">&lt;&nbsp;&nbsp; </h1>
      <GithubIcon className="h-40 w-20 p-0 m-0"/>
      <h1 className="-ml-1.5 text-4xl font-bold">&nbsp;/&nbsp;&gt; </h1>
      </div>
      <span className="max-w-[600px] text-center pb-6 text-center opacity-70 pb-1">
      Find out how much the person who beat you in the last contest actually ships.
      </span>
       <Profile/>
       </div>
       {/* {leaderboard && (
            <div className="flex lg:flex-row max-w-full flex-col items-center justify-around my-20 ">
              <div className="w-[334px]">
                <LeaderBoard users={leaderboard.grinders} table="lc" />
              </div>
              <div className="w-[334px]">
                <LeaderBoard users={leaderboard.contributors} table="gh" />
              </div>
            </div>
          )}  */}
      </div>
  );
}