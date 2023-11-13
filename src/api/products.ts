import {
	ProductGetByIdDocument,
	ProductsGetListDocument,
	type ProductsGetListItemFragment,
	type TypedDocumentString,
} from "@/gql/graphql";

type GraphQLResponse<T> =
	| { data?: undefined; errors: { message: string }[] }
	| { data: T; errors?: undefined };

const executeQuery = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
): Promise<TResult> => {
	if (!process.env.NEXT_PUBLIC_SPACE_ID && !process.env.NEXT_PUBLIC_ACCESS_TOKEN) {
		throw new Error("NEXT_PUBLIC_SPACE_ID and NEXT_PUBLIC_ACCESS_TOKEN must be set");
	}
	const res = await fetch(
		`https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master`,
		{
			method: "POST",
			body: JSON.stringify({
				query,
				variables,
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
			},
		},
	);
	const grapqlResponse = (await res.json()) as GraphQLResponse<TResult>;

	if (grapqlResponse.errors) {
		throw TypeError(`GraphQl Error`, {
			cause: grapqlResponse.errors,
		});
	}

	return grapqlResponse.data;
};

export const getProductsList = async () => {
	const grapqlResponse = await executeQuery(ProductsGetListDocument, {});

	if (!grapqlResponse.pageProductCollection) return;
	return grapqlResponse.pageProductCollection.items;
};

export const getProductById = async (id: ProductsGetListItemFragment["sys"]["id"]) => {
	const grapqlResponse = await executeQuery(ProductGetByIdDocument, {
		id,
	});

	return grapqlResponse.pageProduct;
};
