import { type Metadata } from "next";
import SingleProductPage from "./SingleProductPage";
import { getProductById, getProductsList } from "@/api/products";

export async function generateStaticParams() {
	const products = await getProductsList();

	return products?.map((product) => ({
		productId: product.id,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const product = await getProductById(params.productId);
	return {
		title: product?.name,
		description: product?.description,
	};
}

export default async function ProductDetailsPage({ params }: { params: { productId: string } }) {
	return <SingleProductPage params={params} />;
}
