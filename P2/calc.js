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
    operando1 = display.innerHTML;
    operacion = "+";
    clean();

  }
  resta.onclick = function(){
    operando1 = display.innerHTML;
    operacion = "-";
    clean();
  }
  mult.onclick = function(){
    operando1 = display.innerHTML;
    operacion = "*";
    clean();
  }
  division.onclick = function(){
    operando1 = display.innerHTML;
    operacion = "/";
    clean();
  }
  igual.onclick = function(){
    operando2 = display.innerHTML;
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

    display.innerHTML = total;
    
  }
}
