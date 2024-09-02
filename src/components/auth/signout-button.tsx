import { signOut } from "@/lib/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <div className="border-black border-solid border p-1 bg-red-500 font-extrabold hover:bg-white">
        <button type="submit">Sign Out</button>
      </div>
    </form>
  )
}