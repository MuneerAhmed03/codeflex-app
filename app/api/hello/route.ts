import { NextRequest } from "next/server";
import {getRequestContext} from "@cloudflare/next-on-pages"
import { createDB} from "@/db";
import users from "@/db/schema";
export const runtime = "edge"

export async function GET(request:NextRequest){
  try
  {  const DB = getRequestContext().env.DB;
    const drizzle=createDB(DB);
    const   result =  await drizzle.select().from(users);

    return new Response(JSON.stringify(result));
}catch(error){
    console.error('Error fetching users:', error);
    return Response.json({ error: error }, { status: 500 });
}
}    