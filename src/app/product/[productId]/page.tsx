import { type Metadata } from "next";
import SingleProductPage from "./SingleProductPage";

export async function generateStaticParams() {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
	const products = (await res.json()) as { id: string; title: string }[];
	return products.map((product) => ({
		productId: product.id,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${params.productId}`);
	const product = (await res.json()) as { title: string; description: string };
	return {
		title: product.title,
		description: product.description,
	};
}

export default async function ProductDetailsPage({ params }: { params: { productId: string } }) {
	return <SingleProductPage params={params} />;
}
