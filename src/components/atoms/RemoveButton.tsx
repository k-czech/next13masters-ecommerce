"use client";

import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { removeItem } from "@/app/cart/actions";

export function RemoveButton({ productId }: { productId: string }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	return (
		<button
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					console.log({ productId });

					await removeItem(productId);
					router.refresh();
				})
			}
		>
			<Trash2Icon />
		</button>
	);
}
