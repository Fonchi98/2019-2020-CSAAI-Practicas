function pala(x, y, h){
   this.ctx = null;
   this.x_ini = x;
   this.y_ini = y;
   this.fh = h;
   this.width = 10;
   this.height = 40;
   this.vy = 0;
   this.speed = 3;

   this.init = function(ctx) {
      this.ctx = ctx;
      this.reset();
   };

   this.draw = function() {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
   };

   this.update = function() {
      this.y += this.vy*this.speed;
      if (this.y > this.fh - this.height){
         this.y = this.fh - this.height;
      } else if (this.y < 0) {
            this.y = 0;
      }
   }

   this.reset = function() {
      this.y = this.y_ini;
      this.x = this.x_ini;
   };
}

function campo (w, h){
   this.ctx = null;
   this.width = w;
   this.height = h;
   this.points1 = 0;
   this.points2 = 0;

   this.init = function(ctx) {
      this.ctx = ctx;
   };

   this.draw = function(){
      this.ctx.beginPath();
      //linea central
      this.ctx.strokeStyle = 'blue';
      this.ctx.setLineDash([9, 9]);
      this.ctx.moveTo(this.width/2,0);
      this.ctx.lineTo(this.width/2, this.height)
      this.ctx.stroke();
      //marcador
      this.ctx.font = '90px monospace';
      this.ctx.fillStyle = 'grey';
      this.ctx.fillText(this.points1, 195, 70);
      this.ctx.fillText(this.points2, 340, 70);

      this.ctx.font = '16px monospace';
      this.ctx.fillText('PLAYER_1', 20, 70);
      this.ctx.fillText('PLAYER_2', 480, 70);

   };

    this.reset = function(){
        this.points1 = 0;
        this.points2 = 0;
    };
}

function ball(h, s){
   this.ctx = null;
   this.fh = h;
   this.x_ini = 50;
   this.y_ini = 50;
   this.width = 9;
   this.height = 9;
   this.x = 0;
   this.y = 0;
   this.vx = 4;
   this.vy = 1;

   this.init = function(ctx) {
      this.ctx = ctx;
      this.reset();
   };

   this.draw = function () {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height)
   };

   this.update = function () {
      this.x += this.vx * this.speed;
      this.y += this.vy * this.speed;
      if (this.y > this.fh - this.height || this.y < this.height){
         s.play();
         this.vy = -this.vy;
      }
   };

   this.reset = function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
      //cambio de saque
      if (this.x_ini == 549) {
         this.vx *= -1 ;
      }else if (this.x_ini == 51) {
         this.vx *= -1 ;
      }
   };
}

function mover_palas(pala1, pala2){
   document.onkeydown = function (ev) {
      switch (ev.keyCode) {
         case 75: // k
            pala2.vy = -1;
            break;
         case 77: // m
            pala2.vy = 1;
            break;
         case 65: // a
            pala1.vy = -1;
            break;
         case 90: // z
            pala1.vy = 1;
            break;
      }
   document.onkeyup = function (ev) {
      pala1.vy = 0;
      pala2.vy = 0;
   }
  }
}

function collision(pala1, pala2, bola, s){
   if (bola.x <= (pala1.x + pala1.width) && bola.x >= pala1.x){
      if (bola.y >= pala1.y && bola.y <= (pala1.y + pala1.height)){
         s.play();
         bola.vx = -bola.vx;
         bola.vy =  Math.floor(Math.random() * (-4 - 4 + 1) + 4);
      };
   };

   if ((bola.x + bola.width) >= pala2.x && (bola.x + bola.width) <= (pala2.x + pala2.width)){
      if ((bola.y + bola.height) <= (pala2.y + pala2.height) && (bola.y + bola.height) >= pala2.y){
         s.play();
         bola.vx = -bola.vx;
         bola.vy =  Math.floor(Math.random() * (-4 - 4 + 1) + 4);
      };
   };
}

function main(){
   var canvas = document.getElementById('canvas')
   canvas.width = 600;
   canvas.height = 400;

   var ctx = canvas.getContext("2d");

   var timer = null;
   var speed = 0;

   var pala1_x = 50;
   var pala1_y = 100;
   var pala2_x = 550;
   var pala2_y = 300;

   //implemento el Audio
   var sonido1 = new Audio('Raqueta.mp3');
   var sonido2 = new Audio('Rebote.mp3');
   var sonido3 = new Audio('Gol.mp3');
   var sonido4 = new Audio('winer1.mp3');
   var sonido5 = new Audio('winer2.mp3');


   var bola = new ball(canvas.height, sonido1);


   var pala1 = new pala(pala1_x, pala1_y, canvas.height);
   var pala2 = new pala(pala2_x, pala2_y, canvas.height);

   pala1.init(ctx);
   pala2.init(ctx);
   pala1.draw();
   pala2.draw();


   var campo_pong = new campo(canvas.width, canvas.height);
   campo_pong.init(ctx);
   campo_pong.draw();


   bola.init(ctx);
   bola.draw();


   var sacar = document.getElementById('sacar');
   var reiniciar = document.getElementById('reiniciar');

   //Resetear
   function play_reset(s){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pala1.reset();
      pala2.reset();
      campo_pong.init(ctx);
      campo_pong.draw();
      pala1.draw();
      pala2.draw();
      if (bola.x < pala1_x) {
         s.play();
         bola.speed = 0;
         bola.x_ini = 51;
         campo_pong.points2 += 1;
         bola.reset();
      }else if (bola.x > pala2_x) {
         s.play();
         bola.speed = 0;
         bola.speed = 0;
         bola.x_ini = 549;
         campo_pong.points1 += 1;
         bola.reset();
      }

      bola.draw();
   }

   reiniciar.onclick = () => {
      bola.speed = 0;
      bola.x_ini = 50;
      console.log('primera',bola.vx);
      //bug de punto en contra al reiniciar solucionado
      if (bola.vx < 0){
         console.log('entra en el if');
         bola.vx *= -1;
      }
      console.log(bola.vx);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bola.reset();
      pala1.reset();
      pala2.reset();
      campo_pong.init(ctx);
      campo_pong.draw();
      pala1.draw();
      pala2.draw();
      campo_pong.draw();
      campo_pong.reset();
   }


   sacar.onclick = () => {
      var Level = document.querySelector('input[name="Level"]:checked').value;
      if (Level == "easy"){
         bola.speed = 1;
         pala1.speed = 6;
         pala2.speed = 6;
      }else if (Level == "medium"){
         bola.speed = 3;
         pala1.speed = 9;
         pala2.speed = 9;
      }else if (Level == "hard"){
         bola.speed = 6;
         pala1.speed = 12;
         pala2.speed = 12;
      }else{
         pass;
      }
      if (!timer) {
         timer = setInterval(()=>{
            bola.update();
            pala1.update();
            pala2.update();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            campo_pong.init(ctx);
            campo_pong.draw();
            bola.draw();
            pala1.draw();
            pala2.draw();

            //muevo las palas llamando a la funcion mover_palas
            mover_palas(pala1, pala2);
            collision(pala1, pala2, bola, sonido2);
            if(bola.x > canvas.width - bola.width){
               play_reset(sonido3);
            }else if (bola.x < bola.width) {
               play_reset(sonido3);
            }
            if(campo_pong.points1 == 3 || campo_pong.points2 == 3) {
               clearInterval(timer);
               timer = null;
               bola.speed = 0;
               bola.x_ini = 50;
               ctx.clearRect(0, 0, canvas.width, canvas.height);
               if (campo_pong.points1 == 3) {
                  console.log('ganador1');
                  sonido4.play();
                  alert("THE PLAYER_1 IS WINNER");
                  bola.speed;
                  console.log(bola.x_ini);
                  pala1.reset();
                  pala2.reset();
                  campo_pong.reset();
                  pala1.draw();
                  pala2.draw();
                  bola.draw();
                  campo_pong.draw();
               }else if (campo_pong.points2 == 3) {
                  console.log('ganador2');
                  sonido5.play();
                  alert("THE PLAYER_2 IS WINNER");
                  bola.x_ini = 50;
                  bola.reset();
                  pala1.reset();
                  pala2.reset();
                  campo_pong.reset();
                  pala1.draw();
                  pala2.draw();
                  bola.draw();
                  campo_pong.draw();
               }
            }
         },20);
      }
   }
}
