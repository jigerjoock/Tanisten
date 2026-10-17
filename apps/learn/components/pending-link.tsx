"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

export default function PendingLink({ children, className, href }: { children: ReactNode; className?: string; href: string }) {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);

  useEffect(() => setPending(false), [pathname]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || pathname === href) return;
    setPending(true);
  }

  return <Link href={href} className={`${className ?? ""}${pending ? " is-pending" : ""}`} aria-busy={pending} onClick={handleClick}>
    {children}{pending && <span className="link-spinner" aria-label="Wird geladen" />}
  </Link>;
}
