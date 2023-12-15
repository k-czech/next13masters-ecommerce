"use server";

import { executeQuery } from "@/api/products";
import { CartRemoveProductDocument, CartSetProductQuantityDocument } from "@/gql/graphql";

export const changeItemQuantity = async (itemId: string, quantity: number) => {
	await executeQuery({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
		cache: "no-store",
	});
};

export const removeItem = async (productId: string) => {
	await executeQuery({
		query: CartRemoveProductDocument,
		variables: {
			productId,
		},
		cache: "no-store",
	});
};
