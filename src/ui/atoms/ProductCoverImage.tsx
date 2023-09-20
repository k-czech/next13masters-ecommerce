type ProductCoverImageProps = {
	src: string;
	alt: string;
};

export const ProductCoverImage = ({ src, alt }: ProductCoverImageProps) => (
	<div className="aspect-square overflow-hidden rounded-md border bg-slate-50">
		<img
			width={320}
			height={320}
			src={src}
			alt={alt}
			className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
		/>
	</div>
);
