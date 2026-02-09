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
import { getCurrentYear } from '../helpers/years';

const DEFAULT_CATEGORY_VALUE = AVAILABLE_CATEGORIES[0].value;
const DEFAULT_REGION_VALUE = AVAILABLE_REGIONS[0].value;
const DEFAULT_YEAR_VALUE = getCurrentYear();
const INITIAL_PAGE = 1;

export const RankingPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? DEFAULT_CATEGORY_VALUE;
  const region = searchParams.get('region') ?? DEFAULT_REGION_VALUE;
  const year = Number(searchParams.get('year')) || DEFAULT_YEAR_VALUE;
  const page = Number(searchParams.get('page')) ?? INITIAL_PAGE;

  const { data, isLoading } = useRanking({
    category,
    region,
    year,
    page,
  });

  const handleFiltersChange = (newFilters: RankingOptions) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', newFilters.category);
    newParams.set('region', newFilters.region);
    if (newFilters.year) {
      newParams.set('year', newFilters.year.toString());
    }
    if (newFilters.page) {
      newParams.set('page', newFilters.page.toString());
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const categoryName = AVAILABLE_CATEGORIES.find(
    (item) => item.value === category,
  )?.label;

  return (
    <Stack gap="6">
      <Flex
        alignItems="center"
        justifyContent={{ base: 'space-between', sm: 'flex-start' }}
        gap="8"
        pb="4"
        borderBottom="2px solid"
        borderColor="border.light"
      >
        <div>
          <Heading size="lg" color="text.primary" mb="1">
            {categoryName}
          </Heading>
          <Flex>
            <Heading size="sm" color="text.secondary" fontWeight="400">
              Região: {region}
            </Heading>
            <Heading size="sm" color="text.secondary" fontWeight="400" ml="2">
              Ano: {year}
            </Heading>
          </Flex>
        </div>
        <RankingFilters
          value={{ category, region, year }}
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
          <RankingTable
            rankings={data.rankings}
            category={category}
            year={year}
          />

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
