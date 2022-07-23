import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import Image from 'next/image';

export default function NewsPost({ frontmatter, content }) {
	return (
		<article className="prose dark:prose-invert bg-white dark:bg-dark-surface p-4 rounded-md shadow-md mx-auto">
			<h1 className="mb-0">{frontmatter.title}</h1>
			<p className="mt-4 mb-0 text-xs">
				{new Date(frontmatter.date).toDateString()}
			</p>
			<div className="flex items-center mt-4 mb-4">
				<div className="h-5 w-5">
					<Image
						src={`/logo-${frontmatter.authorImage}.webp`}
						width={50}
						height={50}
						alt={frontmatter.author}
					/>
				</div>
				<p className="m-0 p-0 ml-2">{frontmatter.author}</p>
			</div>
			{frontmatter.socialImage && (
				<Image
					width={900}
					height={600}
					src={`/${frontmatter.socialImage}`}
					alt={frontmatter.title}
				/>
			)}
			<div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
		</article>
	);
}

export async function getStaticPaths() {
	const files = fs.readdirSync('posts');
	const paths = files.map((fileName) => ({
		params: {
			slug: fileName.replace('.md', ''),
		},
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const files = fs.readdirSync('posts');
	const posts = files.map((fileName) => {
		const slug = fileName.replace('.md', '');
		const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
		const { data: frontmatter } = matter(readFile);

		return {
			slug,
			frontmatter,
		};
	});

	const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
	const { data: frontmatter, content } = matter(fileName);
	return {
		props: {
			frontmatter,
			content,
			posts,
		},
	};
}
