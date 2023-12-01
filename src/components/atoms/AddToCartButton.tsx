"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

export const AddToCartButton = () => {
	const formStatus = useFormStatus();

	return (
		<Button
			type="submit"
			variant="default"
			className="mt-3 rounded-md border bg-slate-700 px-8 py-3 text-white disabled:cursor-wait disabled:bg-slate-400"
			disabled={formStatus.pending}
		>
			<ShoppingCart className="mr-2 h-4 w-4" />
			Add to cart
		</Button>
	);
};
