import React from 'react';
import { LeaderBoard } from "@/components/leader-board";
import { leaderboard } from "@/actions/types";

async function getLeaderBoard() {
  const response = await fetch(`https://codeflex-db.muneerahmed00916.workers.dev/lb`, {
    next: { revalidate: 0 }
  });
  if (!response.ok) {
    console.error(`Failed to fetch leaderboard ${response.status}`);
    return null;
  }
  const json: leaderboard = await response.json();
  return json;
}

export default async function LeaderboardSection() {
  const leaderboardResult = await getLeaderBoard();
  
  if (!leaderboardResult) {
    return null;
  }

  return (
    <div className="flex lg:flex-row max-w-full flex-col items-center justify-around my-20">
      <div className="w-[334px]">
        <LeaderBoard users={leaderboardResult.grinders} table="lc" />
      </div>
      <div className="w-[334px]">
        <LeaderBoard users={leaderboardResult.contributors} table="gh" />
      </div>
    </div>
  );
}