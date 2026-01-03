'use client';

import { Center, Heading, Spinner, Stack } from '@chakra-ui/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { useRanking } from '../hooks/useRanking';
import { RankingTable } from './RankingTable';
import { AVAILABLE_CATEGORIES } from '../categories';
import { AVAILABLE_REGIONS } from '../regions';
import { RankingFilters } from './RankingFilters';
import { RankingOptions } from '../types';

const DEFAULT_CATEGORY_VALUE = AVAILABLE_CATEGORIES[0].value;
const DEFAULT_REGION_VALUE = AVAILABLE_REGIONS[0].value;

export const RankingPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? DEFAULT_CATEGORY_VALUE;
  const region = searchParams.get('region') ?? DEFAULT_REGION_VALUE;

  const { data, isLoading } = useRanking({ category, region });

  const handleFiltersChange = (newFilters: RankingOptions) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', newFilters.category);
    newParams.set('region', newFilters.region);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Stack>
      <Heading size="3xl" letterSpacing="tight">
        CBTM Ranking
      </Heading>

      <RankingFilters
        value={{ category, region }}
        onChange={handleFiltersChange}
      />

      {isLoading && (
        <Center mt="8">
          <Spinner size="xl" />
        </Center>
      )}

      {!isLoading && data && (
        <RankingTable rankings={data.rankings} category={category} />
      )}
    </Stack>
  );
};
