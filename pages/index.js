import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
	return (
		<>
			<div className="grid grid-cols-[250px_1fr_300px] gap-4">
				<aside className="bg-blue-200">
					<h2>Left Column</h2>
				</aside>
				<section className="bg-blue-400">
					<h3>Center Column</h3>
				</section>
				<aside className="bg-blue-600">
					<h4>Right Column</h4>
				</aside>
			</div>
		</>
	);
}
