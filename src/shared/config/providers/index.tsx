"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "./tanstack-query";
import { ToastProvider } from "@/shared/ui";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        <ToastProvider>{children}</ToastProvider>
      </QueryProvider>
    </SessionProvider>
  );
}
