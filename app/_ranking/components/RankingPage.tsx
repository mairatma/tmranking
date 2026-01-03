'use client';

import { useState } from 'react';

import { Center, Heading, Spinner, Stack } from '@chakra-ui/react';

import { useRanking } from '../hooks/useRanking';
import { CategorySelect } from './CategorySelect';
import { RankingTable } from './RankingTable';
import { RankingCardsList } from './RankingCardsList';

export const RankingPage = () => {
  const [category, setCategory] = useState<string | null>(null);

  const options = category ? { category } : null;
  const { data, isLoading } = useRanking(options);

  return (
    <Stack>
      <Heading size="3xl" letterSpacing="tight">
        CBTM Ranking
      </Heading>

      <CategorySelect value={category} onChange={setCategory} />

      {isLoading && (
        <Center mt="8">
          <Spinner size="xl" />
        </Center>
      )}

      {!isLoading && data && (
        <>
          <RankingTable rankings={data.rankings} />
          <RankingCardsList rankings={data.rankings} />
        </>
      )}
    </Stack>
  );
};
