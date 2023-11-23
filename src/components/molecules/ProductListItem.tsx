import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ProductCoverImage } from "@/components/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { Button } from "@/components/ui/button";
import { type ProductsGetListItemFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductsGetListItemFragment;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<article className="col-span-4 ">
			<Link href={`/product/${product.slug}`}>
				<ProductCoverImage src={String(product.images[0]?.url)} alt={String(product.name)} />
				<ProductListItemDescription product={product} />
			</Link>
			<Button variant="default" className="mt-2">
				<ShoppingCart className="mr-2 h-4 w-4" />
				Add to cart
			</Button>
		</article>
	);
};
