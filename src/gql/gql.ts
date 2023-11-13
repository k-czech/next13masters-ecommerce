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
    "query ProductGetById($id: String!) {\n  pageProduct(id: $id) {\n    ...ProductsGetListItem\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductsGetListItem on PageProduct {\n  sys {\n    id\n  }\n  slug\n  name\n  description\n  price\n  featuredProductImage {\n    title\n    url\n  }\n}": types.ProductsGetListItemFragmentDoc,
    "query ProductsGetList {\n  pageProductCollection {\n    items {\n      ...ProductsGetListItem\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: String!) {\n  pageProduct(id: $id) {\n    ...ProductsGetListItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductsGetListItem on PageProduct {\n  sys {\n    id\n  }\n  slug\n  name\n  description\n  price\n  featuredProductImage {\n    title\n    url\n  }\n}"): typeof import('./graphql').ProductsGetListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  pageProductCollection {\n    items {\n      ...ProductsGetListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
