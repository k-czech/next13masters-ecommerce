import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IncrementProductQuantity } from "./IncrementProductQuantity";
import { executeQuery } from "@/api/products";
import { CartGetByIdDocument } from "@/gql/graphql";
import { formatedAmount } from "@/utils";

const CartPage = async () => {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		redirect("/");
	}

	const { order: cart } = await executeQuery({
		query: CartGetByIdDocument,
		variables: {
			id: cartId,
		},
		next: { tags: ["cart"] },
	});

	if (!cart) {
		redirect("/");
	}

	return (
		<div>
			<h1>Order #{cart.id} summary</h1>
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map((item) => {
						if (!item.product) {
							return null;
						}
						return (
							<tr key={item.product.id}>
								<td>{item.product.name}</td>
								<td className="text-center">
									<IncrementProductQuantity itemId={item.product.id} quantity={item.quantity} />
								</td>
								<td>{formatedAmount(item.product.price)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default CartPage;
