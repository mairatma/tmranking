'use client';

import {
  Box,
  BoxProps,
  EmptyState,
  Heading,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react';
import { EventResult } from '../types';

interface Props extends BoxProps {
  title: string;
  events: EventResult[];
  emptyState: { title: string; description: string };
}

export const ScoredEventsTable = ({
  title,
  events,
  emptyState,
  ...boxProps
}: Props) => {
  return (
    <Box {...boxProps}>
      <Heading mb="2">{title}</Heading>
      {events.length > 0 ? (
        <Table.Root size="sm" interactive striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Colocação</Table.ColumnHeader>
              <Table.ColumnHeader>Data</Table.ColumnHeader>
              <Table.ColumnHeader>Evento</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Pontos</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {events.map((item) => {
              return (
                <Table.Row key={item.rank}>
                  <Table.Cell>
                    <Text fontWeight="bold" color="brand.primary" minW="3rem">
                      {item.rank}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Box fontWeight="600" color="text.primary">
                      {item.date}
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box fontWeight="600" color="text.primary">
                      {item.eventName}
                    </Box>
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <Box fontWeight="600" color="text.primary">
                      {item.score}
                    </Box>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      ) : (
        <EmptyState.Root size="sm" borderWidth="1px" p="4" rounded="md">
          <EmptyState.Content>
            <VStack textAlign="center">
              <EmptyState.Title>{emptyState.title}</EmptyState.Title>
              <EmptyState.Description>
                {emptyState.description}
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      )}
    </Box>
  );
};
