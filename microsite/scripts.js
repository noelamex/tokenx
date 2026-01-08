// nav toggle
document.getElementById('nav-toggle').addEventListener('click',function(){
  const nav = document.getElementById('main-nav');
  if(nav.style.display === 'block'){ nav.style.display = ''; this.textContent='☰' }
  else { nav.style.display = 'block'; this.textContent='✕' }
});

// smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      // close nav on mobile
      const nav = document.getElementById('main-nav');
      if(window.innerWidth<900) { nav.style.display=''; document.getElementById('nav-toggle').textContent='☰' }
    }
  })
})
