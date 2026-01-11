'use client';

import { Heading, Stack, Tabs } from '@chakra-ui/react';
import { LuBrackets, LuGrid2X2, LuSquareCheck, LuUser } from 'react-icons/lu';

import { useTournament } from '@/app/_ranking/hooks/useTournament';
import { Registrations } from './Registrations';

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

  return (
    <Stack>
      <Heading size="xl">{data?.title}</Heading>
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
