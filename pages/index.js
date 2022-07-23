import { leagueID } from '@/utils/chugLeague';
import { supabase } from '@/utils/supabaseClient';
import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';

export default function Home({ owners, posts }) {
	return (
		<>
			<div className="grid md:grid-cols-[1fr_300px] lg:grid-cols-[250px_1fr_300px] grid-rows-none auto-rows-min gap-4">
				<aside className="lg:flex flex-col gap-4 hidden">
					<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							Quick Links
						</h2>
						<div className="flex flex-col py-3">
							{owners.map((owner) => (
								<Link key={owner.id} href={`/owners/${owner.id}`}>
									<a className="flex items-center gap-2 text-sm pl-4 py-2">
										<Image
											src={`/logo-${owner.slug}.webp`}
											alt={`${owner.team} Logo`}
											width={20}
											height={20}
										/>
										{owner.team}
									</a>
								</Link>
							))}
						</div>
					</div>
					<div className="bg-white dark:bg-dark-surface rounded-md shadow-md h-100">
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							League Links
						</h2>
						<div className="flex flex-col py-3">
							{[
								{
									name: 'Sleeper',
									slug: 'sleeper.webp',
									url: `https://sleeper.app/leagues/${leagueID}/`,
									height: 20,
									width: 20,
								},
								{
									name: 'YouTube',
									slug: 'youtube.png',
									url: 'https://www.youtube.com/channel/UCWm1RcveOIjaq4pxaw1QuwQ',
									height: 14,
									width: 20,
								},
								{
									name: 'Twitch',
									slug: 'twitch.png',
									url: 'https://www.twitch.tv/asmcdynasty',
									height: 20,
									width: 20,
								},
								{
									name: 'Twitter',
									slug: 'twitter.png',
									url: 'https://twitter.com/asmcdynasty',
									height: 20,
									width: 20,
								},
							].map((link) => (
								<a
									key={link.slug}
									className="flex items-center gap-2 text-sm pl-4 py-2"
									target="_blank"
									rel="noopener noreferrer"
									href={link.url}
								>
									<Image
										src={`/${link.slug}`}
										alt={`${link.name} Logo`}
										width={link.width}
										height={link.height}
										className="rounded-md"
									/>
									{link.name}
								</a>
							))}
						</div>
					</div>
				</aside>
				<section className="flex flex-col gap-4">
					<div className="bg-white dark:bg-dark-surface rounded-md shadow-md p-4">
						<article className="flex flex-1">
							<Image
								src={`/${posts[0].frontmatter.socialImage}`}
								alt={'Article Logo'}
								width={900}
								height={500}
								objectFit="cover"
								className="rounded-md"
							/>
						</article>
					</div>
				</section>
				<aside className="flex flex-col gap-4">
					<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							Headlines
						</h2>
						<div className="flex flex-col gap-2 p-4 text-sm">
							<h3>Headline 1</h3>
							<h3>Headline 2</h3>
							<h3>Headline 3</h3>
							<h3>Headline 4</h3>
						</div>
					</div>
				</aside>
			</div>
		</>
	);
}

export async function getStaticProps() {
	try {
		const { data: owners } = await supabase
			.from('owners')
			.select('id, slug, team')
			.lte('id', 12)
			.order('id', { ascending: true });

		const files = fs.readdirSync('posts');
		const rawPosts = files.map((fileName) => {
			const slug = fileName.replace('.md', '');
			const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
			const { data: frontmatter } = matter(readFile);

			return {
				slug,
				frontmatter,
			};
		});

		const posts = rawPosts.sort((a, b) => {
			return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
		});

		console.log(posts);

		return {
			props: {
				owners,
				posts,
			},
		};
	} catch (err) {
		console.error(err);
	}
}
