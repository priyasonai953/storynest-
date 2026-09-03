const $=id=>document.getElementById(id);
function go(id){const el=$(id); if(el){el.classList.remove('hidden');el.scrollIntoView({behavior:'smooth',block:'start'})}}
$('fontStyle').addEventListener('change',e=>{document.body.classList.remove('font-classic','font-fairytale','font-elegant');document.body.classList.add('font-'+e.target.value)})
$('language').addEventListener('change',e=>{document.documentElement.lang=e.target.value})
document.querySelectorAll('.occasion').forEach(card=>card.addEventListener('click',()=>{const name=card.querySelector('b').textContent;$('occasion').value=name;$('create').scrollIntoView({behavior:'smooth'});}))
function previewBook(){const title=$('title').value.trim()||'Our Little Fairytale';const person=$('person').value;const occasion=$('occasion').value;$('previewTitle').textContent=title;$('previewHeading').textContent=`A magical ${occasion.toLowerCase()} story for ${person.toLowerCase()}.`;$('previewText').textContent=$('message').value.trim()||'A beautiful story created from your memories, with a TinyTales magical signature.';go('preview')}

