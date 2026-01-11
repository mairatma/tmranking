import { Metadata } from 'next';
import { connection } from 'next/server';

import { TournamentPage } from '@/app/_tournaments/components/TournamentPage';
import { Stack } from '@chakra-ui/react';

export const metadata: Metadata = {
  title: 'CBTM - Torneios',
};

export default async function Tournament({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connection();

  return <TournamentPage id={id} />;
}
