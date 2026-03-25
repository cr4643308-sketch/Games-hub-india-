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

export interface HostingPlan {
  id: string;
  name: string;
  price: string;
  ram: string;
  cpu: string;
  nvme: string;
  isPopular?: boolean;
  isPremium?: boolean;
  isCustom?: boolean;
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

export const HOSTING_PLANS: HostingPlan[] = [
  { id: 'dirt', name: 'Dirt Plan', price: '₹39', ram: '2GB', cpu: '150%', nvme: '15GB' },
  { id: 'wood', name: 'Wood Plan', price: '₹69', ram: '4GB', cpu: '200%', nvme: '20GB' },
  { id: 'stone', name: 'Stone Plan', price: '₹119', ram: '6GB', cpu: '250%', nvme: '30GB' },
  { id: 'iron', name: 'Iron Plan', price: '₹179', ram: '8GB', cpu: '300%', nvme: '40GB' },
  { id: 'gold', name: 'Gold Plan', price: '₹269', ram: '12GB', cpu: '350%', nvme: '60GB' },
  { id: 'emerald', name: 'Emerald Plan', price: '₹389', ram: '16GB', cpu: '400%', nvme: '100GB' },
  { id: 'diamond', name: 'Diamond Plan', price: '₹569', ram: '32GB', cpu: '800%', nvme: '150GB', isPopular: true },
  { id: 'netherite', name: 'Netherite Plan', price: '₹999', ram: '64GB', cpu: '600%', nvme: '200GB' },
  { id: 'bedrock', name: 'Bedrock Plan', price: '₹1799', ram: '128GB', cpu: '800%', nvme: '500GB', isPremium: true },
  { id: 'barrier', name: 'Barrier Plan', price: '₹???', ram: 'Custom', cpu: 'Custom', nvme: 'Custom', isCustom: true },
];
