(function(){
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const state={type:'Baby / Child',occasion:'Birthday',language:'English',product:'Storybook',pages:8,photos:[],drafts:[],step:1};
  const typeCards=$$('.type-card'), occasionBtns=$$('.occasion-btn'), createType=$('#createType'), createOccasion=$('#createOccasion'), createLanguage=$('#createLanguage'), lang=$('#language');
  const productButtons=$$('.product-btn'), wizard=$('#wizard'), progress=$('#progress');
  function sync(){
    if(createType) createType.value=state.type;
    if(createOccasion) createOccasion.value=state.occasion;
    if(createLanguage) createLanguage.value=state.language;
    if(lang) lang.value=state.language;
    $$('.summary-type').forEach(x=>x.textContent=state.type);
    $$('.summary-occasion').forEach(x=>x.textContent=state.occasion);
    $$('.summary-language').forEach(x=>x.textContent=state.language);
  }
  function goCreate(){ $('#create')?.scrollIntoView({behavior:'smooth'}); }
  typeCards.forEach(card=>card.addEventListener('click',()=>{typeCards.forEach(c=>c.classList.remove('selected'));card.classList.add('selected');state.type=card.dataset.type;sync();goCreate();}));
  occasionBtns.forEach(btn=>btn.addEventListener('click',()=>{occasionBtns.forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');state.occasion=btn.dataset.occasion;sync();goCreate();}));
  productButtons.forEach(btn=>btn.addEventListener('click',()=>{productButtons.forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');state.product=btn.dataset.product;$('#productChoice').textContent=state.product;}));
  [lang,createLanguage].forEach(el=>el?.addEventListener('change',()=>{state.language=el.value;sync();}));
  createType?.addEventListener('change',e=>state.type=e.target.value);
  createOccasion?.addEventListener('change',e=>state.occasion=e.target.value);
  const photoInput=$('#photoInput'); photoInput?.addEventListener('change',e=>{state.photos=[...e.target.files];$('#photoCount').textContent=state.photos.length+' photo(s) selected';});
  $$('.wizard-next').forEach(b=>b.addEventListener('click',()=>{const n=Math.min(6,state.step+1);state.step=n;renderWizard();}));
  $$('.wizard-back').forEach(b=>b.addEventListener('click',()=>{state.step=Math.max(1,state.step-1);renderWizard();}));
  function renderWizard(){
    $$('.wizard-panel').forEach(p=>p.hidden=+p.dataset.step!==state.step);
    if(progress) progress.style.width=(state.step/6*100)+'%';
    $$('.step-dot').forEach(d=>d.classList.toggle('active',+d.dataset.step===state.step));
  }
  $('#saveDraft')?.addEventListener('click',()=>{localStorage.setItem('tinytalesDraft',JSON.stringify(state));alert('Draft saved on this device.');});
  $('#resumeDraft')?.addEventListener('click',()=>{try{Object.assign(state,JSON.parse(localStorage.getItem('tinytalesDraft')||'{}'));sync();renderWizard();alert('Draft restored.');}catch(e){alert('No saved draft found.');}});
  $('#createPreviewBtn')?.addEventListener('click',()=>{sync();$('#wizard')?.scrollIntoView({behavior:'smooth'});renderWizard();});
  $('#mockGenerate')?.addEventListener('click',()=>{localStorage.setItem('tinytalesOrder',JSON.stringify({...state,status:'Character Preview Ready'}));$('#generationStatus').textContent='Character Preview Ready';});
  $('#mockApprove')?.addEventListener('click',()=>{localStorage.setItem('tinytalesOrder',JSON.stringify({...state,status:'Approved — Ready for Payment'}));$('#generationStatus').textContent='Approved — Ready for Payment';});
  $('#mockPay')?.addEventListener('click',()=>{localStorage.setItem('tinytalesOrder',JSON.stringify({...state,status:'Payment Integration Required'}));$('#generationStatus').textContent='Payment Integration Required';});
  sync(); renderWizard();
})();


