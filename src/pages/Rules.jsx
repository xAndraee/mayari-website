import { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { useCopyIp } from "../hooks/useCopyIp";

const MINECRAFT_RULES = [
  "Be respectful to all players and staff. Harassment, bullying, toxicity, discrimination, and disrespectful behavior are not allowed.",
  "Do not use hacked clients, X-ray resource packs, exploits, macros, or any unfair advantages.",
  "Griefing, stealing, or interfering with another player's property without permission is prohibited.",
  "Keep chat appropriate. Excessive swearing, spam, filter bypassing, excessive CAPS, and repeated messages are not allowed.",
  "Item duplication, bug abuse, exploits, and the use of staff-only items are strictly prohibited.",
  "PvP is allowed. Raiding, ambushes, team fights, and traps are considered part of gameplay.",
  "Lag machines, excessive farms, or anything that negatively impacts server performance are not allowed.",
  "Offensive, inappropriate, hateful, or disrespectful builds will be removed.",
  "Player names, item names, pet names, and team names must remain appropriate and respectful.",
  "Combat logging, ban evasion, rank abuse, and alt account abuse are prohibited.",
  "Do not block access to another player's grave. Lootable graves are part of gameplay.",
  "Player-hosted events are allowed but must follow server rules and be promoted only in the designated Discord event channel.",
  "Respect staff decisions and never impersonate staff members.",
  "Report bugs and exploits responsibly with evidence. False reports may result in punishment.",
];

const DISCORD_RULES = [
  "Treat all members and staff with respect.",
  "Harassment, bullying, threats, discrimination, and targeted toxicity are prohibited.",
  "NSFW, pornographic, violent, or otherwise inappropriate content is not allowed.",
  "Scamming, deceptive trades, and fraudulent activities are prohibited.",
  "Fake reports and accusations without evidence are not allowed.",
  "Do not spread false information about the server, staff, or community.",
  "Respect personal boundaries. If someone asks you to stop, you must stop.",
  "Doxxing or sharing private information without permission is strictly prohibited.",
  "DDoS threats, attacks, or any attempt to harm the server will result in an immediate ban.",
  "Advertising other servers, products, services, social media, or websites without permission is prohibited.",
  "Account sharing, account selling, and unauthorized account access are not allowed.",
  "Usernames, profile pictures, and nicknames must remain appropriate.",
  "Friendly banter is acceptable, but excessive trash talking and harassment are not.",
];

const MORE_RULES = [
  "Abandoned builds inactive for more than 2 weeks may be reclaimed after staff review and notification.",
  "Setting homes, spawn points, or teleport locations near enemy bases with malicious intent is not allowed.",
  "Economy exploits, trade manipulation, and abuse of server systems are prohibited.",
  "Please create a support ticket and wait patiently instead of repeatedly pinging staff members.",
  "Punishments may include warnings, mutes, temporary bans, permanent bans, item removal, or other actions depending on severity.",
  "By playing on Mayari SMP or participating in the Discord server, you agree to follow all current and future server rules.",
  "Staff reserve the right to take action against behavior that negatively impacts the community, even if it is not explicitly listed above.",
  "Help us maintain a fair, friendly, and enjoyable experience for everyone.",
];

function RuleList({ title, rules, className }) {
  return (
    <div className={`${className} rules`}>
      <h2 className={`${className}-title rules-title`}>{title}</h2>
      <ol className="rules-list">
        {rules.map((rule) => (
          <li className="rule" key={rule}>
            {rule}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Rules() {
  const { copyIp, message, active, error } = useCopyIp();

  useEffect(() => {
    document.title = "Mayari | Rules";
  }, []);

  return (
    <>
      <PageHeader
        title={
          <>
            Follow the <span>rules</span>
          </>
        }
        description="List of all Minecraft and Discord server rules."
      />

      <section id="rules">
        <div className="content">
          <div className="warning">
            <p>Ignorance of the rules is not an excuse.</p>
            <div className="icon">
              <i className="fa-solid fa-exclamation"></i>
            </div>
          </div>

          <RuleList title="Minecraft Server" rules={MINECRAFT_RULES} className="minecraft-rules" />
          <RuleList title="Discord Server" rules={DISCORD_RULES} className="discord-rules" />
          <RuleList title="Additional Information" rules={MORE_RULES} className="more-rules" />
        </div>
      </section>

      <section id="join-server">
        <div className="content">
          <h2 className="section-title">
            If you have read the <span>rules</span>, you can go and <span>enjoy the fun</span> on our
            server!
          </h2>
          <div className="buttons">
            <button className="copy-ip" onClick={copyIp}>
              Copy IP
            </button>
            <a href="https://discord.mayari.space" className="discord-link">
              <button className="join-discord">Join Discord</button>
            </a>
          </div>
          <p className={"ip-copied" + (active ? " active" : "") + (error ? " error" : "")}>{message}</p>
        </div>
      </section>
    </>
  );
}
