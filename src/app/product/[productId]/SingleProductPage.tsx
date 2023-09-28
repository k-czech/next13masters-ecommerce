import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type ProductItemType } from "@/ui/types";

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${params.productId}`);
	const product = (await res.json()) as ProductItemType;
	return (
		<article className="max-w-md">
			<ProductCoverImage src={product.image} alt={product.title} />
			<ProductListItemDescription product={product} />
			<Button variant="default" className="mt-2">
				<ShoppingCart className="mr-2 h-4 w-4" />
				Add to cart
			</Button>
		</article>
	);
}
