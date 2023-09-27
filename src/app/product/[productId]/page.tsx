export default function SingleProductPage({
	params,
	searchParams,
}: {
	params: { productId: string };
	searchParams: { [key: string]: string | string[] };
}) {
	const id = searchParams.id.toString();

	return (
		<div>
			<h1>Single Product Page {params.productId}</h1>
			<span>{id}</span>
		</div>
	);
}
