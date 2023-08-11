// Esperamos a que cargue la pagina HTML
document.addEventListener("DOMContentLoaded", function (event) {
  const darkModeSwitch = document.getElementById("darkmode-toggle");

  darkModeSwitch.addEventListener("change", () => {
    if (darkModeSwitch.checked) {
      toggleDarkMode();
    } else {
      toggleLightMode();
    }
  });

  const toggleDarkMode = () => {
    document.getElementById('background').classList.remove('background-light')
    document.getElementById('background').classList.add('background-dark')

    document.getElementById('instrucciones').classList.add('box-dark')
    document.getElementById('formulario').classList.add('box-dark')
    document.getElementById('fullResult').classList.add('box-dark')

  }

  const toggleLightMode = () => {
    document.getElementById('background').classList.remove('background-dark')
    document.getElementById('background').classList.add('background-light')

    document.getElementById('instrucciones').classList.remove('box-dark')
    document.getElementById('formulario').classList.remove('box-dark')
    document.getElementById('fullResult').classList.remove('box-dark')


  }

  const salaryHourFunction = (moneyInput, timeInput) =>
    moneyInput / (timeInput * 4);
  const priceHourFunction = (priceInput, salarioHora) =>
    priceInput / salarioHora;

  function getFormData() {
    // Sacamos la logica de recuperar los datos de el formulario
    var priceData = document.getElementById("price-input").value;
    var moneyData = document.getElementById("money-input").value;
    var timeData = document.getElementById("time-input").value;

    return {
      priceInput: priceData,
      moneyInput: moneyData,
      timeInput: timeData,
    };
  }

  const precioMinutoFunction = (precioHora) =>
    (Math.floor((precioHora % 1) * 100) / 100) * 60;

  const precioSegundoFunction = (precioMinuto) =>
    (Math.floor((precioMinuto % 1) * 100) / 100) * 60;

  function writeElements(
    precioHora,
    precioMinuto,
    precioSegundo,
    dias,
    semanas
  ) {
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
  }

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

      var dias = precioHora / 8;
      var semanas = (dias * 8) / data.timeInput;

      writeElements(precioHora, precioMinuto, precioSegundo, dias, semanas);
    });

  // Función para validar el formulario
  function validarFormulario() {}
});
