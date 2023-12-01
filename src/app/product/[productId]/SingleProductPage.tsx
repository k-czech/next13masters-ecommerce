import { cookies } from "next/headers";
import { notFound } from "next/navigation";
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
		const { order: cart } = await executeQuery(CartGetByIdDocument, {
			id: cartId,
		});
		if (cart) {
			return cart;
		}
	}

	const { createOrder: newCart } = await executeQuery(CartCreateDocument, {});
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id);
	return newCart;
};

const addProductToCart = async (orderId: string, productId: string) => {
	const { product } = await executeQuery(ProductGetByIdDocument, {
		id: productId,
	});

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeQuery(CartAddProductDocument, {
		orderId,
		productId,
		total: product.price,
	});
};
