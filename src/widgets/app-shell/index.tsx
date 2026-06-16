"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Dumbbell,
  ListChecks,
  Scale,
  CopyPlus,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/shared/ui";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/treinos", label: "Treinos", icon: Dumbbell },
  { href: "/modelos", label: "Modelos", icon: CopyPlus },
  { href: "/habitos", label: "Hábitos", icon: ListChecks },
  { href: "/peso", label: "Peso & IMC", icon: Scale },
  { href: "/perfil", label: "Perfil", icon: User },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({
  children,
  userName,
}: {
  children: ReactNode;
  userName: string;
}) {
  const pathname = usePathname();
  const firstName = userName.split(" ")[0];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-black/5 bg-white px-4 py-6 md:flex">
        <Image src="/images/logo.png" alt="Fhit" width={36} height={36} />

        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-white"
                    : "text-foreground/70 hover:bg-primary/5 hover:text-primary",
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Sair
        </button>
      </aside>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Topbar — mobile */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/5 bg-white px-4 py-3 md:hidden">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Fhit" width={28} height={28} />
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-1.5 text-sm font-medium text-foreground/60"
          >
            <LogOut size={16} /> Sair
          </button>
        </header>

        {/* Topbar — desktop */}
        <header className="hidden items-center justify-between px-8 py-5 md:flex">
          <p className="text-sm text-foreground/60">
            Olá,{" "}
            <span className="font-semibold text-foreground">{firstName}</span>{" "}
            👋
          </p>
        </header>

        <main className="flex-1 px-4 pb-24 pt-4 md:px-8 md:pb-8 md:pt-0">
          {children}
        </main>
      </div>

      {/* Bottom nav — mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-6 border-t border-black/5 bg-white md:hidden">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors",
                active ? "text-primary" : "text-foreground/50",
              )}
            >
              <Icon size={20} />
              {item.label.split(" ")[0]}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
