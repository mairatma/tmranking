'use client';

import { Table, Text } from '@chakra-ui/react';

import { RankingEntry } from '../types';

interface Props {
  rankings: RankingEntry[];
}

export const RankingTable = ({ rankings }: Props) => {
  return (
    <Table.Root size="sm" interactive hideBelow="sm" mt="4">
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
        {rankings.map((item) => (
          <Table.Row key={item.rank}>
            <Table.Cell>
              <Text fontWeight="bold" color="teal.500">
                {item.rank}
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text fontWeight="bold">{item.name}</Text>
            </Table.Cell>
            <Table.Cell>{item.state}</Table.Cell>
            <Table.Cell>{item.club}</Table.Cell>
            <Table.Cell textAlign="end">{item.points}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
