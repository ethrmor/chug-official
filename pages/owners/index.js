import Link from 'next/link';
import OwnerCard from '@/components/OwnerCard';
import { supabase } from '@/utils/supabaseClient';

export default function Owners({ results }) {
	return (
		<>
			<div>
				<h1 className="text-2xl mt-2 mb-4">Owners</h1>
			</div>
			<div>
				<h3 className="text-md border-b-2 border-light-line dark:border-dark-line mb-4">
					Featured
				</h3>
			</div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
				{results.map((owner, i) => (
					<OwnerCard id={owner} key={i} />
				))}
			</div>
		</>
	);
}

export async function getStaticProps() {
	try {
		const { data: results } = await supabase
			.from('owners')
			.select('*')
			.lte('id', 13);

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
