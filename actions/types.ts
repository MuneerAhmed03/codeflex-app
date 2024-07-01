export interface MatchedUser {
  githubUrl?: string | null;
}

interface ACSubmissionNum {
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  count: number;
}

export interface submitStats {
  data: {
    matchedUser: {
      submitStats: {
        acSubmissionNum: ACSubmissionNum[];
      };
    };
  };
  errors?: Array<{ message: string }>;
}
export interface GraphQLResponse {
  data?: {
    matchedUser?: MatchedUser;
  };
  errors?: Array<{ message: string }>;
}
