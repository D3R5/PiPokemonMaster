document.addEventListener("DOMContentLoaded", function () {
    const myButton = document.getElementById("myButton");

    // Agrega un controlador de eventos para la tecla 'Enter'
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            myButton.click();
        }
    });

    // Exporta 'myButton' después de que se defina

});

