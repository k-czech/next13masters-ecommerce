import {
	GetProductBySlugDocument,
	ProductGetByIdDocument,
	ProductsGetListDocument,
	type ProductsGetListItemFragment,
	type TypedDocumentString,
} from "@/gql/graphql";

type GraphQLResponse<T> =
	| { data?: undefined; errors: { message: string }[] }
	| { data: T; errors?: undefined };

export const executeQuery = async <TResult, TVariables>({
	query,
	variables,
	cache,
	next,
	headers,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	cache?: RequestCache;
	headers?: HeadersInit;
	next?: NextFetchRequestConfig | undefined;
} & (TVariables extends { [key: string]: never }
	? { variables?: never }
	: { variables: TVariables })): Promise<TResult> => {
	if (!process.env.NEXT_PUBLIC_SPACE_ID && !process.env.NEXT_PUBLIC_ACCESS_TOKEN) {
		throw new Error("NEXT_PUBLIC_SPACE_ID and NEXT_PUBLIC_ACCESS_TOKEN must be set");
	}
	const res = await fetch(
		`https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_SPACE_ID}/master`,
		{
			method: "POST",
			body: JSON.stringify({
				query,
				variables,
			}),
			cache,
			next,
			headers: {
				...headers,
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
	const grapqlResponse = await executeQuery({
		query: ProductsGetListDocument,
		variables: undefined,
	});

	if (!grapqlResponse.products) return;
	return grapqlResponse.products;
};

export const getProductById = async (id: ProductsGetListItemFragment["id"]) => {
	const grapqlResponse = await executeQuery({
		query: ProductGetByIdDocument,
		variables: {
			id,
		},
	});

	return grapqlResponse.product;
};

export const getProductBySlug = async (slug: ProductsGetListItemFragment["slug"]) => {
	const grapqlResponse = await executeQuery({
		query: GetProductBySlugDocument,
		variables: {
			slug,
		},
	});

	return grapqlResponse.products[0];
};
