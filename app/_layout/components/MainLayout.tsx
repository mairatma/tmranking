import { Box, Container, Table } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  const items = [
    {
      rank: 1,
      name: 'GABRIEL NARDI',
      club: 'PREFEITURA DE TOLEDO/YARA COUNTRY CLUBE',
      state: 'PR',
      points: 2685,
    },
    {
      rank: 2,
      name: 'PEDRO PRADO',
      club: 'ASSOCIACAO AMIGOS DO TENIS DE MESA TM MINAS',
      state: 'MG',
      points: 2560,
    },
    {
      rank: 3,
      name: 'DAVI',
      club: 'ASSOCIACAO AMIGOS DO TENIS DE MESA TM MINAS',
      state: 'MG',
      points: 2230,
    },
    {
      rank: 4,
      name: 'JOAQUIM BELLO',
      club: 'ROYAL TENIS CLUBE',
      state: 'PE',
      points: 1220,
    },
    { rank: 5, name: 'RAFAEL', club: 'ATMR', state: 'MT', points: 1100 },
  ];

  return (
    <Container>
      <Box py="4">{children}</Box>
      <Table.Root size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Nome</Table.ColumnHeader>
            <Table.ColumnHeader>Estado</Table.ColumnHeader>
            <Table.ColumnHeader>Clube</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Pontos</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.rank}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.state}</Table.Cell>
              <Table.Cell>{item.club}</Table.Cell>
              <Table.Cell textAlign="end">{item.points}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  );
};
