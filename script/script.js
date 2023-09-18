window.onload = function () {
  var buttonHome = document.getElementById("home");
  var buttonProjects = document.getElementById("projects");
  var buttonLinks = document.getElementById("links");
  var buttonContact = document.getElementById("contact");
  

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

  buttonLinks.addEventListener("click", function () {
    fetch("indexLinks.html")
      .then((response) => response.text())
      .then((html) => {
        contenedorContent.innerHTML = html;
      })
      .catch((error) => {
        console.log("Error al cargar el archivo html: " + error);
      });
  });

  buttonContact.addEventListener("click", function () {
    fetch("indexContacto.html")
      .then((response) => response.text())
      .then((html) => {
        contenedorContent.innerHTML = html;
      })
      .catch((error) => {
        console.log("Error al cargar el archivo html: " + error);
      });
  });
};
