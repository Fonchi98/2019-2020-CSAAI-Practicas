// Variables para las operaciones:
var operando1;
var operando2;
var operacion;


function init(){
  // Variables - Números:
  var cero = document.getElementById("0");
  var uno = document.getElementById("1");
  var dos = document.getElementById("2");
  var tres= document.getElementById("3");
  var cuatro = document.getElementById("4");
  var cinco = document.getElementById("5");
  var seis = document.getElementById("6");
  var siete = document.getElementById("7");
  var ocho = document.getElementById("8");
  var nueve = document.getElementById("9");

  // Variables - Operaciones:
  var suma = document.getElementById("+");
  var resta = document.getElementById("-");
  var mult = document.getElementById("*");
  var division = document.getElementById("/");
  var igual = document.getElementById("=");
  var reset = document.getElementById("reset");

  // Variable que devuelve el resultado:
  var display = document.getElementById("display");

  //Pasar binario a entero
  function convertir_binario(valor){
     var array = [];
  	  var numeros = valor.split("");
  	  var entero = 0;
  	  var contador = 0;
     for(var i = numeros.length-1; i>=0;i--){
        if(numeros[i] == 0){
           array[i] = 0;
        }else{
           array[i] = Math.pow(2,contador);
        }
        contador++;
     }
  	  for(var a = 0; a < array.length; a++){
        entero += array[a];
     }
     return entero;
  	}

   //Pasar entero a binario
  function convertir_entero(valor){
     var resul_div = [];
  	  var entradas = 0;
  	  var resultado_binario = '';
  	  while(valor > 0){
        residuo = parseInt(valor % 2);
  		  valor = parseInt(valor/2);
  		  resul_div[entradas] = residuo;
  		  entradas++;
     }
  	  for (var i = resul_div.length - 1; i >= 0; i--) {
        resultado_binario += resul_div[i];
     }
     return resultado_binario;
  	}


  // Eventos - Números:
  cero.onclick = function(){
    display.innerHTML = display.innerHTML + "0";
  }
  uno.onclick = function(){
    display.innerHTML = display.innerHTML + "1";
  }
  dos.onclick = function(){
    display.innerHTML = display.innerHTML + "2";
  }
  tres.onclick = function(){
    display.innerHTML = display.innerHTML + "3";
  }
  cuatro.onclick = function(){
    display.innerHTML = display.innerHTML + "4";
  }
  cinco.onclick = function(){
    display.innerHTML = display.innerHTML + "5";
  }
  seis.onclick = function(){
    display.innerHTML = display.innerHTML + "6";
  }
  siete.onclick = function(){
    display.innerHTML = display.innerHTML + "7";
  }
  ocho.onclick = function(){
    display.innerHTML = display.innerHTML + "8";
  }
  nueve.onclick = function(){
    display.innerHTML = display.innerHTML + "9";
  }

  //Operaciones:
  reset.onclick = function(){
    resetear();
  }
  suma.onclick = function(){
    operador1 = convertir_binario(display.innerHTML)
    operacion = "+";
    clean();

  }
  resta.onclick = function(){
    operando1 = convertir_binario(display.innerHTML)
    operacion = "-";
    clean();
  }
  mult.onclick = function(){
     operando1 = convertir_binario(display.innerHTML)
    operacion = "*";
    clean();
  }
  division.onclick = function(){
    operando1 = convertir_binario(display.innerHTML)
    operacion = "/";
    clean();
  }
  igual.onclick = function(){
    operando2 = convertir_binario(display.innerHTML)
    resolver();
  }

  function clean(){
    display.innerHTML = "";
  }

  function resetear(){
    clean();
    operando1 = 0;
    operando2 = 0;
    operando = "";
  }

  function resolver (){
    var total= 0;
    switch (operacion) {
      case "+":
        total = parseFloat(operando1) + parseFloat(operando2);
        break;

      case "-":
        total = parseFloat(operando1) - parseFloat(operando2);
        break;

      case "*":
        total = parseFloat(operando1) * parseFloat(operando2);
        break;

      case "/":
        total = parseFloat(operando1) / parseFloat(operando2);
        break;
    }
    resetear();
    total = convertir_entero(total);
    display.innerHTML = total;

  }
}
