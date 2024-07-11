"use server"

import { leaderboard } from "@/actions/types";

export default async function getLeaderBoard(){
    const response = await fetch('https://codeflex-db.muneerahmed00916.workers.dev/lb');
    if (!response.ok) {
        console.error(`Failed to fetch leaderboard ${response.status}`);
        return;
    }
    const json :leaderboard = await response.json();
    return json;
}