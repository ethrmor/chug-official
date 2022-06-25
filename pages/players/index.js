import { Fragment, useState } from 'react';
import FilterDropdown from '@/components/FilterDropdown';
import Link from 'next/link';
import PlayerCard from '../../components/PlayerCard';
import { Combobox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';

export default function Players({ results, playerOptions }) {
	const [selected, setSelected] = useState('');
	const [query, setQuery] = useState('');

	const filteredPeople =
		query === ''
			? playerOptions
			: playerOptions.filter((person) =>
					person.full_name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	return (
		<>
			<div>
				<h1 className="text-3xl mt-6 mb-12">Players</h1>
			</div>
			<div>
				<div className="mb-10 z-40 flex gap-4">
					<Combobox value={selected} onChange={setSelected}>
						<div className="relative">
							<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
								<Combobox.Input
									className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
									displayValue={(person) => person.full_name}
									onChange={(event) => setQuery(event.target.value)}
								/>
								<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
									<SelectorIcon
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</Combobox.Button>
							</div>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
								afterLeave={() => setQuery('')}
							>
								<Combobox.Options className="absolute z-40 mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{filteredPeople.length === 0 && query !== '' ? (
										<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
											Nothing found.
										</div>
									) : (
										filteredPeople.map((person) => (
											<Combobox.Option
												key={person.player_id}
												className={({ active }) =>
													`relative cursor-pointer select-none py-2 pl-4 pr-4 ${
														active ? 'bg-red-600 text-white' : 'text-gray-900'
													}`
												}
												value={person}
											>
												{({ selected }) => (
													<>
														<Link href={`/players/${person.player_id}`}>
															<a>
																<span
																	className={`block truncate ${
																		selected ? 'font-medium' : 'font-normal'
																	}`}
																>
																	{person.full_name}
																</span>
															</a>
														</Link>
													</>
												)}
											</Combobox.Option>
										))
									)}
								</Combobox.Options>
							</Transition>
						</div>
					</Combobox>
					<button className="bg-red-600 p-2 text-white rounded-md">
						Go to Player
					</button>
				</div>
			</div>
			<div>
				<h3>Featured</h3>
			</div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
				<PlayerCard id={results[0]} />
				<PlayerCard id={results[1]} />
				<PlayerCard id={results[2]} />
				<PlayerCard id={results[3]} />
				<PlayerCard id={results[4]} />
				<PlayerCard id={results[5]} />
				<PlayerCard id={results[6]} />
				<PlayerCard id={results[7]} />
				<PlayerCard id={results[8]} />
				<PlayerCard id={results[9]} />
				<PlayerCard id={results[10]} />
				<PlayerCard id={results[11]} />
			</div>
		</>
	);
}

export async function getStaticProps() {
	try {
		const [playersRes, ownersRes, rostersRes, careerRes] = await Promise.all([
			fetch('https://ethanrmorris.github.io/v1/players.json'),
			fetch('https://ethanrmorris.github.io/v1/owners.json'),
			fetch('https://api.sleeper.app/v1/league/784462448236363776/rosters/'),
			fetch('https://ethanrmorris.github.io/v1/stats/players/career.json'),
		]);
		const [players, owners, rosters, career] = await Promise.all([
			playersRes.json(),
			ownersRes.json(),
			rostersRes.json(),
			careerRes.json(),
		]);

		const newResults = Object.values(players);

		const idsFromRosters = rosters.map((obj) => obj.players).flat();
		const idsFromStats = career.map((obj) => obj.player_id).flat();
		const idsFromCurrentPlayers = [...idsFromRosters, ...idsFromStats];

		const playerCards = [
			'6813', // Ethan - JT
			'7528', // Shawn - Najee
			'6790', // Jacob - Swift
			'4984', // Caleb - JA
			'6786', // Morgan - CD
			'4866', // Lucas - Saquon
			'6797', // Scott - Herbert
			'4040', // Clint - Juju
			'7596', // Juice - Elijah
			'7564', // Brian - Chase
			'7553', // Jorden - Pitts
			'6945', // Cameron - AG24
		];

		const playerOptions = newResults
			.filter((item) => idsFromCurrentPlayers.includes(item.player_id))
			.sort((a, b) => (a.full_name > b.full_name ? 1 : -1));

		const newerResults = newResults.filter((item) =>
			playerCards.includes(item.player_id)
		);

		const results = newerResults.map((player) => {
			const id = player.player_id;
			const currentTeam = rosters.find((team) => team.players.includes(id));

			const currentOwner = currentTeam?.roster_id;

			const cleanOwner = owners.find((owner) =>
				owner.id?.includes(currentOwner)
			);

			const ownerName = cleanOwner?.slug;

			return { ...player, asmc: ownerName };
		});

		return {
			props: { results, playerOptions },
		};
	} catch (err) {
		console.error(err);
	}
}
