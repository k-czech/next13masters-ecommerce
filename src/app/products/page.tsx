import { ProductList } from "@/ui/organisms/ProductList";
import { type ProductItemType } from "@/ui/types";

const productsData: ProductItemType[] = [
	{
		id: 1,
		name: "Nike Air Max",
		price: 12999,
		coverImage: {
			alt: "Nike Air Max",
			src: "https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg",
		},
	},
	{
		id: 2,
		name: "Nike React Infinity Run",
		price: 14999,
		coverImage: {
			alt: "Nike React Infinity Run",
			src: "https://tailwindui.com/img/ecommerce-images/home-page-02-product-02.jpg",
		},
	},
	{
		id: 3,
		name: "Nike Zoom Pegasus Turbo",
		price: 11999,
		coverImage: {
			alt: "Nike Zoom Pegasus Turbo",
			src: "https://tailwindui.com/img/ecommerce-images/home-page-02-product-03.jpg",
		},
	},
	{
		id: 4,
		name: "Nike Free RN 5.0",
		price: 9999,
		coverImage: {
			alt: "Nike Zoom Pegasus Turbo",
			src: "https://tailwindui.com/img/ecommerce-images/home-page-02-product-04.jpg",
		},
	},
];

const ProductsPage = () => {
	return (
		<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
			<ProductList products={productsData} />
		</section>
	);
};

export default ProductsPage;
