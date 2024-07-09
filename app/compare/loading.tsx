"use client"
import { LoadingIcon } from "@/components/ui/icons"
export default function Loading(){
    return (
        <div className="flex justify-center items-center min-h-screen">
            <LoadingIcon className="w-20 h-20 p-1 text-muted-foreground loading-icon"/>
        </div>
    )
}