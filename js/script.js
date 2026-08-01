/*
  Mayari SMP - script.js (Fully Optimized)
  Contact: Astronawta#0012
  
  Optimizations:
  - API Caching (60s TTL)
  - Rate limiting & debouncing
  - Error boundaries
  - Loading states
  - Lazy loading
  - Event delegation
  - DocumentFragment for DOM batching
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
      { inGameName: "Lucius028",  rank: "Owner", skinUrlOrPathToFile: "", rankColor: "rgba(255, 3, 3, 1)" },
      { inGameName: "xHyunjaee", rank: "Owner", skinUrlOrPathToFile: "", rankColor: "rgba(255, 3, 3, 1)" },
      { inGameName: "Efzie", rank: "Owner", skinUrlOrPathToFile: "", rankColor: "rgba(255, 3, 3, 1)" },
      {
        inGameName: "Arcain7", rank: "Manager",
        skinUrlOrPathToFile: "images/staffs/arcain7.png",
        rankColor: "#eff546"
      },
      { inGameName: "Andrae_",   rank: "Developer", skinUrlOrPathToFile: "", rankColor: "#A230CF" },
      {
        inGameName: "_Rizk", rank: "Manager",
        rankColor: "#eff546"
      }
    ],
    admins: [
      { inGameName: "IamATOMIC",   rank: "Admin", skinUrlOrPathToFile: "", rankColor: "" },
      { inGameName: "Mingxiao19", rank: "Admin", skinUrlOrPathToFile: "", rankColor: "" },
      {
        inGameName: "Mizzu", rank: "Admin",
        skinUrlOrPathToFile: "images/staffs/mizzuu.png",
        rankColor: ""
      },
      { inGameName: "Nathxieee",  rank: "Admin", skinUrlOrPathToFile: "", rankColor: "" },
    ],
    moderators: [
      {
        inGameName: "bastapasta", rank: "Moderator",
        rankColor: ""
      },
      {
        inGameName: "RyuuBloo11", rank: "Moderator",
        rankColor: ""
      }
    ],
    helpers: [
      { inGameName: "Crisrion1", rank: "Helper", skinUrlOrPathToFile: "images/staffs/crisrion1.png", rankColor: "" },
      { inGameName: "JEI",  rank: "Helper", skinUrlOrPathToFile: "images/staffs/jei.png", rankColor: "" },
      { inGameName: "Onze",  rank: "Helper", skinUrlOrPathToFile: "", rankColor: "" },
      { inGameName: ".Ashlengleng",  rank: "Helper", skinUrlOrPathToFile: "", rankColor: "" },
      { inGameName: "Zinniee",  rank: "Helper", skinUrlOrPathToFile: "", rankColor: "" }
    ],
    builders: [
      { inGameName: "Ruenyx", rank: "Helper", skinUrlOrPathToFile: "", rankColor: "" },
      { inGameName: "Amazingwlf", rank: "Helper", skinUrlOrPathToFile: "", rankColor: "" },
      { inGameName: "Joseph", rank: "Helper", skinUrlOrPathToFile: "", rankColor: "" },
      { inGameName: "Nightangle", rank: "Helper", skinUrlOrPathToFile: "", rankColor: "" }
    ]
  }
};

// ============================================================
// CONSTANTS & CACHE
// ============================================================
const DEFAULT_SKIN_UUID = "ec561538f3fd461daff5086b22154bce";
const API_CACHE_TTL     = 60_000;
const apiCache          = new Map();
const skinCache         = new Map();

// ============================================================
// UTILITY: Debounce
// ============================================================
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

// ============================================================
// UTILITY: Throttle
// ============================================================
const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ============================================================
// CACHE-AWARE FETCH
// ============================================================
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

// ============================================================
// API HELPERS
// ============================================================
const getDiscordOnlineUsers = async () => {
  try {
    const data = await fetchWithCache(
      `https://discord.com/api/guilds/${config.serverInfo.discordServerID}/widget.json`
    );
    return data?.presence_count ?? "None";
  } catch {
    return "None";
  }
};

const getMinecraftOnlinePlayer = async () => {
  try {
    const data = await fetchWithCache(
      `https://api.mcsrvstat.us/3/${config.serverInfo.serverIp}`
    );
    if (!data?.online) return "Offline";
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
    return data?.id ?? null;
  } catch {
    return null;
  }
};

const getSkinByUsername = async (username) => {
  if (skinCache.has(username)) return skinCache.get(username);
  
  try {
    const uuid    = (await getUuidByUsername(username)) ?? DEFAULT_SKIN_UUID;
    const url     = `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${uuid}`;
    
    try {
      const res = await fetch(url);
      const skinUrl = res.status === 400
        ? `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${DEFAULT_SKIN_UUID}`
        : url;
      skinCache.set(username, skinUrl);
      return skinUrl;
    } catch {
      return `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${DEFAULT_SKIN_UUID}`;
    }
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
// ADMIN TEAM PAGE (with loading state)
// ============================================================
const renderAdminTeam = async () => {
  const atContent = document.querySelector(".at-content");
  if (!atContent) return;

  // Show loading state
  atContent.innerHTML = '<p class="loading" style="text-align: center; padding: 2rem; color: #999;">Loading staff team...</p>';

  try {
    const teams = Object.entries(config.adminTeamPage);
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

        const userDiv = document.createElement("div");
        userDiv.classList.add("user");

        const img = document.createElement("img");
        img.src         = skin;
        img.alt         = user.inGameName;
        img.loading     = "lazy";
        img.decoding    = "async"; // Non-blocking decode

        const nameEl = document.createElement("h5");
        nameEl.classList.add("name");
        nameEl.textContent = user.inGameName;

        const rankEl = document.createElement("p");
        rankEl.classList.add("rank", team);
        rankEl.style.background = rankColor;
        rankEl.textContent = user.rank;

        userDiv.append(img, nameEl, rankEl);
        usersEl.appendChild(userDiv);
      }

      groupEl.appendChild(usersEl);
      fragment.appendChild(groupEl);
    }

    atContent.innerHTML = '';
    atContent.appendChild(fragment);
  } catch (error) {
    console.error("Admin team render error:", error);
    atContent.innerHTML = '<p style="color: #ff6b6b; padding: 2rem;">Failed to load staff team. Please refresh the page.</p>';
  }
};

// ============================================================
// CONTACT PAGE
// ============================================================
const initializeContact = async () => {
  const contactForm = document.querySelector(".contact-form");
  const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");
  const discordEl = document.querySelector(".discord-online-users");

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
// MAIN ROUTER (with error boundary)
// ============================================================
const setDataFromConfigToHtml = async () => {
  try {
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
  } catch (error) {
    console.error("Critical error in setDataFromConfigToHtml:", error);
    // Fallback: at least show the navbar
    initializeNavbar();
  }
};

setDataFromConfigToHtml();

// ============================================================
// ACCORDION — event delegation
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
// PARALLAX (throttled for performance)
// ============================================================
let ticking = false;
const updateParallax = throttle(() => {
  document.querySelectorAll(".parallax-element").forEach(el => {
    const dist = window.scrollY - el.offsetTop;
    if (dist > -500 && dist < 500) {
      el.style.transform = `translateY(${dist * 0.5}px)`;
    }
  });
}, 16); // ~60fps

window.addEventListener("scroll", updateParallax, { passive: true });

// ============================================================
// HOVER ANIMATIONS
// ============================================================
document.querySelectorAll(".game").forEach(game => {
  game.addEventListener("mouseenter", () => game.style.transform = "translateY(-10px)");
  game.addEventListener("mouseleave", () => game.style.transform = "translateY(0)");
});

// ============================================================
// SERVICE WORKER REGISTRATION (offline support)
// ============================================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.log('Service Worker registration failed:', err);
    });
  });
}

// ============================================================
// DARK MODE SUPPORT
// ============================================================
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDark.matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

prefersDark.addEventListener('change', (e) => {
  document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
});

// ============================================================
// ANALYTICS (Google Tag Manager)
// ============================================================
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
// Replace with your actual GA ID
// gtag('config', 'G-XXXXXX');

// ============================================================
// LAZY LOAD NON-CRITICAL RESOURCES
// ============================================================
window.addEventListener('load', () => {
  // Load non-critical scripts after page is ready
  const analyticScript = document.createElement('script');
  analyticScript.src = 'js/analytics.js';
  analyticScript.async = true;
  document.body.appendChild(analyticScript);
});