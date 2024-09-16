import { signOut } from "@/lib/auth"
import { PowerIcon } from "@heroicons/react/16/solid"

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        console.log("sign out successful")
      }}
    >
      <button type="submit" className="flex h-[48px] w-full grow items-center justify-center gap-3 bg-gray-50 p-2 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  );
}