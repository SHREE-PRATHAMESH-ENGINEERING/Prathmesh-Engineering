"use client";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
  session?: any;
}

const Providers = ({ children, session }: ProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "17px",
          },
        }}
      />
      {children}
    </SessionProvider>
  );
};

export default Providers;