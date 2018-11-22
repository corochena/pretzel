var ctx = document.querySelector("canvas").getContext("2d");
var w = 500;
var h = 500;
var spin1 = {x: 150, y: 120, r: 100, ang:0, f: 1, ex: 0, ey: 0 };
var spin2 = {x: 380, y: 350, r: 100, ang:0, f: 1, ex: 0, ey: 0 };
var frequencies = [1, 5/6, 4/5, 3/4, 2/3, 5/8, 3/5, 5/9, 1/2, 4/9, 2/5, 3/8, 1/3, 3/10, 4/15, 1/4, 1/5];
var labels = ['1/1', '5/6', '4/5', '3/4', '2/3', '5/8', '3/5', '5/9', '1/2', '4/9', '2/5', '3/8', '1/3', '3/10', '4/15', '1/4', '1/5'];
var color = "violet";
var dot = 3;
var thick = 2;
var dt = 1/60;
var points = [];
var dotColor = 'white';
var turn = 0;
var index = 0;

function addPoint(p) {
  var present = false;
  for (var point of points) {
    if (point[0] == p[0] && point[1] == p[1]) {
      present = true;
      break;
    }
  }
  if (!present) points.push(p);
}

function drawPretzel() {
  ctx.lineWidth = 1;
  ctx.setLineDash([3,5]);
  ctx.beginPath();
  ctx.moveTo(spin1.ex, spin1.ey);
  ctx.lineTo(spin2.ex, spin1.ey);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(spin2.ex, spin2.ey);
  ctx.lineTo(spin2.ex, spin1.ey);
  ctx.stroke();
  ctx.setLineDash([]);
  
  ctx.beginPath();
  ctx.arc(spin2.ex, spin1.ey, dot, 0,7);
  ctx.fill();
  
  points.forEach(function(p) {
    ctx.beginPath();
    ctx.fillStyle = dotColor;
    ctx.arc(p[0], p[1], 0.5, 0, 7);
    ctx.fill();
    ctx.closePath();
  });
}

function drawLabels() {
  ctx.font = '13px Arial';
  labels.forEach(function(label, i) {
    ctx.fillText(label, 0, 25*i+20);
  });
}

function drawSpin(spin) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.arc(spin.x,spin.y,spin.r,0,7);
  ctx.stroke();
  
  spin.ex = spin.x + spin.r * Math.cos(spin.ang);
  spin.ey = spin.y + spin.r * Math.sin(spin.ang);
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = thick;
  ctx.moveTo(spin.x, spin.y);
  ctx.lineTo(spin.ex, spin.ey);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(spin.x, spin.y, dot,0,7);
  ctx.arc(spin.ex, spin.ey, dot, 0, 7);
  ctx.fill();  
}

function animate(t) {
  ctx.clearRect(0,0,w,h);
  ctx.font = '16px Arial';
  ctx.fillText('Click to see more patterns', 20, 480);

  ctx.font = '50px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(labels[index], 100, 350);
  
  drawLabels();
  drawSpin(spin1);
  drawSpin(spin2);
  addPoint([Math.round(spin2.ex), Math.round(spin1.ey)]);
  drawPretzel();
  spin1.ang += 2*Math.PI*spin1.f*dt;
  spin2.ang += 2*Math.PI*spin2.f*dt;
  
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

addEventListener('click', function(e) {
  index = Math.floor((e.clientY - 20) / 25);
  if (index >= frequencies.length) index = frequencies.length - 1;
  if (index < 0) index = 0;
  points = [];
  spin1.ang = spin2.ang = 0;
  dotColor = rndColor();
  spin2.f = frequencies[index];
});

function rndColor() {
  var s = "#";
  for (var i=0; i<6; i++) 
    s += [8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*8)];
    
  return s;
}