import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
	overwrite: true,
	ignoreNoDocuments: true,
	schema: [
		{
			"https://graphql.contentful.com/content/v1/spaces/oyv61jwh6fda/environments/master": {
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
				},
			},
		},
	],
	documents: "src/graphql/*.graphql",
	generates: {
		"src/gql/": {
			preset: "client",
			plugins: [],
			presetConfig: {
				fragmentMasking: false,
			},
			config: {
				useTypeImports: true,
				enumsAsTypes: true,
				defaultScalarType: "unknown",
				skipTypename: true,
				documentMode: "string",
			},
		},
	},
};

export default config;
