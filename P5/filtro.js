function main() {

   //Deslizadores
   var deslizadorR = document.getElementById('deslizadorR');
   var range_valueR = document.getElementById('range_valueR');

   var deslizadorG = document.getElementById('deslizadorG');
   var range_valueG = document.getElementById('range_valueG');

   var deslizadorB = document.getElementById('deslizadorB');
   var range_valueB = document.getElementById('range_valueB');

   var deslizadorA = document.getElementById('deslizadorA');
   var range_valueA = document.getElementById('range_valueA');

   //Botones
   var grises = document.getElementById('grises');
   var colores = document.getElementById('colores');
   var negativo = document.getElementById('negativo');


   var color = true;
   var negative = false;

   var img = document.getElementById('imagesrc')
   var canvas = document.getElementById('display');

   canvas.width = img.width;
   canvas.height = img.height;

   var ctx = canvas.getContext("2d");

   //-- Situar la imagen original en el canvas
   ctx.drawImage(img, 0,0);

   //-- Obtener la imagen del canvas en pixeles
   var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

   //-- Obtener el array con todos los píxeles
   var data = imgData.data


   //--FUNCION PARA CAMBIAR EL VALOR RGB DE LA IMAGEN
   function rgb(){
      //-- Nuevo valor del deslizador, mostrarlo en pantalla
      range_valueR.innerHTML = deslizadorR.value
      range_valueG.innerHTML = deslizadorG.value
      range_valueB.innerHTML = deslizadorB.value
      range_valueA.innerHTML = deslizadorA.value

      ctx.drawImage(img, 0,0);

      //-- Obtener la imagen del canvas en pixeles
      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      //-- Obtener el array con todos los píxeles
      data = imgData.data

      umbralR = deslizadorR.value
      umbralG = deslizadorG.value
      umbralB = deslizadorB.value
      umbralA = deslizadorA.value

      //Bucle para cambiar pixel a pixel el valor ROJO,VERDE,AZUL,ASPECTO
      for (var i = 0; i < data.length; i+=4) {
         if(data[i] > umbralR){
            data[i] = umbralR;
         }
         if(data[i+1] > umbralG){
            data[i+1] = umbralG;
         }
         if(data[i+2] > umbralB){
            data[i+2] = umbralB;
         }
         if(data[i+3] > umbralA){
            data[i+3] = umbralA;
         }
      }
   }

   //--FUNCION PARA PONER EN GRIS LA IMAGEN
   function grey(){
      for (var i = 0; i < data.length; i+=4) {
         R = data[i];
         G = data[i+1];
         B = data[i+2];
         var brillo = (3 *  R + 4*G + 1*B)/8

         data[i] = brillo;
         data[i+1] = brillo;
         data[i+2] = brillo;
      }
   }

  //FUNCION PARA PONER EN NEGATIVO LA IMAGEN
  function negative(){
     for (var i = 0; i < data.length; i+=4) {
        newR = 255 - data[i];
        newG = 255 - data[i+1];
        newB = 255 - data[i+2];

        data[i] = newR;
        data[i+1] = newG;
        data[i+2] = newB;
     }
  }

  function filtrado(){
    //RGB y sin negativo
    if(color && !negative){
      rgb()
    //RGB y negativo
    }else if(color && negative){
      rgb()
      negative()
    //Grises y sin negativo
    }else if(!color && !negative){
      rgb()
      grey()
    //Grises y con negativo
    }else if(!color && negative){
      rgb()
      grey()
      negative()
    }
  }


  deslizadorR.oninput = () => {
     filtrado()
     ctx.putImageData(imgData, 0, 0);
  }
  deslizadorG.oninput = () => {
     filtrado()
     ctx.putImageData(imgData, 0, 0);
  }
  deslizadorB.oninput = () => {
     filtrado()
     ctx.putImageData(imgData, 0, 0);
  }
  deslizadorA.oninput = () => {
     filtrado()
     ctx.putImageData(imgData, 0, 0);
 }

  colores.onclick = () =>{
     color = true;
     rgb()
     if (negative){
        negative()
     }
     ctx.putImageData(imgData, 0, 0);
  }

  grises.onclick = () =>{
     //Los cambios en los deslizadores se aplicaran en grises
     color = false;
     grey()
     ctx.putImageData(imgData, 0, 0);
  }

  negativo.onclick = () =>{
     if (negative){
        negative = false;
     }else{
        negative = true;
    }
    negative()
    ctx.putImageData(imgData, 0, 0);
  }

}
