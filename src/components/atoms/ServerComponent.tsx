import "server-only";
import { Counter } from "./Counter";

export const ServerComponent = () => {
	return (
		<div>
			<h1>My website example!</h1>
			<Counter />
		</div>
	);
};
