"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CodeIcon, GithubIcon, LoadingIcon } from "./ui/icons"
import { ChangeEvent, useEffect, useState } from "react";
import { useLeetCodeProfile } from "@/app/hooks/useLeetCodeProfile"
import axios from "axios"

export function Profile() {
  const [leetcodeUrl, setLeetCodeUrl] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string|null>(null);
  const [debouncedUrl, setDebouncedUrl] =
  useState<string>(leetcodeUrl);
  const {profileData,error,isLoading} = useLeetCodeProfile(debouncedUrl);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedUrl(leetcodeUrl);
    }, 500);
    return () => clearTimeout(timeout);
  }, [leetcodeUrl]);

  const handleLeetCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLeetCodeUrl(e.target.value);
  }
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CodeIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input type="text" placeholder=" LeetCode Username" onChange={handleLeetCodeChange} className="pl-10" />
          </div>
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <GithubIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input type="text" placeholder=" Github Username" defaultValue={profileData?.githubUrl?.split("https://github.com/")[1] ?? ""} className="pl-10" />
            {isLoading && (
              <LoadingIcon  className="w-5 h-5 p-1 text-muted-foreground loading-icon self-center"/>
            )}
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

