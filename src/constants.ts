export interface Game {
  id: string;
  title: string;
  developer: string;
  price: number;
  discount?: number;
  image: string;
  category: 'Action' | 'RPG' | 'Indie' | 'AI Tool' | 'Productivity' | 'XERDOX AI';
  tags: string[];
  isFree?: boolean;
  playersOnline?: string;
  rating?: number;
}

export const GAMES: Game[] = [
  {
    id: 'minecraft-web',
    title: 'Minecraft: RTX Edition',
    developer: 'Mojang Studios',
    price: 0,
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Action',
    tags: ['Survival', 'Sandbox', 'Multiplayer'],
    isFree: true,
    playersOnline: '12,450',
    rating: 4.9
  }
];
