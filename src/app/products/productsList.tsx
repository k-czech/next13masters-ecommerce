import { ProductListItem } from "@/components/molecules/ProductListItem";
import { type ProductItemType } from "@/components/types";
import { sleep } from "@/utils";

export const ProductsList = async ({ page }: { page: number }) => {
	const take = 10;
	const offest = 10 * (page - 1);
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${take}&offset=${offest}`,
	);
	const products = (await res.json()) as ProductItemType[];
	await sleep(5000 * Math.random());

	return (
		<>
			{products.map((product) => (
				<ProductListItem key={product.id} product={product} />
			))}
		</>
	);
};
