import { type ProductItemType } from "@/components/types";

type GraphQLResponse<T> =
	| { data?: undefined; errors: { message: string }[] }
	| { data: T; errors?: undefined };

type ProductGraphqlItemType = {
	slug: string;
	name: string;
	description: string;
	price: number;
	featuredProductImage: {
		title: string;
		url: string;
	};
};

type ProductsGraphqlResponse = {
	pageProductCollection: {
		items: ProductGraphqlItemType[];
	};
};

export const getProductsList = async (): Promise<ProductItemType[]> => {
	const res = await fetch(
		`https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master`,
		{
			method: "POST",
			body: JSON.stringify({
				query: /* GraphQL */ `
					query GetProductsList {
						pageProductCollection {
							items {
								slug
								name
								description
								price
								featuredProductImage {
									title
									url
								}
							}
						}
					}
				`,
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
			},
		},
	);
	const grapqlResponse = (await res.json()) as GraphQLResponse<ProductsGraphqlResponse>;

	if (grapqlResponse.errors) {
		throw TypeError(grapqlResponse.errors[0].message);
	}

	return grapqlResponse.data.pageProductCollection.items.map((p) => {
		return {
			id: p.slug,
			title: p.name,
			price: p.price,
			description: p.description,
			category: "",
			rating: {
				rate: 5,
				count: 1,
			},
			image: p.featuredProductImage.url,
			longDescription: p.description,
		};
	});
};
