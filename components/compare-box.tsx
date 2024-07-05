import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CopyIcon} from "./ui/icons"
import Link from "next/link"
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
  console.log(props.src)
  return (
    <Card className="max-w-2xl p-4">
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
        <Button variant="outline">
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



