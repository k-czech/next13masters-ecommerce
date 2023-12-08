"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "./actions";

export function IncrementProductQuantity({
	itemId,
	quantity,
}: {
	itemId: string;
	quantity: number;
}) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	const optimisticIncrement = async () => {
		setOptimisticQuantity(optimisticQuantity + 1);
		await changeItemQuantity(itemId, optimisticQuantity + 1);
	};

	return (
		<form className="flex">
			<span className="w-8 text-center">{optimisticQuantity}</span>
			<button type="submit" className="h-6 w-6 border" formAction={optimisticIncrement}>
				+
			</button>
		</form>
	);
}
