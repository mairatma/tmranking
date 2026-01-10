import { Metadata } from 'next';
import { connection } from 'next/server';

import { RankingPage } from './_ranking/components/RankingPage';

export const metadata: Metadata = {
  title: 'CBTM - Ranking',
};

export default async function Home() {
  await connection();

  return <RankingPage />;
}
