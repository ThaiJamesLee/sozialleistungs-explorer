'use client';

import { useMemo, useState } from 'react';

export type Benefit = {
  leistung: string;
  rechtsnorm: string;
  zielgruppen: string[];
  themenfelder: string[];
  law: string;
  group: string;
};

export type LawMetadata = {
  name: string;
  legal: string;
  information: string;
};

export type Metadata = { laws: Record<string, LawMetadata> };

type Props = { benefits: Benefit[]; metadata: Metadata };

const audienceOrder = ['Jedes Alter', 'Kinder', 'Jugendliche', 'Erwerbsalter', 'Senior/-innen'];

export default function Explorer({ benefits, metadata }: Props) {
  const [query, setQuery] = useState('');
  const [law, setLaw] = useState('Alle Gesetze');
  const [audience, setAudience] = useState('Alle Zielgruppen');
  const [topic, setTopic] = useState('Alle Themenfelder');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showGlossary, setShowGlossary] = useState(false);

  const laws = useMemo(() => [...new Set(benefits.map((item) => item.law))].sort(), [benefits]);
  const audiences = useMemo(() => {
    const values = new Set(benefits.flatMap((item) => item.zielgruppen));
    return audienceOrder.filter((item) => values.has(item));
  }, [benefits]);
  const topics = useMemo(
    () => [...new Set(benefits.flatMap((item) => item.themenfelder))].sort(),
    [benefits],
  );
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('de');
    return benefits.filter((item) => {
      const searchable = [item.leistung, item.rechtsnorm, item.law, item.group, ...item.themenfelder]
        .join(' ')
        .toLocaleLowerCase('de');
      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (law === 'Alle Gesetze' || item.law === law) &&
        (audience === 'Alle Zielgruppen' || item.zielgruppen.includes(audience)) &&
        (topic === 'Alle Themenfelder' || item.themenfelder.includes(topic))
      );
    });
  }, [benefits, query, law, audience, topic]);

  const clearFilters = () => {
    setQuery('');
    setLaw('Alle Gesetze');
    setAudience('Alle Zielgruppen');
    setTopic('Alle Themenfelder');
  };

  return (
    <main>
      <header className="masthead">
        <div className="topline"><span>SOZIALLEISTUNGS-EXPLORER</span><span>Stand: September 2025</span></div>
        <div className="hero">
          <div>
            <p className="kicker">Orientierung im sozialen Sicherungssystem</p>
            <h1>Finde die Leistung,<br /><em>die zu dir passt.</em></h1>
            <p className="intro">Durchsuche {benefits.length} Leistungen aus Sozialgesetzbüchern und weiteren Regelwerken.</p>
          </div>
          <div className="hero-mark" aria-hidden="true">§</div>
        </div>
      </header>

      <section className="workspace" aria-label="Leistungssuche">
        <div className="search-row">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Leistung, Paragraf oder Stichwort suchen" />
          </label>
          <span className="result-count"><strong>{filtered.length}</strong> Ergebnisse</span>
        </div>
        <div className="filters">
          <Filter label="Gesetz" value={law} options={laws} onChange={setLaw} />
          <Filter label="Für wen?" value={audience} options={audiences} onChange={setAudience} />
          <Filter label="Themenfeld" value={topic} options={topics} onChange={setTopic} />
          {(query || law !== 'Alle Gesetze' || audience !== 'Alle Zielgruppen' || topic !== 'Alle Themenfelder') && (
            <button className="clear" onClick={clearFilters}>Filter zurücksetzen</button>
          )}
          <button className="glossary-toggle" type="button" aria-expanded={showGlossary} aria-controls="law-glossary" onClick={() => setShowGlossary(!showGlossary)}>
            {showGlossary ? 'Gesetzesnamen ausblenden' : 'Gesetzesnamen anzeigen'}
          </button>
          {showGlossary && <div className="law-glossary" id="law-glossary" aria-label="Gesetze im Überblick">
            <span className="detail-label">Gesetze im Überblick</span>
            <div className="law-glossary-list">
              {laws.map((lawCode) => (
                <span key={lawCode}><strong>{lawCode}</strong><span>{metadata.laws[lawCode]?.name ?? 'Vollständiger Name nicht verfügbar'}</span></span>
              ))}
            </div>
          </div>}
        </div>

        <div className="list-header"><span>Leistung</span><span>Rechtsgrundlage</span></div>
        <div className="benefit-list">
          {filtered.map((item, index) => {
            const isOpen = expanded === index;
            return (
              <article className={`benefit ${isOpen ? 'is-open' : ''}`} key={`${item.law}-${item.rechtsnorm}-${item.leistung}`}>
                <button className="benefit-main" onClick={() => setExpanded(isOpen ? null : index)} aria-expanded={isOpen}>
                  <span className="benefit-title"><small>{item.law} · {item.group}</small>{item.leistung}</span>
                  <span className="legal">{item.rechtsnorm}</span>
                  <span className="chevron" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <div className="detail"><div><span className="detail-label">Zielgruppen</span><div className="tags">{item.zielgruppen.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div><span className="detail-label">Themenfelder</span><div className="tags accent">{item.themenfelder.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="sources"><span className="detail-label">Weitere Informationen</span><strong>{metadata.laws[item.law]?.name ?? item.law}</strong><div><a href={metadata.laws[item.law]?.information} target="_blank" rel="noreferrer">Informationen der zuständigen Stelle ↗</a><a href={metadata.laws[item.law]?.legal} target="_blank" rel="noreferrer">Gesetzestext bei Gesetze im Internet ↗</a></div></div></div>}
              </article>
            );
          })}
        </div>
        {filtered.length === 0 && <div className="empty"><strong>Keine Treffer.</strong><span>Versuche einen anderen Suchbegriff oder setze die Filter zurück.</span><button onClick={clearFilters}>Alle Leistungen anzeigen</button></div>}
      </section>
      <footer><span>Eine Inventur im Haus der sozialen Hilfe</span><span>Quelle: ifo Institut · YAML-Datenbestand</span></footer>
    </main>
  );
}

function Filter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="filter"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}><option>{label === 'Gesetz' ? 'Alle Gesetze' : label === 'Für wen?' ? 'Alle Zielgruppen' : 'Alle Themenfelder'}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}