import { config, DEFAULT_SKIN_UUID } from "./config";

const API_CACHE_TTL = 60_000;
const apiCache = new Map();
const skinCache = new Map();

const fetchWithCache = async (url) => {
  const cached = apiCache.get(url);
  if (cached && Date.now() - cached.ts < API_CACHE_TTL) return cached.data;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    apiCache.set(url, { data, ts: Date.now() });
    return data;
  } catch (error) {
    console.error(`Fetch failed for ${url}:`, error);
    return null;
  }
};

export const getDiscordOnlineUsers = async () => {
  try {
    const data = await fetchWithCache(
      `https://discord.com/api/guilds/${config.serverInfo.discordServerID}/widget.json`
    );
    return data?.presence_count ?? "None";
  } catch {
    return "None";
  }
};

export const getMinecraftOnlinePlayer = async () => {
  try {
    const data = await fetchWithCache(`https://api.mcsrvstat.us/3/${config.serverInfo.serverIp}`);
    if (!data?.online) return "Offline";
    return data.players?.online ?? 0;
  } catch {
    return "None";
  }
};

const getUuidByUsername = async (username) => {
  try {
    const data = await fetchWithCache(`https://api.minetools.eu/uuid/${username}`);
    return data?.id ?? null;
  } catch {
    return null;
  }
};

export const getSkinByUsername = async (username) => {
  if (skinCache.has(username)) return skinCache.get(username);

  try {
    const uuid = (await getUuidByUsername(username)) ?? DEFAULT_SKIN_UUID;
    const url = `https://visage.surgeplay.com/${config.userSkinTypeInAdminTeam}/512/${uuid}`;

    try {
      const res = await fetch(url);
      const skinUrl =
        res.status === 400
          ? `https://visage.surgeplay.com/${config.userSkinTypeInAdminTeam}/512/${DEFAULT_SKIN_UUID}`
          : url;
      skinCache.set(username, skinUrl);
      return skinUrl;
    } catch {
      return `https://visage.surgeplay.com/${config.userSkinTypeInAdminTeam}/512/${DEFAULT_SKIN_UUID}`;
    }
  } catch (e) {
    console.error(`Skin fetch error for ${username}:`, e);
    return `https://visage.surgeplay.com/${config.userSkinTypeInAdminTeam}/512/${DEFAULT_SKIN_UUID}`;
  }
};
