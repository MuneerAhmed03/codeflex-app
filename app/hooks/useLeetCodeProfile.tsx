import { useEffect, useState } from "react";
import axios from "axios";

interface MatchedUser {
  githubUrl: string | null;
}

interface GraphQLResponse {
  data: {
    matchedUser: MatchedUser;
  };
}

// const fetchLeetCodeProfile = async (username: string) => {
//   const query = `
//       query {
//         matchedUser(username: "${username}") {
//           githubUrl
//         }
//       }
//     `;
//   const requestData = { query };
//   const response = await axios.post<GraphQLResponse>(
//     "https://leetcode.com/graphql",
//     requestData
//   );
//   return response
// };
const fetchLeetCodeProfile = async (username: string): Promise<GraphQLResponse> => {
    const response = await fetch(`/api/hello?username=${encodeURIComponent(username)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode profile ') }
    return response.json();
  };

export const useLeetCodeProfile =(username:string) =>{
    const [profileData, setProfileData] = useState<MatchedUser | null>(null);
    const [error,setError] = useState<string |null>(null);
    const [isLoading,setIsLoading] = useState(false);
    
    useEffect(()=>{
        if(!username){
            return;
        }
        const fetchData = async()=>{
            setIsLoading(true);
            try{
            const response = await fetchLeetCodeProfile(username);
            setProfileData(response.data.matchedUser);
            } catch(err){
                setError('Failed');
            } finally{
                setIsLoading(false);
            }
        }
        fetchData();
    },[username]);
    return {profileData,error,isLoading};
}