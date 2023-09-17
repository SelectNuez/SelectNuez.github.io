// Cargamos el Js antes de que se cargue el HTML
window.onload = function () {
  // Recojemos los datos del input cuando se haga click en el boton
  document.getElementById("setPer").addEventListener(
    "click",
    function () {

      var personasOrig = document.getElementById("perOrig").value;
      var personasCalc = document.getElementById("perNew").value;
      
      //Guardamos personasOrig y personasCalc en el elemento id dataTransf
      document.getElementById("dataTransf").setAttribute("data-personasOrig", personasOrig);
      document.getElementById("dataTransf").setAttribute("data-personasCalc", personasCalc); 

      // var calculoPrecio = document.getElementById("calCo").checked;
      // Comprobamos que los datos sean correctos
      if (personasOrig > 0 && personasCalc > 0) {
        // Borramos el contenido de los divs
        document.getElementById("personas").innerHTML = "";
        document.getElementById("alerts").innerHTML = "";
        content = document.getElementById("content");
        fetch("ingredientes.html")
          .then((response) => response.text())
          .then((html) => {
            content.innerHTML = html;
            return fetch("js/ingredientes.js");
          })
          .then((response) => response.text())
          .then((js) => {
            eval(js);
          })
          .catch((error) => {
            console.log("Error al cargar el archivo html: " + error);
          });

        // // Si el calculo del precio esta activado
        // if (calculoPrecio == true) {
        // }
      } else {
        // Escribimos en el div alerts que el numero de personas es incorrecto
        document.getElementById("alerts").innerHTML =
          '<div class="alert">' +
          "El numero de personas debe ser mayor que 0" +
          "</div>";
      }
    },
    false
  );
};
