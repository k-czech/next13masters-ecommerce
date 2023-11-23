import { type Metadata } from "next";
import SingleProductPage from "./SingleProductPage";
import { getProductBySlug, getProductsList } from "@/api/products";

export async function generateStaticParams() {
	const products = await getProductsList();

	return products?.map((product) => ({
		productId: product.id,
		slug: product.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: { productId: string; slug: string };
}): Promise<Metadata> {
	const product = await getProductBySlug(params.slug);
	return {
		title: product?.name,
		description: product?.description,
	};
}

export default async function ProductDetailsPage({ params }: { params: { slug: string } }) {
	return <SingleProductPage params={params} />;
}
