import { ProductList } from "@/components/organisms/ProductList";
import { type ProductItemType } from "@/components/types";

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

export default function Home() {
	return <ProductList products={productsData} />;
}
