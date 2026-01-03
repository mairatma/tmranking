'use client';

import { Center, Heading, Spinner, Stack } from '@chakra-ui/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { useRanking } from '../hooks/useRanking';
import { CategorySelect } from './CategorySelect';
import { RankingTable } from './RankingTable';
import { RankingCardsList } from './RankingCardsList';
import { AVAILABLE_CATEGORIES } from '../categories';

const DEFAULT_CATEGORY_VALUE = AVAILABLE_CATEGORIES[0].value;

export const RankingPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? DEFAULT_CATEGORY_VALUE;

  const options = category ? { category } : null;
  const { data, isLoading } = useRanking(options);

  const handleCategoryChange = (category: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Stack>
      <Heading size="3xl" letterSpacing="tight">
        CBTM Ranking
      </Heading>

      <CategorySelect value={category} onChange={handleCategoryChange} />

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
