import Link from 'next/link';

export default function RosterPosition({ arr, position }) {
	return (
		<div>
			<h2 className="text-xs uppercase text-light-text-2 dark:text-dark-text-2 pb-1 mb-2 border-b border-b-light-line/60 dark:border-b-dark-line/60">
				{position}
			</h2>
			<div>
				{arr.map((player, i) => (
					<div key={i}>
						<Link href={`/players/${player.player_id}`}>
							<a className="grid grid-cols-[1rem_1fr] pl-4 text-sm pb-1">
								<p className="justify-self-end">{player.number}</p>
								<p className="pl-3">
									{player.full_name}
									<span className="text-xs text-light-text-2 dark:text-dark-text-2 pl-1">
										- {player.team ? player.team : 'FA'}
									</span>
								</p>
							</a>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
