export default function Bible({ results }) {
	return (
		<>
			<h1 className="text-2xl mt-2 mb-4">League Bible</h1>
			<div className="md:grid md:grid-cols-[275px_1fr] md:gap-4 lg:8">
				<nav className="md:block hidden sticky top-20 self-start bg-white dark:bg-[#333333] rounded-md shadow-md p-4">
					<ul>
						{results.map((article) => (
							<li key={article.id} className="py-1 hover:underline">
								<a href={`#${article.id}`}>
									{article.id}. {article.article}
								</a>
							</li>
						))}
					</ul>
				</nav>
				<div className="bg-white dark:bg-[#333333] rounded-md shadow-md p-4 md:px-12 pt-12">
					{results.map((rule) => (
						<section
							key={rule.id}
							id={`${rule.id}`}
							className="pb-6 scroll-mt-20"
						>
							<h2 className="text-2xl font-bold text-center">
								Article {rule.id} - {rule.article}
							</h2>
							{rule.sections.map((section) => (
								<div key={section.id}>
									<h3 className="py-2">
										<span className="font-bold mr-2">
											Section {section.id}.
										</span>
										{section.detail}
									</h3>
									<ul className="py-2">
										{section?.subSections?.map((subSection) => (
											<li key={subSection.id} className="pl-10">
												<span className="font-bold mr-2">
													Section {subSection.id}.{' '}
												</span>
												<span>
													{subSection.detail.team ? (
														<span>
															{subSection.detail.team} {' - '}{' '}
															{subSection.detail.owner}
														</span>
													) : (
														subSection.detail
													)}
												</span>
												<ul className="py-2">
													{subSection?.subSubSections?.map((subSubSection) => (
														<li key={subSubSection.id} className="pl-10">
															<span className="font-bold mr-2">
																Section {subSubSection.id}
															</span>{' '}
															- {subSubSection.detail}
														</li>
													))}
												</ul>
											</li>
										))}
									</ul>
								</div>
							))}
						</section>
					))}
				</div>
			</div>
		</>
	);
}

export async function getStaticProps() {
	try {
		const res = await fetch('https://ethanrmorris.github.io/v1/bible.json');
		const results = await res.json();

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
