const oldIngreJSON = {
  receta: [],
};

const newIngreJSON = {
  receta: [],
};
//Establecemos las personas
var divElement = document.getElementById("dataTransf");

const personasOrig = divElement.getAttribute("data-personasOrig");
const personasCalc = divElement.getAttribute("data-personasCalc");

const getData = () => {
  var newIngrediente = document.getElementById("in_ingre").value;
  var newCantidad = document.getElementById("in_cant").value;
  var newPrecio = document.getElementById("in_price").value;

  if (!newPrecio) {
    newPrecio = 0;
  }

  var resultData = checkData(newIngrediente, newCantidad, newPrecio);
  setData(resultData, newIngrediente, newCantidad, newPrecio);

  return resultData;
};

const checkData = (newIngrediente, newCantidad, newPrecio) => {
  const resultado =
    newIngrediente === "" || newCantidad === "" 
      ? 0
      : newCantidad <= 0 || newPrecio < 0
      ? 1
      : 2;
  printAlert(resultado);
  return resultado;
};

const printAlert = (resultado) => {
  if (resultado == 0) {
    document.getElementById("alerts").innerHTML =
      '<div class="alert">' + "Los campos no pueden estar vacios" + "</div>";
  } else if (resultado == 1) {
    document.getElementById("alerts").innerHTML =
      '<div class="alert">' +
      "Las cantidades deben ser superiores a 0" +
      "</div>";
  } else {
    document.getElementById("alerts").innerHTML = "";
  }
};

const setData = (resultData, newIngrediente, newCantidad, newPrecio) => {
  if (resultData == 2) {
    const nuevoIngrediente = {
      nombre: newIngrediente,
      cantidad: newCantidad,
      precio: newPrecio,
    };
    oldIngreJSON.receta.push(nuevoIngrediente);

    //Si esta correcto y se añade al array limpiamos los input
    cleanInput();
    //Añadimos los datos a la lista
    printData(newIngrediente, newCantidad, newPrecio);
  }
};

const cleanInput = () => {
  document.getElementById("in_ingre").value = "";
  document.getElementById("in_cant").value = "";
  document.getElementById("in_price").value = "";
};

const printData = (newIngrediente, newCantidad, newPrecio) => {
  document.getElementById("saved_ingredients_name").innerHTML +=
    newIngrediente + "<br>";
  document.getElementById("saved_ingredients_amount").innerHTML +=
    newCantidad + "<br>";
  document.getElementById("saved_ingredients_price").innerHTML +=
    newPrecio + " €" + "<br>";
};

const calculate = (oldIngreJSON, newIngreJSON, personasCalc, personasOrig) => {
  // Recojemos los datos del oldIngreJSON
  oldIngreJSON.receta.forEach((ingrediente) => {
    //El nombre lo añadimos igual
    const ingredienteCalculado = {
      nombre: ingrediente.nombre,
      cantidad: ((ingrediente.cantidad * personasCalc) / personasOrig).toFixed(
        2
      ),
      precio: ((ingrediente.precio * personasCalc) / personasOrig).toFixed(2),
    };

    newIngreJSON.receta.push(ingredienteCalculado);
  });
};

const printCalculatedData = (newIngreJSON) => {
  newIngreJSON.receta.forEach((ingrediente) => {
    document.getElementById("saved_ingredients_name").innerHTML +=
      ingrediente.nombre + "<br>";
    document.getElementById("saved_ingredients_amount").innerHTML +=
      ingrediente.cantidad + "<br>";
    document.getElementById("saved_ingredients_price").innerHTML +=
      ingrediente.precio + " €" + "<br>";
  });
};

const loadCalculateHTML = () => {
  content = document.getElementById("content");
  fetch("ingredientesCalc.html")
    .then((response) => response.text())
    .then((html) => {
      content.innerHTML = html;
      // Aquí puedes realizar cualquier operación adicional con el HTML cargado
      printCalculatedData(newIngreJSON);
    })
    .catch((error) => {
      console.log("Error al cargar el archivo html: " + error);
    });
};

const calculatedIngedients = (
  oldIngreJSON,
  newIngreJSON,
  personasCalc,
  personasOrig
) => {
  //Calculamos los datos
  calculate(oldIngreJSON, newIngreJSON, personasCalc, personasOrig);
  //Cargamos el HTML
  loadCalculateHTML();
  //Añadimos los datos al HTML
};

document.getElementById("addIngre").addEventListener("click", function () {
  getData();
});
document.getElementById("calculate").addEventListener("click", function () {

  if (getData() == 2) {
    calculatedIngedients(
      oldIngreJSON,
      newIngreJSON,
      personasCalc,
      personasOrig
    );
  }
});
