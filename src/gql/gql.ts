/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query CartGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductsGetListItem\n  }\n}": types.CartGetByIdDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductsGetListItem\n  }\n}": types.ProductGetByIdDocument,
    "query GetProductBySlug($slug: String!) {\n  products(where: {slug: $slug}) {\n    ...ProductsGetListItem\n  }\n}": types.GetProductBySlugDocument,
    "fragment ProductsGetListItem on Product {\n  id\n  slug\n  name\n  description\n  price\n  images {\n    url\n  }\n}": types.ProductsGetListItemFragmentDoc,
    "query ProductsGetList {\n  products {\n    ...ProductsGetListItem\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductsGetListItem\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductsGetListItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductBySlug($slug: String!) {\n  products(where: {slug: $slug}) {\n    ...ProductsGetListItem\n  }\n}"): typeof import('./graphql').GetProductBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductsGetListItem on Product {\n  id\n  slug\n  name\n  description\n  price\n  images {\n    url\n  }\n}"): typeof import('./graphql').ProductsGetListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products {\n    ...ProductsGetListItem\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
