const prices={
  8:["₹199 / $4.99","8 Pages"],
  12:["₹299 / $6.99","12 Pages"],
  16:["₹399 / $8.99","16 Pages"],
  20:["₹499 / $10.99","20 Pages"],
  24:["₹599 / $12.99","24 Pages"],
  32:["₹799 / $16.99","32 Pages"]
};

function go(id){
  const el=document.getElementById(id);
  if(el){el.classList.remove("hidden");el.scrollIntoView({behavior:"smooth",block:"start"});}
}

function chooseOccasion(value){
  const select=document.getElementById("occasion");
  [...select.options].forEach(o=>o.selected=o.value===value);
  if(![...select.options].some(o=>o.value===value)){
    const option=[...select.options].find(o=>o.text===value);
    if(option) option.selected=true;
  }
  go("create");
}

document.getElementById("occasion").addEventListener("change",updatePreview);
document.getElementById("pages").addEventListener("change",updatePreview);
document.getElementById("title").addEventListener("input",updatePreview);
document.getElementById("photos").addEventListener("change",showPhotos);

function updatePreview(){
  const occasion=document.getElementById("occasion").value;
  const page=document.getElementById("pages").value;
  const title=document.getElementById("title").value.trim()||"Your Magical Story";
  document.getElementById("previewTitle").textContent=title;
  document.getElementById("previewOccasion").textContent=occasion;
  document.getElementById("previewPages").textContent=prices[page][1];
  document.getElementById("previewPrice").textContent=prices[page][0];
}

function showPhotos(e){
  const box=document.getElementById("photoPreview");
  box.innerHTML="";
  const files=[...e.target.files].slice(0,6);
  if(!files.length){box.textContent="📸 Your real photos will appear here";return;}
  files.forEach(file=>{
    const img=document.createElement("img");
    img.alt="Uploaded photo preview";
    const reader=new FileReader();
    reader.onload=()=>img.src=reader.result;
    reader.readAsDataURL(file);
    box.appendChild(img);
  });
}

function previewBook(){
  const title=document.getElementById("title").value.trim()||"Your Magical Story";
  const names=document.getElementById("names").value.trim()||"your special people";
  const occasion=document.getElementById("occasion").value;
  const page=document.getElementById("pages").value;
  const story=document.getElementById("story").value.trim();
  document.getElementById("finalTitle").textContent=title;
  document.getElementById("finalInfo").textContent=
    `${occasion} • ${names} • ${page} pages • 50% real-photo pages + 50% magical storybook scenes`;
  document.getElementById("checkoutPages").textContent=`${page}-page Digital PDF`;
  document.getElementById("checkoutPrice").textContent=prices[page][0];
  const first=document.querySelector("#photos").files[0];
  const area=document.getElementById("realPhotoArea");
  area.innerHTML="";
  if(first){
    const img=document.createElement("img");
    img.style.maxWidth="120px";img.style.maxHeight="130px";img.style.borderRadius="14px";img.style.objectFit="cover";
    const reader=new FileReader();
    reader.onload=()=>img.src=reader.result;
    reader.readAsDataURL(first);
    area.appendChild(img);
  }else area.textContent="📸";
  if(story) document.getElementById("finalInfo").textContent+=` • Your message: ${story.slice(0,90)}${story.length>90?"…":""}`;
  go("preview");
}

updatePreview();
