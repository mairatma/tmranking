import { ReactNode } from 'react';

import { PlayerPageLayout } from '@/app/_players/components/PlayerPageLayout';

export default async function PlayerLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PlayerPageLayout id={id}>{children}</PlayerPageLayout>;
}
