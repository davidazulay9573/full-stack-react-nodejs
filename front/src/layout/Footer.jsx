function Footer() {
  return (
    <footer className="border-top pt-3 py-2 text-center">
      <span className="m-1">  Card__<i className="bi bi-card-checklist"></i>__Actions</span>
      <span className="m-1">&copy;</span>
      <span className="m-1">{new Date().getFullYear()}</span>
    </footer>
  );
}

export default Footer;
