import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
	return (
		<>
			<div className="grid grid-cols-[250px_1fr_300px] gap-4">
				<aside className="bg-white dark:bg-[#333333] rounded-md shadow-md">
					<h2>Quick Links</h2>
					{[
						'Home',
						'Schedule',
						'Standings',
						'Rosters',
						'Players',
						'Teams',
						'About',
					].map((link, i) => (
						<a key={i} href={`/${link.toLowerCase()}`} className="block p-2">
							{link}
						</a>
					))}
				</aside>
				<section className="bg-white dark:bg-[#333333] rounded-md shadow-md">
					<h2>Featured</h2>
				</section>
				<aside className="bg-white dark:bg-[#333333] rounded-md shadow-md">
					<h2>Latest News</h2>
				</aside>
			</div>
		</>
	);
}
