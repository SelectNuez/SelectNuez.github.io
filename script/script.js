window.onload = function () {
  var buttonHome = document.getElementById("home");
  var buttonProjects = document.getElementById("projects");

  var contenedorContent = document.getElementById("content");

  buttonHome.addEventListener("click", function () {
    fetch("indexHome.html")
      .then((response) => response.text())
      .then((html) => {
        contenedorContent.innerHTML = html;
      })
      .catch((error) => {
        console.log("Error al cargar el archivo html: " + error);
      });
  });

  buttonProjects.addEventListener("click", function (event) {
    fetch("indexProjects.html")
      .then((response) => response.text())
      .then((html) => {
        contenedorContent.innerHTML = html;
      })
      .catch((error) => {
        console.log("Error al cargar el archivo html: " + error);
      });
  });
};
