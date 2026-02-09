import { Metadata } from 'next';
import { connection } from 'next/server';

import { PlayerRankingInfoPage } from '@/app/_players/components/PlayerRankingInfoPage';

export const metadata: Metadata = {
  title: 'CBTM - Jogador',
};

export default async function PlayerRankingInfo({
  params,
}: {
  params: Promise<{ id: string; categoryId: string }>;
}) {
  const { id, categoryId } = await params;
  await connection();

  return <PlayerRankingInfoPage id={id} categoryId={categoryId} />;
}
