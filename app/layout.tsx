import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppBar } from "@/components/app-bar";
import getLeaderBoard from "@/lib/leaderboard";
import { LeaderBoard } from "@/components/leader-board";
import { leaderboard } from "@/actions/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Flex",
  description: "Compare your LeetCode and Github",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const leaderboardResult = await getLeaderBoard();
  let leaderboard: leaderboard | null;
  if (!leaderboardResult) {
    leaderboard = null;
  } else {
    leaderboard = leaderboardResult;
  }

  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="flex flex-col min-h-screen ">
        <AppBar />
        <div className="pattern-background">
          
          {children}

          {leaderboard && (
            <div className="flex lg:flex-row max-w-full flex-col items-center justify-around my-20 ">
              <div className="w-[334px]">
                <LeaderBoard users={leaderboard.grinders} table="lc" />
              </div>
              <div className="w-[334px]">
                <LeaderBoard users={leaderboard.contributors} table="gh" />
              </div>
            </div>
          )}
        </div>
        </div>
      </body>
    </html>
  );
}
