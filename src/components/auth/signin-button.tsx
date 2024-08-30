'use client';

import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export function SignIn() {
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signIn("credentials", { redirect: false });
    if (!result?.error) {
      router.push("/dashboard");
    }
  };

  return (
    <button onClick={handleSignIn} type="button">Sign in</button>
  );
}