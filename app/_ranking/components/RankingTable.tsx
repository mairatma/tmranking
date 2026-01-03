'use client';

import { Flex, Table, Text } from '@chakra-ui/react';

import { RankingEntry } from '../types';

interface Props {
  rankings: RankingEntry[];
}

export const RankingTable = ({ rankings }: Props) => {
  return (
    <Table.Root size="sm" interactive mt="4">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Nome</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Pontos</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rankings.map((item) => (
          <Table.Row key={item.rank}>
            <Table.Cell>
              <Flex gap="2">
                <Text fontWeight="bold" color="teal.500">
                  #{item.rank}
                </Text>{' '}
                <Text fontWeight="bold">
                  {item.name}
                  <Text textStyle="xs" color="fg.muted" fontWeight="normal">
                    {item.club} - {item.state}
                  </Text>
                </Text>
              </Flex>
            </Table.Cell>
            <Table.Cell textAlign="end">{item.points}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
