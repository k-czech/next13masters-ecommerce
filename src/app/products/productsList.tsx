import { getProductsList } from "@/api/products";
import { ProductListItem } from "@/components/molecules/ProductListItem";
import { type ProductItemType } from "@/components/types";

export const ProductsList = async () => {
	const products = await getProductsList();

	return (
		<>
			{products?.map((product) => (
				<ProductListItem key={product?.id} product={product as ProductItemType} />
			))}
		</>
	);
};
