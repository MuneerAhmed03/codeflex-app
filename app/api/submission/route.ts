import type { NextRequest } from "next/server";
import { submitStats } from "@/actions/types";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return new Response("Username is required", {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const query = `
        query { 
            matchedUser(username: "${username}") {
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
    const submissionData: submitStats = await submission.json();
    if (submissionData.errors) {
      return new Response(
        JSON.stringify({ errors: submissionData.errors[0].message }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const totalSub =
      submissionData.data.matchedUser.submitStats.acSubmissionNum.find(
        (entry) => entry.difficulty === "All"
      ) || {};
    return new Response(JSON.stringify(totalSub ), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in LeetCode proxy:", err);
    return new Response(
      JSON.stringify({ error: "Error fetching LeetCode profile" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
