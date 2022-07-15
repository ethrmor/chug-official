export default function PlayoffBracket({ data }) {
	console.log(data);
	return (
		<div className="grid grid-cols-4 grid-rows-10 py-8 text-sm">
			<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-1 row-end-2"></div>
			<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-1 row-end-2 border-b px-2 pb-1">
				<h2>
					<span className="text-xs font-bold text-black/40 pr-1">
						{data[0]?.playoff_rank || 1}
					</span>
					{data[0]?.owner_id.team}
				</h2>
				<p className="tabular-nums">{data[0]?.team_points.toFixed(2)}</p>
			</div>
			<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-1 row-end-2"></div>
			<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-1 row-end-2"></div>
			<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-2 row-end-3 border-b px-2 pb-1">
				<h2>
					<span className="text-xs font-bold text-black/40 pr-1">
						{data[1]?.playoff_rank || 4}
					</span>
					{data[1]?.owner_id.team}
				</h2>
				<p className="tabular-nums">{data[1]?.team_points.toFixed(2)}</p>
			</div>
			<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-2 row-end-3 border-r"></div>
			<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-2 row-end-3 border-b px-2 pb-1">
				<h2>
					<span className="text-xs font-bold text-black/40 pr-1">
						{data[2]?.playoff_rank || 1}
					</span>
					{data[2]?.owner_id.team}
				</h2>
				<p className="tabular-nums">{data[2]?.team_points.toFixed(2)}</p>
			</div>
			<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-2 row-end-3"></div>
			<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-3 row-end-4 border-r"></div>
			<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-3 row-end-4 border-b border-r px-2 pb-1">
				<h2>
					<span className="text-xs font-bold text-black/40 pr-1">
						{data[3]?.playoff_rank || 4}
					</span>
					{data[3]?.owner_id.team}
				</h2>
				<p className="tabular-nums">{data[3]?.team_points.toFixed(2)}</p>
			</div>
			<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-3 row-end-4 border-r"></div>
			<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-3 row-end-4"></div>
			<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-4 row-end-5 border-b border-r px-2 pb-1">
				<h2>
					<span className="text-xs font-bold text-black/40 pr-1">
						{data[4]?.playoff_rank || 5}
					</span>
					{data[4]?.owner_id.team}
				</h2>
				<p className="tabular-nums">{data[4]?.team_points.toFixed(2)}</p>
			</div>
			<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-4 row-end-5"></div>
			<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-4 row-end-5 border-r"></div>
			<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-4 row-end-5"></div>
			<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-5 row-end-6"></div>
			<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-5 row-end-6"></div>
			<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-5 row-end-6 border-r"></div>
			<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-5 row-end-6 border-b px-2 pb-1">
				<h2>
					<span className="text-xs font-bold text-black/40 pr-1">
						{(data[2]?.team_points > data[7]?.team_points
							? data[2]?.playoff_rank
							: data[7]?.playoff_rank) || 1}
					</span>
					{data[2]?.team_points > data[7]?.team_points
						? data[2]?.owner_id.team
						: data[7]?.owner_id.team}
				</h2>
			</div>
			<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-6 row-end 7"></div>
			<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-6 row-end 7"></div>
			<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-6 row-end-7 border-r"></div>
			<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-6 row-end-7"></div>
			<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-7 row-end-8"></div>
			<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-7 row-end-8 border-b px-2 pb-1">
				<h2>
					<span className="text-xs font-bold text-black/40 pr-1">
						{data[5]?.playoff_rank || 2}
					</span>
					{data[5]?.owner_id.team}
				</h2>
				<p className="tabular-nums">{data[5]?.team_points.toFixed(2)}</p>
			</div>
			<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-7 row-end-8 border-r"></div>
			<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-7 row-end-8"></div>
			<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-8 row-end-9 border-b px-2 pb-1">
				<h2>
					<span className="text-xs font-bold text-black/40 pr-1">
						{data[6]?.playoff_rank || 3}
					</span>
					{data[6]?.owner_id.team}
				</h2>
				<p className="tabular-nums">{data[6]?.team_points.toFixed(2)}</p>
			</div>
			<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-8 row-end-9 border-r"></div>
			<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-8 row-end-9 border-b border-r px-2 pb-1">
				<h2>
					<span className="text-xs font-bold text-black/40 pr-1">
						{data[7]?.playoff_rank || 2}
					</span>
					{data[7]?.owner_id.team}
				</h2>
				<p className="tabular-nums">{data[7]?.team_points.toFixed(2)}</p>
			</div>
			<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-8 row-end-9"></div>
			<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-9 row-end-10 border-r"></div>
			<div className="flex items-end justify-between b-8 col-start-2 col-end-3 row-start-9 row-end-10 border-b border-r px-2 pb-1">
				<h2>
					<span className="text-xs font-bold text-black/40 pr-1">
						{data[8]?.playoff_rank || 3}
					</span>
					{data[8]?.owner_id.team}
				</h2>
				<p className="tabular-nums">{data[8]?.team_points.toFixed(2)}</p>
			</div>
			<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-9 row-end-10"></div>
			<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-9 row-end-10"></div>
			<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-10 row-end-11 border-b border-r px-2 pb-1">
				<h2>
					<span className="text-xs font-bold text-black/40 pr-1">
						{data[9]?.playoff_rank || 6}
					</span>
					{data[9]?.owner_id.team}
				</h2>
				<p className="tabular-nums">{data[9]?.team_points.toFixed(2)}</p>
			</div>
			<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-10 row-end-11"></div>
			<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-10 row-end-11"></div>
			<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-10 row-end-11"></div>
		</div>
	);
}
