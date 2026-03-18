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

export const GAMES: Game[] = [
  {
    id: 'minecraft-web',
    title: 'Minecraft: Web Edition',
    developer: 'Mojang Studios (Web Port)',
    price: 0,
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Game',
    tags: ['Survival', 'Sandbox', 'Multiplayer'],
    isFree: true
  }
];
