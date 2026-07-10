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
app.get('/api/industry-events', (req, res) => res.json(INDUSTRY_EVENTS));
app.get('/api/research', (req, res) => res.json(RESEARCH));
app.get('/api/news',     (req, res) => res.json(NEWS));

// ─── DATA ────────────────────────────────────────────────────────────────────
const MEMBERS = [
  // ─── Directiva ───
  { id:1,  name:'Benjamín Pérez',    role:'Presidente',                         career:'Economía',             year:'4.º', area:'Banca de Inversión',      avatar:'BP', photo:'/images/directiva/benjamin-perez.webp', bio:'Lidera la estrategia general del club y representa a la organización ante la facultad y los socios institucionales.' , linkedin:'' },
  { id:2,  name:'Javiera Espinoza',   role:'Vicepresidenta',                      career:'Administración',        year:'4.º', area:'Macro & FX',           avatar:'JE', photo:'/images/directiva/javiera-espinoza.webp', bio:'Coordina las áreas internas del club y supervisa la calidad de los contenidos académicos producidos por los socios.' , linkedin:'' },
  { id:3,  name:'Claudio San Martín', role:'Director de Relaciones Corporativas', career:'Administración',        year:'5.º', area:'Banca de Inversión',  avatar:'CS', photo:'/images/directiva/claudio-san-martin.webp', bio:'Gestiona vínculos con empresas, instituciones financieras y partners para abrir oportunidades a los miembros.' , linkedin:'' },
  { id:4,  name:'Macarena Pereira',  role:'Directora de Comunicación',            career:'Administración',        year:'4.º', area:'Comunicaciones',      avatar:'MP', photo:'/images/directiva/macarena-pereira.webp', bio:'Responsable de la identidad visual del club, redes sociales y comunicación pública de las actividades.' , linkedin:'' },
  { id:5,  name:'Ignacia Inostroza', role:'Directora de Eventos y Formación',    career:'Ingeniería Comercial', year:'3.º', area:'Formación',            avatar:'II', photo:'/images/directiva/ignacia-inostroza.webp', bio:'Planifica el calendario de talleres, charlas y formación técnica que reciben los miembros durante el semestre.' , linkedin:'' },

  // ─── Miembros Senior ───
  { id:6,  name:'Isidora Aravena',   role:'Directora de Marketing',  career:'Administración',        year:'4.º', area:'Comunicaciones',       avatar:'IA', photo:'/images/directiva/isidora-aravena.webp', bio:'Responsable de la estrategia de marketing y posicionamiento del club en la facultad y redes sociales.' , linkedin:'' },
  { id:7,  name:'Simoney Vidal Riquelme',        role:'Miembro', career:'Ingeniería Comercial', year:'3.º', area:'Renta Variable', avatar:'SV', bio:'', linkedin:'' },
  { id:8,  name:'Diego Ñancuán Ruiz',            role:'Miembro', career:'Ingeniería Comercial', year:'5.º', area:'Renta Variable', avatar:'DÑ', bio:'', linkedin:'' },
  { id:9,  name:'Carlos Pizarro Candia',         role:'Miembro', career:'Ingeniería Comercial', year:'4.º', area:'Renta Variable', avatar:'CP', bio:'', linkedin:'' },
  { id:10, name:'Nicolás Lerm',                  role:'Miembro', career:'Ingeniería Comercial', year:'2.º', area:'Renta Variable', avatar:'NL', bio:'', linkedin:'' },
  { id:11, name:'Cristian Vidal R.',             role:'Miembro', career:'Ingeniería Comercial', year:'5.º', area:'Renta Variable', avatar:'CV', bio:'', linkedin:'' },
  { id:12, name:'Daniela Inostroza Sepúlveda',   role:'Miembro', career:'Ingeniería Comercial', year:'4.º', area:'Renta Variable', avatar:'DI', bio:'', linkedin:'' },
  { id:13, name:'Cristián Abarca Arellano',      role:'Miembro', career:'Ingeniería Comercial', year:'5.º', area:'Renta Variable', avatar:'CA', bio:'', linkedin:'' },
  { id:14, name:'Daniela Saez Valenzuela',       role:'Miembro', career:'Ingeniería Comercial', year:'4.º', area:'Renta Variable', avatar:'DS', bio:'', linkedin:'' },
  { id:15, name:'Bastian Bizama Andrade',        role:'Miembro', career:'Ingeniería Comercial', year:'4.º', area:'Renta Variable', avatar:'BB', bio:'', linkedin:'' },
  { id:16, name:'Consuelo Alvial Torres',        role:'Miembro', career:'Ingeniería Comercial', year:'3.º', area:'Renta Variable', avatar:'CA', bio:'', linkedin:'' },
  { id:17, name:'Jaasiel Cea Cea',               role:'Miembro', career:'Ingeniería Comercial', year:'3.º', area:'Renta Variable', avatar:'JC', bio:'', linkedin:'' },
  { id:18, name:'Camilo Torres Vasquez',         role:'Miembro', career:'Ingeniería Comercial', year:'4.º', area:'Renta Variable', avatar:'CT', bio:'', linkedin:'' },
  { id:19, name:'Angelina Toledo Villa',         role:'Miembro', career:'Ingeniería Comercial', year:'2.º', area:'Renta Variable', avatar:'AT', bio:'', linkedin:'' },
];

const EVENTS = [
  { id:0, day:'25', month:'JUN', name:'Inicio Período de Inscripciones',   time:'00:00', location:'Online',            format:'Online',     category:'Inscripción', desc:'Apertura de inscripciones para nuevos miembros del club. Plazo hasta el 6 de julio.', image:'', type:'club' },
  { id:7, day:'12', month:'AGO', name:'Get to Know Santiago',             time:'19:30', location:'Santiago',          format:'Presencial', category:'Conferencia', desc:'Evento organizado por Bain & Company. Instancia de networking y acercamiento a la industria de consultoría estratégica.', image:'', type:'club' },
];

// Eventos externos recomendados — organizados por terceros (no por el club)
const INDUSTRY_EVENTS = [
  {
    id: 101,
    day: '05', month: 'AGO',
    name: 'Fitch on Chile',
    organizer: 'Fitch Ratings',
    time: '8:30 - 12:00',
    location: 'The Ritz-Carlton, Las Condes, Santiago',
    format: 'Presencial',
    desc: 'Panorama fiscal, contexto macroeconómico y señales crediticias en la nueva etapa de Chile.',
    image: '/images/industria/fitch-on-chile.webp',
    link: '',
  },
  {
    id: 102,
    day: '16', month: 'JUL',
    name: 'LEAP: Leadership Excellence through Awareness and Practice',
    organizer: 'INSEAD Executive Education',
    time: '10:00 CEST · 1 hora',
    location: 'Online · Info session',
    format: 'Online',
    desc: 'Sesión informativa del programa LEAP de INSEAD. Presentado por Narayan Pant (Professor of Management Practice) y Pamela Heo (Assistant Director, Open Enrolment Programmes).',
    image: '/images/industria/insead-leap.webp',
    link: '',
  },
  {
    id: 103,
    day: '08', month: 'JUL',
    name: 'U.S. Market Insights con Liz Ann Sonders',
    organizer: 'Charles Schwab',
    time: '9:00 AM ET',
    location: 'Online',
    format: 'Online',
    desc: 'La experta en mercados estadounidenses Liz Ann Sonders entrega un análisis actualizado del panorama económico y de inversión en EE.UU. Presentación seguida de sesión Q&A.',
    image: '/images/industria/schwab-us-market.webp',
    link: '',
  },
];

const RESEARCH = [
  { id:1, title:'Perspectivas Macro Chile H2 2026',        author:'Sebastián Morales', date:'Jun 2026', area:'Macro',      pages:18, abstract:'Análisis del ciclo económico chileno y proyecciones bajo distintos escenarios de política monetaria del Banco Central.' , linkedin:'' },
  { id:2, title:'Tesis: Sector Retail Latinoamérica',      author:'Valentina Reyes',   date:'May 2026', area:'Equities',   pages:24, abstract:'Valoración bottom-up de los principales retailers de la región con foco en e-commerce y márgenes operativos.' , linkedin:'' },
  { id:3, title:'Estrategia de Renta Fija en USD',         author:'Catalina Torres',   date:'Abr 2026', area:'Renta Fija', pages:14, abstract:'Construcción de cartera de bonos investment grade y high yield con gestión activa de duración.' , linkedin:'' },
  { id:4, title:'Factor Investing en el Mercado Chileno',  author:'Diego Contreras',   date:'Mar 2026', area:'Quant',      pages:31, abstract:'Implementación de estrategias multifactor (value, momentum, quality) en acciones chilenas 2010-2025.' , linkedin:'' },
  { id:5, title:'ESG & Performance: ¿Trade-off real?',    author:'Isadora Vega',      date:'Feb 2026', area:'ESG',        pages:20, abstract:'Revisión empírica de la relación entre ratings ESG y retorno ajustado al riesgo en carteras de largo plazo.' , linkedin:'' },
];

const NEWS = [
  { id:1,  tag:'Análisis Exclusivo', tagColor:'gold',  title:'El Ciclo del Cobre y el Futuro Fiscal de Chile: Lo que los Modelos Estándar No Capturan', excerpt:'Con el precio del cobre rozando máximos de 18 meses, el debate sobre la regla de balance estructural vuelve a dominar la agenda del Ministerio de Hacienda.', author:'Sofía Ramírez Leal', time:'Hace 42 min', readTime:'8 min', size:'xl', section:'Economía' , linkedin:'' },
  { id:2,  tag:'Mercados',           tagColor:'red',   title:'Fondos de Pensiones Aumentan Exposición a Activos Alternativos en un 12%', excerpt:'Las AFP chilenas diversifican hacia infraestructura y deuda privada ante la volatilidad en renta variable global.', author:'Equipo CF', time:'Hace 1 h', readTime:'5 min', size:'lg', section:'Mercados' , linkedin:'' },
  { id:3,  tag:'Economía',           tagColor:'green', title:'Inflación en Latinoamérica: Brasil y Colombia Muestran Señales de Convergencia', excerpt:'Los bancos centrales de la región celebran avances, pero advierten sobre riesgos cambiarios persistentes.', author:'Equipo CF', time:'Hace 2 h', readTime:'4 min', size:'lg', section:'Economía' , linkedin:'' },
  { id:4,  tag:'Inversiones',        tagColor:'red',   title:'ETFs de Mercados Emergentes Registran Mayor Entrada de Capital en 14 Meses', excerpt:'Flujos hacia fondos de EM superan los USD 8.400 millones en la semana, liderados por Asia ex-China.', author:'Equipo CF', time:'Hace 30 min', readTime:'3 min', size:'md', section:'Inversiones' , linkedin:'' },
  { id:5,  tag:'Criptomonedas',      tagColor:'gold',  title:'Bitcoin Consolida por Encima de $67K Mientras Institucionales Acumulan en Silencio', excerpt:'El análisis on-chain revela acumulación sostenida de wallets con más de 1,000 BTC en las últimas 72 horas.', author:'Equipo CF', time:'Hace 1 h', readTime:'4 min', size:'md', section:'Mercados' , linkedin:'' },
  { id:6,  tag:'Banca',              tagColor:'red',   title:'CMF Publica Norma sobre Gestión de Riesgo de Liquidez para Bancos Sistémicos', excerpt:'La regulación adopta los estándares de Basilea III con ajustes para el mercado financiero local.', author:'Equipo CF', time:'Hace 2 h', readTime:'3 min', size:'md', section:'Economía' , linkedin:'' },
  { id:7,  tag:'ESG',                tagColor:'green', title:'Bonos Verdes en América Latina Alcanzan Récord de Emisión en el Primer Semestre', excerpt:'Chile y México concentran el 58% del volumen regional, impulsados por proyectos de transición energética.', author:'Equipo CF', time:'Hace 3 h', readTime:'4 min', size:'md', section:'ESG' , linkedin:'' },
  { id:8,  tag:'Fed · EE.UU.',       tagColor:'red',   title:'Fed minutes revelan división sobre el timing del primer recorte de tasas en 2026', excerpt:'Tres gobernadores se mostraron dispuestos a recortar en septiembre, mientras otros dos insisten en esperar más datos.', author:'Equipo CF', time:'Hace 2 h', readTime:'4 min', size:'md', section:'Internacional' , linkedin:'' },
  { id:9,  tag:'China',              tagColor:'red',   title:'PMI manufacturero chino cae a 49.2: Señal de alerta para exportadores de cobre', excerpt:'La contracción en el sector fabril del mayor consumidor mundial presiona el precio del metal rojo.', author:'Equipo CF', time:'Hace 3 h', readTime:'3 min', size:'md', section:'Internacional' , linkedin:'' },
  { id:10, tag:'Europa',             tagColor:'green', title:'BCE recorta tasas 25 pbs y señala ciclo gradual de normalización monetaria', excerpt:'Lagarde enfatiza que las decisiones seguirán siendo dependientes de los datos sin comprometerse con un calendario.', author:'Equipo CF', time:'Hace 5 h', readTime:'3 min', size:'md', section:'Internacional' , linkedin:'' },
];

app.listen(PORT, () => {
  console.log(`\n🚀 Finance Club API → http://localhost:${PORT}\n`);
});