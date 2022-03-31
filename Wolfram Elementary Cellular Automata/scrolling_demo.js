var cell_length = 100; // number of cell in the cell automata
var cell_height = 100; // this is used to store the history of generation
var ca = Array.from(Array(cell_height), () => new Array(cell_length));
var ruleValue=182; // rule 182, change this as needed
var ruleset = []; // this is generated initRuleSet(), using ruleValue
var w=5; // pixel width
var generation=0;
function initRuleSet(){
  for(let i=0;i<8;i++){
    if((ruleValue>>i)&0x01 == 1){
      ruleset[7-i] = 1;
    }
    else{
      ruleset[7-i]=0;
    }
  }
  print(ruleset);
}
function init(){
  initRuleSet();
  for(let i=0;i<cell_length;i++){
    if((i+1) == cell_length/2){
      ca[0][i]=1;
    }
    else{
      ca[0][i]=0;
    }
  }
}
function rules (a, b, c) {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
  return 0;
}
function generate(){
  var gen=[];
  gen[0] = ca[0][0];
  for(let i=1;i<cell_length-1;i++){
    gen[i]=rules(ca[0][i-1],ca[0][i],ca[0][i+1]);
  }
  for(let j=cell_height;j>0;j--)
  {
    ca[j] = ca[j-1]; // move to next
  }
  ca[0] = gen; // update
  generation++;
  generation %= 100;
}
function display() {
  for(let j=0;j<cell_height;j++){
    for (let i = 0; i < cell_length; i++) {
      if (ca[j][i] == 1){
        fill(0);
        noStroke();
        rect(i*w, j*w, w, w);
      }
    }
  }
}
function setup() {
  createCanvas(600, 500);
  init(); // init the cell automata
  print(ca); // just for debugging
  frameRate(15);
}

function draw() {
  background(255);
  generate();
  display();
}