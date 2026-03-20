export interface Game {
  id: string;
  title: string;
  developer: string;
  price: number;
  discount?: number;
  image: string;
  category: 'Action' | 'RPG' | 'Indie' | 'AI Tool' | 'Productivity';
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
  },
  {
    id: 'cyber-hunter',
    title: 'Cyber Hunter: Neon City',
    developer: 'GHI Studios',
    price: 29.99,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'RPG',
    tags: ['Cyberpunk', 'Open World', 'Action'],
    playersOnline: '8,201',
    rating: 4.7
  },
  {
    id: 'stellar-blade',
    title: 'Stellar Blade X',
    developer: 'Nova Games',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Action',
    tags: ['Sci-Fi', 'Combat', 'Singleplayer'],
    playersOnline: '3,102',
    rating: 4.8
  },
  {
    id: 'neon-drifter',
    title: 'Neon Drifter',
    developer: 'Indie Dev Co',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Indie',
    tags: ['Racing', 'Synthwave', 'Arcade'],
    playersOnline: '1,540',
    rating: 4.5
  },
  {
    id: 'fantasy-quest',
    title: 'Elden Quest: Shadows',
    developer: 'Mythic Studios',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'RPG',
    tags: ['Dark Fantasy', 'Souls-like', 'Co-op'],
    playersOnline: '45,912',
    rating: 4.9
  }
];
