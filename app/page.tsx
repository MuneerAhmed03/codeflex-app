import { Profile } from "@/components/profile";
import { GithubIcon } from "@/components/ui/icons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-2 justify-center">
    <div id="logo" className="flex flex-col items-center justify-center py-5">
      <div className="flex flex-row items-center gap-2">
      <h1 className="-ml-1.5 text-4xl font-bold">&lt;&nbsp;&nbsp; </h1>
      <GithubIcon className="h-40 w-20 p-0 m-0"/>
      <h1 className="-ml-1.5 text-4xl font-bold">&nbsp;/&nbsp;&gt; </h1>
      </div>
      <span className="max-w-[600px] text-center pb-4 text-center opacity-70 pb-1">
      Find out how much the person who beat you in the last contest actually ships.
      </span>
       <Profile/>
      </div>
      </div>
  );
}