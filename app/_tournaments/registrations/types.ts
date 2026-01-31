export enum RegistrationType {
  REGISTERED = 'Inscrito',
  PRE_REGISTERED = 'Pré-inscrito',
}

export interface TournamentRegistration {
  name: string;
  team: string;
  registrationType: RegistrationType;
  rankingPoints: number;
  ratingPoints: number;
}
