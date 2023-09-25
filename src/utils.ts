import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const formatedAmount = (amount: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
};

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};
