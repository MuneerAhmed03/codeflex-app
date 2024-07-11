"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CodeIcon, GithubIcon, LoadingIcon } from "./ui/icons";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { useLeetCodeProfile } from "@/hooks/useLeetCodeProfile";
import { useRouter } from "next/navigation";

export function Profile() {
  const [leetcodeUrl, setLeetCodeUrl] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [debouncedUrl, setDebouncedUrl] = useState<string>(leetcodeUrl);
  const { profileData, error, isLoading } = useLeetCodeProfile(debouncedUrl);
  const router = useRouter();
  const githubref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedUrl(leetcodeUrl);
    }, 500);
    return () => clearTimeout(timeout);
  }, [leetcodeUrl]);

  const handleLeetCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLeetCodeUrl(e.target.value);
  };
  return (
    <Card className="bg-card w-full max-w-md ">
      <CardHeader className="p-6">
        <CardTitle>Enter Profile Username</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0"> 
        <form

          onSubmit={(e) => {
            e.preventDefault();
            console.log("Submitting");
            const lwrGh = githubref.current?.value.toLowerCase();
            const lwrLc = leetcodeUrl.toLowerCase();
            if (!lwrGh || !lwrLc) {
              return;
            }
            router.push(`/compare?github=${lwrGh}&leetcode=${lwrLc}`);
          }}
        >
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CodeIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                required={true}
                placeholder=" LeetCode Username"
                onChange={handleLeetCodeChange}
                className="pl-10"
              />
            </div>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <GithubIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                required={true}
                placeholder=" Github Username"
                ref={githubref}
                defaultValue={
                  profileData?.githubUrl?.split("https://github.com/")[1] ?? ""
                }
                className="pl-10"
              />
              {isLoading && (
                <LoadingIcon className="w-5 h-5 p-1 text-muted-foreground loading-icon self-center" />
              )}
            </div>
            <Button

              type="submit"
              className="w-full active:bg-primary/90 active:translate-y-0.5 "
            >
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
