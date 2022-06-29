import Link from 'next/link';

export default function TradePart({ owner, piece }) {
	return (
		<div className="">
			<h2 className="font-semibold">
				{owner.charAt(0).toUpperCase().concat(owner.slice(1))}
				{' Acquire'}
			</h2>
			{JSON.parse(piece).map((player, index) => (
				<>
					{player.position ? (
						<Link href={`/players/${player.id}`}>
							<div key={player.id}>
								<a className="cursor-pointer">
									{player.name}
									{player.player ? (
										<div className="text-sm pl-6 font-light">{`(${player.player}, ${player.position} - ${player.team})`}</div>
									) : (
										<span className="text-xs pl-1 text-gray-400">
											{player.position
												? ` ${player.position} - ${player.team}`
												: null}
										</span>
									)}
								</a>
							</div>
						</Link>
					) : (
						<span className="block">{player.name}</span>
					)}
				</>
			))}
		</div>
	);
}
