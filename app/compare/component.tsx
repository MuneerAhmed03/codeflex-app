import { UserSchema } from "@/actions/types";
import { GithubIcon, LeetCodeIcon } from "@/components/ui/icons";
import { userSchema } from "@/lib/utils";
import { GitTweetBars } from "@/components/GitLeetBar";
import React from "react";

interface GitLeetBoxProps {
  user: UserSchema;
}

export default function GitLeetBox(user: UserSchema) {
const barHeight = 500;  
  const UserMetadata = () => {
    return (
      <div className="flex flex-col items-center justify-center text-[25px]">
        <h1>{user.name}</h1>
        <div className="flex flex-row items-center justify-start gap-2 pb-4 font-bold ">
          <LeetCodeIcon />
          {`${user.totalSubmissions} Solved`}
        </div>
        <div className="flex flex-row items-center justify-start gap-2 pb-4 font-bold ">
          <GithubIcon />
          {`${user.totalContributions} Commits`}
        </div>
      </div>
    );
  };

  const UserData = () => {
    return (
      <div className="flex felx-row items-center gap-5">
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={user.avatar}
            width="220"
            height="220"
            alt="avatar"
            className="w-44 h-44 rounded-full"
          />
        </div>
        <UserMetadata />
      </div>
    );
  };

  return (
    <div className="w-[1200px] h-[630px] flex justify-between items-center bg-white p-10">
      <div className="flex flex-col h-full gap-10 pt-12 pb-12 max-w-[750px]">
        <UserData />
        <span className="text-4xl">Paaji coded llgijg% more</span>
      </div>
      {/* two rectangle divs both starting at the bottom next to each other, one that is blue for tweets on that is green for commits */}
      <div className="absolute left-10 bottom-10 text-gray-500 flex text-2xl">
        shiptalkers.com
      </div>
      <GitTweetBars
        user={{ totalContributions: user.totalContributions, totalSubmissions: user.totalSubmissions}}
        barHeight={barHeight}
      />
    </div>
  );
}
