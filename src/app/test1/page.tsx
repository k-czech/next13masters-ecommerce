import { ClientComponent } from "@/components/atoms/ClientComponent";
import { ServerComponent } from "@/components/atoms/ServerComponent";

export default function Test1() {
	return (
		<div>
			<h1>test1</h1>
			<ClientComponent>
				<ServerComponent />
			</ClientComponent>
		</div>
	);
}
