import { useEffect, useState } from "react";
import { config } from "../config";
import { getDiscordOnlineUsers, getMinecraftOnlinePlayer } from "../api";
import { useCopyIp } from "../hooks/useCopyIp";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useParallax } from "../hooks/useParallax";
import Accordion from "../components/Accordion";

export default function Home() {
  const { copyIp, message, active, error } = useCopyIp();
  const [discordCount, setDiscordCount] = useState("None");
  const [mcCount, setMcCount] = useState("None");

  useScrollReveal();
  useParallax();

  useEffect(() => {
    document.title = "Mayari | Home";
    (async () => {
      const [d, m] = await Promise.all([getDiscordOnlineUsers(), getMinecraftOnlinePlayer()]);
      setDiscordCount(d);
      setMcCount(m);
    })();
  }, []);

  return (
    <>
      {/* Header */}
      <section id="header">
        <div className="content">
          <div className="left">
            <div className="server-name">
              <p>Survival Minecraft Server</p>
              <h1 className="minecraft-server-ip">{config.serverInfo.serverIp}</h1>
            </div>
            <p className="server-description">
              A minecraft survival multiplayer server based on Philippines.
              <br />
              <br />
              Join and play with your friends.
            </p>
            <div className="buttons">
              <button className="copy-ip" onClick={copyIp}>
                Copy IP
              </button>
              <a href="#about">
                <button className="how-to-join">Show more</button>
              </a>
            </div>
            <p className={"ip-copied" + (active ? " active" : "") + (error ? " error" : "")}>
              {message}
            </p>
          </div>

          <div className="right">
            <img
              src={`/images/${config.serverInfo.serverLogoImageFileName}`}
              alt="Server logo"
              className="logo-img logo-img-header parallax-element"
              width="256"
              height="256"
            />

            <div className="stats">
              <div className="stat">
                <div className="icon">
                  <i className="fa-brands fa-discord"></i>
                </div>
                <div className="texts">
                  <h5 className="stat-title">Discord server</h5>
                  <p>
                    <span className="stat-number discord-online-users">{discordCount}</span> users online
                  </p>
                </div>
              </div>
              <div className="stat">
                <div className="icon">
                  <i className="fa-solid fa-server"></i>
                </div>
                <div className="texts">
                  <h5 className="stat-title">Minecraft server</h5>
                  <p>
                    <span className="stat-number minecraft-online-players">{mcCount}</span> players online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About us */}
      <section id="about">
        <div className="content scroll-fade-in">
          <div className="left scroll-slide-left">
            <h2 className="section-title">Who we are?</h2>
            <p className="about-us">
              Our server started as a tiny private world, just close friends goofing around and surviving
              together. Somewhere along the way, we thought…why keep the fun to ourselves? So we opened our
              doors, grew our community, and now we're inviting more players to join the journey with us.🌱
            </p>
          </div>

          <div className="right scroll-slide-right">
            <img src="/images/about-section-person-image.png" alt="Minecraft person" loading="lazy" />
            <div className="img-background"></div>
          </div>
        </div>
      </section>

      {/* Mini games */}
      <section id="minigames">
        <div className="content miniGames-list">
          <div className="game scroll-zoom">
            <img src="/images/survival-minigames-image.jpg" alt="Survival image" loading="lazy" />
            <div className="info">
              <h2 className="section-title stagger-item">Survival</h2>
              <div className="game-description stagger-item">
                <p>
                  Experience the thrill of survival in our Minecraft server! Gather resources, build your
                  shelter, and face the challenges of the wild together with your friends. 🌱
                </p>
                <ul className="services">
                  <li className="service">Economy</li>
                  <li className="service">PvP</li>
                  <li className="service">Duels</li>
                  <li className="service">and more</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="game scroll-zoom">
            <img src="/images/survival-minigames-image.jpg" alt="Survival image" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Discord */}
      <section id="discord">
        <div className="content scroll-fade-in">
          <h2 className="section-title">
            Have a <span>problem</span> or want to get in touch with others? <br /> Join our{" "}
            <span>Discord!</span>
          </h2>
          <a href="https://discord.mayari.space" className="discord-link">
            <button className="join-discord scroll-zoom">Join Discord</button>
          </a>
        </div>
      </section>

      {/* Vote */}
      <section id="vote">
        <div className="content scroll-fade-in">
          <div className="info scroll-slide-left">
            <h2 className="section-title">Why vote?</h2>
            <p className="section-description">
              Voting helps our server grow by increasing its visibility on Minecraft server lists. Every
              vote supports the community, brings in new players, and rewards you with exclusive in-game
              perks. Thank you for helping our server thrive!
            </p>
          </div>

          <div className="links voteLinks scroll-slide-right">
            <a href="https://minecraftservers.org/vote/685631" className="url">
              <div className="link">
                <h5>servers-minecraft</h5>
                <div className="link-description">
                  <p className="description">
                    Vote for our server on Minecraft-Servers and earn rewards every time you vote.
                  </p>
                  <div className="icon">
                    <i className="fa-solid fa-circle-arrow-right"></i>
                  </div>
                </div>
              </div>
            </a>

            <a href="https://www.planetminecraft.com/server/mayari-smp/vote/" className="url">
              <div className="link">
                <h5>planet minecraft</h5>
                <div className="link-description">
                  <p className="description">
                    Support our community by voting on Planet Minecraft and help us reach more players.
                  </p>
                  <div className="icon">
                    <i className="fa-solid fa-circle-arrow-right"></i>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq">
        <div className="content">
          <div className="info">
            <h2 className="section-title">
              Server <span>FAQs.</span>
            </h2>
            <p className="section-description">
              Find answers to the most common questions about our server, gameplay features, and community
              guidelines.
            </p>
          </div>

          <Accordion />
        </div>
      </section>
    </>
  );
}
