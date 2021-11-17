let timer = null;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);
  if(reset==1){
    while(cells.firstChild){
      cells.removeChild(cells.firstChild);
    }
  }
  for(let i = 0; i<size*size; i++){
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id","num" + i);
    s.addEventListener('click',function(){
      if(this.textContent ==q[qNum][1]){
        correct.play();
        if(stage == max){
          while(cells.firstChild){
            cells.removeChild(cells.firstChild);
          }
          clearTimeout(timer);
          Save_score(eTime);
          alert("Game Completed!!\nYour time is "+ eTime+" seconds");
          timer = null;
          stage = 0;
          reset = 1;
        }else{
          while(cells.firstChild){
            cells.removeChild(cells.firstChild);
          }
          stage++;
          gameStart();
        }
      }else{
        wrong.play();
      }
    });
    cells.appendChild(s);
    if(i % size == size -1 ){
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }
  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num"+p);
  ans.textContent = q[qNum][1];
}

function time() {
  let nowTime = new Date();
  eTime = parseInt((nowTime.getTime() - start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()",1000);
}
