import Image from 'next/image';
import Link from 'next/link';

export default function OwnerCard({ id }) {
	return (
		<>
			<Link href={`/owners/${id.id}`}>
				<a>
					<div className="flex flex-col items-center bg-white dark:bg-dark-surface w-full p-4 py-8 rounded-md shadow-md hover:shadow-xl dark:hover:bg-[#2f2f2f]">
						<div className="relative h-36 w-36">
							<Image
								src={`/logo-${id.slug}.webp`}
								alt={id.name}
								layout="fill"
								objectFit="cover"
								className="z-0"
							></Image>
						</div>
						<div className="text-center">
							<h3 className="text-2xl pt-8 py-4">{id.team}</h3>
							<h5 className="text-lg">{id.name}</h5>
						</div>
					</div>
				</a>
			</Link>
		</>
	);
}
