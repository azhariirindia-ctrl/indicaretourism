// ─── indiCare main.js ──────────────────────────────────────
// Handles: mobile menu, language switcher, testimonial slider,
// scroll-to-appointment, and Google Translate integration.

// ── 1. MOBILE MENU ────────────────────────────────────────
(function(){
  var btn  = document.getElementById('hamburgerBtn');
  var menu = document.getElementById('mobileMenu');

  function openMenu(){
    if(!menu) return;
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu(){
    if(!menu) return;
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  // toggleMobileMenu called by onclick in HTML
  window.toggleMobileMenu = function(){
    if(!menu) return;
    if(menu.classList.contains('open')) closeMenu();
    else openMenu();
  };

  // Also wire up hamburger button via addEventListener as backup
  if(btn){
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      window.toggleMobileMenu();
    });
  }

  // Close on ESC key
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenu();
  });

  // Close on outside click
  document.addEventListener('click', function(e){
    if(!menu || !menu.classList.contains('open')) return;
    if(!menu.contains(e.target) && e.target !== btn){
      closeMenu();
    }
  });
})();

// ── 2. LANGUAGE DROPDOWN ──────────────────────────────────
(function(){
  var toggle   = document.getElementById('langToggle');
  var dropdown = document.getElementById('langDropdown');
  var langBtn  = document.getElementById('langBtn');

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e){
    if(dropdown && !dropdown.contains(e.target) && e.target !== langBtn && e.target !== toggle){
      if(toggle) toggle.checked = false;
    }
  });
})();

// ── 3. SET LANGUAGE (full page translation) ───────────────
var LANG_LABELS = {
  en: '🇬🇧 English', ar: '🇸🇦 Arabic', sw: '🇰🇪 Swahili',
  fr: '🇫🇷 French',  ha: '🇳🇬 Hausa',  am: '🇪🇹 Amharic',
  ru: '🇷🇺 Russian', uz: '🇺🇿 Uzbek',  bn: '🇧🇩 Bengali',
  hi: '🇮🇳 Hindi'
};

var RTL = ['ar'];

window.setLang = function(lang){
  // Update lang button label
  var langBtn = document.getElementById('langBtn');
  if(langBtn) langBtn.textContent = (LANG_LABELS[lang] || '🌐 Language') + ' ▾';

  // RTL support
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', RTL.indexOf(lang) > -1 ? 'rtl' : 'ltr');

  // Close dropdown
  var toggle = document.getElementById('langToggle');
  if(toggle) toggle.checked = false;

  if(lang === 'en'){
    // Reload to restore English
    window.location.reload();
    return;
  }

  // Load Google Translate
  loadGT(lang);
};

function loadGT(lang){
  var gtLang = {
    ar:'ar', sw:'sw', fr:'fr', ha:'ha',
    am:'am', ru:'ru', uz:'uz', bn:'bn', hi:'hi'
  }[lang] || lang;

  if(!document.getElementById('gt-script')){
    window.googleTranslateElementInit = function(){
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'ar,sw,fr,ha,am,ru,uz,bn,hi',
        autoDisplay: false
      }, 'gt-container');
    };
    var s = document.createElement('script');
    s.id  = 'gt-script';
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(s);

    var div = document.createElement('div');
    div.id  = 'gt-container';
    div.style.display = 'none';
    document.body.appendChild(div);
  }

  var tries = 0;
  var iv = setInterval(function(){
    tries++;
    var sel = document.querySelector('.goog-te-combo');
    if(sel){
      clearInterval(iv);
      sel.value = gtLang;
      sel.dispatchEvent(new Event('change'));
    }
    if(tries > 40) clearInterval(iv);
  }, 250);
}

// ── 4. BLOG SECTION LANGUAGE NOTE ────────────────────────
window.setBlogLang = function(lang, btn){
  var note = document.getElementById('blogLangNote');
  var labels = {
    en: 'Viewing in English',
    ar: 'العرض باللغة العربية',
    sw: 'Inaonyeshwa kwa Kiswahili',
    fr: 'Affichage en français',
    ha: 'Ana nuna da Hausa',
    am: 'በአማርኛ እየታየ ነው',
    ru: 'Отображается на русском',
    uz: "O'zbek tilida ko'rsatilmoqda",
    bn: 'বাংলায় প্রদর্শিত হচ্ছে'
  };
  if(note) note.textContent = labels[lang] || '';

  // Update active button in blog lang bar
  document.querySelectorAll('.blog-lang-btn').forEach(function(b){
    b.classList.remove('active');
  });
  if(btn) btn.classList.add('active');
};

// ── 5. TESTIMONIAL SLIDER ────────────────────────────────
(function(){
  var track  = document.querySelector('.testi-track');
  var cards  = track ? track.querySelectorAll('.testi-card') : [];
  var total  = cards.length;
  var perView = window.innerWidth < 700 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  var current = 0;

  function updateSlider(){
    perView = window.innerWidth < 700 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    var maxIdx = Math.max(0, total - perView);
    if(current > maxIdx) current = maxIdx;
    if(track){
      var pct = (100 / perView) * current;
      track.style.transform = 'translateX(-' + pct + '%)';
    }
  }

  window.testiMove = function(dir){
    var perV = window.innerWidth < 700 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    var maxIdx = Math.max(0, total - perV);
    current = Math.max(0, Math.min(current + dir, maxIdx));
    updateSlider();
  };

  window.addEventListener('resize', updateSlider);
  updateSlider();
})();

// ── 6. SCROLL TO APPOINTMENT ─────────────────────────────
window.scrollToAppt = function(){
  var appt = document.getElementById('appointment');
  if(appt){
    appt.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// ── 7. SCROLL TO TOP (back-to-top button) ────────────────
window.addEventListener('scroll', function(){
  var btn = document.getElementById('backToTop');
  if(btn){
    btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  }
});
