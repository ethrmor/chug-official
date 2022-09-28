import { currentWeek } from '@/utils/chugLeague';
import { supabase } from '@/utils/supabaseClient';
import Head from 'next/head';

export default function PowerRankings({ results }) {
	return (
		<>
			<Head>
				<title>Power Rankings | Chug League</title>
				<meta property="og:title" content={`Bible | Chug League`} key="title" />
			</Head>
			<h1 className="text-2xl mt-2 mb-4">
				Week {currentWeek} - Power Rankings
			</h1>
			<div className="">
				<div className="flex">
					<div className="grid grid-cols-[50px_1fr_70px_70px] sm:grid-cols-[100px_1fr_120px_120px_120px] justify-items-center items-center w-full pr-3 md:px-6 text-xs">
						<p>Rank</p>
						<h2 className="justify-self-start">Franchise</h2>
						<p>Record</p>
						<p className="hidden sm:block">Last Week</p>
						<p>APR</p>
					</div>
					<span className="block ml-5 h-5 w-5"></span>
				</div>
				{results.length > 0 ? (
					results.map((team, index) => (
						<details
							key={index}
							className="bg-white dark:bg-dark-surface rounded-md shadow-md py-3 pr-3 md:p-6 my-2 group"
						>
							<summary className="flex items-center justify-between cursor-pointer">
								<div className="grid grid-cols-[50px_1fr_70px_70px] sm:grid-cols-[100px_1fr_120px_120px_120px] items-center justify-items-center w-full">
									<p>{team.rank}</p>
									<h2 className="justify-self-start">{team.name}</h2>
									<p>{team.record}</p>
									<p className="hidden sm:block">{team.lastWeek}</p>
									<p>{team.apr.toFixed(2)}</p>
								</div>

								<span className="relative flex-shrink-0 ml-5 w-5 h-5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>

									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</span>
							</summary>

							<p className="mt-4 text-sm leading-relaxed pl-6 sm:pl-10 pr-3">
								{team.blurb}
							</p>
						</details>
					))
				) : (
					<p className="p-6">Rankings Coming Soon...</p>
				)}
			</div>
		</>
	);
}

export async function getStaticProps() {
	try {
		const { data: results } = await supabase
			.from('power_rankings')
			.select('*')
			.order('rank', { ascending: true });

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
