import { Box } from '@chakra-ui/react';
import { IRenderSeedProps, Seed, SeedItem, SeedTeam } from 'react-brackets';

const WINNER_STYLES = {
  color: 'var(--chakra-colors-teal-fg)',
  fontWeight: 700,
};
const LOSER_STYLES = {
  color: 'var(--chakra-colors-teal-solid)',
};

export const BracketSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
  const { score, teams, date } = seed;
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem style={{ backgroundColor: 'var(--chakra-colors-teal-subtle)' }}>
        <div>
          <SeedTeam style={score[0] > score[1] ? WINNER_STYLES : LOSER_STYLES}>
            {teams[0]?.name || 'BYE'}
            <div>{score[0]}</div>
          </SeedTeam>
          <SeedTeam style={score[1] > score[0] ? WINNER_STYLES : LOSER_STYLES}>
            {teams[1]?.name || 'BYE'}
            <div>{score[1]}</div>
          </SeedTeam>
        </div>
      </SeedItem>
      <Box color="gray.500" mt={1}>
        {date}
      </Box>
    </Seed>
  );
};
