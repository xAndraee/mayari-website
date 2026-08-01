import { config } from "../config";

export default function PageHeader({ title, description }) {
  return (
    <section id="header">
      <div className="content">
        <div className="info">
          <p className="minecraft-server-ip">{config.serverInfo.serverIp}</p>
          <h1 className="title">{title}</h1>
        </div>
        <p className="description">{description}</p>
      </div>
    </section>
  );
}
