import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';

export default function News({ posts }) {
	return (
		<div className="flex flex-col">
			<h1 className="text-2xl mt-2 mb-4">News</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{posts.map(({ slug, frontmatter }) => (
					<div
						key={slug}
						className="dark:bg-dark-surface dark:hover:bg-dark-hover hover:shadow-xl rounded-md shadow-md overflow-hidden flex flex-col"
					>
						<Link href={`/news/${slug}`}>
							<a>
								<Image
									width={900}
									height={600}
									alt={frontmatter.title}
									src={`/${frontmatter.thumbnailImage}`}
								/>
								<div className="px-4 pb-4">
									<p className="text-xs opacity-60 pb-2">
										{new Date(frontmatter.date).toDateString()}
									</p>
									<h2 className="">{frontmatter.title}</h2>
								</div>
							</a>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export async function getStaticProps() {
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
			posts,
		},
	};
}
