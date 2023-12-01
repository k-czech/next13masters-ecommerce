import Link from "next/link";

export default function Page1() {
	return (
		<div className="flex flex-col">
			Strona 1
			<Link href="/2" className="transition-colors hover:text-blue-400">
				Przejdź na stronę 2
			</Link>
		</div>
	);
}
