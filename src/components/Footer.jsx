export default function Footer() {
  return (
    <footer id="footer">
      <p className="copyright">
        &copy; 2026 <span className="server-name-footer">Mayari</span>. All rights reserved.
      </p>
      <div className="social-links">
        <a
          href="https://www.tiktok.com/@mayari.smp?_r=1&_t=ZS-977xvXIPNuZ"
          className="link tiktok-link"
        >
          <i className="fa-brands fa-tiktok"></i>
        </a>
        <a href="#" className="link instagram-link">
          <i className="fa-brands fa-square-instagram"></i>
        </a>
        <a href="https://discord.mayari.space" className="link discord-link-footer">
          <i className="fa-brands fa-discord"></i>
        </a>
      </div>
    </footer>
  );
}
