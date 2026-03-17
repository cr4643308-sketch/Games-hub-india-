export interface Game {
  id: string;
  title: string;
  developer: string;
  price: number;
  discount?: number;
  image: string;
  category: 'Game' | 'AI Tool' | 'Productivity';
  tags: string[];
  isFree?: boolean;
}

export const GAMES: Game[] = [];
