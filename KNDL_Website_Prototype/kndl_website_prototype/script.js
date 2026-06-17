const toggle = document.getElementById('langToggle');
let current = 'ar';

function setLang(lang){
  current = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.setAttribute('dir', document.documentElement.dir);
  document.querySelectorAll('[data-ar][data-en]').forEach(el=>{
    el.textContent = el.dataset[lang];
  });
  document.querySelectorAll('[data-placeholder-ar][data-placeholder-en]').forEach(el=>{
    el.placeholder = lang === 'ar' ? el.dataset.placeholderAr : el.dataset.placeholderEn;
  });
  toggle.textContent = lang === 'ar' ? 'EN' : 'AR';
}

toggle.addEventListener('click',()=> setLang(current === 'ar' ? 'en' : 'ar'));
setLang('ar');
