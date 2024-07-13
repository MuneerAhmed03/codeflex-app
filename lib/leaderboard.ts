"use server"
import { leaderboard } from "@/actions/types";

const DB_URL = process.env.DB_URL!

export default async function getLeaderBoard(){
    const response = await fetch(`${DB_URL}/lb`, {next : { revalidate : 60*3} });
    if (!response.ok) {
        console.error(`Failed to fetch leaderboard ${response.status}`);
        return;
    }
    const json :leaderboard = await response.json();
    return json;
}