import { ReactNode } from 'react';

import {
  Box,
  Center,
  Popover,
  Portal,
  Spinner,
  Table,
  Text,
} from '@chakra-ui/react';
import { ScoreResults } from '../_tournaments/types';

interface Props {
  children: ReactNode;
  isLoading?: boolean;
  results: ScoreResults | null;
}

export const ScorePopover = ({ children, isLoading, results }: Props) => {
  return (
    <Popover.Root
      positioning={{
        offset: { crossAxis: 0, mainAxis: -20 },
        placement: 'bottom-start',
      }}
    >
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width={results ? 'auto' : undefined}>
            <Popover.Arrow />
            <Popover.Body>
              {isLoading && (
                <Center>
                  <Spinner size="md" color="primary.900" />
                </Center>
              )}
              {!isLoading && !results && <Box>Sem detalhes.</Box>}
              {results && (
                <Table.Root size="sm" striped>
                  <Table.Body>
                    {results.map(({ playerName, totalScore, sets }, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell>
                            <Text fontWeight="bold">{playerName}</Text>
                          </Table.Cell>
                          <Table.Cell textAlign="end">
                            <Text fontWeight="bold" color="primary.500">
                              {totalScore}
                            </Text>
                          </Table.Cell>
                          {sets.map((setScore, setScoreIndex) => (
                            <Table.Cell key={setScoreIndex} textAlign="end">
                              {setScore}
                            </Table.Cell>
                          ))}
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table.Root>
              )}
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
