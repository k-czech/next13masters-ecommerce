import { ShoppingCart } from "lucide-react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { executeQuery, getProductBySlug } from "@/api/products";
import { ProductCoverImage } from "@/components/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { Button } from "@/components/ui/button";
import { CartGetByIdDocument, ProductGetByIdDocument } from "@/gql/graphql";

export default async function SingleProductPage({ params }: { params: { slug: string } }) {
	const product = await getProductBySlug(params.slug);

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
				<Button
					type="submit"
					variant="default"
					className="mt-2 rounded-md border bg-slate-700 px-8 py-3 text-white"
				>
					<ShoppingCart className="mr-2 h-4 w-4" />
					Add to cart
				</Button>
			</form>
		</article>
	);
}
const getOrCreateCart = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { pageProductCollection: cart } = await executeQuery(CartGetByIdDocument, {
			id: cartId,
		});
		if (cart) {
			return cart;
		}
	}

	const { createOrder: newCart } = await executeQuery(CartCreateDocument);
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id);
	return newCart;
};

const addProductToCart = async (cartId: string, productId: string) => {
	const { product } = await executeQuery(ProductGetByIdDocument, {
		id: productId,
	});

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	await executeQuery(CartAddItemDocument, {
		cartId,
		productId,
		total: product.price,
	});
};
