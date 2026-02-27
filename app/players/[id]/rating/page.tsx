import { Metadata } from 'next';
import { connection } from 'next/server';

import { PlayerRatingInfoPage } from '@/app/_players/rating/components/PlayerRatingInfoPage';

export const metadata: Metadata = {
  title: 'CBTM - Jogador',
};

export default async function PlayerRatingInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connection();

  return <PlayerRatingInfoPage id={id} />;
}
