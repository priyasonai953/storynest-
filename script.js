const particles=document.getElementById('particles');
for(let i=0;i<38;i++){
  const p=document.createElement('span');
  p.className='particle';
  p.style.left=(Math.random()*100)+'%';
  p.style.top=(55+Math.random()*45)+'%';
  p.style.animationDuration=(7+Math.random()*12)+'s';
  p.style.animationDelay=(-Math.random()*14)+'s';
  p.style.transform=`scale(${.5+Math.random()*1.5})`;
  particles.appendChild(p);
}
const scene=document.getElementById('scene');
window.addEventListener('pointermove',e=>{
  const x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5);
  scene.style.setProperty('--mx',x.toFixed(3));
  scene.style.setProperty('--my',y.toFixed(3));
  document.querySelector('.forest').style.transform=`translate(${x*-5}px,${y*-4}px) scale(1.04)`;
});
function openStory(){document.getElementById('modal').classList.add('open');document.getElementById('modal').setAttribute('aria-hidden','false')}
function closeStory(){document.getElementById('modal').classList.remove('open');document.getElementById('modal').setAttribute('aria-hidden','true')}
document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeStory()});
