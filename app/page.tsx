import { Suspense } from 'react';

import { RankingPage } from './_ranking/components/RankingPage';

export default function Home() {
  return (
    <Suspense fallback={<>Carregando...</>}>
      <RankingPage />
    </Suspense>
  );
}
