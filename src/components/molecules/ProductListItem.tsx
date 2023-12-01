import Link from "next/link";
import { AddToCartButton } from "../atoms/AddToCartButton";
import { ProductCoverImage } from "@/components/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { type ProductsGetListItemFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductsGetListItemFragment;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<article className="col-span-4 ">
			<Link href={`/product/${product.id}`}>
				<ProductCoverImage src={String(product.images[0]?.url)} alt={String(product.name)} />
				<ProductListItemDescription product={product} />
			</Link>
			<AddToCartButton />
		</article>
	);
};
