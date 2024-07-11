"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CopyIcon} from "./ui/icons"
import Link from "next/link"
import { ClipboardItem , ClipboardItemInterface } from "clipboard-polyfill"
import { TwitterLogoIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"


const BASE_URL = process.env.NODE_ENV==="production"
  ? process.env.NEXT_PUBLIC_BASE_URL!
  : process.env.NEXT_PUBLIC_LOCAL_URL!;
export function CompareBox(
  props: {
    txt :string
    src : string;
    github:string;
    leetCode:string;
  },
) {
  const queryParams = new URLSearchParams({
    url: `${BASE_URL}/compare?leetcode=${props.leetCode}&github=${props.github}`,
  })
  const [success, setSuccess] = useState(false)
  const handleCopy =() => {
    const imgTag = document.getElementById('og') as HTMLImageElement | null;

    if (imgTag) {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Set the canvas dimensions to match the image
        canvas.width = imgTag.naturalWidth;
        canvas.height = imgTag.naturalHeight;

        // Draw the image onto the canvas
        ctx.drawImage(imgTag, 0, 0);

        // Convert the canvas to a blob
        canvas.toBlob((blob) => {
          if (blob) {

            const item = new ClipboardItem({ 'image/png': blob });

            // Write the clipboard item to the clipboard
            navigator.clipboard.write([item]).then(() => {
              console.log('Image copied to clipboard.');
            }).catch((error) => {
              console.error('Error copying image to clipboard:', error);
            });
          }
        }, 'image/png');
    } else {
      console.log('Image tag with the specified ID was not found.');
    }
  };
  }

  return (
    <Card className="bg-card max-w-2xl p-4">
    <img
      id="og"
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
        <Button id="copy" variant="outline" onClick={handleCopy} >
          <CopyIcon className="w-4 h-4 mr-2" />
          Copy Image
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



