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
					<div className="bg-white dark:bg-dark-surface rounded-md shadow-md p-4 flex flex-col gap-4">
						<div className="flex flex-col gap-4">
							<Link href={`/news/${posts[0].slug}`}>
								<a className="group cursor-pointer text-white rounded-md hover:shadow-md">
									<article className="grid grid-cols-1 rounded-md">
										<div className="relative">
											<Image
												src={`/${posts[0].frontmatter.thumbnailImage}`}
												alt={'Article Logo'}
												width={900}
												height={500}
												objectFit="cover"
												className="rounded-md group-hover:scale-105 transition group:duraction-300"
											/>
											<div className="absolute top-1/2 left-0 right-0 bottom-0 bg-gradient-to-t from-black to-transparent rounded-md">
												<div className="absolute bottom-0 pb-4 pl-4">
													<h2 className="text-md sm:text-lg lg:text-2xl group-hover:underline">
														{posts[0].frontmatter.title}
													</h2>
													<p className="text-light-text-2 hidden sm:block sm:text-sm">
														{posts[0].frontmatter.desc}
													</p>
												</div>
											</div>
										</div>
									</article>
								</a>
							</Link>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="border dark:border-dark-line rounded-md hover:shadow-md">
								<Link href={`/news/${posts[1].slug}`}>
									<a className="cursor-pointer">
										<article className="grid grid-cols-1 rounded-t-md">
											<div className="relative">
												<Image
													src={`/${posts[1].frontmatter.thumbnailImage}`}
													alt={'Article Logo'}
													width={900}
													height={500}
													objectFit="cover"
													className="rounded-t-md"
												/>

												<div className="p-4">
													<h2 className="text-md pb-1">
														{posts[1].frontmatter.title}
													</h2>
													<p className="text-light-text-2 hidden sm:block sm:text-sm">
														{posts[1].frontmatter.desc}
													</p>
												</div>
											</div>
										</article>
									</a>
								</Link>
							</div>
							<div className="border dark:border-dark-line rounded-md hover:shadow-md">
								<Link href={`/news/${posts[2].slug}`}>
									<a className="cursor-pointer">
										<article className="grid grid-cols-1 rounded-t-md">
											<div className="relative">
												<Image
													src={`/${posts[2].frontmatter.thumbnailImage}`}
													alt={'Article Logo'}
													width={900}
													height={500}
													objectFit="cover"
													className="rounded-t-md"
												/>

												<div className="p-4">
													<h2 className="text-md pb-1">
														{posts[2].frontmatter.title}
													</h2>
													<p className="text-light-text-2 hidden sm:block sm:text-sm">
														{posts[2].frontmatter.desc}
													</p>
												</div>
											</div>
										</article>
									</a>
								</Link>
							</div>
						</div>
						<div className="hidden sm:block border dark:border-dark-line rounded-md hover:shadow-md">
							<Link href={`/news/${posts[3].slug}`}>
								<a className="cursor-pointer">
									<article className="grid grid-cols-3 rounded-l-md">
										<div className="relative">
											<Image
												src={`/${posts[3].frontmatter.thumbnailImage}`}
												alt={'Article Logo'}
												width={900}
												height={500}
												objectFit="cover"
												layout="responsive"
												className="rounded-l-md"
											/>
										</div>
										<div className="col-span-2 p-4">
											<h2 className="text-md">{posts[3].frontmatter.title}</h2>
											<p className="text-light-text-2 text-xs">
												{posts[3].frontmatter.desc}
											</p>
										</div>
									</article>
								</a>
							</Link>
						</div>
						<div className="hidden sm:block border dark:border-dark-line rounded-md hover:shadow-md">
							<Link href={`/news/${posts[4].slug}`}>
								<a className="cursor-pointer">
									<article className="grid grid-cols-3 rounded-l-md">
										<div className="relative">
											<Image
												src={`/${posts[4].frontmatter.thumbnailImage}`}
												alt={'Article Logo'}
												width={900}
												height={500}
												objectFit="cover"
												layout="responsive"
												className="rounded-l-md"
											/>
										</div>
										<div className="col-span-2 p-4">
											<h2 className="text-md">{posts[4].frontmatter.title}</h2>
											<p className="text-light-text-2 text-xs">
												{posts[4].frontmatter.desc}
											</p>
										</div>
									</article>
								</a>
							</Link>
						</div>
						<div className="hidden sm:block border dark:border-dark-line rounded-md hover:shadow-md">
							<Link href={`/news/${posts[5].slug}`}>
								<a className="cursor-pointer">
									<article className="grid grid-cols-3 rounded-l-md">
										<div className="relative">
											<Image
												src={`/${posts[5].frontmatter.thumbnailImage}`}
												alt={'Article Logo'}
												width={900}
												height={500}
												objectFit="cover"
												layout="responsive"
												className="rounded-l-md"
											/>
										</div>
										<div className="col-span-2 p-4">
											<h2 className="text-md">{posts[5].frontmatter.title}</h2>
											<p className="text-light-text-2 text-xs">
												{posts[5].frontmatter.desc}
											</p>
										</div>
									</article>
								</a>
							</Link>
						</div>
					</div>
					<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							Latest Headlines
						</h2>
						<div className="flex flex-col gap-4 p-4 text-sm">
							<p>Test</p>
						</div>
					</div>
				</section>
				<aside className="flex flex-col gap-4">
					<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							Latest Headlines
						</h2>
						<div className="flex flex-col gap-4 p-4 text-sm">
							{[1, 2, 3, 4, 5, 6, 7].map((title) => (
								<Link href={`/news/${posts[title].slug}`} key={title}>
									<a className="cursor-pointer hover:underline">
										{posts[title].frontmatter.title}
									</a>
								</Link>
							))}
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
