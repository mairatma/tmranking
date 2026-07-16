'use client';

import { Flex, Heading, Icon, Spinner, Stack, Tabs } from '@chakra-ui/react';
import {
  LuBookmark,
  LuBrackets,
  LuGrid2X2,
  LuSquareCheck,
  LuUser,
} from 'react-icons/lu';

import { useTournament } from '@/app/_tournaments/hooks/useTournament';
import { Registrations } from './Registrations';
import { CategoryChooserDrawer } from '@/app/_components/CategoryChooserDrawer';
import { Gender, getCategoryById } from '@/app/_ranking/categories';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Brackets } from './Brackets';
import { Groups } from './Groups';
import { Results } from './Results';
import { useFavoriteTournament } from '../hooks/useFavoriteTournament';

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

const GENDER_TO_SORT_VALUE: Record<Gender, number> = {
  [Gender.Male]: 0,
  [Gender.Female]: 1,
};

export const TournamentPage = ({ id }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading } = useTournament(id);
  const { isFavorite, toggleFavorite } = useFavoriteTournament(id);

  if (isLoading || !data) {
    return <Spinner />;
  }

  const availableCategories = data.categories
    .map((item) => getCategoryById(item.value))
    .filter((item) => item)
    .sort(
      (category1, category2) =>
        GENDER_TO_SORT_VALUE[category1.gender] -
        GENDER_TO_SORT_VALUE[category2.gender],
    );

  const category =
    searchParams.get(TournamentSearchParams.Category) ??
    availableCategories[0].value;
  const handleCategoryChange = (newCategory: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(TournamentSearchParams.Category, newCategory);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const categoryName = getCategoryById(category).label;

  const currentTab =
    searchParams.get(TournamentSearchParams.Tab) ?? TabTypes.Registrations;
  const handleTabChange = (newTab: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(TournamentSearchParams.Tab, newTab);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Stack gap="2">
      <div>
        <Flex alignItems="center" justifyContent="space-between" gap="2">
          <Heading size="lg" color="text.primary" mb="4">
            {data?.title}
          </Heading>
          <Icon
            size="lg"
            color="primary.900"
            cursor="pointer"
            onClick={() => toggleFavorite(data.title)}
            style={{ fill: isFavorite ? 'currentColor' : 'none' }}
          >
            <LuBookmark />
          </Icon>
        </Flex>
        <Flex
          alignItems="center"
          direction="row"
          justifyContent={{ smDown: 'space-between' }}
          gap="4"
          pb="4"
          borderBottom="2px solid"
          borderColor="border.light"
        >
          <Heading size="lg" color="secondary.900" fontWeight="700">
            {categoryName}
          </Heading>
          <CategoryChooserDrawer
            categories={availableCategories}
            value={category}
            onSelect={handleCategoryChange}
          />
        </Flex>
      </div>
      <Tabs.Root
        fitted
        lazyMount
        value={currentTab}
        onValueChange={(e) => handleTabChange(e.value)}
      >
        <Tabs.List borderColor="border.light">
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
