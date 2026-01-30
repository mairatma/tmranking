'use client';

import { Flex, Heading, Spinner, Stack, Tabs } from '@chakra-ui/react';
import { LuBrackets, LuGrid2X2, LuSquareCheck, LuUser } from 'react-icons/lu';

import { useTournament } from '@/app/_tournaments/hooks/useTournament';
import { Registrations } from './Registrations';
import { CategoryChooserDrawer } from '@/app/_components/CategoryChooserDrawer';
import { CATEGORY_ID_MAP } from '@/app/_ranking/categories';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Brackets } from './Brackets';
import { Groups } from './Groups';
import { Results } from './Results';
import { useSaveTournament } from '../hooks/useSaveTournament';
import { useEffect } from 'react';

enum TabTypes {
  Registrations = 'registrations',
  Groups = 'groups',
  Results = 'results',
  Brackets = 'brackets',
}

enum TournamentSearchParams {
  Category = 'category',
  Tab = 'tab',
}

interface Props {
  id: string;
}

export const TournamentPage = ({ id }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading } = useTournament(id);
  const { saveTournament } = useSaveTournament();

  useEffect(() => {
    if (data) {
      saveTournament(id, data.title);
    }

    // We should not save just because saveTournament has changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data]);

  if (isLoading || !data) {
    return <Spinner />;
  }

  const availableCategories = data.categories
    .map((item) => CATEGORY_ID_MAP[item.value])
    .filter((item) => item);

  const category =
    searchParams.get(TournamentSearchParams.Category) ??
    availableCategories[0].value;
  const handleCategoryChange = (newCategory: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(TournamentSearchParams.Category, newCategory);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const categoryName = CATEGORY_ID_MAP[category].label;

  const currentTab =
    searchParams.get(TournamentSearchParams.Tab) ?? TabTypes.Registrations;
  const handleTabChange = (newTab: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(TournamentSearchParams.Tab, newTab);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Stack>
      <Heading size="xl">{data?.title}</Heading>
      <Flex alignItems="center" gap="4">
        <Heading size="lg" color="teal.600">
          {categoryName}
        </Heading>
        <CategoryChooserDrawer
          categories={availableCategories}
          value={category}
          onSelect={handleCategoryChange}
        />
      </Flex>
      <Tabs.Root
        fitted
        lazyMount
        value={currentTab}
        onValueChange={(e) => handleTabChange(e.value)}
      >
        <Tabs.List>
          <Tabs.Trigger value={TabTypes.Registrations}>
            <LuUser />
            Inscrições
          </Tabs.Trigger>
          <Tabs.Trigger value={TabTypes.Groups}>
            <LuGrid2X2 />
            Grupos
          </Tabs.Trigger>
          <Tabs.Trigger value={TabTypes.Results}>
            <LuSquareCheck />
            Resultados
          </Tabs.Trigger>
          <Tabs.Trigger value={TabTypes.Brackets}>
            <LuBrackets />
            Eliminatórias
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={TabTypes.Registrations}>
          <Registrations id={id} categoryId={category} />
        </Tabs.Content>
        <Tabs.Content value={TabTypes.Groups}>
          <Groups id={id} categoryId={category} />
        </Tabs.Content>
        <Tabs.Content value={TabTypes.Results}>
          <Results id={id} categoryId={category} />
        </Tabs.Content>
        <Tabs.Content value={TabTypes.Brackets}>
          <Brackets id={id} categoryId={category} />
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};
