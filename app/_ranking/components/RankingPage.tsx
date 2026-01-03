'use client';

import { Heading, Loader, Stack, Table } from '@chakra-ui/react';

import { useRanking } from '../hooks/useRanking';
import { RankingCategory } from '../types';

export const RankingPage = () => {
  const { data, isLoading } = useRanking({
    category: RankingCategory.Sub9,
  });

  return (
    <Stack>
      <Heading size="3xl" letterSpacing="tight">
        CBTM Ranking
      </Heading>

      {isLoading && <Loader />}

      {!isLoading && data && (
        <Table.Root size="sm" interactive>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Rank</Table.ColumnHeader>
              <Table.ColumnHeader>Nome</Table.ColumnHeader>
              <Table.ColumnHeader>Estado</Table.ColumnHeader>
              <Table.ColumnHeader>Clube</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Pontos</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.rankings.map((item) => (
              <Table.Row key={item.rank}>
                <Table.Cell>{item.rank}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.state}</Table.Cell>
                <Table.Cell>{item.club}</Table.Cell>
                <Table.Cell textAlign="end">{item.points}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Stack>
  );
};
