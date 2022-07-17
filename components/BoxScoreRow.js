import Image from 'next/image';
import Link from 'next/link';

export default function BoxScoreRow({ results, index, fantasyPos }) {
	return (
		<>
			<div className="grid grid-cols-[1fr_3rem_1fr] md:grid-cols-[1fr_6rem_1fr] border-b-2 py-4 items-center">
				{results.team_players[index]?.player_id ? (
					<Link href={`/players/${results.team_players[index]?.player_id}`}>
						<a className="flex justify-between items-center gap-4">
							<div className="flex items-center">
								<div className="relative h-10 w-10 bg-white dark:bg-dark-surface hidden lg:block">
									{results.team_players[index]?.player_id ? (
										<Image
											src={`https://sleepercdn.com/content/nfl/players/${results.team_players[index]?.player_id}.jpg`}
											alt={results.team_players[index]?.player_id}
											layout="fill"
											objectFit="cover"
											className="rounded-full"
										/>
									) : (
										<Image
											src={`https://sleepercdn.com/images/v2/icons/player_default.webp`}
											alt={'Profile Picture'}
											layout="fill"
											objectFit="cover"
											className="rounded-full"
										></Image>
									)}
								</div>
								<div className="lg:ml-4">
									<p>
										{results.team_players[index]?.player_name}
										<span className="text-xs text-light-text-2 dark:text-dark-text-2">
											{'  '}
											{results.team_players[index]?.position}
										</span>
									</p>
									<p className="text-xs text-light-text-2 dark:text-dark-text-2">
										{results.team_players[index]?.pass_yards
											? `${results.team_players[index]?.pass_yards} Pa Yds${
													results.team_players[index]?.pass_td >= 1 ||
													results.team_players[index]?.pass_int >= 1 ||
													results.team_players[index]?.pass_2pt >= 1 ||
													results.team_players[index]?.rush_yards >= 1 ||
													results.team_players[index]?.rush_td >= 1 ||
													results.team_players[index]?.rush_2pt >= 1 ||
													results.team_players[index]?.rec >= 1 ||
													results.team_players[index]?.rec_yards >= 1 ||
													results.team_players[index]?.rec_td >= 1 ||
													results.team_players[index]?.rec_2pt >= 1 ||
													results.team_players[index]?.fum_lost >= 1 ||
													results.team_players[index]?.st_td >= 1 ||
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.pass_td
											? `${results.team_players[index]?.pass_td} Pa TD${
													results.team_players[index]?.pass_int >= 1 ||
													results.team_players[index]?.pass_2pt >= 1 ||
													results.team_players[index]?.rush_yards >= 1 ||
													results.team_players[index]?.rush_td >= 1 ||
													results.team_players[index]?.rush_2pt >= 1 ||
													results.team_players[index]?.rec >= 1 ||
													results.team_players[index]?.rec_yards >= 1 ||
													results.team_players[index]?.rec_td >= 1 ||
													results.team_players[index]?.rec_2pt >= 1 ||
													results.team_players[index]?.fum_lost >= 1 ||
													results.team_players[index]?.st_td >= 1 ||
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.pass_int
											? `${results.team_players[index]?.pass_int} Int${
													results.team_players[index]?.pass_2pt >= 1 ||
													results.team_players[index]?.rush_yards >= 1 ||
													results.team_players[index]?.rush_td >= 1 ||
													results.team_players[index]?.rush_2pt >= 1 ||
													results.team_players[index]?.rec >= 1 ||
													results.team_players[index]?.rec_yards >= 1 ||
													results.team_players[index]?.rec_td >= 1 ||
													results.team_players[index]?.rec_2pt >= 1 ||
													results.team_players[index]?.fum_lost >= 1 ||
													results.team_players[index]?.st_td >= 1 ||
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.pass_2pt
											? `${results.team_players[index]?.pass_int} Pa 2Pt${
													results.team_players[index]?.pass_2pt >= 1 ||
													results.team_players[index]?.rush_yards >= 1 ||
													results.team_players[index]?.rush_td >= 1 ||
													results.team_players[index]?.rush_2pt >= 1 ||
													results.team_players[index]?.rec >= 1 ||
													results.team_players[index]?.rec_yards >= 1 ||
													results.team_players[index]?.rec_td >= 1 ||
													results.team_players[index]?.rec_2pt >= 1 ||
													results.team_players[index]?.fum_lost >= 1 ||
													results.team_players[index]?.st_td >= 1 ||
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.rush_yards
											? `${results.team_players[index]?.rush_yards} Ru Yds${
													results.team_players[index]?.rush_td >= 1 ||
													results.team_players[index]?.rush_2pt >= 1 ||
													results.team_players[index]?.rec >= 1 ||
													results.team_players[index]?.rec_yards >= 1 ||
													results.team_players[index]?.rec_td >= 1 ||
													results.team_players[index]?.rec_2pt >= 1 ||
													results.team_players[index]?.fum_lost >= 1 ||
													results.team_players[index]?.st_td >= 1 ||
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.rush_td
											? `${results.team_players[index]?.rush_td} Ru TD${
													results.team_players[index]?.rush_2pt >= 1 ||
													results.team_players[index]?.rec >= 1 ||
													results.team_players[index]?.rec_yards >= 1 ||
													results.team_players[index]?.rec_td >= 1 ||
													results.team_players[index]?.rec_2pt >= 1 ||
													results.team_players[index]?.fum_lost >= 1 ||
													results.team_players[index]?.st_td >= 1 ||
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.rush_2pt
											? `${results.team_players[index]?.rush_2pt} Ru 2Pt${
													results.team_players[index]?.rec >= 1 ||
													results.team_players[index]?.rec_yards >= 1 ||
													results.team_players[index]?.rec_td >= 1 ||
													results.team_players[index]?.rec_2pt >= 1 ||
													results.team_players[index]?.fum_lost >= 1 ||
													results.team_players[index]?.st_td >= 1 ||
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.rec
											? `${results.team_players[index]?.rec} Rec${
													results.team_players[index]?.rec_yards >= 1 ||
													results.team_players[index]?.rec_td >= 1 ||
													results.team_players[index]?.rec_2pt >= 1 ||
													results.team_players[index]?.fum_lost >= 1 ||
													results.team_players[index]?.st_td >= 1 ||
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.rec_yards
											? `${results.team_players[index]?.rec_yards} Rec Yds${
													results.team_players[index]?.rec_td >= 1 ||
													results.team_players[index]?.rec_2pt >= 1 ||
													results.team_players[index]?.fum_lost >= 1 ||
													results.team_players[index]?.st_td >= 1 ||
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.rec_td
											? `${results.team_players[index]?.rec_td} Rec TD${
													results.team_players[index]?.rec_2pt >= 1 ||
													results.team_players[index]?.fum_lost >= 1 ||
													results.team_players[index]?.st_td >= 1 ||
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.rec_2pt
											? `${results.team_players[index]?.rec_2pt} Rec 2Pt${
													results.team_players[index]?.fum_lost >= 1 ||
													results.team_players[index]?.st_td >= 1 ||
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1 ||
													results.team_players[index]?.idp_tfl >= 1 ||
													results.team_players[index]?.idp_qbhit >= 1 ||
													results.team_players[index]?.idp_sack >= 1 ||
													results.team_players[index]?.idp_pd >= 1 ||
													results.team_players[index]?.idp_int >= 1 ||
													results.team_players[index]?.idp_ff >= 1 ||
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.fum_lost
											? `${results.team_players[index]?.fum_lost} Fum${
													results.team_players[index]?.st_td >= 1 ||
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1 ||
													results.team_players[index]?.idp_tfl >= 1 ||
													results.team_players[index]?.idp_qbhit >= 1 ||
													results.team_players[index]?.idp_sack >= 1 ||
													results.team_players[index]?.idp_pd >= 1 ||
													results.team_players[index]?.idp_int >= 1 ||
													results.team_players[index]?.idp_ff >= 1 ||
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.st_td
											? `${results.team_players[index]?.st_td} ST TD${
													results.team_players[index]?.st_ff >= 1 ||
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1 ||
													results.team_players[index]?.idp_tfl >= 1 ||
													results.team_players[index]?.idp_qbhit >= 1 ||
													results.team_players[index]?.idp_sack >= 1 ||
													results.team_players[index]?.idp_pd >= 1 ||
													results.team_players[index]?.idp_int >= 1 ||
													results.team_players[index]?.idp_ff >= 1 ||
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.st_ff
											? `${results.team_players[index]?.st_ff} ST FF${
													results.team_players[index]?.st_fr >= 1 ||
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1 ||
													results.team_players[index]?.idp_tfl >= 1 ||
													results.team_players[index]?.idp_qbhit >= 1 ||
													results.team_players[index]?.idp_sack >= 1 ||
													results.team_players[index]?.idp_pd >= 1 ||
													results.team_players[index]?.idp_int >= 1 ||
													results.team_players[index]?.idp_ff >= 1 ||
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.st_fr
											? `${results.team_players[index]?.st_fr} ST FR${
													results.team_players[index]?.idp_solo >= 1 ||
													results.team_players[index]?.idp_asst >= 1 ||
													results.team_players[index]?.idp_tfl >= 1 ||
													results.team_players[index]?.idp_qbhit >= 1 ||
													results.team_players[index]?.idp_sack >= 1 ||
													results.team_players[index]?.idp_pd >= 1 ||
													results.team_players[index]?.idp_int >= 1 ||
													results.team_players[index]?.idp_ff >= 1 ||
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.idp_solo
											? `${results.team_players[index]?.idp_solo} Solo${
													results.team_players[index]?.idp_asst >= 1 ||
													results.team_players[index]?.idp_tfl >= 1 ||
													results.team_players[index]?.idp_qbhit >= 1 ||
													results.team_players[index]?.idp_sack >= 1 ||
													results.team_players[index]?.idp_pd >= 1 ||
													results.team_players[index]?.idp_int >= 1 ||
													results.team_players[index]?.idp_ff >= 1 ||
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.idp_asst
											? `${results.team_players[index]?.idp_asst} Asst${
													results.team_players[index]?.idp_tfl >= 1 ||
													results.team_players[index]?.idp_qbhit >= 1 ||
													results.team_players[index]?.idp_sack >= 1 ||
													results.team_players[index]?.idp_pd >= 1 ||
													results.team_players[index]?.idp_int >= 1 ||
													results.team_players[index]?.idp_ff >= 1 ||
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.idp_tfl
											? `${results.team_players[index]?.idp_tfl} TFL${
													results.team_players[index]?.idp_qbhit >= 1 ||
													results.team_players[index]?.idp_sack >= 1 ||
													results.team_players[index]?.idp_pd >= 1 ||
													results.team_players[index]?.idp_int >= 1 ||
													results.team_players[index]?.idp_ff >= 1 ||
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.idp_qbhit
											? `${results.team_players[index]?.idp_qbhit} QB Hits${
													results.team_players[index]?.idp_sack >= 1 ||
													results.team_players[index]?.idp_pd >= 1 ||
													results.team_players[index]?.idp_int >= 1 ||
													results.team_players[index]?.idp_ff >= 1 ||
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.idp_sack
											? `${results.team_players[index]?.idp_sack} Sack${
													results.team_players[index]?.idp_sack > 1 ? 's' : ''
											  }${
													results.team_players[index]?.idp_pd >= 1 ||
													results.team_players[index]?.idp_int >= 1 ||
													results.team_players[index]?.idp_ff >= 1 ||
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.idp_pd
											? `${results.team_players[index]?.idp_pd} PD${
													results.team_players[index]?.idp_int >= 1 ||
													results.team_players[index]?.idp_ff >= 1 ||
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.idp_int
											? `${results.team_players[index]?.idp_int} Int${
													results.team_players[index]?.idp_ff >= 1 ||
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.idp_ff
											? `${results.team_players[index]?.idp_ff} FF${
													results.team_players[index]?.idp_fr >= 1 ||
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.idp_fr
											? `${results.team_players[index]?.idp_fr} FR${
													results.team_players[index]?.idp_saf >= 1 ||
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.idp_saf
											? `${results.team_players[index]?.idp_saf} Safety${
													results.team_players[index]?.idp_td >= 1 ||
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.idp_td
											? `${results.team_players[index]?.idp_td} TD${
													results.team_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.team_players[index]?.idp_blockkick
											? `${results.team_players[index]?.idp_blockkick} Blocked Kick`
											: null}
									</p>
								</div>
							</div>
							<p className="text-right tabular-nums">
								{results.team_players[index]?.fantasy_points.toFixed(2) ||
									'0.00'}
							</p>
						</a>
					</Link>
				) : (
					<div className="flex justify-between items-center gap-4">
						<div className="flex items-center">
							<div className="relative h-10 w-10 bg-white dark:bg-dark-surface hidden lg:block">
								{results.team_players[index]?.player_id ? (
									<Image
										src={`https://sleepercdn.com/content/nfl/players/${results.team_players[index]?.player_id}.jpg`}
										alt={results.team_players[index]?.player_id}
										layout="fill"
										objectFit="cover"
										className="rounded-full"
									/>
								) : (
									<Image
										src={`https://sleepercdn.com/images/v2/icons/player_default.webp`}
										alt={'Profile Picture'}
										layout="fill"
										objectFit="cover"
										className="rounded-full"
									></Image>
								)}
							</div>
							<div className="lg:ml-4">
								<p>
									{results.team_players[index]?.player_name}
									<span className="text-xs text-light-text-2 dark:text-dark-text-2">
										{'  '}
										{results.team_players[index]?.position}
									</span>
								</p>
								<p className="text-xs text-light-text-2 dark:text-dark-text-2">
									{results.team_players[index]?.pass_yards
										? `${results.team_players[index]?.pass_yards} Pa Yds${
												results.team_players[index]?.pass_td >= 1 ||
												results.team_players[index]?.pass_int >= 1 ||
												results.team_players[index]?.pass_2pt >= 1 ||
												results.team_players[index]?.rush_yards >= 1 ||
												results.team_players[index]?.rush_td >= 1 ||
												results.team_players[index]?.rush_2pt >= 1 ||
												results.team_players[index]?.rec >= 1 ||
												results.team_players[index]?.rec_yards >= 1 ||
												results.team_players[index]?.rec_td >= 1 ||
												results.team_players[index]?.rec_2pt >= 1 ||
												results.team_players[index]?.fum_lost >= 1 ||
												results.team_players[index]?.st_td >= 1 ||
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.pass_td
										? `${results.team_players[index]?.pass_td} Pa TD${
												results.team_players[index]?.pass_int >= 1 ||
												results.team_players[index]?.pass_2pt >= 1 ||
												results.team_players[index]?.rush_yards >= 1 ||
												results.team_players[index]?.rush_td >= 1 ||
												results.team_players[index]?.rush_2pt >= 1 ||
												results.team_players[index]?.rec >= 1 ||
												results.team_players[index]?.rec_yards >= 1 ||
												results.team_players[index]?.rec_td >= 1 ||
												results.team_players[index]?.rec_2pt >= 1 ||
												results.team_players[index]?.fum_lost >= 1 ||
												results.team_players[index]?.st_td >= 1 ||
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.pass_int
										? `${results.team_players[index]?.pass_int} Int${
												results.team_players[index]?.pass_2pt >= 1 ||
												results.team_players[index]?.rush_yards >= 1 ||
												results.team_players[index]?.rush_td >= 1 ||
												results.team_players[index]?.rush_2pt >= 1 ||
												results.team_players[index]?.rec >= 1 ||
												results.team_players[index]?.rec_yards >= 1 ||
												results.team_players[index]?.rec_td >= 1 ||
												results.team_players[index]?.rec_2pt >= 1 ||
												results.team_players[index]?.fum_lost >= 1 ||
												results.team_players[index]?.st_td >= 1 ||
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.pass_2pt
										? `${results.team_players[index]?.pass_int} Pa 2Pt${
												results.team_players[index]?.pass_2pt >= 1 ||
												results.team_players[index]?.rush_yards >= 1 ||
												results.team_players[index]?.rush_td >= 1 ||
												results.team_players[index]?.rush_2pt >= 1 ||
												results.team_players[index]?.rec >= 1 ||
												results.team_players[index]?.rec_yards >= 1 ||
												results.team_players[index]?.rec_td >= 1 ||
												results.team_players[index]?.rec_2pt >= 1 ||
												results.team_players[index]?.fum_lost >= 1 ||
												results.team_players[index]?.st_td >= 1 ||
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.rush_yards
										? `${results.team_players[index]?.rush_yards} Ru Yds${
												results.team_players[index]?.rush_td >= 1 ||
												results.team_players[index]?.rush_2pt >= 1 ||
												results.team_players[index]?.rec >= 1 ||
												results.team_players[index]?.rec_yards >= 1 ||
												results.team_players[index]?.rec_td >= 1 ||
												results.team_players[index]?.rec_2pt >= 1 ||
												results.team_players[index]?.fum_lost >= 1 ||
												results.team_players[index]?.st_td >= 1 ||
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.rush_td
										? `${results.team_players[index]?.rush_td} Ru TD${
												results.team_players[index]?.rush_2pt >= 1 ||
												results.team_players[index]?.rec >= 1 ||
												results.team_players[index]?.rec_yards >= 1 ||
												results.team_players[index]?.rec_td >= 1 ||
												results.team_players[index]?.rec_2pt >= 1 ||
												results.team_players[index]?.fum_lost >= 1 ||
												results.team_players[index]?.st_td >= 1 ||
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.rush_2pt
										? `${results.team_players[index]?.rush_2pt} Ru 2Pt${
												results.team_players[index]?.rec >= 1 ||
												results.team_players[index]?.rec_yards >= 1 ||
												results.team_players[index]?.rec_td >= 1 ||
												results.team_players[index]?.rec_2pt >= 1 ||
												results.team_players[index]?.fum_lost >= 1 ||
												results.team_players[index]?.st_td >= 1 ||
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.rec
										? `${results.team_players[index]?.rec} Rec${
												results.team_players[index]?.rec_yards >= 1 ||
												results.team_players[index]?.rec_td >= 1 ||
												results.team_players[index]?.rec_2pt >= 1 ||
												results.team_players[index]?.fum_lost >= 1 ||
												results.team_players[index]?.st_td >= 1 ||
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.rec_yards
										? `${results.team_players[index]?.rec_yards} Rec Yds${
												results.team_players[index]?.rec_td >= 1 ||
												results.team_players[index]?.rec_2pt >= 1 ||
												results.team_players[index]?.fum_lost >= 1 ||
												results.team_players[index]?.st_td >= 1 ||
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.rec_td
										? `${results.team_players[index]?.rec_td} Rec TD${
												results.team_players[index]?.rec_2pt >= 1 ||
												results.team_players[index]?.fum_lost >= 1 ||
												results.team_players[index]?.st_td >= 1 ||
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.rec_2pt
										? `${results.team_players[index]?.rec_2pt} Rec 2Pt${
												results.team_players[index]?.fum_lost >= 1 ||
												results.team_players[index]?.st_td >= 1 ||
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1 ||
												results.team_players[index]?.idp_tfl >= 1 ||
												results.team_players[index]?.idp_qbhit >= 1 ||
												results.team_players[index]?.idp_sack >= 1 ||
												results.team_players[index]?.idp_pd >= 1 ||
												results.team_players[index]?.idp_int >= 1 ||
												results.team_players[index]?.idp_ff >= 1 ||
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.fum_lost
										? `${results.team_players[index]?.fum_lost} Fum${
												results.team_players[index]?.st_td >= 1 ||
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1 ||
												results.team_players[index]?.idp_tfl >= 1 ||
												results.team_players[index]?.idp_qbhit >= 1 ||
												results.team_players[index]?.idp_sack >= 1 ||
												results.team_players[index]?.idp_pd >= 1 ||
												results.team_players[index]?.idp_int >= 1 ||
												results.team_players[index]?.idp_ff >= 1 ||
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.st_td
										? `${results.team_players[index]?.st_td} ST TD${
												results.team_players[index]?.st_ff >= 1 ||
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1 ||
												results.team_players[index]?.idp_tfl >= 1 ||
												results.team_players[index]?.idp_qbhit >= 1 ||
												results.team_players[index]?.idp_sack >= 1 ||
												results.team_players[index]?.idp_pd >= 1 ||
												results.team_players[index]?.idp_int >= 1 ||
												results.team_players[index]?.idp_ff >= 1 ||
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.st_ff
										? `${results.team_players[index]?.st_ff} ST FF${
												results.team_players[index]?.st_fr >= 1 ||
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1 ||
												results.team_players[index]?.idp_tfl >= 1 ||
												results.team_players[index]?.idp_qbhit >= 1 ||
												results.team_players[index]?.idp_sack >= 1 ||
												results.team_players[index]?.idp_pd >= 1 ||
												results.team_players[index]?.idp_int >= 1 ||
												results.team_players[index]?.idp_ff >= 1 ||
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.st_fr
										? `${results.team_players[index]?.st_fr} ST FR${
												results.team_players[index]?.idp_solo >= 1 ||
												results.team_players[index]?.idp_asst >= 1 ||
												results.team_players[index]?.idp_tfl >= 1 ||
												results.team_players[index]?.idp_qbhit >= 1 ||
												results.team_players[index]?.idp_sack >= 1 ||
												results.team_players[index]?.idp_pd >= 1 ||
												results.team_players[index]?.idp_int >= 1 ||
												results.team_players[index]?.idp_ff >= 1 ||
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.idp_solo
										? `${results.team_players[index]?.idp_solo} Solo${
												results.team_players[index]?.idp_asst >= 1 ||
												results.team_players[index]?.idp_tfl >= 1 ||
												results.team_players[index]?.idp_qbhit >= 1 ||
												results.team_players[index]?.idp_sack >= 1 ||
												results.team_players[index]?.idp_pd >= 1 ||
												results.team_players[index]?.idp_int >= 1 ||
												results.team_players[index]?.idp_ff >= 1 ||
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.idp_asst
										? `${results.team_players[index]?.idp_asst} Asst${
												results.team_players[index]?.idp_tfl >= 1 ||
												results.team_players[index]?.idp_qbhit >= 1 ||
												results.team_players[index]?.idp_sack >= 1 ||
												results.team_players[index]?.idp_pd >= 1 ||
												results.team_players[index]?.idp_int >= 1 ||
												results.team_players[index]?.idp_ff >= 1 ||
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.idp_tfl
										? `${results.team_players[index]?.idp_tfl} TFL${
												results.team_players[index]?.idp_qbhit >= 1 ||
												results.team_players[index]?.idp_sack >= 1 ||
												results.team_players[index]?.idp_pd >= 1 ||
												results.team_players[index]?.idp_int >= 1 ||
												results.team_players[index]?.idp_ff >= 1 ||
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.idp_qbhit
										? `${results.team_players[index]?.idp_qbhit} QB Hits${
												results.team_players[index]?.idp_sack >= 1 ||
												results.team_players[index]?.idp_pd >= 1 ||
												results.team_players[index]?.idp_int >= 1 ||
												results.team_players[index]?.idp_ff >= 1 ||
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.idp_sack
										? `${results.team_players[index]?.idp_sack} Sack${
												results.team_players[index]?.idp_sack > 1 ? 's' : ''
										  }${
												results.team_players[index]?.idp_pd >= 1 ||
												results.team_players[index]?.idp_int >= 1 ||
												results.team_players[index]?.idp_ff >= 1 ||
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.idp_pd
										? `${results.team_players[index]?.idp_pd} PD${
												results.team_players[index]?.idp_int >= 1 ||
												results.team_players[index]?.idp_ff >= 1 ||
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.idp_int
										? `${results.team_players[index]?.idp_int} Int${
												results.team_players[index]?.idp_ff >= 1 ||
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.idp_ff
										? `${results.team_players[index]?.idp_ff} FF${
												results.team_players[index]?.idp_fr >= 1 ||
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.idp_fr
										? `${results.team_players[index]?.idp_fr} FR${
												results.team_players[index]?.idp_saf >= 1 ||
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.idp_saf
										? `${results.team_players[index]?.idp_saf} Safety${
												results.team_players[index]?.idp_td >= 1 ||
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.idp_td
										? `${results.team_players[index]?.idp_td} TD${
												results.team_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.team_players[index]?.idp_blockkick
										? `${results.team_players[index]?.idp_blockkick} Blocked Kick`
										: null}
								</p>
							</div>
						</div>
						<p className="text-right tabular-nums">
							{results.team_players[index]?.fantasy_points.toFixed(2) || '0.00'}
						</p>
					</div>
				)}
				<p className="text-center lg:text-md lg:font-bold">{fantasyPos}</p>
				{results.opponent_players[index]?.player_id ? (
					<Link href={`/players/${results.opponent_players[index]?.player_id}`}>
						<a className="flex justify-between items-center gap-4">
							<p className="text-right tabular-nums">
								{results.opponent_players[index]?.fantasy_points.toFixed(2) ||
									'0.00'}
							</p>
							<div className="flex items-center">
								<div className="lg:mr-4">
									<p className="text-right">
										<span className="text-xs text-light-text-2 dark:text-dark-text-2">
											{results.opponent_players[index]?.position}
											{'  '}
										</span>
										{results.opponent_players[index]?.player_name}
									</p>
									<p className="text-xs text-light-text-2 dark:text-dark-text-2 text-right">
										{results.opponent_players[index]?.pass_yards
											? `${results.opponent_players[index]?.pass_yards} Pa Yds${
													results.opponent_players[index]?.pass_td >= 1 ||
													results.opponent_players[index]?.pass_int >= 1 ||
													results.opponent_players[index]?.pass_2pt >= 1 ||
													results.opponent_players[index]?.rush_yards >= 1 ||
													results.opponent_players[index]?.rush_td >= 1 ||
													results.opponent_players[index]?.rush_2pt >= 1 ||
													results.opponent_players[index]?.rec >= 1 ||
													results.opponent_players[index]?.rec_yards >= 1 ||
													results.opponent_players[index]?.rec_td >= 1 ||
													results.opponent_players[index]?.rec_2pt >= 1 ||
													results.opponent_players[index]?.fum_lost >= 1 ||
													results.opponent_players[index]?.st_td >= 1 ||
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.pass_td
											? `${results.opponent_players[index]?.pass_td} Pa TD${
													results.opponent_players[index]?.pass_int >= 1 ||
													results.opponent_players[index]?.pass_2pt >= 1 ||
													results.opponent_players[index]?.rush_yards >= 1 ||
													results.opponent_players[index]?.rush_td >= 1 ||
													results.opponent_players[index]?.rush_2pt >= 1 ||
													results.opponent_players[index]?.rec >= 1 ||
													results.opponent_players[index]?.rec_yards >= 1 ||
													results.opponent_players[index]?.rec_td >= 1 ||
													results.opponent_players[index]?.rec_2pt >= 1 ||
													results.opponent_players[index]?.fum_lost >= 1 ||
													results.opponent_players[index]?.st_td >= 1 ||
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.pass_int
											? `${results.opponent_players[index]?.pass_int} Int${
													results.opponent_players[index]?.pass_2pt >= 1 ||
													results.opponent_players[index]?.rush_yards >= 1 ||
													results.opponent_players[index]?.rush_td >= 1 ||
													results.opponent_players[index]?.rush_2pt >= 1 ||
													results.opponent_players[index]?.rec >= 1 ||
													results.opponent_players[index]?.rec_yards >= 1 ||
													results.opponent_players[index]?.rec_td >= 1 ||
													results.opponent_players[index]?.rec_2pt >= 1 ||
													results.opponent_players[index]?.fum_lost >= 1 ||
													results.opponent_players[index]?.st_td >= 1 ||
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.pass_2pt
											? `${results.opponent_players[index]?.pass_int} Pa 2Pt${
													results.opponent_players[index]?.pass_2pt >= 1 ||
													results.opponent_players[index]?.rush_yards >= 1 ||
													results.opponent_players[index]?.rush_td >= 1 ||
													results.opponent_players[index]?.rush_2pt >= 1 ||
													results.opponent_players[index]?.rec >= 1 ||
													results.opponent_players[index]?.rec_yards >= 1 ||
													results.opponent_players[index]?.rec_td >= 1 ||
													results.opponent_players[index]?.rec_2pt >= 1 ||
													results.opponent_players[index]?.fum_lost >= 1 ||
													results.opponent_players[index]?.st_td >= 1 ||
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.rush_yards
											? `${results.opponent_players[index]?.rush_yards} Ru Yds${
													results.opponent_players[index]?.rush_td >= 1 ||
													results.opponent_players[index]?.rush_2pt >= 1 ||
													results.opponent_players[index]?.rec >= 1 ||
													results.opponent_players[index]?.rec_yards >= 1 ||
													results.opponent_players[index]?.rec_td >= 1 ||
													results.opponent_players[index]?.rec_2pt >= 1 ||
													results.opponent_players[index]?.fum_lost >= 1 ||
													results.opponent_players[index]?.st_td >= 1 ||
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.rush_td
											? `${results.opponent_players[index]?.rush_td} Ru TD${
													results.opponent_players[index]?.rush_2pt >= 1 ||
													results.opponent_players[index]?.rec >= 1 ||
													results.opponent_players[index]?.rec_yards >= 1 ||
													results.opponent_players[index]?.rec_td >= 1 ||
													results.opponent_players[index]?.rec_2pt >= 1 ||
													results.opponent_players[index]?.fum_lost >= 1 ||
													results.opponent_players[index]?.st_td >= 1 ||
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.rush_2pt
											? `${results.opponent_players[index]?.rush_2pt} Ru 2Pt${
													results.opponent_players[index]?.rec >= 1 ||
													results.opponent_players[index]?.rec_yards >= 1 ||
													results.opponent_players[index]?.rec_td >= 1 ||
													results.opponent_players[index]?.rec_2pt >= 1 ||
													results.opponent_players[index]?.fum_lost >= 1 ||
													results.opponent_players[index]?.st_td >= 1 ||
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.rec
											? `${results.opponent_players[index]?.rec} Rec${
													results.opponent_players[index]?.rec_yards >= 1 ||
													results.opponent_players[index]?.rec_td >= 1 ||
													results.opponent_players[index]?.rec_2pt >= 1 ||
													results.opponent_players[index]?.fum_lost >= 1 ||
													results.opponent_players[index]?.st_td >= 1 ||
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.rec_yards
											? `${results.opponent_players[index]?.rec_yards} Rec Yds${
													results.opponent_players[index]?.rec_td >= 1 ||
													results.opponent_players[index]?.rec_2pt >= 1 ||
													results.opponent_players[index]?.fum_lost >= 1 ||
													results.opponent_players[index]?.st_td >= 1 ||
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.rec_td
											? `${results.opponent_players[index]?.rec_td} Rec TD${
													results.opponent_players[index]?.rec_2pt >= 1 ||
													results.opponent_players[index]?.fum_lost >= 1 ||
													results.opponent_players[index]?.st_td >= 1 ||
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.rec_2pt
											? `${results.opponent_players[index]?.rec_2pt} Rec 2Pt${
													results.opponent_players[index]?.fum_lost >= 1 ||
													results.opponent_players[index]?.st_td >= 1 ||
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1 ||
													results.opponent_players[index]?.idp_tfl >= 1 ||
													results.opponent_players[index]?.idp_qbhit >= 1 ||
													results.opponent_players[index]?.idp_sack >= 1 ||
													results.opponent_players[index]?.idp_pd >= 1 ||
													results.opponent_players[index]?.idp_int >= 1 ||
													results.opponent_players[index]?.idp_ff >= 1 ||
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.fum_lost
											? `${results.opponent_players[index]?.fum_lost} Fum${
													results.opponent_players[index]?.st_td >= 1 ||
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1 ||
													results.opponent_players[index]?.idp_tfl >= 1 ||
													results.opponent_players[index]?.idp_qbhit >= 1 ||
													results.opponent_players[index]?.idp_sack >= 1 ||
													results.opponent_players[index]?.idp_pd >= 1 ||
													results.opponent_players[index]?.idp_int >= 1 ||
													results.opponent_players[index]?.idp_ff >= 1 ||
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.st_td
											? `${results.opponent_players[index]?.st_td} ST TD${
													results.opponent_players[index]?.st_ff >= 1 ||
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1 ||
													results.opponent_players[index]?.idp_tfl >= 1 ||
													results.opponent_players[index]?.idp_qbhit >= 1 ||
													results.opponent_players[index]?.idp_sack >= 1 ||
													results.opponent_players[index]?.idp_pd >= 1 ||
													results.opponent_players[index]?.idp_int >= 1 ||
													results.opponent_players[index]?.idp_ff >= 1 ||
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.st_ff
											? `${results.opponent_players[index]?.st_ff} ST FF${
													results.opponent_players[index]?.st_fr >= 1 ||
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1 ||
													results.opponent_players[index]?.idp_tfl >= 1 ||
													results.opponent_players[index]?.idp_qbhit >= 1 ||
													results.opponent_players[index]?.idp_sack >= 1 ||
													results.opponent_players[index]?.idp_pd >= 1 ||
													results.opponent_players[index]?.idp_int >= 1 ||
													results.opponent_players[index]?.idp_ff >= 1 ||
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.st_fr
											? `${results.opponent_players[index]?.st_fr} ST FR${
													results.opponent_players[index]?.idp_solo >= 1 ||
													results.opponent_players[index]?.idp_asst >= 1 ||
													results.opponent_players[index]?.idp_tfl >= 1 ||
													results.opponent_players[index]?.idp_qbhit >= 1 ||
													results.opponent_players[index]?.idp_sack >= 1 ||
													results.opponent_players[index]?.idp_pd >= 1 ||
													results.opponent_players[index]?.idp_int >= 1 ||
													results.opponent_players[index]?.idp_ff >= 1 ||
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.idp_solo
											? `${results.opponent_players[index]?.idp_solo} Solo${
													results.opponent_players[index]?.idp_asst >= 1 ||
													results.opponent_players[index]?.idp_tfl >= 1 ||
													results.opponent_players[index]?.idp_qbhit >= 1 ||
													results.opponent_players[index]?.idp_sack >= 1 ||
													results.opponent_players[index]?.idp_pd >= 1 ||
													results.opponent_players[index]?.idp_int >= 1 ||
													results.opponent_players[index]?.idp_ff >= 1 ||
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.idp_asst
											? `${results.opponent_players[index]?.idp_asst} Asst${
													results.opponent_players[index]?.idp_tfl >= 1 ||
													results.opponent_players[index]?.idp_qbhit >= 1 ||
													results.opponent_players[index]?.idp_sack >= 1 ||
													results.opponent_players[index]?.idp_pd >= 1 ||
													results.opponent_players[index]?.idp_int >= 1 ||
													results.opponent_players[index]?.idp_ff >= 1 ||
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.idp_tfl
											? `${results.opponent_players[index]?.idp_tfl} TFL${
													results.opponent_players[index]?.idp_qbhit >= 1 ||
													results.opponent_players[index]?.idp_sack >= 1 ||
													results.opponent_players[index]?.idp_pd >= 1 ||
													results.opponent_players[index]?.idp_int >= 1 ||
													results.opponent_players[index]?.idp_ff >= 1 ||
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.idp_qbhit
											? `${results.opponent_players[index]?.idp_qbhit} QB Hits${
													results.opponent_players[index]?.idp_sack >= 1 ||
													results.opponent_players[index]?.idp_pd >= 1 ||
													results.opponent_players[index]?.idp_int >= 1 ||
													results.opponent_players[index]?.idp_ff >= 1 ||
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.idp_sack
											? `${results.opponent_players[index]?.idp_sack} Sack${
													results.opponent_players[index]?.idp_sack > 1
														? 's'
														: ''
											  }${
													results.opponent_players[index]?.idp_pd >= 1 ||
													results.opponent_players[index]?.idp_int >= 1 ||
													results.opponent_players[index]?.idp_ff >= 1 ||
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.idp_pd
											? `${results.opponent_players[index]?.idp_pd} PD${
													results.opponent_players[index]?.idp_int >= 1 ||
													results.opponent_players[index]?.idp_ff >= 1 ||
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.idp_int
											? `${results.opponent_players[index]?.idp_int} Int${
													results.opponent_players[index]?.idp_ff >= 1 ||
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.idp_ff
											? `${results.opponent_players[index]?.idp_ff} FF${
													results.opponent_players[index]?.idp_fr >= 1 ||
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.idp_fr
											? `${results.opponent_players[index]?.idp_fr} FR${
													results.opponent_players[index]?.idp_saf >= 1 ||
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.idp_saf
											? `${results.opponent_players[index]?.idp_saf} Safety${
													results.opponent_players[index]?.idp_td >= 1 ||
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.idp_td
											? `${results.opponent_players[index]?.idp_td} TD${
													results.opponent_players[index]?.idp_blockkick >= 1
														? ', '
														: ''
											  }`
											: null}
										{results.opponent_players[index]?.idp_blockkick
											? `${results.opponent_players[index]?.idp_blockkick} Blocked Kick`
											: null}
									</p>
								</div>
								<div className="relative h-10 w-10 bg-white dark:bg-dark-surface hidden lg:block">
									{results.opponent_players[index]?.player_id ? (
										<Image
											src={`https://sleepercdn.com/content/nfl/players/${results.opponent_players[index]?.player_id}.jpg`}
											alt={results.opponent_players[index]?.player_id}
											layout="fill"
											objectFit="cover"
											className="rounded-full"
										/>
									) : (
										<Image
											src={`https://sleepercdn.com/images/v2/icons/player_default.webp`}
											alt={'Profile Picture'}
											layout="fill"
											objectFit="cover"
											className="rounded-full"
										></Image>
									)}
								</div>
							</div>
						</a>
					</Link>
				) : (
					<div className="flex justify-between items-center gap-4">
						<p className="text-right tabular-nums">
							{results.opponent_players[index]?.fantasy_points.toFixed(2) ||
								'0.00'}
						</p>
						<div className="flex items-center">
							<div className="lg:mr-4">
								<p className="text-right">
									<span className="text-xs text-light-text-2 dark:text-dark-text-2">
										{results.opponent_players[index]?.position}
										{'  '}
									</span>
									{results.opponent_players[index]?.player_name}
								</p>
								<p className="text-xs text-light-text-2 dark:text-dark-text-2 text-right">
									{results.opponent_players[index]?.pass_yards
										? `${results.opponent_players[index]?.pass_yards} Pa Yds${
												results.opponent_players[index]?.pass_td >= 1 ||
												results.opponent_players[index]?.pass_int >= 1 ||
												results.opponent_players[index]?.pass_2pt >= 1 ||
												results.opponent_players[index]?.rush_yards >= 1 ||
												results.opponent_players[index]?.rush_td >= 1 ||
												results.opponent_players[index]?.rush_2pt >= 1 ||
												results.opponent_players[index]?.rec >= 1 ||
												results.opponent_players[index]?.rec_yards >= 1 ||
												results.opponent_players[index]?.rec_td >= 1 ||
												results.opponent_players[index]?.rec_2pt >= 1 ||
												results.opponent_players[index]?.fum_lost >= 1 ||
												results.opponent_players[index]?.st_td >= 1 ||
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.pass_td
										? `${results.opponent_players[index]?.pass_td} Pa TD${
												results.opponent_players[index]?.pass_int >= 1 ||
												results.opponent_players[index]?.pass_2pt >= 1 ||
												results.opponent_players[index]?.rush_yards >= 1 ||
												results.opponent_players[index]?.rush_td >= 1 ||
												results.opponent_players[index]?.rush_2pt >= 1 ||
												results.opponent_players[index]?.rec >= 1 ||
												results.opponent_players[index]?.rec_yards >= 1 ||
												results.opponent_players[index]?.rec_td >= 1 ||
												results.opponent_players[index]?.rec_2pt >= 1 ||
												results.opponent_players[index]?.fum_lost >= 1 ||
												results.opponent_players[index]?.st_td >= 1 ||
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.pass_int
										? `${results.opponent_players[index]?.pass_int} Int${
												results.opponent_players[index]?.pass_2pt >= 1 ||
												results.opponent_players[index]?.rush_yards >= 1 ||
												results.opponent_players[index]?.rush_td >= 1 ||
												results.opponent_players[index]?.rush_2pt >= 1 ||
												results.opponent_players[index]?.rec >= 1 ||
												results.opponent_players[index]?.rec_yards >= 1 ||
												results.opponent_players[index]?.rec_td >= 1 ||
												results.opponent_players[index]?.rec_2pt >= 1 ||
												results.opponent_players[index]?.fum_lost >= 1 ||
												results.opponent_players[index]?.st_td >= 1 ||
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.pass_2pt
										? `${results.opponent_players[index]?.pass_int} Pa 2Pt${
												results.opponent_players[index]?.pass_2pt >= 1 ||
												results.opponent_players[index]?.rush_yards >= 1 ||
												results.opponent_players[index]?.rush_td >= 1 ||
												results.opponent_players[index]?.rush_2pt >= 1 ||
												results.opponent_players[index]?.rec >= 1 ||
												results.opponent_players[index]?.rec_yards >= 1 ||
												results.opponent_players[index]?.rec_td >= 1 ||
												results.opponent_players[index]?.rec_2pt >= 1 ||
												results.opponent_players[index]?.fum_lost >= 1 ||
												results.opponent_players[index]?.st_td >= 1 ||
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.rush_yards
										? `${results.opponent_players[index]?.rush_yards} Ru Yds${
												results.opponent_players[index]?.rush_td >= 1 ||
												results.opponent_players[index]?.rush_2pt >= 1 ||
												results.opponent_players[index]?.rec >= 1 ||
												results.opponent_players[index]?.rec_yards >= 1 ||
												results.opponent_players[index]?.rec_td >= 1 ||
												results.opponent_players[index]?.rec_2pt >= 1 ||
												results.opponent_players[index]?.fum_lost >= 1 ||
												results.opponent_players[index]?.st_td >= 1 ||
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.rush_td
										? `${results.opponent_players[index]?.rush_td} Ru TD${
												results.opponent_players[index]?.rush_2pt >= 1 ||
												results.opponent_players[index]?.rec >= 1 ||
												results.opponent_players[index]?.rec_yards >= 1 ||
												results.opponent_players[index]?.rec_td >= 1 ||
												results.opponent_players[index]?.rec_2pt >= 1 ||
												results.opponent_players[index]?.fum_lost >= 1 ||
												results.opponent_players[index]?.st_td >= 1 ||
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.rush_2pt
										? `${results.opponent_players[index]?.rush_2pt} Ru 2Pt${
												results.opponent_players[index]?.rec >= 1 ||
												results.opponent_players[index]?.rec_yards >= 1 ||
												results.opponent_players[index]?.rec_td >= 1 ||
												results.opponent_players[index]?.rec_2pt >= 1 ||
												results.opponent_players[index]?.fum_lost >= 1 ||
												results.opponent_players[index]?.st_td >= 1 ||
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.rec
										? `${results.opponent_players[index]?.rec} Rec${
												results.opponent_players[index]?.rec_yards >= 1 ||
												results.opponent_players[index]?.rec_td >= 1 ||
												results.opponent_players[index]?.rec_2pt >= 1 ||
												results.opponent_players[index]?.fum_lost >= 1 ||
												results.opponent_players[index]?.st_td >= 1 ||
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.rec_yards
										? `${results.opponent_players[index]?.rec_yards} Rec Yds${
												results.opponent_players[index]?.rec_td >= 1 ||
												results.opponent_players[index]?.rec_2pt >= 1 ||
												results.opponent_players[index]?.fum_lost >= 1 ||
												results.opponent_players[index]?.st_td >= 1 ||
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.rec_td
										? `${results.opponent_players[index]?.rec_td} Rec TD${
												results.opponent_players[index]?.rec_2pt >= 1 ||
												results.opponent_players[index]?.fum_lost >= 1 ||
												results.opponent_players[index]?.st_td >= 1 ||
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.rec_2pt
										? `${results.opponent_players[index]?.rec_2pt} Rec 2Pt${
												results.opponent_players[index]?.fum_lost >= 1 ||
												results.opponent_players[index]?.st_td >= 1 ||
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1 ||
												results.opponent_players[index]?.idp_tfl >= 1 ||
												results.opponent_players[index]?.idp_qbhit >= 1 ||
												results.opponent_players[index]?.idp_sack >= 1 ||
												results.opponent_players[index]?.idp_pd >= 1 ||
												results.opponent_players[index]?.idp_int >= 1 ||
												results.opponent_players[index]?.idp_ff >= 1 ||
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.fum_lost
										? `${results.opponent_players[index]?.fum_lost} Fum${
												results.opponent_players[index]?.st_td >= 1 ||
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1 ||
												results.opponent_players[index]?.idp_tfl >= 1 ||
												results.opponent_players[index]?.idp_qbhit >= 1 ||
												results.opponent_players[index]?.idp_sack >= 1 ||
												results.opponent_players[index]?.idp_pd >= 1 ||
												results.opponent_players[index]?.idp_int >= 1 ||
												results.opponent_players[index]?.idp_ff >= 1 ||
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.st_td
										? `${results.opponent_players[index]?.st_td} ST TD${
												results.opponent_players[index]?.st_ff >= 1 ||
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1 ||
												results.opponent_players[index]?.idp_tfl >= 1 ||
												results.opponent_players[index]?.idp_qbhit >= 1 ||
												results.opponent_players[index]?.idp_sack >= 1 ||
												results.opponent_players[index]?.idp_pd >= 1 ||
												results.opponent_players[index]?.idp_int >= 1 ||
												results.opponent_players[index]?.idp_ff >= 1 ||
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.st_ff
										? `${results.opponent_players[index]?.st_ff} ST FF${
												results.opponent_players[index]?.st_fr >= 1 ||
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1 ||
												results.opponent_players[index]?.idp_tfl >= 1 ||
												results.opponent_players[index]?.idp_qbhit >= 1 ||
												results.opponent_players[index]?.idp_sack >= 1 ||
												results.opponent_players[index]?.idp_pd >= 1 ||
												results.opponent_players[index]?.idp_int >= 1 ||
												results.opponent_players[index]?.idp_ff >= 1 ||
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.st_fr
										? `${results.opponent_players[index]?.st_fr} ST FR${
												results.opponent_players[index]?.idp_solo >= 1 ||
												results.opponent_players[index]?.idp_asst >= 1 ||
												results.opponent_players[index]?.idp_tfl >= 1 ||
												results.opponent_players[index]?.idp_qbhit >= 1 ||
												results.opponent_players[index]?.idp_sack >= 1 ||
												results.opponent_players[index]?.idp_pd >= 1 ||
												results.opponent_players[index]?.idp_int >= 1 ||
												results.opponent_players[index]?.idp_ff >= 1 ||
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.idp_solo
										? `${results.opponent_players[index]?.idp_solo} Solo${
												results.opponent_players[index]?.idp_asst >= 1 ||
												results.opponent_players[index]?.idp_tfl >= 1 ||
												results.opponent_players[index]?.idp_qbhit >= 1 ||
												results.opponent_players[index]?.idp_sack >= 1 ||
												results.opponent_players[index]?.idp_pd >= 1 ||
												results.opponent_players[index]?.idp_int >= 1 ||
												results.opponent_players[index]?.idp_ff >= 1 ||
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.idp_asst
										? `${results.opponent_players[index]?.idp_asst} Asst${
												results.opponent_players[index]?.idp_tfl >= 1 ||
												results.opponent_players[index]?.idp_qbhit >= 1 ||
												results.opponent_players[index]?.idp_sack >= 1 ||
												results.opponent_players[index]?.idp_pd >= 1 ||
												results.opponent_players[index]?.idp_int >= 1 ||
												results.opponent_players[index]?.idp_ff >= 1 ||
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.idp_tfl
										? `${results.opponent_players[index]?.idp_tfl} TFL${
												results.opponent_players[index]?.idp_qbhit >= 1 ||
												results.opponent_players[index]?.idp_sack >= 1 ||
												results.opponent_players[index]?.idp_pd >= 1 ||
												results.opponent_players[index]?.idp_int >= 1 ||
												results.opponent_players[index]?.idp_ff >= 1 ||
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.idp_qbhit
										? `${results.opponent_players[index]?.idp_qbhit} QB Hits${
												results.opponent_players[index]?.idp_sack >= 1 ||
												results.opponent_players[index]?.idp_pd >= 1 ||
												results.opponent_players[index]?.idp_int >= 1 ||
												results.opponent_players[index]?.idp_ff >= 1 ||
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.idp_sack
										? `${results.opponent_players[index]?.idp_sack} Sack${
												results.opponent_players[index]?.idp_sack > 1 ? 's' : ''
										  }${
												results.opponent_players[index]?.idp_pd >= 1 ||
												results.opponent_players[index]?.idp_int >= 1 ||
												results.opponent_players[index]?.idp_ff >= 1 ||
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.idp_pd
										? `${results.opponent_players[index]?.idp_pd} PD${
												results.opponent_players[index]?.idp_int >= 1 ||
												results.opponent_players[index]?.idp_ff >= 1 ||
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.idp_int
										? `${results.opponent_players[index]?.idp_int} Int${
												results.opponent_players[index]?.idp_ff >= 1 ||
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.idp_ff
										? `${results.opponent_players[index]?.idp_ff} FF${
												results.opponent_players[index]?.idp_fr >= 1 ||
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.idp_fr
										? `${results.opponent_players[index]?.idp_fr} FR${
												results.opponent_players[index]?.idp_saf >= 1 ||
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.idp_saf
										? `${results.opponent_players[index]?.idp_saf} Safety${
												results.opponent_players[index]?.idp_td >= 1 ||
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.idp_td
										? `${results.opponent_players[index]?.idp_td} TD${
												results.opponent_players[index]?.idp_blockkick >= 1
													? ', '
													: ''
										  }`
										: null}
									{results.opponent_players[index]?.idp_blockkick
										? `${results.opponent_players[index]?.idp_blockkick} Blocked Kick`
										: null}
								</p>
							</div>
							<div className="relative h-10 w-10 bg-white dark:bg-dark-surface hidden lg:block">
								{results.opponent_players[index]?.player_id ? (
									<Image
										src={`https://sleepercdn.com/content/nfl/players/${results.opponent_players[index]?.player_id}.jpg`}
										alt={results.opponent_players[index]?.player_id}
										layout="fill"
										objectFit="cover"
										className="rounded-full"
									/>
								) : (
									<Image
										src={`https://sleepercdn.com/images/v2/icons/player_default.webp`}
										alt={'Profile Picture'}
										layout="fill"
										objectFit="cover"
										className="rounded-full"
									></Image>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
