"use client";

import { type ReactNode } from "react";

export const ClientComponent = ({ children }: { children: ReactNode }) => {
	return <div>{children}</div>;
};
