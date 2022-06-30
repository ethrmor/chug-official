import Image from 'next/image';
import Link from 'next/link';

export default function MiniBoxScore({
	id,
	team,
	teamOwner,
	opponent,
	opponentOwner,
	teamPoints,
	opponentPoints,
}) {
	return (
		<>
			<Link href={`/schedule/${id}`}>
				<a className="grid grid-cols-[1fr_40%]">
					<div className="flex flex-col border-r-2 dark:border-[#555555] pr-4">
						<div
							className={`flex justify-between items-center p-4 ${
								parseInt(teamPoints) > parseInt(opponentPoints)
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
								<h3>{team}</h3>
							</div>
							<p className="tabular-nums text-lg">
								{teamPoints ? teamPoints.toFixed(2) : teamPoints}
							</p>
						</div>
						<div
							className={`flex justify-between items-center p-4 ${
								parseInt(teamPoints) < parseInt(opponentPoints)
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
								<h3>{opponent}</h3>
							</div>
							<p className="tabular-nums text-lg">
								{opponentPoints ? opponentPoints.toFixed(2) : opponentPoints}
							</p>
						</div>
					</div>
					<div className="">
						<p className="text-center text-xs">Top Performers</p>
					</div>
				</a>
			</Link>
		</>
	);
}
