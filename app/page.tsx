import { Profile } from "@/components/profile";
import { GithubIcon } from "@/components/ui/icons";
import Image from "next/image";

export default function Home() {
  return (
   
      
    <div className="flex flex-col items-center justify-center">
    <div id="logo" className="flex items-center justify-center py-10">
      <h1 className="-ml-1.5 text-4xl font-bold">&lt;&nbsp;&nbsp; </h1>
      <GithubIcon className="h-40 w-20 p-0 m-0"/>
      <h1 className="-ml-1.5 text-4xl font-bold">&nbsp;/&nbsp;&gt; </h1>
      </div>
       <Profile/>
    </div>
  );
}