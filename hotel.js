f=e=>{
 D.innerText='serching';
 fetch('/gs.php?keyword='+encodeURI(e)).then(e=>e.text()).then(e=>{
  A=e;
  D.innerHTML=e.match(/<a.*title.*<\/a>/g).sort().join('<br>');
  B=D.querySelectorAll('a');
  i=0;
  for(a of B) {
   a.I=i++;
   a.onclick=q=>{
    fetch(q.target.href).then(e=>e.text()).then(e=>{
     V.src=e.match(/file:.*(http[^']*)/)[1];
     V.onpause=()=>{
	  if(V.currentTime>V.duration-300) B[q.target.I+1].click();
     };
    });
    return false;
   }
  }
 });
};
document.body.innerHTML = '<div style="float: left;" style="float: left;"><input onchange=f(value)><div id=D></div></div><video id=V controls autoplay>';
