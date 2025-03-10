document.getElementById('formularioCompra').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const formData = new FormData(this); // Obtiene los datos del formulario

    // Envía los datos al servidor usando Fetch API
    fetch('/registrar', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.text())
        .then(data => {
            const mensajeDiv = document.getElementById('mensaje');
            if (data.includes('Gracias')) {
                mensajeDiv.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        ${data}
                    </div>
                `;
                document.getElementById('formularioCompra').reset(); // Limpia el formulario
            } else {
                mensajeDiv.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        ${data}
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const mensajeDiv = document.getElementById('mensaje');
            mensajeDiv.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Hubo un error al procesar tu solicitud.
                </div>
            `;
        });
});