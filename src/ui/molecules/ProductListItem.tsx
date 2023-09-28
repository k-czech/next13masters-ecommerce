import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { Button } from "@/components/ui/button";
import { type ProductItemType } from "@/ui/types";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li className="rounded-lg bg-white p-4 shadow">
			<article>
				<Link href={`/product/${product.id}`}>
					<ProductCoverImage src={product.image} alt={product.title} />
					<ProductListItemDescription product={product} />
				</Link>
				<Button variant="default" className="mt-2">
					<ShoppingCart className="mr-2 h-4 w-4" />
					Add to cart
				</Button>
			</article>
		</li>
	);
};
