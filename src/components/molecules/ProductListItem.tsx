import { ShoppingCart } from "lucide-react";
import { ProductCoverImage } from "@/components/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { Button } from "@/components/atoms/ui/button";
import { type ProductItemType } from "@/components/types";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li className="rounded-lg bg-white p-4 shadow">
			<article>
				<ProductCoverImage {...product.coverImage} />
				<ProductListItemDescription product={product} />
				<Button variant="default" className="mt-2">
					<ShoppingCart className="mr-2 h-4 w-4" />
					Add to cart
				</Button>
			</article>
		</li>
	);
};
