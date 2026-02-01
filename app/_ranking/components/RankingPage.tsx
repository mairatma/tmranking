'use client';

import {
  ButtonGroup,
  Center,
  Flex,
  Heading,
  IconButton,
  Pagination,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { useRanking } from '../hooks/useRanking';
import { RankingTable } from './RankingTable';
import { AVAILABLE_CATEGORIES } from '../categories';
import { AVAILABLE_REGIONS } from '../regions';
import { RankingFilters } from './RankingFilters';
import { RankingOptions } from '../types';

const DEFAULT_CATEGORY_VALUE = AVAILABLE_CATEGORIES[0].value;
const DEFAULT_REGION_VALUE = AVAILABLE_REGIONS[0].value;
const INITIAL_PAGE = 1;

export const RankingPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? DEFAULT_CATEGORY_VALUE;
  const region = searchParams.get('region') ?? DEFAULT_REGION_VALUE;
  const page = Number(searchParams.get('page')) ?? INITIAL_PAGE;

  const { data, isLoading } = useRanking({
    category,
    region,
    page,
  });

  const handleFiltersChange = (newFilters: RankingOptions) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', newFilters.category);
    newParams.set('region', newFilters.region);
    newParams.set('page', (newFilters.page ?? INITIAL_PAGE).toString());
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const categoryName = AVAILABLE_CATEGORIES.find(
    (item) => item.value === category,
  )?.label;

  return (
    <Stack gap="6">
      <Flex
        alignItems={{ base: 'flex-start', sm: 'center' }}
        direction={{ base: 'column', sm: 'row' }}
        gap="4"
        pb="4"
        borderBottom="2px solid"
        borderColor="border.light"
      >
        <div>
          <Heading size="lg" color="text.primary" mb="1">
            {categoryName}
          </Heading>
          <Heading size="sm" color="text.secondary" fontWeight="400">
            Região: {region}
          </Heading>
        </div>
        <RankingFilters
          value={{ category, region }}
          onChange={handleFiltersChange}
        />
      </Flex>

      {isLoading && (
        <Center mt="8">
          <Spinner size="xl" />
        </Center>
      )}

      {!isLoading && data && (
        <>
          <RankingTable rankings={data.rankings} category={category} />

          <Center>
            <Pagination.Root
              count={data.totalItems}
              pageSize={50}
              page={page}
              onPageChange={(e) =>
                handleFiltersChange({ category, region, page: e.page })
              }
            >
              <ButtonGroup variant="ghost" size="sm" colorPalette="primary">
                <Pagination.Items
                  render={(page) => (
                    <IconButton variant={{ base: 'ghost', _selected: 'solid' }}>
                      {page.value}
                    </IconButton>
                  )}
                />
              </ButtonGroup>
            </Pagination.Root>
          </Center>
        </>
      )}
    </Stack>
  );
};
