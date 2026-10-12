// ─── BLOG PAGE MOBILE MENU ─────────────────────────────────
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

  if(hamburger){
    hamburger.addEventListener('click', function(e){
      e.stopPropagation();
      if(menu && menu.classList.contains('ic-mobile-menu--open')) closeMenu();
      else openMenu();
    });
  }

  if(closeBtn) closeBtn.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', function(e){
    if(!menu || !menu.classList.contains('ic-mobile-menu--open')) return;
    if(!menu.contains(e.target) && e.target !== hamburger){
      closeMenu();
    }
  });

  if(menu){
    menu.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', closeMenu);
    });
  }
})();
