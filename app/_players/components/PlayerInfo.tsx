import { DataList, Grid, Stat } from '@chakra-ui/react';

import { PlayerRankingInfo } from '../types';

interface Props {
  player: PlayerRankingInfo;
}

export const PlayerInfo = ({ player }: Props) => {
  return (
    <>
      <Grid
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap="2"
        hideBelow="md"
      >
        <Stat.Root size="sm" borderWidth="1px" p="4" rounded="md">
          <Stat.Label color="secondary.900" fontWeight="700">
            Idade (até o fim do ano)
          </Stat.Label>
          <Stat.ValueText alignItems="baseline">
            {player.age ? (
              <>
                {player.age}
                <Stat.ValueUnit>anos</Stat.ValueUnit>
              </>
            ) : (
              '-'
            )}
          </Stat.ValueText>
        </Stat.Root>

        <Stat.Root size="sm" borderWidth="1px" p="4" rounded="md">
          <Stat.Label color="secondary.900" fontWeight="700">
            Clube
          </Stat.Label>
          <Stat.ValueText alignItems="baseline">
            {player.team || '-'}
          </Stat.ValueText>
        </Stat.Root>

        <Stat.Root size="sm" borderWidth="1px" p="4" rounded="md">
          <Stat.Label color="secondary.900" fontWeight="700">
            Estado
          </Stat.Label>
          <Stat.ValueText alignItems="baseline">
            {player.state || '-'}
          </Stat.ValueText>
        </Stat.Root>
      </Grid>

      <DataList.Root
        orientation="horizontal"
        hideFrom="md"
        borderWidth="1px"
        p="4"
        rounded="md"
      >
        <DataList.Item>
          <DataList.ItemLabel color="secondary.900" fontWeight="700">
            Idade
          </DataList.ItemLabel>
          <DataList.ItemValue>{player.age ?? '-'}</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel color="secondary.900" fontWeight="700">
            Clube
          </DataList.ItemLabel>
          <DataList.ItemValue>{player.team ?? '-'}</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel color="secondary.900" fontWeight="700">
            Estado
          </DataList.ItemLabel>
          <DataList.ItemValue>{player.state ?? '-'}</DataList.ItemValue>
        </DataList.Item>
      </DataList.Root>
    </>
  );
};
