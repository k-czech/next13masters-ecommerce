import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { revalidateTag } from "next/cache";
import { executeQuery, getProductById } from "@/api/products";
import { AddToCartButton } from "@/components/atoms/AddToCartButton";
import { ProductCoverImage } from "@/components/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import {
	CartAddProductDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	ProductGetByIdDocument,
	type CartFragment,
} from "@/gql/graphql";

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);

	if (!product) {
		throw notFound();
	}

	const addProductToCartAction = async () => {
		"use server";
		const cart = await getOrCreateCart();
		await addProductToCart(cart.id, product.id);

		revalidateTag("cart");
	};

	return (
		<article className="max-w-md">
			<form action={addProductToCartAction}>
				<input type="hidden" name="productId" value={product.id} />
				<ProductCoverImage src={String(product.images[0]?.url)} alt={String(product.name)} />
				<ProductListItemDescription product={product} />
				<AddToCartButton />
			</form>
		</article>
	);
}
const getOrCreateCart = async (): Promise<CartFragment> => {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeQuery({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			next: { tags: ["cart"] },
		});
		if (cart) {
			return cart;
		}
	}

	const { createOrder: newCart } = await executeQuery({
		query: CartCreateDocument,
		variables: undefined,
	});
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id, {
		httpOnly: true,
		sameSite: "lax",
	});
	return newCart;
};

const addProductToCart = async (orderId: string, productId: string) => {
	const { product } = await executeQuery({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
	});

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeQuery({
		query: CartAddProductDocument,
		variables: {
			orderId,
			productId,
			total: product.price,
		},
	});
};
