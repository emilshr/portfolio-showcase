"use client";

import { signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  return (
    <>
      <button
        onClick={async (event) => {
          event.stopPropagation();
          signIn("github", { callbackUrl: "/dashboard" });
        }}
      >
        Login
      </button>
      <br />
      <button
        onClick={async (event) => {
          event.stopPropagation();
          signOut();
        }}
      >
        Sign out
      </button>
    </>
  );
}
