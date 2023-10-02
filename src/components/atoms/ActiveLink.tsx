"use client";
import clsx from "clsx";
import { type Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ActiveLink = ({ href, children }: { href: Route; children: React.ReactNode }) => {
	const pathname = usePathname();
	const isActive = pathname === href;
	return (
		<Link
			href={href}
			className={clsx(`text-blue-400 transition-colors first-letter:hover:text-blue-600`, {
				underline: isActive,
			})}
		>
			{children}
		</Link>
	);
};
