import axios from "axios";
import creaturesIcon from "../assets/icons/Creatures.png";
import monstersIcon from "../assets/icons/Monsters.png";
import materialsIcon from "../assets/icons/Materials.png";
import equipmentIcon from "../assets/icons/Equipment.png";
import treasureIcon from "../assets/icons/Treasure.png";

// L'ancien domaine botw-compendium.herokuapp.com (API v2) répond 410 Gone :
// l'API est désormais servie en v3 sur api.hyrule-compendium.com
export const API_URL = "https://api.hyrule-compendium.com/v3";

export const GAMES = {
  botw: { label: "BOTW", title: "Breath of the Wild" },
  totk: { label: "TOTK", title: "Tears of the Kingdom" },
};

// Ordre et chemins des catégories utilisés par la barre de navigation et les routes
export const CATEGORIES = [
  { id: "creatures", label: "Creatures", path: "/Creatures", icon: creaturesIcon },
  { id: "monsters", label: "Monsters", path: "/Monsters", icon: monstersIcon },
  { id: "materials", label: "Materials", path: "/Materials", icon: materialsIcon },
  { id: "equipment", label: "Equipment", path: "/Equipment", icon: equipmentIcon },
  { id: "treasure", label: "Treasure", path: "/Treasure", icon: treasureIcon },
];

const client = axios.create({ baseURL: API_URL, timeout: 20000 });

// Cache mémoire des requêtes : on ne recharge pas une catégorie déjà consultée
const cache = new Map();

function get(url, params = {}) {
  const key = `${url}?${new URLSearchParams(params)}`;
  if (!cache.has(key)) {
    const request = client
      .get(url, { params })
      .then((response) => response.data.data)
      .catch((error) => {
        cache.delete(key); // une erreur ne doit pas rester en cache
        throw error;
      });
    cache.set(key, request);
  }
  return cache.get(key);
}

const tagMasterMode = (entry) => entry && { ...entry, master_mode: true };

export const getCategory = (category, game) =>
  get(`/compendium/category/${category}`, { game });

export const getEntry = (id, game) => get(`/compendium/entry/${id}`, { game });

export const getAllEntries = (game) => get("/compendium/all", { game });

// Le Master Mode n'existe que dans Breath of the Wild
export const getMasterModeEntries = () =>
  get("/compendium/master_mode/all").then((entries) => entries.map(tagMasterMode));

export const getMasterModeEntry = (id) =>
  get(`/compendium/master_mode/entry/${id}`).then(tagMasterMode);

// L'API des régions ne couvre que la carte de Breath of the Wild
export const getRegions = () => get("/regions/all");

export const isNotFound = (error) => error?.response?.status === 404;

export const getCategoryInfo = (categoryId) =>
  CATEGORIES.find((category) => category.id === categoryId);

export const entryPath = (entry) => {
  const category = getCategoryInfo(entry.category) ?? CATEGORIES[1];
  return `${category.path}/${entry.master_mode ? "master/" : ""}${entry.id}`;
};

export const formatId = (id) => `#${String(id).padStart(3, "0")}`;

export const favoriteKey = (entry, game) =>
  `${entry.master_mode ? "botw" : game}-${entry.master_mode ? "master-" : ""}${entry.id}`;

export const SORT_CHOICES = ["Number", "Name"];

export function sortEntries(entries, { choice, descending }) {
  const sorted = [...entries].sort((a, b) =>
    choice === "Name" ? a.name.localeCompare(b.name) : a.id - b.id
  );
  return descending ? sorted.reverse() : sorted;
}
