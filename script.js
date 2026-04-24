  let t = {};
  
  async function loadLang(lang){
    const res = await fetch(`./locales/${lang}.json`);
    t = await res.json();
    applyText();
  }
  
  function applyText(){
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.dataset.i18n;
      const value = key.split('.').reduce((o,i)=>o?.[i], t);
      if(value) el.textContent = value;
    });
  }
  
  async function loadData(){
    const res = await fetch('./data/data.json');
    return await res.json();
  }
  
  function card(c){
    return `
      <div class="card">
        <img class="card__img" src="${c.img}">
        <div class="card__content">
          <h3 data-i18n="${c.title}"></h3>
          <p class="card__text" data-i18n="${c.text}"></p>
        </div>
      </div>
    `;
  }
  
  function section(s){
    return `
      <section class="section" style="background:${s.color}">
        <h2 class="section__title" data-i18n="${s.title}"></h2>
        <div class="cards">
          ${s.cards.map(card).join('')}
        </div>
      </section>
    `;
  }
  
  async function init(){
    const data = await loadData();
    document.getElementById('app').innerHTML =
      data.sections.map(section).join('');
  
    await loadLang("ru");
  }
  
  function setLang(lang){
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    loadLang(lang);
  }
  
  function toggleTheme(){
    const html = document.documentElement;
    html.dataset.theme =
      html.dataset.theme === "dark" ? "light" : "dark";
  }
  
  init();