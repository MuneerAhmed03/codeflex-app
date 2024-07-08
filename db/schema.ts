import { sql } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { unique } from "next/dist/build/utils";

const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  avatar: text("avatar").notNull(),
  github_id: text("github_id").notNull(),
  lc_id: text("lc_id").notNull(),
  lc_github: text("lc_github"),
  totalContributions: integer("totalContributions").notNull().default(0), // Default value
  totalSubmissions: integer("totalSubmissions").notNull().default(0), // Default value
  Verified: integer("Verified").notNull().default(0),
},(table)=>{
    return {
    githubIndex:uniqueIndex("github_id_index").on(table.github_id),
    lcIdIndex: uniqueIndex("lc_id_index").on(table.lc_id),
    }
});
export default users;