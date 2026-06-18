/*
  Mayari SMP - script.js (Optimized)
  Contact: Astronawta#0012
*/

// ============================================================
// CONFIG
// ============================================================
const config = {
  serverInfo: {
    serverLogoImageFileName: "logo.png",
    serverName: "Mayari SMP",
    serverIp: "play.mayari.space",
    discordServerID: "1424987498635067465"
  },
  userSKinTypeInAdminTeam: "bust",
  atGroupsDefaultColors: {
    leaders: "rgba(255, 124, 124, 0.5)",
    moderators: "#EE8711",
    helpers: "#4ADE21",
    builders: "#293DD6",
    admins: "#EC1317"
  },
  adminTeamPage: {
    leaders: [
      { inGameName: "Lucius028",  rank: "Owner",     skinUrlOrPathToFile: "", rankColor: "rgba(255, 3, 3, 1)" },
      { inGameName: "xHyunjaee", rank: "Owner",     skinUrlOrPathToFile: "", rankColor: "rgba(255, 3, 3, 1)" },
      {
        inGameName: "Arcain7", rank: "Manager",
        skinUrlOrPathToFile: "https://cdn.discordapp.com/attachments/1500508335571468480/1514344477530259497/custom-ava_3.png?ex=6a2b06b2&is=6a29b532&hm=4e7544555571edce31f099dede65e37f393370979e97aabb5ddd696426e65ca7&",
        rankColor: "#32D926"
      },
      { inGameName: "Andrae_",   rank: "Developer", skinUrlOrPathToFile: "", rankColor: "#A230CF" }
    ],
    admins: [
      { inGameName: "Xeroqqtt",   rank: "Admin", skinUrlOrPathToFile: "", rankColor: "" },
      { inGameName: "Mingxiao19", rank: "Admin", skinUrlOrPathToFile: "", rankColor: "" },
      {
        inGameName: "Mizzu", rank: "Admin",
        skinUrlOrPathToFile: "https://cdn.discordapp.com/attachments/1499821733853659186/1514345754414678056/custom-ava_4.png?ex=6a2b07e3&is=6a29b663&hm=df0615523680ce0f82608b30ea0390ece23780aea3084c99fbfdd4430db743c8&",
        rankColor: ""
      }
    ],
    moderators: [
      { inGameName: "Nathxieee",  rank: "Moderator", skinUrlOrPathToFile: "", rankColor: "" },
      {
        inGameName: "ssduction", rank: "Moderator",
        skinUrlOrPathToFile: "https://cdn.discordapp.com/attachments/1500508335571468480/1514343993520164975/custom-ava_2.png?ex=6a2b063f&is=6a29b4bf&hm=4455a98be25533c19e4e317ebb9cad1f843e24b9b72a1919ba07c9aad061f730&",
        rankColor: ""
      }
    ]
  }
  /*contactPage: { email: "@example.com" }*/
};

// ============================================================
// CONSTANTS & CACHE
// ============================================================
const DEFAULT_SKIN_UUID = "ec561538f3fd461daff5086b22154bce";
const API_CACHE_TTL     = 60_000; // 60 seconds
const apiCache          = new Map();
const skinCache         = new Map();

// ============================================================
// CACHE-AWARE FETCH
// ============================================================
const fetchWithCache = async (url) => {
  const cached = apiCache.get(url);
  if (cached && Date.now() - cached.ts < API_CACHE_TTL) return cached.data;

  const response = await fetch(url);
  const data     = await response.json();
  apiCache.set(url, { data, ts: Date.now() });
  return data;
};

// ============================================================
// API HELPERS
// ============================================================
const getDiscordOnlineUsers = async () => {
  try {
    const data = await fetchWithCache(
      `https://discord.com/api/guilds/${config.serverInfo.discordServerID}/widget.json`
    );
    return data.presence_count ?? "None";
  } catch {
    return "None";
  }
};

const getMinecraftOnlinePlayer = async () => {
  try {
    const data = await fetchWithCache(
      `https://api.mcsrvstat.us/3/${config.serverInfo.serverIp}`
    );
    if (!data.online) return "Offline";
    return data.players?.online ?? 0;
  } catch {
    return "None";
  }
};

const getUuidByUsername = async (username) => {
  try {
    const data = await fetchWithCache(
      `https://api.minetools.eu/uuid/${username}`
    );
    return data.id ?? null;
  } catch {
    return null;
  }
};

const getSkinByUsername = async (username) => {
  if (skinCache.has(username)) return skinCache.get(username);
  try {
    const uuid    = (await getUuidByUsername(username)) ?? DEFAULT_SKIN_UUID;
    const url     = `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${uuid}`;
    const res     = await fetch(url);
    const skinUrl = res.status === 400
      ? `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${DEFAULT_SKIN_UUID}`
      : url;
    skinCache.set(username, skinUrl);
    return skinUrl;
  } catch (e) {
    console.error(`Skin fetch error for ${username}:`, e);
    return `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${DEFAULT_SKIN_UUID}`;
  }
};

// ============================================================
// IP COPY
// ============================================================
const initCopyIp = () => {
  const btn   = document.querySelector(".copy-ip");
  const alert = document.querySelector(".ip-copied");
  if (!btn || !alert) return;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(config.serverInfo.serverIp);
      alert.textContent = "IP was successfully copied!";
      alert.classList.remove("error");
    } catch {
      alert.textContent = "An error has occurred!";
      alert.classList.add("error");
    }
    alert.classList.add("active");
    setTimeout(() => alert.classList.remove("active", "error"), 5000);
  });
};

// ============================================================
// NAVBAR (all pages)
// ============================================================
const initializeNavbar = () => {
  const serverNameEl = document.querySelector(".server-name");
  const logoEl       = document.querySelector(".logo-img");
  if (serverNameEl) serverNameEl.textContent = config.serverInfo.serverName;
  if (logoEl)       logoEl.src = `images/${config.serverInfo.serverLogoImageFileName}`;

  // Mobile hamburger
  const navbar    = document.querySelector(".navbar");
  const navLinks  = document.querySelector(".links");
  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navbar?.classList.toggle("active");
      navLinks?.classList.toggle("active");
    });
  }
};

// ============================================================
// HOME PAGE
// ============================================================
const initializeHome = async () => {
  initCopyIp();

  const logoHeader = document.querySelector(".logo-img-header");
  const serverIpEl = document.querySelector(".minecraft-server-ip");
  const discordEl  = document.querySelector(".discord-online-users");
  const mcEl       = document.querySelector(".minecraft-online-players");

  if (logoHeader) logoHeader.src = `images/${config.serverInfo.serverLogoImageFileName}`;
  if (serverIpEl) serverIpEl.textContent = config.serverInfo.serverIp;

  // Fetch Discord + Minecraft stats in parallel
  if (discordEl || mcEl) {
    const [discordCount, mcCount] = await Promise.all([
      getDiscordOnlineUsers(),
      getMinecraftOnlinePlayer()
    ]);
    if (discordEl) discordEl.textContent = discordCount;
    if (mcEl)      mcEl.textContent      = mcCount;
  }
};

// ============================================================
// RULES PAGE
// ============================================================
const initializeRules = () => {
  initCopyIp();
  const serverIpEl = document.querySelector(".minecraft-server-ip");
  if (serverIpEl) serverIpEl.textContent = config.serverInfo.serverIp;
};

// ============================================================
// ADMIN TEAM PAGE
// ============================================================
const renderAdminTeam = async () => {
  const atContent = document.querySelector(".at-content");
  if (!atContent) return;

  // Collect all members across all teams first
  const teams = Object.entries(config.adminTeamPage);

  // Fetch all skins in parallel across ALL teams at once
  const allMembers = teams.flatMap(([team, members]) =>
    members.map(user => ({ team, user }))
  );

  const skinResults = await Promise.all(
    allMembers.map(({ user }) =>
      user.skinUrlOrPathToFile
        ? Promise.resolve(user.skinUrlOrPathToFile)
        : getSkinByUsername(user.inGameName)
    )
  );

  // Build DOM using a DocumentFragment (one reflow instead of many)
  const fragment = document.createDocumentFragment();
  let skinIndex  = 0;

  for (const [team, members] of teams) {
    const groupEl = document.createElement("div");
    groupEl.classList.add("group", team);

    const title   = team.charAt(0).toUpperCase() + team.slice(1);
    const usersEl = document.createElement("div");
    usersEl.classList.add("users");

    const titleEl = document.createElement("h2");
    titleEl.classList.add("rank-title");
    titleEl.textContent = title;
    groupEl.appendChild(titleEl);

    for (const user of members) {
      const skin      = skinResults[skinIndex++];
      const rankColor = user.rankColor || config.atGroupsDefaultColors[team];

      const userDiv       = document.createElement("div");
      userDiv.classList.add("user");

      const img       = document.createElement("img");
      img.src         = skin;
      img.alt         = user.inGameName;
      img.loading     = "lazy"; // lazy load skins

      const nameEl    = document.createElement("h5");
      nameEl.classList.add("name");
      nameEl.textContent = user.inGameName;

      const rankEl    = document.createElement("p");
      rankEl.classList.add("rank", team);
      rankEl.style.background = rankColor;
      rankEl.textContent      = user.rank;

      userDiv.append(img, nameEl, rankEl);
      usersEl.appendChild(userDiv);
    }

    groupEl.appendChild(usersEl);
    fragment.appendChild(groupEl);
  }

  atContent.appendChild(fragment);
};

// ============================================================
// CONTACT PAGE
// ============================================================
const initializeContact = async () => {
  const contactForm              = document.querySelector(".contact-form");
  const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");
  const discordEl                = document.querySelector(".discord-online-users");

  if (contactForm && config.contactPage?.email) {
    contactForm.action = `https://formsubmit.co/${config.contactPage.email}`;
  }
  if (inputWithLocationAfterSubmit) {
    inputWithLocationAfterSubmit.value = location.href;
  }
  if (discordEl) {
    discordEl.textContent = await getDiscordOnlineUsers();
  }
};

// ============================================================
// ROUTER
// ============================================================
const setDataFromConfigToHtml = async () => {
  initializeNavbar();

  const path = location.pathname;

  if (path === "/" || path.includes("index")) {
    await initializeHome();
  } else if (path.includes("rules")) {
    initializeRules();
  } else if (path.includes("admin-team")) {
    await renderAdminTeam();
  } else if (path.includes("contact")) {
    await initializeContact();
  }
};

setDataFromConfigToHtml();

// ============================================================
// ACCORDION — event delegation (1 listener instead of N)
// ============================================================
const accordion = document.querySelector(".faqList");
if (accordion) {
  accordion.addEventListener("click", (e) => {
    const header = e.target.closest(".accordion-item-header");
    if (!header) return;

    header.classList.toggle("active");
    const body = header.nextElementSibling;
    body.style.maxHeight = header.classList.contains("active")
      ? body.scrollHeight + "px"
      : "0px";
  });
}

// ============================================================
// SCROLL ANIMATIONS — single merged IntersectionObserver
// ============================================================
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    if (el.classList.contains("survival-section") || el.classList.contains("who-we-are-section")) {
      el.style.animation = "fadeInUp 0.8s ease-out forwards";
    } else {
      el.classList.add("visible");
    }

    scrollObserver.unobserve(el);
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll(
  ".scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-zoom, .stagger-item, .survival-section, .who-we-are-section"
).forEach(el => scrollObserver.observe(el));

// ============================================================
// STAGGERED ANIMATION DELAYS
// ============================================================
document.querySelectorAll(".stagger-item").forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});

// ============================================================
// PARALLAX
// ============================================================
let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  window.requestAnimationFrame(() => {
    document.querySelectorAll(".parallax-element").forEach(el => {
      const dist = window.scrollY - el.offsetTop;
      if (dist > -500 && dist < 500) {
        el.style.transform = `translateY(${dist * 0.5}px)`;
      }
    });
    ticking = false;
  });
  ticking = true;
});

// ============================================================
// HOVER ANIMATIONS
// ============================================================
document.querySelectorAll(".game").forEach(game => {
  game.addEventListener("mouseenter", () => game.style.transform = "translateY(-10px)");
  game.addEventListener("mouseleave", () => game.style.transform = "translateY(0)");
});
