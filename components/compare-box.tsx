"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CopyIcon} from "./ui/icons"
import Link from "next/link"
import { ClipboardItem } from "clipboard-polyfill"
import { TwitterLogoIcon } from "@radix-ui/react-icons"


export function CompareBox(
  props: {
    txt :string
    src : string;
    github:string;
    leetCode:string;
  },
) {
  const queryParams = new URLSearchParams({
    url: `https://codeflex.pages.dev/compare?leetcode=${props.leetCode}&github=${props.github}`,
  })
  const [success, setSuccess] = useState(false)
  return (
    <Card className="bg-card max-w-2xl p-4">
    <img
          src={props.src}
          width={300}
          height={200}
          key={props.src}
          alt="Placeholder"
          className="aspect-[2/1] w-[100vw] object-cover sm:h-[270px] md:w-[516px]"
          loading="lazy"
        />

      <p className="mt-4 text-sm">{props.txt}</p>
      
      <Separator className="my-4" />
      
      <div className="flex items-center justify-between mt-4">
        <Button variant="outline" onClick={async ()=>{
          const data = await fetch(props.src);
          console.log(data);
          const response = await data.blob();
          if (!response) {
            return;
          }
          const item = new ClipboardItem({ "image/png": response });
          await navigator.clipboard.write([item]);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        }}>
          <CopyIcon className="w-4 h-4 mr-2" />
          {success ? "Copied!" : "Copy Image"}
        </Button>
        <Link
          href={"https://twitter.com/intent/tweet?" + queryParams.toString()}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <TwitterLogoIcon className="mr-2 h-4 w-4" />
          Tweet
        </Link>
      </div>
    </Card>

  )
}



