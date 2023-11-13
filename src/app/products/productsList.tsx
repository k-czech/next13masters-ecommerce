import { notFound } from "next/navigation";
import { getProductsList } from "@/api/products";
import { ProductListItem } from "@/components/molecules/ProductListItem";
import { type ProductsGetListItemFragment } from "@/gql/graphql";

export const ProductsList = async () => {
	const products = await getProductsList();

	if (!products) throw notFound();

	return (
		<>
			{products.map((product) => (
				<ProductListItem key={product?.sys.id} product={product as ProductsGetListItemFragment} />
			))}
		</>
	);
};
