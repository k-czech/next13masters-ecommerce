import SingleProductPage from "./SingleProductPage";

export async function generateStaticParams() {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
	const products = (await res.json()) as { id: string; title: string }[];
	return products.map((product) => ({
		productId: product.id,
	}));
}

export default async function ProductDetailsPage({ params }: { params: { productId: string } }) {
	return <SingleProductPage params={params} />;
}
