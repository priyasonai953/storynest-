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
  const prices={8:{inr:199,usd:4.99},12:{inr:299,usd:6.99},16:{inr:399,usd:8.99},20:{inr:499,usd:10.99},24:{inr:599,usd:12.99},32:{inr:799,usd:16.99}};
  const checkout=$('#checkout'), regionBtns=$$('.region-btn'), methodBtns=$$('.payment-method'), consent=$('#paymentConsent'), payBtn=$('#securePayBtn');
  let paymentRegion='india', paymentMethod='upi';
  function selectedPages(){ return Number(state.pages)||8; }
  function updateCheckout(){
    const p=selectedPages(), price=prices[p]||prices[8];
    $('#checkoutProduct')&&( $('#checkoutProduct').textContent=state.product );
    $('#checkoutPages')&&( $('#checkoutPages').textContent=p+' pages' );
    $('#checkoutOccasion')&&( $('#checkoutOccasion').textContent=state.occasion );
    $('#checkoutTotal')&&( $('#checkoutTotal').textContent=paymentRegion==='india'?'₹'+price.inr:'$'+price.usd );
    methodBtns.forEach(b=>b.hidden=(paymentRegion==='india'&&b.dataset.method==='paypal')||(paymentRegion==='international'&&b.dataset.method==='upi'));
    if((paymentRegion==='india'&&paymentMethod==='paypal')||(paymentRegion==='international'&&paymentMethod==='upi')) paymentMethod=paymentRegion==='india'?'upi':'paypal';
    methodBtns.forEach(b=>b.classList.toggle('selected',b.dataset.method===paymentMethod&&!b.hidden));
    if(payBtn) payBtn.disabled=!consent?.checked;
  }
  regionBtns.forEach(b=>b.addEventListener('click',()=>{regionBtns.forEach(x=>x.classList.remove('selected'));b.classList.add('selected');paymentRegion=b.dataset.region;updateCheckout();}));
  methodBtns.forEach(b=>b.addEventListener('click',()=>{if(b.hidden)return;methodBtns.forEach(x=>x.classList.remove('selected'));b.classList.add('selected');paymentMethod=b.dataset.method;updateCheckout();}));
  consent?.addEventListener('change',updateCheckout);
  $('#mockPay')?.addEventListener('click',()=>{
    localStorage.setItem('tinytalesOrder',JSON.stringify({...state,status:'Checkout Ready'}));
    $('#generationStatus').textContent='Checkout Ready';
    if(checkout){checkout.hidden=false;checkout.scrollIntoView({behavior:'smooth'});updateCheckout();}
  });
  $('#closeCheckout')?.addEventListener('click',()=>{if(checkout)checkout.hidden=true;$('#wizard')?.scrollIntoView({behavior:'smooth'});});
  $('#securePayBtn')?.addEventListener('click',()=>{
    localStorage.setItem('tinytalesOrder',JSON.stringify({...state,status:'Payment Gateway Not Connected'}));
    $('#paymentStatus').textContent='Payment gateway connection is required before accepting real payments.';
  });
  sync(); renderWizard();
})();
    

