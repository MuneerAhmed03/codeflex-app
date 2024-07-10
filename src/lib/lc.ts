import { lcData,LeetcodeResponse } from "@/actions/types";

export async function fetchLeetCode(username: string) {
    const query = `
          query { 
              matchedUser(username: "${username}") {
              githubUrl
              submitStats {
                  acSubmissionNum{
                      difficulty
                      count
              }
          }
        }
    }  `;
    const submission = await fetch("https://leetcode.com/graphql", {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const submissionData: LeetcodeResponse = await submission.json();
    if (submissionData.errors) {
      console.log(`Failed to fetch leetcode profile for ${username}`)
      return;
    }
    const totalSub =
      submissionData.data.matchedUser.submitStats?.acSubmissionNum?.find(
        (entry) => entry.difficulty === "All"
      )?.count || null;
    return {
      username,
      githubUrl: submissionData.data.matchedUser.githubUrl,
      totalSub: totalSub,
    } as lcData;
  }
  