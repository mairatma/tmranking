import { TournamentGroup } from '../types';

export interface TournamentGroupWithNumber extends TournamentGroup {
  number: number;
}

export const enhanceGroupsWithNumber = (
  groups: TournamentGroup[],
): TournamentGroupWithNumber[] => {
  return groups.map((group, index) => ({ ...group, number: index + 1 }));
};

export const getAllAtheletesFromGroups = (groups: TournamentGroup[]) => {
  const athletesSet = new Set<string>();
  groups.forEach((result) => {
    result.participants.forEach(({ name }) => {
      athletesSet.add(name);
    });
  });
  return athletesSet.keys().toArray();
};

export const filterGroupsByAthelete = (
  groups: TournamentGroupWithNumber[],
  athleteName: string,
) => {
  return groups.filter((result) =>
    result.participants.some((participant) => participant.name === athleteName),
  );
};
