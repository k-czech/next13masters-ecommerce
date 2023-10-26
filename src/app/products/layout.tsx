// src/app/products/layout.tsx

import { type ReactNode } from "react";

export default async function ProductsLayout({ children }: { children: ReactNode }) {
	return (
		<main className="mx-auto grid w-full grid-cols-12 gap-x-4 gap-y-12 bg-white">{children}</main>
	);
}
