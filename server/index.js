const express = require('express');
const cors    = require('cors');
const fetch   = require('node-fetch');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());




// ─── SYMBOLS ─────────────────────────────────────────────────────────────────
const SYMBOLS = [
  { sym: 'IPSA',      yf: '%5EIPSA'       },
  { sym: 'USD/CLP',   yf: 'USDCLP%3DX'    },
  { sym: 'S&P 500',   yf: '%5EGSPC'       },
  { sym: 'NASDAQ',    yf: '%5EIXIC'        },
  { sym: 'DAX',       yf: '%5EGDAXI'      },
  { sym: 'IBEX 35',   yf: '%5EIBEX'       },
  { sym: 'EUR/USD',   yf: 'EURUSD%3DX'    },
  { sym: 'BTC/USD',   yf: 'BTC-USD'       },
  { sym: 'Oro',       yf: 'GC%3DF'        },
  { sym: 'WTI',       yf: 'CL%3DF'        },
  { sym: 'Cobre',     yf: 'HG%3DF'        },
  { sym: 'VIX',       yf: '%5EVIX'        },
  { sym: 'BOVESPA',   yf: '%5EBVSP'       },
  { sym: 'ITUB',      yf: 'ITUB'          },
];

async function fetchQuote(s) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${s.yf}?interval=1d&range=2d`;
  const res  = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 8000 });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const meta = json.chart.result[0].meta;
  const price = meta.regularMarketPrice;
  const prev  = meta.chartPreviousClose || meta.previousClose || price;
  const chg   = ((price - prev) / prev) * 100;
  return { sym: s.sym, price, chg,
    high: meta.regularMarketDayHigh || price,
    low:  meta.regularMarketDayLow  || price,
    vol:  meta.regularMarketVolume  || 0 };
}

let marketCache = { data: [], updatedAt: null };

async function refreshMarket() {
  const results = await Promise.allSettled(SYMBOLS.map(s => fetchQuote(s)));
  const fresh   = results.filter(r => r.status === 'fulfilled').map(r => r.value);
  if (fresh.length >= 4) {
    marketCache = { data: fresh, updatedAt: new Date().toISOString() };
    console.log(`[market] ${fresh.length}/${SYMBOLS.length} symbols refreshed`);
  }
}
refreshMarket();
setInterval(refreshMarket, 60_000);

// ─── ROUTES ──────────────────────────────────────────────────────────────────
app.get('/api/market',  (req, res) => {
  if (!marketCache.data.length) return res.status(503).json({ error: 'Loading...' });
  res.json({ quotes: marketCache.data, updatedAt: marketCache.updatedAt });
});

app.get('/api/members',  (req, res) => res.json(MEMBERS));
app.get('/api/events',   (req, res) => res.json(EVENTS));
app.get('/api/research', (req, res) => res.json(RESEARCH));
app.get('/api/news',     (req, res) => res.json(NEWS));

// ─── DATA ────────────────────────────────────────────────────────────────────
const MEMBERS = [
  // ─── Directiva ───
  { id:1,  name:'Benjamín Pérez',    role:'Presidente',                         career:'Economía',             year:'4.º', area:'Renta Variable',      avatar:'BP', bio:'Lidera la estrategia general del club y representa a la organización ante la facultad y los socios institucionales.' },
  { id:2,  name:'Javiera Espinoza',   role:'Vicepresidenta',                      career:'Administración',        year:'4.º', area:'Macro & FX',           avatar:'JE', bio:'Coordina las áreas internas del club y supervisa la calidad de los contenidos académicos producidos por los socios.' },
  { id:3,  name:'Claudio San Martín', role:'Director de Relaciones Corporativas', career:'Administración',        year:'5.º', area:'Banca de Inversión',  avatar:'CS', bio:'Gestiona vínculos con empresas, instituciones financieras y partners para abrir oportunidades a los miembros.' },
  { id:4,  name:'Macarena Pereira',  role:'Directora de Comunicación',            career:'Administración',        year:'4.º', area:'Comunicaciones',      avatar:'MP', bio:'Responsable de la identidad visual del club, redes sociales y comunicación pública de las actividades.' },
  { id:5,  name:'Ignacia Inostroza', role:'Directora de Eventos y Formación',    career:'Ingeniería Comercial', year:'3.º', area:'Formación',            avatar:'II', bio:'Planifica el calendario de talleres, charlas y formación técnica que reciben los miembros durante el semestre.' },

  // ─── Miembros Senior ───
  { id:6,  name:'Isidora Aravena',   role:'Directora de Marketing',  career:'Administración',        year:'4.º', area:'Comunicaciones',       avatar:'IA', bio:'Responsable de la estrategia de marketing y posicionamiento del club en la facultad y redes sociales.' },
  { id:7,  name:'Antonia Silva',     role:'Miembro Senior',  career:'Contabilidad',         year:'3.º', area:'M&A / Valoración',     avatar:'AS', bio:'Especialista en modelos de valoración DCF y análisis de fusiones y adquisiciones.' },
  { id:8,  name:'Fernanda Molina',   role:'Miembro Senior',  career:'Economía',             year:'4.º', area:'Renta Variable',       avatar:'FM', bio:'Análisis fundamental de empresas de consumo masivo y retail latinoamericano.' },
  { id:9,  name:'Andrés Castillo',   role:'Miembro Senior',  career:'Ingeniería Comercial', year:'4.º', area:'Macro & FX',           avatar:'AC', bio:'Estrategia macroeconómica y posicionamiento en divisas de mercados emergentes.' },
  { id:10, name:'Nicolás Bravo',     role:'Miembro Senior',  career:'Ingeniería Comercial', year:'3.º', area:'Renta Fija',           avatar:'NB', bio:'Análisis de instrumentos de deuda y estructura de curvas soberanas.' },

  // ─── Miembros ───
  { id:11, name:'Pilar Herrera',     role:'Miembro', career:'Economía',             year:'2.º', area:'Renta Fija',           avatar:'PH', bio:'Análisis de curvas de rendimiento y spread de crédito corporativo.' },
  { id:12, name:'Tomás Espinoza',    role:'Miembro', career:'Ingeniería Comercial', year:'2.º', area:'Quant / ML',           avatar:'TE', bio:'Backtesting de estrategias algorítmicas en mercados latinoamericanos.' },
  { id:13, name:'Camila Rojas',      role:'Miembro', career:'Economía',             year:'2.º', area:'ESG',                  avatar:'CR', bio:'Interesada en bonos verdes y finanzas de la transición energética.' },
  { id:14, name:'Felipe Núñez',      role:'Miembro', career:'Ingeniería Comercial', year:'2.º', area:'Renta Variable',       avatar:'FN', bio:'Análisis sectorial y construcción de tesis de inversión en equities.' },
  { id:15, name:'Javiera Soto',      role:'Miembro', career:'Contabilidad',         year:'1.º', area:'M&A / Valoración',     avatar:'JS', bio:'Aprendiendo modelación financiera y técnicas de valoración corporativa.' },
];

const EVENTS = [
  { id:1, day:'05', month:'JUN', name:'Análisis de Resultados Q1 2026',   time:'19:00', location:'Aula Magna',        format:'Presencial', category:'Análisis',    desc:'Revisión de resultados corporativos y ajuste de tesis para el segundo semestre.' },
  { id:2, day:'12', month:'JUN', name:'Taller: Valoración DCF Avanzado',  time:'18:30', location:'Lab. Finanzas',  format:'Presencial', category:'Taller',      desc:'Modelación de flujos de caja descontados con análisis de sensibilidad Monte Carlo.' },
  { id:3, day:'19', month:'JUN', name:'Mesa Redonda: Fintech 2026',       time:'19:00', location:'Sala Conferencias', format:'Híbrido',    category:'Conferencia', desc:'Debate sobre IA en gestión de activos y el futuro de la banca digital en Chile.' },
  { id:4, day:'24', month:'JUN', name:'Conferencia Anual Finance Club',time:'09:00', location:'Hotel W Santiago', format:'Presencial', category:'Conferencia', desc:'Evento insignia del club. Ponentes de la industria, paneles y networking.' },
  { id:5, day:'08', month:'JUL', name:'Workshop: Riesgo Crediticio',      time:'19:00', location:'Online · Zoom',     format:'Online',     category:'Taller',      desc:'Análisis de ratings soberanos y corporativos. Acceso libre para miembros.' },
  { id:6, day:'17', month:'JUL', name:'Simulación de Cartera — Final',    time:'17:00', location:'Híbrido',           format:'Híbrido',    category:'Competición', desc:'Ronda final de la competición semestral. Presentación ante jurado externo.' },
];

const RESEARCH = [
  { id:1, title:'Perspectivas Macro Chile H2 2026',        author:'Sebastián Morales', date:'Jun 2026', area:'Macro',      pages:18, abstract:'Análisis del ciclo económico chileno y proyecciones bajo distintos escenarios de política monetaria del Banco Central.' },
  { id:2, title:'Tesis: Sector Retail Latinoamérica',      author:'Valentina Reyes',   date:'May 2026', area:'Equities',   pages:24, abstract:'Valoración bottom-up de los principales retailers de la región con foco en e-commerce y márgenes operativos.' },
  { id:3, title:'Estrategia de Renta Fija en USD',         author:'Catalina Torres',   date:'Abr 2026', area:'Renta Fija', pages:14, abstract:'Construcción de cartera de bonos investment grade y high yield con gestión activa de duración.' },
  { id:4, title:'Factor Investing en el Mercado Chileno',  author:'Diego Contreras',   date:'Mar 2026', area:'Quant',      pages:31, abstract:'Implementación de estrategias multifactor (value, momentum, quality) en acciones chilenas 2010-2025.' },
  { id:5, title:'ESG & Performance: ¿Trade-off real?',    author:'Isadora Vega',      date:'Feb 2026', area:'ESG',        pages:20, abstract:'Revisión empírica de la relación entre ratings ESG y retorno ajustado al riesgo en carteras de largo plazo.' },
];

const NEWS = [
  { id:1,  tag:'Análisis Exclusivo', tagColor:'gold',  title:'El Ciclo del Cobre y el Futuro Fiscal de Chile: Lo que los Modelos Estándar No Capturan', excerpt:'Con el precio del cobre rozando máximos de 18 meses, el debate sobre la regla de balance estructural vuelve a dominar la agenda del Ministerio de Hacienda.', author:'Sofía Ramírez Leal', time:'Hace 42 min', readTime:'8 min', size:'xl', section:'Economía' },
  { id:2,  tag:'Mercados',           tagColor:'red',   title:'Fondos de Pensiones Aumentan Exposición a Activos Alternativos en un 12%', excerpt:'Las AFP chilenas diversifican hacia infraestructura y deuda privada ante la volatilidad en renta variable global.', author:'Equipo CF', time:'Hace 1 h', readTime:'5 min', size:'lg', section:'Mercados' },
  { id:3,  tag:'Economía',           tagColor:'green', title:'Inflación en Latinoamérica: Brasil y Colombia Muestran Señales de Convergencia', excerpt:'Los bancos centrales de la región celebran avances, pero advierten sobre riesgos cambiarios persistentes.', author:'Equipo CF', time:'Hace 2 h', readTime:'4 min', size:'lg', section:'Economía' },
  { id:4,  tag:'Inversiones',        tagColor:'red',   title:'ETFs de Mercados Emergentes Registran Mayor Entrada de Capital en 14 Meses', excerpt:'Flujos hacia fondos de EM superan los USD 8.400 millones en la semana, liderados por Asia ex-China.', author:'Equipo CF', time:'Hace 30 min', readTime:'3 min', size:'md', section:'Inversiones' },
  { id:5,  tag:'Criptomonedas',      tagColor:'gold',  title:'Bitcoin Consolida por Encima de $67K Mientras Institucionales Acumulan en Silencio', excerpt:'El análisis on-chain revela acumulación sostenida de wallets con más de 1,000 BTC en las últimas 72 horas.', author:'Equipo CF', time:'Hace 1 h', readTime:'4 min', size:'md', section:'Mercados' },
  { id:6,  tag:'Banca',              tagColor:'red',   title:'CMF Publica Norma sobre Gestión de Riesgo de Liquidez para Bancos Sistémicos', excerpt:'La regulación adopta los estándares de Basilea III con ajustes para el mercado financiero local.', author:'Equipo CF', time:'Hace 2 h', readTime:'3 min', size:'md', section:'Economía' },
  { id:7,  tag:'ESG',                tagColor:'green', title:'Bonos Verdes en América Latina Alcanzan Récord de Emisión en el Primer Semestre', excerpt:'Chile y México concentran el 58% del volumen regional, impulsados por proyectos de transición energética.', author:'Equipo CF', time:'Hace 3 h', readTime:'4 min', size:'md', section:'ESG' },
  { id:8,  tag:'Fed · EE.UU.',       tagColor:'red',   title:'Fed minutes revelan división sobre el timing del primer recorte de tasas en 2026', excerpt:'Tres gobernadores se mostraron dispuestos a recortar en septiembre, mientras otros dos insisten en esperar más datos.', author:'Equipo CF', time:'Hace 2 h', readTime:'4 min', size:'md', section:'Internacional' },
  { id:9,  tag:'China',              tagColor:'red',   title:'PMI manufacturero chino cae a 49.2: Señal de alerta para exportadores de cobre', excerpt:'La contracción en el sector fabril del mayor consumidor mundial presiona el precio del metal rojo.', author:'Equipo CF', time:'Hace 3 h', readTime:'3 min', size:'md', section:'Internacional' },
  { id:10, tag:'Europa',             tagColor:'green', title:'BCE recorta tasas 25 pbs y señala ciclo gradual de normalización monetaria', excerpt:'Lagarde enfatiza que las decisiones seguirán siendo dependientes de los datos sin comprometerse con un calendario.', author:'Equipo CF', time:'Hace 5 h', readTime:'3 min', size:'md', section:'Internacional' },
];

app.listen(PORT, () => {
  console.log(`\n🚀 Finance Club API → http://localhost:${PORT}\n`);
});