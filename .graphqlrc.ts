import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
	overwrite: true,
	ignoreNoDocuments: true,
	schema: [
		{
			"https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clpawdb4a47vl01t7gbsyfiou/master": {
				headers: {
					"Content-Type": "application/json",
					// Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
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
