const SITE_AUTOR = 'Joaquin Tola';
const API_BASE = 'HTTPS://JSONPLACEHOLDER.TYPICODE.COM';
const POKE_API = 'https://pokeapi.co/api/v2';
const WATHER_API = 'https://restcountries.com/v3.1';

let currentFilter = 'all';
let pokemonPage = 1;
let projectData=[];

const greep = (name) => 'Hola de el portafolio de '+name;
console.log(greep(SITE_AUTOR));


const formatPrice= (amount) => `$${Number (amount).toLocaleString('en-BO')}`;
const devProfile={
name: 'Hebert Cussi',
role: 'Desarrollador de Software',
skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js'], 
location: 'La Paz, Bolivia',
}

const { name, role, skills } = devProfile; 
const [mainSkill, ...otherSkills] = skills;
console.log(`${name} = ${role}`);
console.log(`Habilidades principales: ${mainSkill}`); 
console.log(`Otras habilidades: ${otherSkills}`);
const frontEnd= ['React', 'Vue', 'Angular'];
const backEnd= ['Node.js', 'Django', 'Ruby on Rails']; const fullstack= [...frontEnd, ...backEnd];
// object destructuring
// array destructuring + rest
// spread operator

const allTechnologies= [...frontEnd, ...backEnd]; 
console.log('Todas las tecnologías:', allTechnologies);
const UpdateProfile = {...devProfile, available: true}; 
console.log('Perfil actualizado:', UpdateProfile);
/* CLASES ES6+ OBJETOS
*/
class Project {
    //title des zion Tac & crog: catage) #id;
constructor({id, title, description, techs, emoji, categy}) {
this.id=id;
this.title=title;
this.description=description; 
this.techs=techs;
this.emoji=emoji;
this.categy=categy;
}
get id(){
    return this.id;
}
toHtml(){
    const badger=this.techs
    .map(tech=>``)
}


}
//get id(){
//}

/*
return this.id;
toHtml(){
const badger= this.techs
.map(tech=> <span class="tech-badge">${tech}</span>`)
.join(' ');
return <div class="project-card">
<h3>${this.emoji} ${this.title}</h3> <p>${this.description}</p>
<div class="tech-stack"> ${badger}</div>
</div>';
}
}

*/

const localProjects = [
  new Project({
    id: 1, category: 'frontend', emoji: '📱',
    title: 'App de Tareas',
    description: 'Aplicación web con drag & drop, almacenamiento local y modo oscuro.',
    techs: ['React', 'CSS Modules', 'Flexbox'],
  }),
  new Project({
    id: 2, category: 'frontend', emoji: '🌿',
    title: 'EcoShop',
    description: 'E-commerce sostenible con sistema de filtros y carrito de compras.',
    techs: ['HTML5', 'CSS Grid', 'JavaScript'],
  }),
  new Project({
    id: 3, category: 'fullstack', emoji: '📊',
    title: 'Dashboard Analytics',
    description: 'Panel con gráficas en tiempo real, filtros dinámicos y exportación.',
    techs: ['Node.js', 'PostgreSQL', 'Chart.js'],
  }),
  new Project({
    id: 4, category: 'backend', emoji: '🔧',
    title: 'REST API – Inventario',
    description: 'API REST completa con autenticación JWT y documentación Swagger.',
    techs: ['Express', 'MySQL', 'JWT'],
  }),
  new Project({
    id: 5, category: 'fullstack', emoji: '🌍',
    title: 'GeoWeather App',
    description: 'Consulta clima en tiempo real usando la API de OpenWeather y países.',
    techs: ['React', 'Fetch API', 'OpenWeather'],
  }),
];

//filtrar
const findProject=(id)=> localProjaects.find(p=>p.id===id);



//DOM

const projectsGrid=document.getElementById('projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn'); const pokeSection = document.getElementById('poke-section'); 
const pokeGrid = document.getElementById('poke-grid');
const pokeBtnNext = document.getElementById('poke-next');
const countryInput = document.getElementById('country-search'); 
const countryResult = document.getElementById('country-result');


function renderProjaects(category='all'){
    if(!projectsGrid) return;
    const filtered = filterProjects(category);
    projectsGrid
}




function validateEmail(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (valid) resolve({ ok: true, email });
              else reject(new Error(`Email inválido: ${email}`));
        }, 500);
    });
}


validateEmail('joaquin@gmail.com')
.then(({email})=> console.log('Email valido'+email))
.catch(err => console.error(err.message));


/**manejo de errores en fetch */
async function fetchJSON(url) { 
    //$res status) stres status cxt] 
    const res = await fetch(url);

    if (!res.ok) throw new Error('HTTP ${res.status} ${res.statusText}`); return await res.json(); //res.json() devuelve una Promesa

//https://jsonplaceholder.typicode.com*/

async function fetchProjects() {
  const loader = document.getElementById('projects-loader');
  if (loader) loader.classList.remove('hidden');
 
  try {
    // Fetch GET: obtiene posts como "proyectos de ejemplo"
    const posts = await fetchJSON(`${API_BASE}/posts?_limit=3`);
 
    // Destructuring en el map + template literal
    const extra = posts.map(({ id, title, body }) => new Project({
      id: id + 100,
      category: 'api',
      emoji: '🌐',
      title: title.slice(0, 40) + '…',
      description: body.slice(0, 100) + '…',
      techs: ['Fetch API', 'JSONPlaceholder', 'REST'],
    }));
 
    // Spread: combinar proyectos locales + los de la API
    projectsData = [...localProjects, ...extra];
 
    showToast('Proyectos de API cargados ✅');
 
  } catch (err) {
    console.error('Error al cargar proyectos:', err);
    showToast(`Error: ${err.message}`, 'error');
  } finally {
    // finally: se ejecuta SIEMPRE, haya error o no
    if (loader) loader.classList.add('hidden');
  }
}
 
 
// ============================================================
// SESIÓN 4 – BLOQUE D: FETCH GET – PokeAPI
//   API Pública: https://pokeapi.co
// ============================================================
 
async function fetchPokemons(offset = 0) {
  if (!pokeGrid) return;
 
  pokeGrid.innerHTML = '<p class="loading-text">Cargando Pokémon...</p>';
 
  try {
    // Fetch GET con parámetros en la URL
    const data = await fetchJSON(`${POKE_API}/pokemon?limit=6&offset=${offset}`);
 
    // Promise.all: carga los detalles de los 6 pokémon EN PARALELO
    const details = await Promise.all(
      data.results.map(p => fetchJSON(p.url))       // map() + Promise.all
    );
 
    // Manipulación DOM: construir tarjetas con innerHTML
    pokeGrid.innerHTML = details.map(({ name, id, sprites, types }) => {
      const type = types[0].type.name;
      const img  = sprites.other['official-artwork'].front_default
                || sprites.front_default;
      return `
        <div class="poke-card poke--${type}">
          <img src="${img}" alt="${name}" loading="lazy" />
          <p class="poke-name">${name}</p>
          <span class="poke-type">${type}</span>
        </div>`;
    }).join('');
 
  } catch (err) {
    pokeGrid.innerHTML = `<p class="error-text">Error: ${err.message}</p>`;
  }
}

async function fetchCountry(query) {
    if(!countryResult || query.trim()) return;
    countryResult.innerHTML='<p>Buscando país...</p>';
    try {
        const [country] =await fetchJSON(
            `${WEATHER_API}/name/${encodeURIComponent(query)}?fields=name,capital,population,flags,languages,region`
        );
        const {
            name: { common },
            capital: [capital] = ['N/A'],
            population,
            flags: { svg: flag },
            region,
        } = country;
        countryResult.innerHTML = `
            <div class="country-card">
                <img src="${flag}" alt="Bandera de ${common}" class="country-flag" />
                <div class="country-info">
                <h4>${common}</h4>
                <p>🏛 Capital: <strong>${capital}</strong></p>
                <p>🌍 Región: <strong>${region}</strong></p>
                <p>👥 Población: <strong>${population.toLocaleString()}</strong></p>
                </div>
            </div>`;
 
    } catch (error) {
        countryResult.innerHTML = `<p class="error-text">País no encontrado.</p>`;
        console.error('Error al buscar país:', error);
        showToast('Error al buscar país', 'error');
    }
}
 
let searchTimer;
if (countryInput) {
  countryInput.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => fetchCountry(e.target.value), 600);
  });
}



document.addEventListener('DOMContentLoaded', () => {
    if (pokeSection) fetchPokemons(0);
 
} );
 