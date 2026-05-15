// Seed data for demo / fallback when backend is unavailable

// ─── PLANT SPECIES CATALOG (50+ species across 6 categories) ───────────────

export const PLANT_CATALOG = {
  Vegetables: [
    { species: 'Tomato',     emoji: '🍅', color: '#e06060', days: 90,  water: 2, location: 'outdoor' },
    { species: 'Potato',     emoji: '🥔', color: '#d4a843', days: 70,  water: 4, location: 'outdoor' },
    { species: 'Pepper',     emoji: '🌶️', color: '#e04040', days: 80,  water: 3, location: 'outdoor' },
    { species: 'Carrot',     emoji: '🥕', color: '#e8853a', days: 75,  water: 3, location: 'outdoor' },
    { species: 'Cucumber',   emoji: '🥒', color: '#5aad6a', days: 60,  water: 2, location: 'outdoor' },
    { species: 'Spinach',    emoji: '🥬', color: '#3a9a4a', days: 45,  water: 2, location: 'outdoor' },
    { species: 'Lettuce',    emoji: '🥗', color: '#6abd6a', days: 50,  water: 2, location: 'outdoor' },
    { species: 'Kale',       emoji: '🥦', color: '#4a7c3a', days: 55,  water: 2, location: 'outdoor' },
    { species: 'Broccoli',   emoji: '🥦', color: '#4a7c3a', days: 80,  water: 3, location: 'outdoor' },
    { species: 'Zucchini',   emoji: '🫑', color: '#5aad5a', days: 55,  water: 3, location: 'outdoor' },
    { species: 'Beans',      emoji: '🫘', color: '#8aad5a', days: 65,  water: 3, location: 'outdoor' },
    { species: 'Peas',       emoji: '🫛', color: '#6ab85a', days: 60,  water: 2, location: 'outdoor' },
    { species: 'Onion',      emoji: '🧅', color: '#c8a860', days: 100, water: 4, location: 'outdoor' },
    { species: 'Garlic',     emoji: '🧄', color: '#d4c890', days: 240, water: 5, location: 'outdoor' },
    { species: 'Radish',     emoji: '🌱', color: '#e06080', days: 30,  water: 2, location: 'outdoor' },
    { species: 'Cabbage',    emoji: '🥬', color: '#5a9a5a', days: 90,  water: 3, location: 'outdoor' },
    { species: 'Eggplant',   emoji: '🍆', color: '#8a5ab8', days: 80,  water: 3, location: 'outdoor' },
    { species: 'Corn',       emoji: '🌽', color: '#e8c83a', days: 80,  water: 4, location: 'outdoor' },
    { species: 'Pumpkin',    emoji: '🎃', color: '#e87830', days: 100, water: 4, location: 'outdoor' },
  ],
  Fruits: [
    { species: 'Strawberry', emoji: '🍓', color: '#e04060', days: 60,  water: 2, location: 'outdoor' },
    { species: 'Blueberry',  emoji: '🫐', color: '#6060c0', days: 365, water: 3, location: 'outdoor' },
    { species: 'Watermelon', emoji: '🍉', color: '#e05060', days: 80,  water: 4, location: 'outdoor' },
    { species: 'Lemon',      emoji: '🍋', color: '#e8d838', days: 365, water: 3, location: 'outdoor' },
    { species: 'Mango',      emoji: '🥭', color: '#e88838', days: 365, water: 4, location: 'outdoor' },
  ],
  Herbs: [
    { species: 'Basil',      emoji: '🌿', color: '#4aad5a', days: 60,  water: 2, location: 'indoor' },
    { species: 'Mint',       emoji: '🌿', color: '#5aad6a', days: 90,  water: 2, location: 'indoor' },
    { species: 'Rosemary',   emoji: '🌿', color: '#5a8a6a', days: 180, water: 5, location: 'outdoor' },
    { species: 'Thyme',      emoji: '🌿', color: '#7aad7a', days: 150, water: 5, location: 'outdoor' },
    { species: 'Cilantro',   emoji: '🌿', color: '#5aad5a', days: 50,  water: 2, location: 'outdoor' },
    { species: 'Parsley',    emoji: '🌿', color: '#4a9a4a', days: 70,  water: 2, location: 'indoor' },
    { species: 'Lavender',   emoji: '💜', color: '#a080c0', days: 120, water: 7, location: 'outdoor' },
    { species: 'Sage',       emoji: '🌿', color: '#7a9a7a', days: 150, water: 6, location: 'outdoor' },
    { species: 'Dill',       emoji: '🌿', color: '#8aad5a', days: 70,  water: 3, location: 'outdoor' },
    { species: 'Chives',     emoji: '🌿', color: '#5a9a5a', days: 60,  water: 3, location: 'indoor' },
  ],
  Flowers: [
    { species: 'Sunflower',  emoji: '🌻', color: '#e8c838', days: 80,  water: 2, location: 'outdoor' },
    { species: 'Rose',       emoji: '🌹', color: '#e04060', days: 365, water: 3, location: 'outdoor' },
    { species: 'Marigold',   emoji: '🌼', color: '#e89838', days: 60,  water: 3, location: 'outdoor' },
    { species: 'Orchid',     emoji: '🌸', color: '#c878c0', days: 365, water: 7, location: 'indoor' },
    { species: 'Jasmine',    emoji: '🌸', color: '#f0e8d0', days: 365, water: 3, location: 'indoor' },
    { species: 'Daisy',      emoji: '🌼', color: '#f0f0e0', days: 90,  water: 3, location: 'outdoor' },
    { species: 'Tulip',      emoji: '🌷', color: '#e06080', days: 90,  water: 4, location: 'outdoor' },
    { species: 'Hibiscus',   emoji: '🌺', color: '#e04060', days: 365, water: 3, location: 'outdoor' },
  ],
  Houseplants: [
    { species: 'Monstera',   emoji: '🌿', color: '#2d7a4a', days: 365, water: 7,  location: 'indoor' },
    { species: 'SnakePlant', emoji: '🌵', color: '#4a7a5a', days: 365, water: 14, location: 'indoor' },
    { species: 'Pothos',     emoji: '🍃', color: '#5aad6a', days: 365, water: 7,  location: 'indoor' },
    { species: 'PeaceLily',  emoji: '🌸', color: '#d8e8d0', days: 365, water: 5,  location: 'indoor' },
    { species: 'AloeVera',   emoji: '🌵', color: '#6aad6a', days: 365, water: 14, location: 'indoor' },
    { species: 'SpiderPlant',emoji: '🌿', color: '#8ac87a', days: 365, water: 7,  location: 'indoor' },
    { species: 'FiddleLeaf', emoji: '🌿', color: '#3a7a3a', days: 365, water: 7,  location: 'indoor' },
    { species: 'ZZPlant',    emoji: '🌿', color: '#2a5a3a', days: 365, water: 14, location: 'indoor' },
    { species: 'Succulent',  emoji: '🪴', color: '#7aad7a', days: 365, water: 14, location: 'indoor' },
    { species: 'Cactus',     emoji: '🌵', color: '#6aad5a', days: 365, water: 21, location: 'indoor' },
    { species: 'Philodendron',emoji:'🌿', color: '#3a8a4a', days: 365, water: 7,  location: 'indoor' },
    { species: 'Begonia',    emoji: '🌸', color: '#e07878', days: 365, water: 3,  location: 'indoor' },
  ],
  Trees: [
    { species: 'OliveTree',  emoji: '🫒', color: '#7aad5a', days: 730, water: 7, location: 'outdoor' },
    { species: 'LemonTree',  emoji: '🍋', color: '#e8d838', days: 730, water: 5, location: 'outdoor' },
    { species: 'BambooPlant',emoji: '🎋', color: '#5aad4a', days: 365, water: 3, location: 'outdoor' },
    { species: 'BonsaiTree', emoji: '🌳', color: '#4a7a4a', days: 365, water: 3, location: 'indoor' },
  ],
}

// Flat list for dropdowns
export const ALL_SPECIES = Object.values(PLANT_CATALOG).flat()

// Growth days lookup used by backend-compatible logic
export const SPECIES_GROWTH_DAYS = Object.fromEntries(
  ALL_SPECIES.map(p => [p.species, p.days])
)

export const mockPlants = [
  {
    id: '1',
    plant_name: 'Monstera',
    species: 'Tomato',
    date_planted: '2026-03-01',
    health_score: 88,
    growth_stage: 'Flowering',
    estimated_harvest_days: 18,
    watering_frequency: 3,
    last_watered: '2026-05-12',
    location: 'indoor',
    emoji: '🌿',
    color: '#4a7c59',
  },
  {
    id: '2',
    plant_name: 'Basil Garden',
    species: 'Pepper',
    date_planted: '2026-04-10',
    health_score: 95,
    growth_stage: 'Vegetative',
    estimated_harvest_days: 32,
    watering_frequency: 2,
    last_watered: '2026-05-13',
    location: 'outdoor',
    emoji: '🌱',
    color: '#6aad7a',
  },
  {
    id: '3',
    plant_name: 'Golden Potato',
    species: 'Potato',
    date_planted: '2026-02-15',
    health_score: 72,
    growth_stage: 'Harvest Ready',
    estimated_harvest_days: 0,
    watering_frequency: 4,
    last_watered: '2026-05-10',
    location: 'outdoor',
    emoji: '🥔',
    color: '#d4a843',
  },
  {
    id: '4',
    plant_name: 'Cherry Blossom',
    species: 'Tomato',
    date_planted: '2026-04-25',
    health_score: 91,
    growth_stage: 'Seedling',
    estimated_harvest_days: 55,
    watering_frequency: 2,
    last_watered: '2026-05-14',
    location: 'indoor',
    emoji: '🌸',
    color: '#f09090',
  },
]

export const mockAlerts = [
  {
    id: 'a1',
    type: 'watering',
    urgency: 'high',
    plant_name: 'Golden Potato',
    message: 'Overdue for watering by 2 days',
    time: '2 hrs ago',
    icon: '💧',
  },
  {
    id: 'a2',
    type: 'harvest',
    urgency: 'info',
    plant_name: 'Golden Potato',
    message: 'Ready to harvest — peak ripeness window',
    time: 'Today',
    icon: '🌾',
  },
  {
    id: 'a3',
    type: 'disease',
    urgency: 'medium',
    plant_name: 'Monstera',
    message: 'Slight yellowing detected — check for overwatering',
    time: 'Yesterday',
    icon: '⚠️',
  },
  {
    id: 'a4',
    type: 'fertilizer',
    urgency: 'low',
    plant_name: 'Basil Garden',
    message: 'Fertilizer due in 3 days',
    time: '3 days',
    icon: '🌿',
  },
  {
    id: 'a5',
    type: 'sunlight',
    urgency: 'low',
    plant_name: 'Cherry Blossom',
    message: 'Low light exposure today — consider repositioning',
    time: 'This morning',
    icon: '☀️',
  },
]

export const mockClimate = {
  humidity: 62,
  temperature: 24,
  co2: 412,
  light: 78,
  airQuality: 91,
  soilMoisture: 55,
}

export const mockAnalytics = {
  growthData: [
    { week: 'W1', monstera: 12, basil: 8,  potato: 20, cherry: 5 },
    { week: 'W2', monstera: 18, basil: 15, potato: 28, cherry: 9 },
    { week: 'W3', monstera: 25, basil: 22, potato: 35, cherry: 14 },
    { week: 'W4', monstera: 32, basil: 30, potato: 42, cherry: 20 },
    { week: 'W5', monstera: 38, basil: 38, potato: 50, cherry: 28 },
    { week: 'W6', monstera: 45, basil: 44, potato: 55, cherry: 35 },
  ],
  healthHistory: [
    { day: 'Mon', score: 82 },
    { day: 'Tue', score: 85 },
    { day: 'Wed', score: 88 },
    { day: 'Thu', score: 84 },
    { day: 'Fri', score: 91 },
    { day: 'Sat', score: 89 },
    { day: 'Sun', score: 88 },
  ],
  riskScores: {
    diseaseRisk: 18,
    stressLevel: 22,
    harvestReadiness: 85,
    overallHealth: 87,
  },
}

// chatResponses is now sourced from chatKnowledge.js
export { chatResponses } from './chatKnowledge'

export const achievements = [
  { id: 1, name: 'First Sprout',     icon: '🌱', desc: 'Added your first plant',         earned: true  },
  { id: 2, name: 'Diagnosis Pro',   icon: '🔬', desc: 'Ran 5 AI diagnoses',              earned: true  },
  { id: 3, name: 'Care Streak',     icon: '🔥', desc: '7-day watering streak',           earned: true  },
  { id: 4, name: 'Harvest Moon',    icon: '🌾', desc: 'Harvested your first plant',      earned: false },
  { id: 5, name: 'Climate Master',  icon: '🌡️', desc: 'Maintained optimal climate 14d', earned: false },
  { id: 6, name: 'Eco Champion',    icon: '♻️', desc: 'Zero waste care for 30 days',    earned: false },
  { id: 7, name: 'Garden Sage',     icon: '🧙', desc: 'Chatted with AI 20 times',        earned: false },
  { id: 8, name: 'Full Bloom',      icon: '🌸', desc: 'All plants at 90%+ health',       earned: false },
]
