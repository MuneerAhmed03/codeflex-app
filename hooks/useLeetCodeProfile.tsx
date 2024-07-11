import { useEffect, useState } from "react";
import { MatchedUser, GraphQLResponse } from "../actions/types";
import axios from "axios";

const fetchLeetCodeProfile = async (username: string): Promise<GraphQLResponse> => {
  try {
    const response = await axios.get(`/api/github-username?username=${encodeURIComponent(username)}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Failed to fetch LeetCode profile');
    } else {
      throw error; // An error that isn't from Axios
    }
  }
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
            setProfileData(response.data?.matchedUser??null);
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
