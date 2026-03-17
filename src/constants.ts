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
  },
  {
    id: 'gta-v-web',
    title: 'Grand Theft Auto V: Cloud',
    developer: 'Rockstar Games',
    price: 500,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Game',
    tags: ['Action', 'Open World', 'Multiplayer'],
    isFree: false
  },
  {
    id: 'cyberpunk-web',
    title: 'Cyberpunk 2077: Stream',
    developer: 'CD PROJEKT RED',
    price: 800,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Game',
    tags: ['RPG', 'Sci-Fi', 'Open World'],
    isFree: false
  },
  {
    id: 'fifa-24-web',
    title: 'EA SPORTS FC 24',
    developer: 'Electronic Arts',
    price: 600,
    image: 'https://images.unsplash.com/photo-1518605368461-1e1e114e51d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Game',
    tags: ['Sports', 'Multiplayer', 'Competitive'],
    isFree: false
  },
  {
    id: 'bio-logos-riddle',
    title: 'Bio Logos Riddle',
    developer: 'GHI Studios',
    price: 0,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Game',
    tags: ['Puzzle', 'Educational', 'Science'],
    isFree: true
  },
  {
    id: 'math-puzzle-pro',
    title: 'Math Puzzle Pro',
    developer: 'GHI Studios',
    price: 0,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Game',
    tags: ['Puzzle', 'Educational', 'Math'],
    isFree: true
  },
  {
    id: 'math-games',
    title: 'Math Games',
    developer: 'GHI Studios',
    price: 0,
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Game',
    tags: ['Educational', 'Math', 'Casual'],
    isFree: true
  }
];
