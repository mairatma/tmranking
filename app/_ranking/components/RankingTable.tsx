'use client';

import { Box, Flex, Table, Text } from '@chakra-ui/react';

import { RankingEntry } from '../types';
import Link from 'next/link';

interface Props {
  category: string;
  rankings: RankingEntry[];
}

export const RankingTable = ({ category, rankings }: Props) => {
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
            <Table.Cell p="0">
              <Link
                href={`https://app.cbtm.org.br/iUI/Site/RankingResultadoDetalhe?Categoria=${category}&Ano=2026&Associado=${item.id}&Tipo=O&UF=BR&Colocacao=${item.rank}&Pontos=${item.points}`}
                target="_blank"
              >
                <Flex gap="2" p="2">
                  <Text fontWeight="bold" color="teal.500">
                    #{item.rank}
                  </Text>{' '}
                  <Box>
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text textStyle="xs" color="fg.muted" fontWeight="normal">
                      {item.club} - {item.state}
                    </Text>
                  </Box>
                </Flex>
              </Link>
            </Table.Cell>
            <Table.Cell textAlign="end" p="0">
              <Link
                href={`https://app.cbtm.org.br/iUI/Site/RankingResultadoDetalhe?Categoria=${category}&Ano=2026&Associado=${item.id}&Tipo=O&UF=BR&Colocacao=${item.rank}&Pontos=${item.points}`}
                target="_blank"
              >
                <Box p="2">{item.points}</Box>
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
