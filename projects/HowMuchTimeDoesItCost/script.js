// Esperamos a que cargue la pagina HTML
document.addEventListener("DOMContentLoaded", function (event) {
  const openModalBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("myModal");
  const closeModalBtn = document.querySelector(".close");

  openModalBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Cargamos el switch del modo oscuro
  const darkModeSwitch = document.getElementById("darkmode-toggle");
  //Si cambia el estado del switch, cambiamos el modo
  darkModeSwitch.addEventListener("change", () => {
    if (darkModeSwitch.checked) {
      toggleDarkMode();
    } else {
      toggleLightMode();
    }
  });
  //Funcion para cambiar a modo oscuro
  const toggleDarkMode = () => {
    // Cambio Fondo
    document.getElementById("background").classList.remove("background-light");
    document.getElementById("background").classList.add("background-dark");
    //Cambiamos los colores de los elementos
    document.getElementById("instrucciones").classList.add("box-dark");
    document.getElementById("formulario").classList.add("box-dark");
    document.getElementById("fullResult").classList.add("box-dark");
  };

  //Funcion para cambiar a modo claro
  const toggleLightMode = () => {
    // Cambio Fondo
    document.getElementById("background").classList.remove("background-dark");
    document.getElementById("background").classList.add("background-light");
    //Cambiamos los colores de los elementos
    document.getElementById("instrucciones").classList.remove("box-dark");
    document.getElementById("formulario").classList.remove("box-dark");
    document.getElementById("fullResult").classList.remove("box-dark");
  };

  // Funciones para calcular el precio
  const salaryHourFunction = (moneyInput, timeInput) =>
    moneyInput / (timeInput * 4);
  const priceHourFunction = (priceInput, salarioHora) =>
    priceInput / salarioHora;

  // Funcion para validar el formulario
  const validarFormulario = (priceData, moneyData, timeData) => {
    // Comprobamos que los campos no esten vacios
    if (priceData == "" || moneyData == "" || timeData == "") {
      document.getElementById("result").innerHTML =
        "Todos los campos son obligatorios";
      document.getElementById("days").innerHTML = "";
      document.getElementById("weeks").innerHTML = "";
      document.getElementById("fullResult").classList.add("box");

      return false;
    }
    // Comprobamos que los campos sean numeros
    else if (isNaN(priceData) || isNaN(moneyData) || isNaN(timeData)) {
      document.getElementById("result").innerHTML =
        "Todos los campos deben ser numeros";
      document.getElementById("days").innerHTML = "";
      document.getElementById("weeks").innerHTML = "";
      document.getElementById("fullResult").classList.add("box");

      return false;
    } else {
      return true;
    }
  };
  //Obtenemos los datos del formulario y los comprobamos
  const getFormData = () => {
    var priceData = document.getElementById("price-input").value;
    var moneyData = document.getElementById("money-input").value;
    var timeData = document.getElementById("time-input").value;
    var correctData = validarFormulario(priceData, moneyData, timeData);

    return {
      priceInput: priceData,
      moneyInput: moneyData,
      timeInput: timeData,
      correctData: correctData,
    };
  };

  const precioMinutoFunction = (precioHora) =>
    (Math.floor((precioHora % 1) * 100) / 100) * 60;

  const precioSegundoFunction = (precioMinuto) =>
    (Math.floor((precioMinuto % 1) * 100) / 100) * 60;

  //Escribimos el contenido en el HTML
  const writeElements = (
    precioHora,
    precioMinuto,
    precioSegundo,
    dias,
    semanas
  ) => {
    document.getElementById("result").innerHTML =
      "El precio es de " +
      precioHora +
      " horas, " +
      precioMinuto +
      " minutos y " +
      precioSegundo +
      " segundos";
    document.getElementById("days").innerHTML =
      "Son " + dias + " dias con una jornada estandar de 8 horas";
    document.getElementById("weeks").innerHTML =
      "Son " + semanas + " semanas con la jornada introducida";

    document.getElementById("fullResult").classList.add("box");
  };

  // Recibimos los datos del formulario
  document
    .getElementById("formulario")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var data = getFormData();

      var salarioHora = salaryHourFunction(data.moneyInput, data.timeInput);

      var precioHora = priceHourFunction(data.priceInput, salarioHora);

      var precioMinuto = precioMinutoFunction(precioHora);

      var precioSegundo = precioSegundoFunction(precioMinuto);

      precioMinuto = Math.floor(precioMinuto);
      precioHora = Math.floor(precioHora);
      precioSegundo = Math.floor(precioSegundo);

      var dias = precioHora / 8;
      var semanas = (dias * 8) / data.timeInput;

      if (data.correctData) {
        writeElements(precioHora, precioMinuto, precioSegundo, dias, semanas);
      }
    });
});
