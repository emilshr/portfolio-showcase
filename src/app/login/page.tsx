"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  return (
    <>
      <Button
        onClick={async (event) => {
          event.stopPropagation();
          signIn("github", { callbackUrl: "/dashboard" });
        }}
      >
        Login
      </Button>
      <br />
      <Button
        onClick={async (event) => {
          event.stopPropagation();
          signOut();
        }}
      >
        Sign out
      </Button>
    </>
  );
}
