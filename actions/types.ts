export interface MatchedUser {
  githubUrl?: string | null;
}
export interface GraphQLResponse {
  data?: {
    matchedUser?: MatchedUser;
  };
  errors?: Array<{ message: string }>;
}

interface ACSubmissionNum {
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  count: number;
}

interface SubmitStats {
  acSubmissionNum: ACSubmissionNum[] | null;
}

interface LeetCodeUser {
  githubUrl: string | null;
  submitStats: SubmitStats | null;
}
interface Data {
  matchedUser: LeetCodeUser;
}

export interface LeetcodeResponse {
  data: Data;
  errors?: Array<{ message: string }>;
}

export interface lcData{
  username: string;
  githubUrl: string | null;
  totalSub: number;
}
// export interface submitStats {
//   data: {
//     matchedUser: {
//       submitStats: {
//         acSubmissionNum: ACSubmissionNum[];
//       };
//     };
//   };
//   errors?: Array<{ message: string }>;
// }



export type GithubMetadata = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type UserSchema  ={
  name: string;
  avatar: string;
  github_id: string;
  lc_id: string;
  lc_github: string  |null;
  totalContributions: number;
  totalSubmissions: number;
  Verified: number;
}