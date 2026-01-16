(function(){
  const search = document.getElementById('search');
  const filter = document.getElementById('filter');
  const cards = Array.from(document.querySelectorAll('.card'));
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeModal = document.getElementById('closeModal');

  function matches(card, text, tag){
    const title = card.dataset.title.toLowerCase();
    const tags = card.dataset.tags.toLowerCase();
    const q = (text||'').toLowerCase();
    if(tag && tag!=='all' && !tags.includes(tag)) return false;
    if(!q) return true;
    return title.includes(q) || tags.includes(q);
  }

  function render(){
    const q = search.value.trim();
    const tag = filter.value;
    cards.forEach(c=>{
      c.style.display = matches(c,q,tag)?'' : 'none';
    });
  }

  search.addEventListener('input', render);
  filter.addEventListener('change', render);

  document.querySelectorAll('.details').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const card = e.currentTarget.closest('.card');
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.querySelector('.desc').textContent;
      modal.setAttribute('aria-hidden','false');
    })
  });

  closeModal.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', e=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true') });

  // keyboard accessibility
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') modal.setAttribute('aria-hidden','true') });

})();