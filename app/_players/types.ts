export interface Player {
  name: string;
  age: string;
  state: string;
  team: string;
}

export interface EventResult {
  rank: string;
  date: string;
  eventName: string;
  score: number;
}

export interface PlayerRankingInfo extends Player {
  categoryName: string;
  scoredEvents: EventResult[];
  unscoredEvents: EventResult[];
}
