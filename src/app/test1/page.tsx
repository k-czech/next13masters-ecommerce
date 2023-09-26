import { ClientComponent } from "@/ui/atoms/ClientComponent";
import { ServerComponent } from "@/ui/atoms/ServerComponent";

const Test1 = () => {
	return (
		<div>
			<h1>test1</h1>
			<ClientComponent>
				<ServerComponent />
			</ClientComponent>
		</div>
	);
};

export default Test1;
