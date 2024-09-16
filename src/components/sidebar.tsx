import Image from "next/image";
import Link from "next/link";
import { SignOut } from "./auth/signout-button";
import { auth } from "@/lib/auth";
import { Navlink } from "./navlink";

export default async function Sidebar() {
  const session = await auth();

  return (
    <div className="flex h-full flex-col bg-gray-300 px-3 py-4 md:px-2 border border-solid border-black">
      <div className="mb-5 p-4 flex items-center justify-center">
        <div className="border-black border-solid border rounded-full p-5">
          <Image
            src="/lol/"
            alt="University logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <Navlink href={"/dashboard"}>Dashboard</Navlink>
        <Navlink href={"/dashboard/dosen"}>Dosen</Navlink>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="hidden h-auto w-full grow rounded-md  md:block"></div>
        <SignOut />
      </div>
    </div>
  );
}