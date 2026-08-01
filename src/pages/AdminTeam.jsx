import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { config } from "../config";
import { getSkinByUsername } from "../api";

export default function AdminTeam() {
  const [teams, setTeams] = useState(null); // null = loading, [] impossible, else array of [team, members-with-skin]
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    document.title = "Mayari | Staff Team";

    let cancelled = false;

    (async () => {
      try {
        const entries = Object.entries(config.adminTeamPage);
        const allMembers = entries.flatMap(([team, members]) => members.map((user) => ({ team, user })));

        const skins = await Promise.all(
          allMembers.map(({ user }) =>
            user.skinUrlOrPathToFile ? Promise.resolve(user.skinUrlOrPathToFile) : getSkinByUsername(user.inGameName)
          )
        );

        let i = 0;
        const withSkins = entries.map(([team, members]) => [
          team,
          members.map((user) => ({ ...user, skin: skins[i++] })),
        ]);

        if (!cancelled) setTeams(withSkins);
      } catch (e) {
        console.error("Admin team render error:", e);
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageHeader
        title={
          <>
            Our <span>Staff Team</span>
          </>
        }
        description="Meet the staff members who help manage, moderate, and support the Mayari SMP community."
      />

      <section id="admin-team">
        <div className="content at-content">
          {failed && (
            <p style={{ color: "#ff6b6b", padding: "2rem" }}>
              Failed to load staff team. Please refresh the page.
            </p>
          )}

          {!failed && teams === null && (
            <p className="loading" style={{ textAlign: "center", padding: "2rem", color: "#999" }}>
              Loading staff team...
            </p>
          )}

          {!failed &&
            teams !== null &&
            teams.map(([team, members]) => (
              <div className={`group ${team}`} key={team}>
                <h2 className="rank-title">{team.charAt(0).toUpperCase() + team.slice(1)}</h2>
                <div className="users">
                  {members.map((user) => {
                    const rankColor = user.rankColor || config.atGroupsDefaultColors[team];
                    return (
                      <div className="user" key={user.inGameName}>
                        <img src={user.skin} alt={user.inGameName} loading="lazy" decoding="async" />
                        <h5 className="name">{user.inGameName}</h5>
                        <p className={`rank ${team}`} style={{ background: rankColor }}>
                          {user.rank}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
