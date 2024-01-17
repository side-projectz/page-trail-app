import { getServerSession } from "next-auth";
import UserAvatar from "./user-nav";
import { IUser } from "@/lib/interface";
import { ModeToggle } from "./theme-toggle";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Header() {
  const session = await getServerSession();

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2">
        <div className="text-3xl font-bold  md:text-2xl md:font-medium">
          <Link href="/">
            <span className="font-bold">PageTrail</span>
          </Link>
        </div>

        <div className="flex space-x-2">
          <Button className="hidden md:block" variant={"default"} asChild>
            <Link
              href="https://chrome.google.com/webstore/detail/lalpgpioopjnjbapmmmnjckppogncaog"
              target="_blank"
            >
              <span>Download Chrome Extension</span>
            </Link>
          </Button>

          <ModeToggle />
          {session ? (
            <UserAvatar user={session?.user as IUser} />
          ) : (
            <a
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              Log in
            </a>
          )}
        </div>
      </header>
    </>
  );
}
