'use client';

import { Heading, Loader, Stack } from '@chakra-ui/react';

import { useRanking } from '../hooks/useRanking';
import { RankingCategory } from '../types';
import { RankingTable } from './RankingTable';
import { RankingCardsList } from './RankingCardsList';

export const RankingPage = () => {
  const { data, isLoading } = useRanking({
    category: RankingCategory.Sub9,
  });

  return (
    <Stack>
      <Heading size="3xl" letterSpacing="tight">
        CBTM Ranking
      </Heading>

      {isLoading && <Loader />}

      {!isLoading && data && (
        <>
          <RankingTable rankings={data.rankings} />
          <RankingCardsList rankings={data.rankings} />
        </>
      )}
    </Stack>
  );
};
