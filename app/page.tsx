import { connection } from 'next/server';

import { RankingPage } from './_ranking/components/RankingPage';

export default async function Home() {
  await connection();

  return <RankingPage />;
}
