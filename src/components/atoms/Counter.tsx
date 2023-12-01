"use client";

import { useState } from "react";

export const Counter = () => {
	const [count, setCount] = useState(0);

	return (
		<>
			<button onClick={() => setCount((count) => count - 1)} className="mr-2 border px-3 py-1">
				-
			</button>
			<span>{count}</span>
			<button onClick={() => setCount((count) => count + 1)} className="ml-2 border px-3 py-1">
				+
			</button>
		</>
	);
};
