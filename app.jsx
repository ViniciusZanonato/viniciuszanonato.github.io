// Portfolio app — terminal/dev aesthetic, bilingual PT/EN, tweakable
// Mounts a single-page React app to #root.

const { useState, useEffect, useMemo, useRef } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers

function useClock(locale) {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString(locale === 'pt-BR' ? 'pt-BR' : 'en-US', {
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
}

function renderKV(value) {
  if (value && typeof value === 'object') {
    if (value.type === 'mail') return <a href={`mailto:${value.value}`}>{value.value}</a>;
    if (value.type === 'ext')  return <a href={value.href} target="_blank" rel="noopener">{value.value} ↗</a>;
  }
  return value;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─────────────────────────────────────────────────────────────────────────────
// IntroScreen

function IntroScreen({ onDone }) {
  const PROMPT = 'vzanonato@portfolio ~ $';
  const [lines, setLines] = React.useState([]);
  const [typing, setTyping] = React.useState(null);
  const [progress, setProgress] = React.useState(-1);
  const [fading, setFading] = React.useState(false);
  const bodyRef = React.useRef(null);
  const cancelRef = React.useRef(false);

  function addLine(node) {
    setLines(prev => [...prev, node]);
  }

  React.useEffect(() => {
    async function run() {
      await sleep(400);
      if (cancelRef.current) return;

      // --- whoami ---
      const cmd1 = 'whoami';
      setTyping({ text: '', done: false });
      for (const ch of cmd1) {
        if (cancelRef.current) return;
        await sleep(50);
        setTyping(prev => ({ text: prev.text + ch, done: false }));
      }
      await sleep(260);
      if (cancelRef.current) return;
      setTyping(null);
      addLine(<span className="intro-line"><span style={{color:'var(--accent)'}}>{PROMPT} </span><span style={{color:'var(--text)'}}>{cmd1}</span></span>);
      await sleep(60);
      addLine(<span className="intro-line" style={{color:'var(--text-dim)'}}>Carlos Vinicius Garcia Zanonato</span>);
      addLine(<span className="intro-line"> </span>);
      await sleep(200);

      // --- cat ./stack.json ---
      const cmd2 = 'cat ./stack.json';
      setTyping({ text: '', done: false });
      for (const ch of cmd2) {
        if (cancelRef.current) return;
        await sleep(46);
        setTyping(prev => ({ text: prev.text + ch, done: false }));
      }
      await sleep(260);
      if (cancelRef.current) return;
      setTyping(null);
      addLine(<span className="intro-line"><span style={{color:'var(--accent)'}}>{PROMPT} </span><span style={{color:'var(--text)'}}>{cmd2}</span></span>);
      const jsonLines = [
        '{',
        '  "role":   "BI Developer · AI Builder",',
        '  "core":   ["Python", "Next.js", "TypeScript"],',
        '  "ai":     ["LLMs", "Agents", "Orchestration"],',
        '  "status": "available ✓"',
        '}',
      ];
      for (const l of jsonLines) {
        if (cancelRef.current) return;
        await sleep(80);
        addLine(<span className="intro-line" style={{color:'var(--info)'}}>{l}</span>);
      }
      addLine(<span className="intro-line"> </span>);
      await sleep(200);

      // --- ./load-portfolio.sh ---
      const cmd3 = './load-portfolio.sh';
      setTyping({ text: '', done: false });
      for (const ch of cmd3) {
        if (cancelRef.current) return;
        await sleep(50);
        setTyping(prev => ({ text: prev.text + ch, done: false }));
      }
      await sleep(260);
      if (cancelRef.current) return;
      setTyping(null);
      addLine(<span className="intro-line"><span style={{color:'var(--accent)'}}>{PROMPT} </span><span style={{color:'var(--text)'}}>{cmd3}</span></span>);

      // Progress bar
      setProgress(0);
      for (let i = 1; i <= 20; i++) {
        if (cancelRef.current) return;
        await sleep(60);
        setProgress(i);
      }
      await sleep(600);
      addLine(<span className="intro-line" style={{color:'var(--ok)'}}>interface carregada — bem-vindo.</span>);
      setProgress(-1);

      await sleep(700);
      if (cancelRef.current) return;
      finish();
    }

    function finish() {
      setFading(true);
      setTimeout(onDone, 650);
    }

    function skip() { cancelRef.current = true; finish(); }
    document.addEventListener('keydown', skip, { once: true });
    document.addEventListener('pointerdown', skip, { once: true });

    run();

    return () => {
      cancelRef.current = true;
      document.removeEventListener('keydown', skip);
      document.removeEventListener('pointerdown', skip);
    };
  }, []);

  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, progress]);

  const BAR = 20;
  const filled = progress >= 0 ? Math.round(progress) : 0;
  const pct = Math.round(filled / BAR * 100);

  return (
    <div className={`intro-overlay${fading ? ' fading' : ''}`}>
      <div className="intro-window">
        <div className="intro-bar">
          <div className="top-dots" aria-hidden="true"><span></span><span></span><span></span></div>
          <span>{PROMPT}</span>
        </div>
        <div className="intro-body" ref={bodyRef}>
          {lines.map((node, i) => <React.Fragment key={i}>{node}</React.Fragment>)}

          {typing !== null && (
            <span className="intro-line">
              <span style={{color:'var(--accent)'}}>{PROMPT} </span>
              <span style={{color:'var(--text)'}}>{typing.text}</span>
              <span className="i-cursor" aria-hidden="true"></span>
            </span>
          )}

          {typing === null && progress < 0 && (
            <span className="intro-line">
              <span style={{color:'var(--accent)'}}>{PROMPT} </span>
              <span className="i-cursor" aria-hidden="true"></span>
            </span>
          )}
        </div>

        {progress >= 0 && (
          <div className="intro-progressbar">
            <span style={{color:'var(--text-faint)'}}>{'['}</span>
            <span style={{color:'var(--accent)'}}> {'▓'.repeat(filled)}</span>
            <span style={{color:'var(--text-faint)'}}> {'░'.repeat(BAR - filled)}</span>
            <span style={{color:'var(--text-faint)'}}>{'] '}</span>
            <span style={{color:'var(--text-dim)'}}>{pct}%</span>
          </div>
        )}

        <div className="intro-skip">PRESS ANY KEY TO SKIP</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Topbar

function TopBar({ t, lang, onLang }) {
  const clock = useClock(t.locale);
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div className="top-left">
          <div className="top-dots" aria-hidden="true"><span></span><span></span><span></span></div>
          <div className="top-prompt">
            <b>{t.meta.handle}@{t.meta.host}</b>:<span className="path">~</span>$ <span style={{color:'var(--text)'}}>{lang === 'pt' ? 'sessão ativa' : 'session active'}</span>
          </div>
        </div>
        <div className="top-right">
          <span className="status-pill" title={t.meta.status}>
            <span className="dot" aria-hidden="true"></span>
            {t.meta.status.toLowerCase()}
          </span>
          <span className="clock">{clock} {t.meta.timezone.split(' ')[0]}</span>
          <div className="lang-toggle" role="tablist" aria-label="language">
            <button className={lang === 'pt' ? 'active' : ''} onClick={() => onLang('pt')} role="tab" aria-selected={lang==='pt'}>PT</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => onLang('en')} role="tab" aria-selected={lang==='en'}>EN</button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SectionHeader

function SecHead({ num, title, cmd }) {
  return (
    <header className="sec-head">
      <span className="sec-num">[{num}]</span>
      <h2 className="sec-title">{title}</h2>
      <span className="sec-cmd">{cmd}</span>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero

function Hero({ t, lang }) {
  return (
    <section id="home" className="section hero" data-screen-label="01 Hero">
      <div className="container">
        <div className="hero-cmd">
          <span className="pmt">{t.meta.handle}@{t.meta.host} ~ $</span>
          {t.hero.cmd}
          <span style={{color:'var(--text-faint)', marginLeft:'.85rem'}}>// {t.hero.cmdOut}</span>
        </div>

        <div className="hero-grid">
          <div>
            <h1 className="hero-name">
              {t.meta.name1}{' '}
              <span className="last">{t.meta.name2}</span>
              <span className="cursor" aria-hidden="true"></span>
            </h1>

            <p className="hero-role">
              {t.meta.role.map((r, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="sep">·</span>}
                  <span>{r}</span>
                </React.Fragment>
              ))}
            </p>

            <p className="hero-intro">{t.hero.intro}</p>

            <div className="hero-meta">
              <span><span className="lbl">{t.hero.metaLabels.based}:</span> {t.meta.location}</span>
              <span><span className="lbl">{t.hero.metaLabels.focus}:</span> {t.hero.focus}</span>
              <span><span className="lbl">{t.hero.metaLabels.langs}:</span> {t.hero.langs}</span>
            </div>

            <div className="cta-row">
              <a className="btn primary" href="#contact">
                ./{t.hero.cta1.replace(/\s+/g, '-')}.sh <span className="arr">→</span>
              </a>
              <a className="btn" href="#about">
                $ {t.hero.cta2} <span className="arr">↘</span>
              </a>
            </div>
          </div>

          <div className="portrait" aria-hidden="false">
            <img className="portrait-img"
                 src="images/fotocurriculo.png?v=2"
                 alt="Carlos Vinicius Garcia Zanonato"
                 onError={(e) => { e.target.style.display='none'; }} />
            <span className="portrait-tag">{t.hero.portraitTag}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// About

function About({ t }) {
  return (
    <section id="about" className="section" data-screen-label="02 About">
      <div className="container">
        <SecHead num="02" title={t.nav.about} cmd={t.about.cmd} />
        <div className="about-grid">
          <div className="panel">
            <div className="panel-head">
              <span className="file">{t.about.panelLeftFile}</span>
              <span className="pill">JSON</span>
            </div>
            <dl className="kv-list">
              {t.about.kv.map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt>{k}</dt>
                  <dd>{renderKV(v)}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>

          <div className="panel">
            <div className="panel-head">
              <span className="file">{t.about.panelRightFile}</span>
              <span className="pill">MD</span>
            </div>
            {t.about.bio.map((p, i) => (
              <p className="bio" key={i}>{p}</p>
            ))}
            <div className="stat-row" aria-label={t.about.compHead}>
              {t.about.comps.map((c) => (
                <div className="stat" key={c.l}>
                  <div className="v">{c.v}</div>
                  <div className="l">{c.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stack

function Stack({ t }) {
  return (
    <section id="stack" className="section" data-screen-label="03 Stack">
      <div className="container">
        <SecHead num="03" title={t.stack.groupsTitle} cmd={t.stack.cmd} />
        <div className="about-grid" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
          {t.stack.groups.map((g) => (
            <div className="panel" key={g.title}>
              <div className="panel-head">
                <span className="file">{g.title}/</span>
                <span className="pill">{g.items.length}</span>
              </div>
              <div className="chips">
                {g.items.map((it) => <span className="chip" key={it}>{it}</span>)}
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 820px) {
            #stack .about-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Experience

function Experience({ t }) {
  return (
    <section id="experience" className="section" data-screen-label="04 Experience">
      <div className="container">
        <SecHead num="04" title={t.experience.title} cmd={t.experience.cmd} />
        <div className="log">
          {t.experience.items.map((it, i) => (
            <article className="commit" key={i}>
              <div className="commit-meta">
                <span className="hash">#{it.hash}</span>
                <span className="date">{it.date}</span>
                <span className="loc">@ {it.loc}</span>
              </div>
              <div className="commit-body">
                <div className="role-line">
                  <span className={`badge ${it.status}`}>● {it.statusLabel}</span>
                  {it.modality && <span className={`badge modality-${it.modality}`}>◈ {it.modalityLabel}</span>}
                  <span className="co">{it.at}</span>
                </div>
                <div className="role">{it.role}</div>
                <div className="tag-row">
                  {it.tags.map((tg) => <span className="badge" key={tg}>{tg}</span>)}
                </div>
                <p className="desc">{it.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Education

function Education({ t }) {
  return (
    <section id="education" className="section" data-screen-label="05 Education">
      <div className="container">
        <SecHead num="05" title={t.education.title} cmd={t.education.cmd} />
        <div className="edu-grid">
          {t.education.items.map((e, i) => (
            <div className="edu" key={i}>
              <div className="edu-thumb">
                <img src={e.logo} alt={e.name}
                     onError={(ev) => { ev.target.style.display='none'; }} />
              </div>
              <div className="edu-body">
                <h4>{e.name}</h4>
                <div className="deg">{e.deg}</div>
                <div className="when">{e.when}</div>
                {e.note && <div className="note">{e.note}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects

function Projects({ t }) {
  return (
    <section id="projects" className="section" data-screen-label="06 Projects">
      <div className="container">
        <SecHead num="06" title={t.projects.title} cmd={t.projects.cmd} />
        <div className="proj-grid">
          {t.projects.items.map((p, i) => (
            <article className="proj" key={i}>
              <div className="proj-head">
                <span className="path">{p.path}</span>
                <span className={`status ${p.status === 'wip' ? 'wip' : ''}`}>● {p.statusLabel}</span>
              </div>
              <div className="proj-thumb">
                <img src={p.img} alt={p.name}
                     onError={(ev) => { ev.target.style.display='none'; }} />
                <span className="logo-name">{p.name} <span style={{color:'var(--text-dim)', fontWeight:400, fontSize:12, marginLeft:6}}>{p.version}</span></span>
              </div>
              <div className="proj-body">
                <p>{p.desc}</p>
                <div className="tags">
                  {p.tags.map((tg) => <span className="chip" key={tg}>{tg}</span>)}
                </div>
                <a className="link" href={p.href} target="_blank" rel="noopener">
                  github <span className="arr">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <a className="more-link" href="https://github.com/ViniciusZanonato" target="_blank" rel="noopener">
          → {t.projects.moreLink}
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CertModal

function CertModal({ cert, name, onClose }) {
  const PROMPT = 'vzanonato@portfolio ~ $';
  const filename = cert.split('/').pop();
  const cmd = 'open ./certs/' + filename;
  const [typed, setTyped] = React.useState('');
  const [showOutput, setShowOutput] = React.useState(false);
  const [showImg, setShowImg] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  React.useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(id);
        setTimeout(() => { setShowOutput(true); }, 280);
        setTimeout(() => { setShowImg(true); }, 580);
      }
    }, 42);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') close(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function close() {
    setVisible(false);
    setTimeout(onClose, 240);
  }

  return (
    <div
      className={'cert-overlay' + (visible ? ' open' : '')}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      role="dialog" aria-modal="true"
    >
      <div className="cert-window">
        <div className="cert-bar">
          <div className="top-dots" aria-hidden="true"><span></span><span></span><span></span></div>
          <span style={{flex:1, color:'var(--text-dim)', fontSize:11, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{PROMPT}</span>
          <button className="cert-close" onClick={close} aria-label="Fechar">✕</button>
        </div>
        <div className="cert-terminal">
          <div>
            <span style={{color:'var(--accent)'}}>{PROMPT} </span>
            <span style={{color:'var(--text)'}}>{typed}</span>
            {typed.length < cmd.length && <span className="i-cursor" aria-hidden="true"></span>}
          </div>
          {showOutput && (
            <div style={{color:'var(--text-dim)', fontSize:12, marginTop:'.4rem'}}>
              {'>'} carregando <span style={{color:'var(--info)'}}>{filename}</span>...
            </div>
          )}
        </div>
        <div className={'cert-img-wrap' + (showImg ? ' loaded' : '')}>
          {showImg && (
            <img
              src={cert}
              alt={'Certificado: ' + name}
              className="cert-img"
              onError={(e) => {
                e.target.parentElement.innerHTML = '<p style="color:var(--danger);padding:1rem;font-size:12px;font-family:var(--font-mono)">erro: imagem não encontrada.</p>';
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Courses

function Courses({ t }) {
  const [certOpen, setCertOpen] = React.useState(null);

  return (
    <section id="courses" className="section" data-screen-label="07 Courses">
      <div className="container">
        <SecHead num="07" title={t.courses.title} cmd={t.courses.cmd} />
        <div className="courses">
          {t.courses.items.map((c, i) => (
            <div
              key={i}
              className={'course' + (c.cert ? ' has-cert' : '')}
              onClick={() => c.cert && setCertOpen({ cert: c.cert, name: c.name })}
              role={c.cert ? 'button' : undefined}
              tabIndex={c.cert ? 0 : undefined}
              onKeyDown={(e) => { if (c.cert && (e.key === 'Enter' || e.key === ' ')) setCertOpen({ cert: c.cert, name: c.name }); }}
              title={c.cert ? 'Ver certificado' : undefined}
            >
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="name">{c.name}</span>
              <span className="org">{c.org}</span>
              <span className="topic">{c.topic}</span>
              <span className="cat">
                {c.cert
                  ? <span className="cert-badge">◈ cert</span>
                  : c.cat}
              </span>
            </div>
          ))}
        </div>
      </div>
      {certOpen && (
        <CertModal cert={certOpen.cert} name={certOpen.name} onClose={() => setCertOpen(null)} />
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact

function Contact({ t }) {
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  function submit(e) {
    e.preventDefault();
    const fd = new FormData(formRef.current);
    const name = fd.get('name'), email = fd.get('email'), subj = fd.get('subject'), msg = fd.get('message');
    const body = `${msg}\n\n--\n${name} <${email}>`;
    window.location.href = `mailto:viniciuszanona@gmail.com?subject=${encodeURIComponent(subj || 'Contato')}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="contact" className="section" data-screen-label="08 Contact">
      <div className="container">
        <SecHead num="08" title={t.contact.title} cmd={t.contact.cmd} />
        <div className="contact">
          <div className="panel contact-info">
            <div className="panel-head">
              <span className="file">{t.contact.infoTitle}.cfg</span>
              <span className="pill">CFG</span>
            </div>
            <p className="bio" style={{marginBottom:'1.25rem'}}>{t.contact.lead}</p>
            <dl>
              {t.contact.info.map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt>{k}</dt>
                  <dd>{renderKV(v)}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>

          <div className="panel">
            <div className="panel-head">
              <span className="file">compose.mail</span>
              <span className="pill">FORM</span>
            </div>
            <form ref={formRef} onSubmit={submit}>
              <div className="form-row">
                <label htmlFor="name">→ {t.contact.form.name}</label>
                <input id="name" name="name" type="text" required placeholder={t.contact.form.placeholder.name} />
              </div>
              <div className="form-row">
                <label htmlFor="email">→ {t.contact.form.email}</label>
                <input id="email" name="email" type="email" required placeholder={t.contact.form.placeholder.email} />
              </div>
              <div className="form-row">
                <label htmlFor="subject">→ {t.contact.form.subject}</label>
                <input id="subject" name="subject" type="text" required placeholder={t.contact.form.placeholder.subject} />
              </div>
              <div className="form-row">
                <label htmlFor="message">→ {t.contact.form.message}</label>
                <textarea id="message" name="message" required placeholder={t.contact.form.placeholder.message} />
              </div>
              <button className="form-btn" type="submit">
                {sent ? '✓ ok — abrindo cliente de email…' : `[ ${t.contact.form.send} ↵ ]`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer

function Footer({ t }) {
  return (
    <footer className="foot">
      <div className="container">
        <pre className="ascii">{
`  ╔══════════════════════════════════════════════════════════════════════╗
  ║   ${t.footer.built.padEnd(64)}   ║
  ╚══════════════════════════════════════════════════════════════════════╝`}</pre>
        <div>
          {t.footer.copy} ·{' '}
          <a href="https://github.com/ViniciusZanonato" target="_blank" rel="noopener">github</a> ·{' '}
          <a href="https://www.linkedin.com/in/carlos-vinicius-garcia-zanonato-453832346" target="_blank" rel="noopener">linkedin</a> ·{' '}
          <span style={{color:'var(--accent)'}}>{t.footer.end}</span>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tweaks

const PALETTE_OPTIONS = [
  { value: 'magenta', label: 'magenta · default' },
  { value: 'green',   label: 'green · terminal' },
  { value: 'amber',   label: 'amber · crt' },
  { value: 'blue',    label: 'blue · ink' },
  { value: 'mono',    label: 'mono · stark' },
  { value: 'paper',   label: 'paper · light' },
];

const FONT_OPTIONS = [
  { value: 'jetbrains', label: 'JetBrains Mono' },
  { value: 'ibm',       label: 'IBM Plex Mono' },
  { value: 'space',     label: 'Space Mono' },
  { value: 'mixed',     label: 'Inter Tight (sans)' },
  { value: 'serif',     label: 'Fraunces (serif)' },
];

const DENSITY_OPTIONS = ['compact', 'regular', 'comfy'];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "magenta",
  "font": "jetbrains",
  "density": "regular",
  "grid": true,
  "scanline": false
}/*EDITMODE-END*/;

function TweaksDOM({ tw, lang }) {
  // Apply tweaks to <body>
  useEffect(() => {
    const b = document.body;
    b.setAttribute('data-palette', tw.palette);
    b.setAttribute('data-font',    tw.font);
    b.setAttribute('data-density', tw.density);
    b.setAttribute('data-grid',    tw.grid ? 'on' : 'off');
    b.setAttribute('data-scanline',tw.scanline ? 'on' : 'off');
  }, [tw.palette, tw.font, tw.density, tw.grid, tw.scanline]);
  return null;
}

function TweaksUI({ t }) {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <>
      <TweaksDOM tw={tw} />
      <TweaksPanel>
        <TweakSection label={t.tweaks.palette} />
        <TweakSelect
          label={t.tweaks.palette}
          value={tw.palette}
          options={PALETTE_OPTIONS}
          onChange={(v) => setTweak('palette', v)}
        />

        <TweakSection label={t.tweaks.typography} />
        <TweakSelect
          label={t.tweaks.font}
          value={tw.font}
          options={FONT_OPTIONS}
          onChange={(v) => setTweak('font', v)}
        />
        <TweakRadio
          label={t.tweaks.density}
          value={tw.density}
          options={DENSITY_OPTIONS.map((d) => ({ value: d, label: t.tweaks.densityOpts[d] }))}
          onChange={(v) => setTweak('density', v)}
        />

        <TweakSection label={t.tweaks.effects} />
        <TweakToggle label={t.tweaks.grid}     value={tw.grid}     onChange={(v) => setTweak('grid', v)} />
        <TweakToggle label={t.tweaks.scanline} value={tw.scanline} onChange={(v) => setTweak('scanline', v)} />
      </TweaksPanel>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// App

function App() {
  const [introDone, setIntroDone] = React.useState(false);
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('portfolio-lang');
    return (saved === 'en' || saved === 'pt') ? saved : 'en';
  });
  const t = useMemo(() => window.DATA[lang], [lang]);

  useEffect(() => {
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.setAttribute('lang', t.locale);
    document.title = `~/vzanonato — portfolio`;
  }, [lang, t]);

  return (
    <>
      {!introDone && <IntroScreen onDone={() => setIntroDone(true)} />}
      <div className={`portfolio-wrap${introDone ? ' visible' : ''}`}>
        <TopBar t={t} lang={lang} onLang={setLang} />
        <main>
          <Hero t={t} lang={lang} />
          <About t={t} />
          <Stack t={t} />
          <Experience t={t} />
          <Education t={t} />
          <Projects t={t} />
          <Courses t={t} />
          <Contact t={t} />
        </main>
        <Footer t={t} />
        <TweaksUI t={t} />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
