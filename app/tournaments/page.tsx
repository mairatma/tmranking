import { Metadata } from 'next';
import { connection } from 'next/server';

import { TournamentsPage } from '../_tournaments/components/TournamentsPage';

export const metadata: Metadata = {
  title: 'CBTM - Torneios',
};

export default async function Tournaments() {
  await connection();

  return <TournamentsPage />;
}
