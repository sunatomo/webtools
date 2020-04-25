kouho = JSON.parse(localStorage.kouho || "[]");

function updateKouho() {
    example.innerHTML = '';
    for (k of kouho) {
        example.innerHTML = '<option value="' + k + '"></option>' + example.innerHTML;
    }
}

f = e => {
    D.innerText = 'serching';
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
        B = D.querySelectorAll('a');
        i = 0;
        for (a of B) {
            a.I = i++;
            a.onclick = q => {
                fetch(q.target.href).then(e => e.text()).then(e => {
                    V.src = e.match(/file:.*(http[^']*)/)[1];
                    V.onpause = () => {
                        if (V.currentTime > V.duration - 300) B[q.target.I + 1].click();
                        else {
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
document.body.innerHTML = '<div style="float: left;" style="float: left;"><input list="example" onchange=f(value)><div id=D></div></div><video id=V controls autoplay></video>'
    + '<datalist id="example"></datalist>';

updateKouho();
