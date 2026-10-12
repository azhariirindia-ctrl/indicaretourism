// ─── BLOG LANGUAGE SWITCHER ────────────────────────────────
// Translates the entire blog article into 9 languages using
// Google Translate API (free tier via element replacement)
// Falls back to browser translate prompt if unavailable.

var TRANSLATIONS = {
  en: {
    nav_home: "Home",
    nav_blog: "Blog",
    nav_back: "← Back",
    cta_whatsapp: "💬 WhatsApp Us",
    cta_consult: "Free Consultation",
    cta_estimate: "Get Free Estimate →",
    cta_opinion: "Get Free Opinion →",
    cta_contact: "Contact indiCare",
    footer_text: "© 2026 indiCare Medical Tourism · indicaretourism.com · JCI & NABH Accredited Hospital Partners"
  },
  ar: {
    nav_home: "الرئيسية",
    nav_blog: "المدونة",
    nav_back: "→ العودة",
    cta_whatsapp: "💬 واتساب",
    cta_consult: "استشارة مجانية",
    cta_estimate: "احصل على تقدير مجاني →",
    cta_opinion: "احصل على رأي مجاني →",
    cta_contact: "تواصل مع indiCare",
    footer_text: "© 2026 indiCare للسياحة الطبية · JCI وNABH شركاء المستشفيات المعتمدة"
  },
  sw: {
    nav_home: "Nyumbani",
    nav_blog: "Blogu",
    nav_back: "← Rudi",
    cta_whatsapp: "💬 WhatsApp",
    cta_consult: "Ushauri wa Bure",
    cta_estimate: "Pata Makadirio ya Bure →",
    cta_opinion: "Pata Maoni ya Bure →",
    cta_contact: "Wasiliana na indiCare",
    footer_text: "© 2026 indiCare Utalii wa Matibabu · Washirika wa Hospitali Zilizoidhinishwa"
  },
  fr: {
    nav_home: "Accueil",
    nav_blog: "Blog",
    nav_back: "← Retour",
    cta_whatsapp: "💬 WhatsApp",
    cta_consult: "Consultation Gratuite",
    cta_estimate: "Obtenir un Devis Gratuit →",
    cta_opinion: "Obtenir un Avis Gratuit →",
    cta_contact: "Contacter indiCare",
    footer_text: "© 2026 indiCare Tourisme Médical · Partenaires Hospitaliers Accrédités JCI & NABH"
  },
  ha: {
    nav_home: "Gida",
    nav_blog: "Blog",
    nav_back: "← Koma",
    cta_whatsapp: "💬 WhatsApp",
    cta_consult: "Shawarar Kyauta",
    cta_estimate: "Sami Kimar Kyauta →",
    cta_opinion: "Sami Ra'ayi Kyauta →",
    cta_contact: "Tuntubi indiCare",
    footer_text: "© 2026 indiCare Yawon Shakatawa na Likita · Abokan Asibitin da aka Amince"
  },
  am: {
    nav_home: "መነሻ",
    nav_blog: "ብሎግ",
    nav_back: "← ተመለስ",
    cta_whatsapp: "💬 WhatsApp",
    cta_consult: "ነፃ ምክር",
    cta_estimate: "ነፃ ግምት ያግኙ →",
    cta_opinion: "ነፃ አስተያየት ያግኙ →",
    cta_contact: "indiCareን ያግኙ",
    footer_text: "© 2026 indiCare የሕክምና ቱሪዝም · JCI እና NABH የተረጋገጡ የሆስፒታል ሸሪኮች"
  },
  ru: {
    nav_home: "Главная",
    nav_blog: "Блог",
    nav_back: "← Назад",
    cta_whatsapp: "💬 WhatsApp",
    cta_consult: "Бесплатная консультация",
    cta_estimate: "Получить бесплатную оценку →",
    cta_opinion: "Получить бесплатное мнение →",
    cta_contact: "Связаться с indiCare",
    footer_text: "© 2026 indiCare Медицинский туризм · Аккредитованные больницы JCI и NABH"
  },
  uz: {
    nav_home: "Bosh sahifa",
    nav_blog: "Blog",
    nav_back: "← Orqaga",
    cta_whatsapp: "💬 WhatsApp",
    cta_consult: "Bepul maslahat",
    cta_estimate: "Bepul baholash →",
    cta_opinion: "Bepul fikr olish →",
    cta_contact: "indiCare bilan bog'lanish",
    footer_text: "© 2026 indiCare Tibbiy turizm · JCI va NABH akkreditatsiyalangan kasalxona hamkorlari"
  },
  bn: {
    nav_home: "হোম",
    nav_blog: "ব্লগ",
    nav_back: "← ফিরে যান",
    cta_whatsapp: "💬 WhatsApp",
    cta_consult: "বিনামূল্যে পরামর্শ",
    cta_estimate: "বিনামূল্যে অনুমান পান →",
    cta_opinion: "বিনামূল্যে মতামত পান →",
    cta_contact: "indiCare এর সাথে যোগাযোগ করুন",
    footer_text: "© 2026 indiCare মেডিকেল ট্যুরিজম · JCI ও NABH স্বীকৃত হাসপাতাল অংশীদার"
  }
};

var RTL_LANGS = ['ar'];
var currentLang = 'en';

function setLang(lang, btn) {
  currentLang = lang;

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.classList.remove('active');
  });
  if(btn) btn.classList.add('active');

  // RTL support
  if(RTL_LANGS.indexOf(lang) > -1){
    document.documentElement.setAttribute('dir','rtl');
    document.documentElement.setAttribute('lang', lang);
  } else {
    document.documentElement.setAttribute('dir','ltr');
    document.documentElement.setAttribute('lang', lang);
  }

  // Use Google Translate for full article body translation
  if(lang === 'en'){
    // Remove Google Translate if switching back to English
    var gtFrame = document.querySelector('.goog-te-banner-frame');
    if(gtFrame) gtFrame.style.display = 'none';
    document.body.style.top = '0px';

    // Reload page to restore English
    window.location.reload();
    return;
  }

  // Trigger Google Translate
  loadGoogleTranslate(lang);

  // Also translate UI elements we control
  var t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  translateUI(t, lang);
}

function translateUI(t, lang) {
  // Translate CTA buttons
  document.querySelectorAll('.cta-btn').forEach(function(el){
    if(el.textContent.indexOf('Estimate') > -1) el.textContent = t.cta_estimate;
    else if(el.textContent.indexOf('Opinion') > -1) el.textContent = t.cta_opinion;
    else if(el.textContent.indexOf('Contact') > -1) el.textContent = t.cta_contact;
    else if(el.textContent.indexOf('Review') > -1) el.textContent = t.cta_estimate;
    else if(el.textContent.indexOf('Support') > -1) el.textContent = t.cta_estimate;
  });

  // Translate back link
  var backLink = document.getElementById('icBack');
  if(backLink) backLink.textContent = t.nav_back;

  // Breadcrumb
  document.querySelectorAll('.ic-breadcrumb a').forEach(function(el){
    if(el.textContent.trim() === 'Home' || el.textContent.trim() === 'Главная' || el.textContent.trim() === 'الرئيسية') el.textContent = t.nav_home;
    if(el.textContent.trim() === 'Blog' || el.textContent.trim() === 'Блог' || el.textContent.trim() === 'المدونة') el.textContent = t.nav_blog;
  });

  // WhatsApp button
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(el){
    if(el.classList.contains('cta-btn')) el.textContent = t.cta_whatsapp;
  });
}

function loadGoogleTranslate(lang) {
  // Map our lang codes to Google Translate codes
  var gtLang = {
    ar: 'ar', sw: 'sw', fr: 'fr', ha: 'ha',
    am: 'am', ru: 'ru', uz: 'uz', bn: 'bn'
  }[lang] || lang;

  // Add Google Translate widget if not already loaded
  if(!document.getElementById('gt-script')){
    window.googleTranslateElementInit = function(){
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'ar,sw,fr,ha,am,ru,uz,bn',
        autoDisplay: false
      }, 'gt-container');
    };
    var s = document.createElement('script');
    s.id = 'gt-script';
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(s);

    // Create hidden container
    var div = document.createElement('div');
    div.id = 'gt-container';
    div.style.display = 'none';
    document.body.appendChild(div);
  }

  // Wait for Google Translate to load then trigger translation
  var attempts = 0;
  var interval = setInterval(function(){
    attempts++;
    var select = document.querySelector('.goog-te-combo');
    if(select){
      clearInterval(interval);
      select.value = gtLang;
      select.dispatchEvent(new Event('change'));
    }
    if(attempts > 30) clearInterval(interval);
  }, 300);
}

// ─── MOBILE MENU (backup in case header.js fails) ──────────
(function(){
  var hamburger = document.getElementById('icHamburger');
  var menu      = document.getElementById('icMobileMenu');
  var closeBtn  = document.getElementById('icMobileClose');

  function openMenu(){
    if(!menu) return;
    menu.classList.add('ic-mobile-menu--open');
    if(hamburger) hamburger.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu(){
    if(!menu) return;
    menu.classList.remove('ic-mobile-menu--open');
    if(hamburger) hamburger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }

  if(hamburger) hamburger.addEventListener('click', openMenu);
  if(closeBtn)  closeBtn.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenu();
  });

  if(menu){
    menu.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', closeMenu);
    });
  }
})();
