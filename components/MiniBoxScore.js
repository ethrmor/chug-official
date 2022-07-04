import { teamShortNames } from '@/utils/chugLeague';
import Image from 'next/image';
import Link from 'next/link';

export default function MiniBoxScore({
	id,
	team,
	teamOwner,
	teamPoints,
	teamPlayerName,
	teamPlayerPosition,
	teamPlayerPoints,
	teamWins,
	teamLosses,
	teamTies,
	opponent,
	opponentOwner,
	opponentPoints,
	opponentPlayerName,
	opponentPlayerPosition,
	opponentPlayerPoints,
	opponentWins,
	opponentLosses,
	opponentTies,
}) {
	return (
		<>
			<Link href={`/schedule/${id}`}>
				<a className="grid lg:grid-cols-[1fr_40%]">
					<div className="flex flex-col lg:border-r-2 dark:border-[#555555] pr-4">
						<div
							className={`flex justify-between items-center p-4 ${
								parseFloat(teamPoints) > parseFloat(opponentPoints)
									? 'font-bold'
									: null
							}`}
						>
							<div className="flex items-center gap-6">
								<Image
									src={`/logo-${teamOwner}.webp`}
									width={40}
									height={40}
									alt={`${teamOwner} Logo`}
								/>
								<h3>
									{team}
									<span className="pl-1 text-sm">
										({!teamWins ? '0' : teamWins} {' - '}{' '}
										{!teamLosses ? '0' : teamLosses}
										{!teamTies || teamTies === 0 ? '' : ' - '}
										{!teamTies ? '' : teamTies})
									</span>
								</h3>
							</div>
							<p className="tabular-nums text-lg">
								{teamPoints !== 0 ? teamPoints.toFixed(2) : '0.00'}
							</p>
						</div>
						<div
							className={`flex justify-between items-center p-4 ${
								parseFloat(teamPoints) < parseFloat(opponentPoints)
									? 'font-bold'
									: null
							}`}
						>
							<div className="flex items-center gap-6">
								<Image
									src={`/logo-${opponentOwner}.webp`}
									width={40}
									height={40}
									alt={`${opponentOwner} Logo`}
								/>
								<h3>
									{opponent}
									<span className="pl-1 text-sm">
										({!opponentWins ? '0' : opponentWins} {' - '}{' '}
										{!opponentLosses ? '0' : opponentLosses}
										{!opponentTies || opponentTies === 0 ? '' : ' - '}
										{!opponentTies ? '' : opponentTies})
									</span>
								</h3>
							</div>
							<p className="tabular-nums text-lg">
								{opponentPoints !== 0 ? opponentPoints.toFixed(2) : '0.00'}
							</p>
						</div>
					</div>
					<div className="lg:flex flex-col hidden pl-4">
						<h4 className="text-center text-xs">Top Performers</h4>
						<div className="flex flex-col gap-[3.25rem]">
							<div className="flex justify-between">
								<p className="text-sm pt-2.5">
									<span className="text-sm">{teamShortNames[team]}: </span>
									<span className="opacity-50 text-sm" ß>
										{teamPlayerPosition}{' '}
									</span>
									<span className="">{teamPlayerName}</span>
								</p>
								<p className="text-sm pt-2.5">{teamPlayerPoints?.toFixed(2)}</p>
							</div>
							<div className="flex justify-between">
								<p className="text-sm">
									<span className="text-sm">{teamShortNames[opponent]}: </span>
									<span className="opacity-50 text-sm">
										{opponentPlayerPosition}{' '}
									</span>
									{opponentPlayerName}
								</p>
								<p className="text-sm">{opponentPlayerPoints?.toFixed(2)}</p>
							</div>
						</div>
					</div>
				</a>
			</Link>
		</>
	);
}
