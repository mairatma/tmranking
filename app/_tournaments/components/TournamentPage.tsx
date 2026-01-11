'use client';

import { Flex, Heading, Spinner, Stack, Tabs } from '@chakra-ui/react';
import { LuBrackets, LuGrid2X2, LuSquareCheck, LuUser } from 'react-icons/lu';

import { useTournament } from '@/app/_tournaments/hooks/useTournament';
import { Registrations } from './Registrations';
import { CategoryChooserDrawer } from '@/app/_components/CategoryChooserDrawer';
import { CATEGORY_ID_MAP } from '@/app/_ranking/categories';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Brackets } from './Brackets';

enum TabTypes {
  Registrations = 'registrations',
  Groups = 'groups',
  Results = 'results',
  Brackets = 'brackets',
}

interface Props {
  id: string;
}

export const TournamentPage = ({ id }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading } = useTournament(id);

  if (isLoading || !data) {
    return <Spinner />;
  }

  const availableCategories = data.categories
    .map((item) => CATEGORY_ID_MAP[item.value])
    .filter((item) => item);

  const category = searchParams.get('category') ?? availableCategories[0].value;
  const categoryName = CATEGORY_ID_MAP[category].label;

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
          onSelect={(newCategory) =>
            router.push(`${pathname}?category=${newCategory}`)
          }
        />
      </Flex>
      <Tabs.Root defaultValue={TabTypes.Registrations} fitted lazyMount>
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
        <Tabs.Content value={TabTypes.Groups}>WIP</Tabs.Content>
        <Tabs.Content value={TabTypes.Results}>WIP</Tabs.Content>
        <Tabs.Content value={TabTypes.Brackets}>
          <Brackets id={id} categoryId={category} />
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};
