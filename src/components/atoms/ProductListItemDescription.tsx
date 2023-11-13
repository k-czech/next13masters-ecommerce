import { type ProductsGetListItemFragment } from "@/gql/graphql";
import { formatedAmount } from "@/utils";

type ProductListItemDescriptionProps = {
	product: ProductsGetListItemFragment;
};

export const ProductListItemDescription = ({ product }: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-4">
			<h3 className="text-lg font-semibold text-gray-700">{product?.name}</h3>
			<p className="text-sm text-gray-500">{formatedAmount(Number(product?.price) / 100)}</p>
		</div>
	);
};
