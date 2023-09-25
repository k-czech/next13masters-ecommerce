import { type ProductItemType } from "@/components/types";
import { formatedAmount } from "@/utils";

type ProductListItemDescriptionProps = {
	product: ProductItemType;
};

export const ProductListItemDescription = ({
	product: { name, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-4">
			<h3 className="text-lg font-semibold text-gray-700">{name}</h3>
			<p className="text-sm text-gray-500">{formatedAmount(price / 100)}</p>
		</div>
	);
};
