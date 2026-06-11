/*
Configuration
------------------------
If something doesn't work please contact me on discord (Astronawta#0012).
*/

const config = {
    serverInfo: {
        serverLogoImageFileName: "logo.png", /*This is a file name for logo in /images/ (If you upload new logo with other name, you must change this value)*/
        serverName: "Mayari SMP", /*Server name*/
        serverIp: "play.mayari.space", /*Server IP (if you want to add online user counter, you must have true the enable-status and enable-query of server.properties)*/
        discordServerID: "1424987498635067465" /*Your server ID (if you want to add online user counter, you must have enabled Discord server widget)*/
    },

    /*Admin-Team
    ------------
    If you want to create new group, you must add this structure to adminTeamPage:
    <nameOfGroup>: [
        {
            inGameName: "",
            rank: "Owner",
            skinUrlOrPathToFile: "",
            rankColor: ""
        },
    ]
    then you must add this group with same name to atGroupsDefaultColors and set the color you want for the group.
    You can also set a special color for a specific user, just put it in the rankColor of that user.

    All skins for original players are generate automaticaly. If you want to add skins to warez players, yout must add url for skin to skinUrlOrPathToFile
        {
            inGameName: "",  <--- In-Game name
            rank: "Owner",  <-- rank
            skinUrlOrPathToFile: "",  <-- url or file path for skin image for warez players (if you have original minecraft leave it be empty)
            rankColor: "rgba(255, 3, 3, 1)"  <-- special rank color
        },

    If you want to change skin type replace userSKinTypeInAdminTeam with something you want from array in comments
    */
    userSKinTypeInAdminTeam: "bust", /*[full, bust, head, face, front, frontFull, skin]*/
    atGroupsDefaultColors: {
        leaders: "rgba(255, 124, 124, 0.5)",
        moderators: "#EE8711",
        helpers: "#4ADE21",
        builders: "#293DD6",
        admins: "#EC1317"
    },
    adminTeamPage: {
        leaders: [
            {
                inGameName: "Lucius028",
                rank: "Owner",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(255, 3, 3, 1)"
            },
            {
                inGameName: "xHyunjaee",
                rank: "Owner",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(255, 3, 3, 1)"
            },
            {
                inGameName: "Arcain7",
                rank: "Manager",
                skinUrlOrPathToFile: "https://cdn.discordapp.com/attachments/1500508335571468480/1514344477530259497/custom-ava_3.png?ex=6a2b06b2&is=6a29b532&hm=4e7544555571edce31f099dede65e37f393370979e97aabb5ddd696426e65ca7&",
                rankColor: "#32D926"
            },
            {
                inGameName: "Andrae_",
                rank: "Developer",
                skinUrlOrPathToFile: "",
                rankColor: "#A230CF"
            }
        ],
        admins: [
            {
                inGameName: "Xeroqqtt",
                rank: "Admin",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "Mingxiao19",
                rank: "Admin",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "Mizzu",
                rank: "Admin",
                skinUrlOrPathToFile: "https://cdn.discordapp.com/attachments/1499821733853659186/1514345754414678056/custom-ava_4.png?ex=6a2b07e3&is=6a29b663&hm=df0615523680ce0f82608b30ea0390ece23780aea3084c99fbfdd4430db743c8&",
                rankColor: ""
            }
        ],
        moderators: [
            {
                inGameName: "Nathxieee",
                rank: "Moderator",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "ssduction",
                rank: "Moderator",
                skinUrlOrPathToFile: "https://cdn.discordapp.com/attachments/1500508335571468480/1514343993520164975/custom-ava_2.png?ex=6a2b063f&is=6a29b4bf&hm=4455a98be25533c19e4e317ebb9cad1f843e24b9b72a1919ba07c9aad061f730&",
                rankColor: ""
            }
        ]
        /*helpers: [
            {
                inGameName: "",
                rank: "Helper++",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "",
                rank: "Helper++",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "",
                rank: "Helper+",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "",
                rank: "Helper+",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "",
                rank: "Helper",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "",
                rank: "Helper",
                skinUrlOrPathToFile: "",
                rankColor: ""
            }
        ],
        builders: [
            {
                inGameName: "",
                rank: "Builder++",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "",
                rank: "Builder++",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "",
                rank: "Builder+",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "",
                rank: "Builder+",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "",
                rank: "Builder",
                skinUrlOrPathToFile: "",
                rankColor: ""
            },
            {
                inGameName: "",
                rank: "Builder",
                skinUrlOrPathToFile: "",
                rankColor: ""
            }
        ]*/
    },

    /*
    Contact form
    ------------
    To activate, you need to send the first email via the contact form and confirm it in the email.
    Emails are sent via https://formsubmit.co/
    */
    /*contactPage: {
        email: "@example.com"
    }*/
}

/*If you want to change website color go to /css/global.css and in :root {} is a color pallete (don't change names of variables, change only values)*/
















/*If you want everything to work as it should and you don't understand what is written here, don't touch it :D*/


/*Mobile navbar (open, close)*/
const navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelector(".links");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    navbarLinks.classList.toggle("active");
})

/*FAQs*/
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", () => {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;

        if(accordionItemHeader.classList.contains("active")) accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        else accordionItemBody.style.maxHeight = "0px";
    });
});

/*Config navbar*/
const serverName = document.querySelector(".server-name");
const serverLogo = document.querySelector(".logo-img");
/*Config header*/
const serverIp = document.querySelector(".minecraft-server-ip");
const serverLogoHeader = document.querySelector(".logo-img-header");
const discordOnlineUsers = document.querySelector(".discord-online-users");
const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");
/*Config contact*/
const contactForm = document.querySelector(".contact-form");
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");

const getDiscordOnlineUsers = async () => {
    try {
        const discordServerId = config.serverInfo.discordServerID;

        const apiWidgetUrl = `https://discord.com/api/guilds/${discordServerId}/widget.json`;
        let response = await fetch(apiWidgetUrl);
        let data = await response.json();

        if(!data.presence_count) return "None";
        else return (await data.presence_count);
    } catch (e) {
        return "None";
    }
}

const getMinecraftOnlinePlayer = async () => {
    try {
        const serverIp = config.serverInfo.serverIp;

        const apiUrl = `https://api.mcsrvstat.us/3/${serverIp}`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        // v3 uses data.players.online same as v2, but check online status first
        if (!data.online) return "Offline";
        return data.players?.online ?? 0;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

const getUuidByUsername = async (username) => {
    try {
        const usernameToUuidApi = `https://api.minetools.eu/uuid/${username}`;
        let response = await fetch(usernameToUuidApi);
        let data = await response.json();

        return data.id;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

const getSkinByUuid = async (username) => {
    try {
        const skinByUuidApi = `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${await getUuidByUsername(username)}`;
        let response = await fetch(skinByUuidApi);

        if(response.status === 400) return `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/ec561538f3fd461daff5086b22154bce`;
        else return skinByUuidApi;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

/*IP copy only works if you have HTTPS on your website*/
const copyIp = () => {
    const copyIpButton = document.querySelector(".copy-ip");
    const copyIpAlert = document.querySelector(".ip-copied");

    copyIpButton.addEventListener("click", () => {
        try {
            navigator.clipboard.writeText(config.serverInfo.serverIp);
    
            copyIpAlert.classList.add("active");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
            }, 5000);
        } catch (e) {
            console.log(e);
            copyIpAlert.innerHTML = "An error has occurred!";
            copyIpAlert.classList.add("active");
            copyIpAlert.classList.add("error");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
                copyIpAlert.classList.remove("error");
            }, 5000);
        }
    })
}

const setDataFromConfigToHtml = async () => {
    /*Set config data to navbar*/
    serverName.innerHTML = config.serverInfo.serverName;
    serverLogo.src = `images/` + config.serverInfo.serverLogoImageFileName;

    /*Set config data to header*/
    serverIp.innerHTML = config.serverInfo.serverIp;

    let locationPathname = location.pathname;

    if(locationPathname == "/" || locationPathname.includes("index")) {
        copyIp();
        /*Set config data to header*/
        serverLogoHeader.src = `images/` + config.serverInfo.serverLogoImageFileName;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayer();
    } else if(locationPathname.includes("rules")) {
        copyIp();
    }
    else if(locationPathname.includes("admin-team")) {
        for (let team in config.adminTeamPage) {
            const atContent = document.querySelector(".at-content");
            
            const group = document.createElement("div");
            group.classList.add("group");
            group.classList.add(team);

            const groupSchema = `
                <h2 class="rank-title">${team.charAt(0).toUpperCase() + team.slice(1)}</h2>
                <div class="users">
                </div>
            `;

            group.innerHTML = groupSchema;

            atContent.appendChild(group);

            for (let j = 0; j < config.adminTeamPage[team].length; j++) {
                let user = config.adminTeamPage[team][j];
                const group = document.querySelector("." + team + " .users");

                const userDiv = document.createElement("div");
                userDiv.classList.add("user");

                let userSkin = config.adminTeamPage[team][j].skinUrlOrPathToFile;

                if(userSkin == "") userSkin = await getSkinByUuid(user.inGameName);
                let rankColor = config.atGroupsDefaultColors[team];

                if(user.rankColor != "") {
                    rankColor = user.rankColor;
                }

                const userDivSchema = `
                    <img src="${await (userSkin)}" alt="${user.inGameName}">
                    <h5 class="name">${user.inGameName}</h5>
                    <p class="rank ${team}" style="background: ${rankColor}">${user.rank}</p>  
                `;

                userDiv.innerHTML = userDivSchema;
                group.appendChild(userDiv);
            }
        }
    } else if(locationPathname.includes("contact")) {
        contactForm.action = `https://formsubmit.co/${config.contactPage.email}`;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        inputWithLocationAfterSubmit.value = location.href;
    }
}

setDataFromConfigToHtml();

/* ===== ADVANCED SCROLL ANIMATIONS ===== */

// Intersection Observer for scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add visible class to trigger animations
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all scroll animation elements
document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-zoom, .stagger-item').forEach(element => {
  scrollObserver.observe(element);
});

// Legacy support for existing sections
const legacyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      legacyObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.survival-section, .who-we-are-section').forEach(section => {
  legacyObserver.observe(section);
});

/* ===== PARALLAX EFFECT ===== */
window.addEventListener('scroll', () => {
  const parallaxElements = document.querySelectorAll('.parallax-element');
  
  parallaxElements.forEach(element => {
    const scrollPosition = window.scrollY;
    const elementOffset = element.offsetTop;
    const distance = scrollPosition - elementOffset;
    
    // Parallax effect: move element based on scroll
    if (distance > -500 && distance < 500) {
      element.style.transform = `translateY(${distance * 0.5}px)`;
    }
  });
});

/* ===== HOVER ANIMATIONS ===== */
document.querySelectorAll('.game').forEach(game => {
  game.addEventListener('mouseenter', () => {
    game.style.transform = 'translateY(-10px)';
  });
  
  game.addEventListener('mouseleave', () => {
    game.style.transform = 'translateY(0)';
  });
});

/* ===== STAGGERED ANIMATIONS FIX ===== */
document.querySelectorAll('.stagger-item').forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
});