'use client';

import { Flex, Heading, Stack, Tabs } from '@chakra-ui/react';
import { LuBrackets, LuGrid2X2, LuSquareCheck, LuUser } from 'react-icons/lu';

import { useTournament } from '@/app/_ranking/hooks/useTournament';
import { Registrations } from './Registrations';
import { CategoryChooserDrawer } from '@/app/_components/CategoryChooserDrawer';
import { useState } from 'react';
import { AVAILABLE_CATEGORIES } from '@/app/_ranking/categories';

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
  const { data } = useTournament(id);
  const [category, setCategory] = useState(AVAILABLE_CATEGORIES[0].value);

  const categoryName = AVAILABLE_CATEGORIES.find(
    ({ value }) => value === category,
  )!.label;

  return (
    <Stack>
      <Heading size="xl">{data?.title}</Heading>
      <Flex alignItems="center" gap="4">
        <Heading size="lg" color="teal.600">
          {categoryName}
        </Heading>
        <CategoryChooserDrawer
          categories={AVAILABLE_CATEGORIES}
          value={category}
          onSelect={setCategory}
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
          <Registrations id={id} />
        </Tabs.Content>
        <Tabs.Content value={TabTypes.Groups}>WIP</Tabs.Content>
        <Tabs.Content value={TabTypes.Results}>WIP</Tabs.Content>
        <Tabs.Content value={TabTypes.Brackets}>WIP</Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};
