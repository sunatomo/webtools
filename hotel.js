kouho = JSON.parse(localStorage.kouho || "[]");

function updateKouho() {
    example.innerHTML = '';
    for (k of kouho) {
        example.innerHTML = '<option value="' + k + '"></option>' + example.innerHTML;
    }
}
moveTime=0;
f = e => {
    D.innerText = 'searching';
    let idx = kouho.indexOf(e);
    if (idx >= 0) {
        kouho = kouho.slice(0, idx).concat(kouho.slice(idx + 1));
    }
    kouho.push(e);
    if (kouho.length > 50) kouho.shift();
    localStorage.kouho = JSON.stringify(kouho);
    updateKouho();
    fetch('/gs.php?keyword=' + encodeURI(e)).then(e => e.text()).then(e => {
        A = e;
        D.innerHTML = e.match(/<a.*title.*<\/a>/g).sort().join('<br>');
        LIST = D.querySelectorAll('a');
        i = 0;
        for (a of LIST) {
            a.I = i++;
            a.onclick = q => {
                taitoru.innerText = q.target.title;
                fetch(q.target.href).then(e => e.text()).then(e => {
                    V.src = e.match(/video: '(http[^']+)/)[1];
                    V.onpause = ev => {
                        if(ev.timeStamp<moveTime+1000) return true;
                        if (V.currentTime > V.duration - 300) LIST[q.target.I + 1].click();
                        else if (V.currentTime < 300) {
                            V.currentTime += 40;
                            V.play();
                        } else {
                            V.currentTime += 60;
                            V.play();
                        }
                    };
                });
                return false;
            }
        }
    });
};

console.info('ok');
document.body.innerHTML = '<div style="float: left;"><input list="example" onchange=f(value)><button id=B>クリア</button><div id=D></div></div>'
    + '<div style="float: left;" ><h1 id=taitoru></h1><video style="width: 720px;" id=V controls autoplay></video></div>'
    + '<datalist id="example"></datalist>';
B.onclick = e=>e.target.previousElementSibling.value=''
V.onmousemove = e=>{moveTime=e.timeStamp;}
updateKouho();
