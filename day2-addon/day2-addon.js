/* TinyTales Day 2 Add-on
   Conflict-free module: does not replace index.html, style.css or script.js.
   It provides Book Type / Occasion / Language selection state and sync helpers.
*/
(function(){
  const state={bookType:'',occasion:'',language:'English'};
  function setState(k,v){state[k]=v; document.dispatchEvent(new CustomEvent('tinytales:selection',{detail:{...state}}));}
  window.TinyTalesDay2={state,selectBookType:v=>setState('bookType',v),selectOccasion:v=>setState('occasion',v),selectLanguage:v=>setState('language',v),getSelection:()=>({...state})};
})();
