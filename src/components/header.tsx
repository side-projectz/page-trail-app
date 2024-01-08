import { getServerSession } from "next-auth";
import { MainNav } from "./main-nav";
import UserAvatar from "./user-nav";
import { IUser } from "@/lib/interface";
import { ModeToggle } from "./theme-toggle";


export default async function Header() {

  const session = await getServerSession();

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2">

        <div className="text-3xl font-bold  md:text-2xl md:font-medium">
          PageTrail
        </div>

        {/* <MainNav /> */}

        <div className="flex space-x-2">
          <ModeToggle/>
          {
            session ? (
              <UserAvatar user={session?.user as IUser} />
            ) : (<a
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              Log in
            </a>)
          }
        </div>


      </header>
    </>
  )

}