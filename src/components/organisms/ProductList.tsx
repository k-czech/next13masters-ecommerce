import { ProductListItem } from "@/components/molecules/ProductListItem";
import { type ProductsGetListItemFragment } from "@/gql/graphql";

export const ProductList = ({ products }: { products: ProductsGetListItemFragment[] }) => {
	return (
		<ul
			className="grid grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
			data-testid="products-list"
		>
			{products.map((product) => (
				<ProductListItem key={product.sys.id} product={product} />
			))}
		</ul>
	);
};
