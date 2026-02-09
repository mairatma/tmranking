export interface EventResult {
  rank: string;
  date: string;
  eventName: string;
  score: number;
}

export interface PlayerRankingInfo {
  name: string;
  age: string;
  state: string;
  team: string;
  categoryName: string;
  scoredEvents: EventResult[];
  unscoredEvents: EventResult[];
}
