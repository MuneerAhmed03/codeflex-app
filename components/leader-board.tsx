"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { UserSchema } from "@/actions/types"
import Link from "next/link";
export function LeaderBoard(props : {
  users : UserSchema[];
    table : string; 
}) {
  return (
    <Card className="bg-card w-full max-w-md mx-auto z-[-1] lg:my-0 my-5">
      <CardHeader>
        <CardTitle>{props.table ==="lc" ? `Top Grinders` : `Top Contributers`}</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-x-hidden overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background bg-opacity-100">
            <TableRow>
              <TableHead className=" w-[50px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right ">{props.table==="lc" ? `Submission` : `Commits`}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.users.map((user, index) => (
              <TableRow key={index.toString()}>
              <TableCell>{index +1}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Link
                      href= {`/compare?github=${user.github_id}&leetcode=${user.lc_id}`}
                      className="ml-2 hover:underline"
                    >
                      {user.name}
                    </Link>
              </TableCell>
              <TableCell className="text-right">{props.table==="lc" ? `${user.totalSubmissions}` : `${user.totalContributions}`}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
