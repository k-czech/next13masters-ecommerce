import { ShoppingCart } from "lucide-react";
import { notFound } from "next/navigation";
import { getProductById } from "@/api/products";
import { ProductCoverImage } from "@/components/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { Button } from "@/components/ui/button";

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);

	if (!product) {
		throw notFound();
	}

	return (
		<article className="max-w-md">
			<ProductCoverImage
				src={String(product?.featuredProductImage?.url)}
				alt={String(product?.featuredProductImage?.title)}
			/>
			<ProductListItemDescription product={product} />
			<Button variant="default" className="mt-2">
				<ShoppingCart className="mr-2 h-4 w-4" />
				Add to cart
			</Button>
		</article>
	);
}
