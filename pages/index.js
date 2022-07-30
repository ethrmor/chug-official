import { leagueID, year, currentWeek } from '@/utils/chugLeague';
import { supabase } from '@/utils/supabaseClient';
import React from 'react';
import { useTable, useFlexLayout } from 'react-table';
import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import { Tab } from '@headlessui/react';

const weeks = [
	{ week: 0, name: 'Preseason' },
	{ week: 1, name: 'Week 1' },
	{ week: 2, name: 'Week 2' },
	{ week: 3, name: 'Week 3' },
	{ week: 4, name: 'Week 4' },
	{ week: 5, name: 'Week 5' },
	{ week: 6, name: 'Week 6' },
	{ week: 7, name: 'Week 7' },
	{ week: 8, name: 'Week 8' },
	{ week: 9, name: 'Week 9' },
	{ week: 10, name: 'Week 10' },
	{ week: 11, name: 'Week 11' },
	{ week: 12, name: 'Week 12' },
	{ week: 13, name: 'Week 13' },
	{ week: 14, name: 'Week 14' },
	{ week: 15, name: 'Wildcard' },
	{ week: 16, name: 'Semis' },
	{ week: 17, name: 'Chug Cup' },
	{ week: 18, name: 'Pro Bowl' },
];

function getWeekArray(week) {
	if (week === 1) {
		return [week, week + 1];
	}

	if (week > 1 && week < 18) {
		return [week - 1, week, week + 1];
	}

	if (week === 18) {
		return [week - 1, week];
	}
}

function Table({ columns, data }) {
	const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
		useTable(
			{
				columns,
				data,
				initialState: { pageIndex: 0, pageSize: 12 },
			},
			useFlexLayout
		);

	// Render the UI for your table
	return (
		<>
			<div className="wrapper overflow-x-auto p-2">
				<table
					className="min-w-full text-sm divide-y divide-light-line dark:divide-dark-line"
					{...getTableProps()}
				>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column, index) => (
									<th
										key={index}
										className="flex items-center justify-center  text-xs font-normal text-light-text-2 dark:text-dark-text-2"
										{...column.getHeaderProps()}
									>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row, i) => {
							prepareRow(row);
							return (
								<tr
									key={i}
									className="py-1 border-b last:border-0 dark:border-dark-line text-sm hover:bg-light-hover dark:hover:bg-dark-hover"
									{...row.getRowProps()}
								>
									{row.cells.map((cell, index) => {
										return (
											<td key={index} {...cell.getCellProps()}>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default function Home({ owners, posts, standings, players, schedule }) {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Team',
				accessor: 'owner_id.team',
				width: 180,
				Cell: (e) => (
					<>
						<Link href={`/owners/${e.row?.original?.owner_id.id}`}>
							<a className="pl-2">{e.row?.original?.owner_id.team}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Wins',
				accessor: 'regular_season_wins',
				width: 60,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Losses',
				accessor: 'regular_season_losses',
				width: 60,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Ties',
				accessor: 'regular_season_ties',
				width: 40,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Pct.',
				accessor: 'regular_season_pct',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">
							{e.value.toFixed(3).toString().slice(1)}
						</p>
					</>
				),
			},
			{
				Header: 'Points',
				columns: [
					{
						Header: 'For',
						accessor: 'regular_season_points_for',
						width: 100,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Against',
						accessor: 'regular_season_points_against',
						width: 100,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
				],
			},
		],
		[]
	);
	const data = React.useMemo(() => standings, [standings]);

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
									<a className="flex items-center gap-2 text-sm pl-4 py-2 hover:underline">
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
									className="flex items-center gap-2 text-sm pl-4 py-2 hover:underline"
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
				<section className="flex flex-col gap-4 wrapper overflow-x-auto">
					<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							Top Stories
						</h2>
						<div className="flex flex-col p-4 gap-4">
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
												<h2 className="text-md">
													{posts[3].frontmatter.title}
												</h2>
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
												<h2 className="text-md">
													{posts[4].frontmatter.title}
												</h2>
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
												<h2 className="text-md">
													{posts[5].frontmatter.title}
												</h2>
												<p className="text-light-text-2 text-xs">
													{posts[5].frontmatter.desc}
												</p>
											</div>
										</article>
									</a>
								</Link>
							</div>
						</div>
					</div>
					<div className="bg-white dark:bg-dark-surface rounded-md mb-2 shadow-md">
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							Standings
						</h2>
						<div className="flex flex-col text-sm">
							<div>
								<Table columns={columns} data={data} />
							</div>
						</div>
					</div>
				</section>
				<aside className="flex flex-col gap-4">
					<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							Latest Headlines
						</h2>
						<div className="flex flex-col gap-4 p-4 text-sm">
							{[0, 1, 2, 3, 4, 5, 6].map((title) => (
								<Link href={`/news/${posts[title].slug}`} key={title}>
									<a className="cursor-pointer hover:underline">
										{posts[title].frontmatter.title}
									</a>
								</Link>
							))}
						</div>
					</div>
					<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							Schedule
						</h2>
						<div className="flex flex-col gap-4 pb-2 text-sm">
							<Tab.Group defaultIndex={currentWeek === 1 ? 0 : 1}>
								<Tab.List className="text-sm border-b border-[#e5e5e5] dark:border-[#444444]">
									{getWeekArray(currentWeek).map((tab, index) => (
										<Tab
											key={index}
											className={({ selected }) =>
												selected
													? `border-b-2 border-red-600 py-2 px-4 outline-none ${
															currentWeek - 1 === 0 || currentWeek === 18
																? 'w-1/2'
																: 'w-1/3'
													  }`
													: `text-black/50 dark:text-white/50 py-2 px-4 ${
															currentWeek - 1 === 0 || currentWeek === 18
																? 'w-1/2'
																: 'w-1/3'
													  }`
											}
										>
											{weeks[tab].name}
										</Tab>
									))}
								</Tab.List>
								<Tab.Panels className="">
									{getWeekArray(currentWeek).map((tab, index) => (
										<Tab.Panel key={index}>
											<div className="bg-white dark:bg-dark-surface px-4">
												{schedule
													.filter((week) => week.week === tab)
													.map((game, i) => (
														<div key={i}>
															<Link href={`/schedule/${game.id}`}>
																<a>
																	<div className="py-2">
																		<div
																			className={`flex justify-between pb-1 tabular-nums ${
																				game.owner_points > game.opponent_points
																					? 'font-bold'
																					: ''
																			}`}
																		>
																			<div className="flex gap-2">
																				<Image
																					src={`/logo-${game.owner_id.slug}.webp`}
																					alt={game.owner_id.name}
																					width={20}
																					height={20}
																				/>
																				<Link
																					href={`/owners/${game.owner_id.id}`}
																				>
																					<a className="hover:underline">
																						<p>{game.owner_id.team}</p>
																					</a>
																				</Link>
																			</div>
																			<p>{game.owner_points.toFixed(2)}</p>
																		</div>
																		<div
																			className={`flex justify-between pb-1 tabular-nums ${
																				game.owner_points < game.opponent_points
																					? 'font-bold'
																					: ''
																			}`}
																		>
																			<div className="flex gap-2">
																				<Image
																					src={`/logo-${game.opponent_id.slug}.webp`}
																					alt={game.opponent_id.name}
																					width={20}
																					height={20}
																				/>
																				<Link
																					href={`/owners/${game.opponent_id.id}`}
																				>
																					<a className="hover:underline">
																						<p>{game.opponent_id.team}</p>
																					</a>
																				</Link>
																			</div>
																			<p>{game.opponent_points.toFixed(2)}</p>
																		</div>
																	</div>
																</a>
															</Link>
														</div>
													))}
											</div>
										</Tab.Panel>
									))}
								</Tab.Panels>
							</Tab.Group>
						</div>
					</div>
					<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							League Leaders
						</h2>
						<div className="flex flex-col gap-4 p-4 pb-2 text-sm">
							{players.map((player) => (
								<div
									className="flex gap-4 items-center border-b last:border-0 border-light-line dark:border-dark-line pb-2"
									key={player.player_id}
								>
									<div className="relative h-16 w-16 bg-white dark:bg-dark-surface rounded-full border-2 border-light-line dark:border-dark-line">
										{player.player_id ? (
											<Image
												src={`https://sleepercdn.com/content/nfl/players/${player.player_id}.jpg`}
												alt={player.full_name}
												layout="fill"
												objectFit="cover"
												className="rounded-full"
											></Image>
										) : (
											<Image
												src={`https://sleepercdn.com/images/v2/icons/player_default.webp`}
												alt={player.full_name}
												layout="fill"
												objectFit="cover"
												className="rounded-full"
											></Image>
										)}
									</div>
									<div className="flex flex-col">
										<div>
											<Link href={`/players/${player.player_id}`}>
												<a className="hover:underline">
													<h4 className="text-base">{player.player_name}</h4>
												</a>
											</Link>
											<p className="text-xs text-light-text-2 dark:text-dark-text-2">
												<Link href={`/owners/${player.owner}`}>
													<a className="hover:underline">{player.team}</a>
												</Link>{' '}
												<span>&bull; {player.position}</span>
											</p>
										</div>
										<p className="text-xl">
											{player.fpg} <span className="text-xs">PPG</span>
										</p>
									</div>
								</div>
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

		const { data: standings } = await supabase
			.from('owners_seasons')
			.select('*, owner_id (*)')
			.eq('year', year)
			.order('regular_season_wins', { ascending: false })
			.order('regular_season_points_for', { ascending: false });

		const { data: schedule } = await supabase
			.from('game_box_score')
			.select(
				'id, week, owner_id (*), owner_points, opponent_id (*), opponent_points'
			)
			.eq('year', year)
			.or(
				`week.eq.${currentWeek},week.eq.${currentWeek + 1},week.eq.${
					currentWeek - 1
				}`
			);

		const { data: playersArray } = await supabase
			.from('players_seasons_season')
			.select('player_id, player_name, position, fpg')
			.match({ year: year, rank_ppg_year: 1 });

		const rosterRes = await fetch(
			`https://api.sleeper.app/v1/league/${leagueID}/rosters/`
		);
		const rosters = await rosterRes.json();

		const [quarterbacks] = playersArray.filter(
			(player) => player.position === 'QB'
		);
		const [runningbacks] = playersArray.filter(
			(player) => player.position === 'RB'
		);
		const [widereceivers] = playersArray.filter(
			(player) => player.position === 'WR'
		);
		const [tightends] = playersArray.filter(
			(player) => player.position === 'TE'
		);
		const [defensiveliners] = playersArray.filter(
			(player) => player.position === 'DL'
		);
		const [linebackers] = playersArray.filter(
			(player) => player.position === 'LB'
		);
		const [defensivebackers] = playersArray.filter(
			(player) => player.position === 'DB'
		);

		const qb = rosters.find((team) =>
			team?.players?.includes(quarterbacks?.player_id?.toString())
		);
		const rb = rosters.find((team) =>
			team?.players?.includes(runningbacks?.player_id?.toString())
		);
		const wr = rosters.find((team) =>
			team?.players?.includes(widereceivers?.player_id?.toString())
		);
		const te = rosters.find((team) =>
			team?.players?.includes(tightends?.player_id?.toString())
		);
		const dl = rosters.find((team) =>
			team?.players?.includes(defensiveliners?.player_id?.toString())
		);
		const lb = rosters.find((team) =>
			team?.players?.includes(linebackers?.player_id?.toString())
		);
		const db = rosters.find((team) =>
			team?.players?.includes(defensivebackers?.player_id?.toString())
		);

		const qb_id = qb?.roster_id - 1 || 100;
		const rb_id = rb?.roster_id - 1 || 100;
		const wr_id = wr?.roster_id - 1 || 100;
		const te_id = te?.roster_id - 1 || 100;
		const dl_id = dl?.roster_id - 1 || 100;
		const lb_id = lb?.roster_id - 1 || 100;
		const db_id = db?.roster_id - 1 || 100;

		const players = [
			{
				...quarterbacks,
				team: owners[qb_id]?.team || null,
				owner: owners[qb_id]?.id || null,
			},
			{
				...runningbacks,
				team: owners[rb_id]?.team || null,
				owner: owners[rb_id]?.id || null,
			},
			{
				...widereceivers,
				team: owners[wr_id]?.team || null,
				owner: owners[wr_id]?.id || null,
			},
			{
				...tightends,
				team: owners[te_id]?.team || null,
				owner: owners[te_id]?.id || null,
			},
			{
				...defensiveliners,
				team: owners[dl_id]?.team || null,
				owner: owners[dl_id]?.id || null,
			},
			{
				...linebackers,
				team: owners[lb_id]?.team || null,
				owner: owners[lb_id]?.id || null,
			},
			{
				...defensivebackers,
				team: owners[db_id]?.team || null,
				owner: owners[db_id]?.id || null,
			},
		];

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
				standings,
				players,
				schedule,
			},
		};
	} catch (err) {
		console.error(err);
	}
}
