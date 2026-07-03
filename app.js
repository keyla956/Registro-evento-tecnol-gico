// ===========================================
// ELEMENTOS DEL HTML
// ===========================================

const formulario = document.getElementById("formRegistro");
const boton = document.querySelector("button");
const mensaje = document.getElementById("mensaje");
const tarjetaExito = document.getElementById("tarjetaExito");
const folioGenerado = document.getElementById("folioGenerado");

// ===========================================
// URL DE GOOGLE APPS SCRIPT
// ===========================================

const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbzVuPa0Nkf5nXZ1UbU0O4DtQTn4Me8KtaFyCau0sBdAJ5bXOytianeDDL4fAW61g1K81A/exec";

// ===========================================
// ENVÍO DEL FORMULARIO
// ===========================================

formulario.addEventListener("submit", async function (e) {

    e.preventDefault();

    // Limpiar mensajes anteriores
    mensaje.textContent = "";
    tarjetaExito.style.display = "none";

    // Animación de confeti
confetti({
    particleCount: 180,
    spread: 100,
    origin: {
        y: 0.6
    }
});

    // Desactivar botón mientras se registra
    boton.disabled = true;
    boton.textContent = "⏳ Registrando...";

    // Obtener datos del formulario
    const datos = {

        nombre: document.getElementById("nombre").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        ciudad: document.getElementById("ciudad").value.trim(),
        empresa: document.getElementById("empresa").value.trim(),
        boleto: document.getElementById("boleto").value,
        taller: document.getElementById("taller").value.trim()

    };

    try {

        // Enviar datos a Google Apps Script
        const respuesta = await fetch(URL_SCRIPT, {

            method: "POST",

            body: JSON.stringify(datos)

        });

        const resultado = await respuesta.json();

        // Mostrar folio
        folioGenerado.textContent = resultado.folio;

        // Mostrar tarjeta de éxito
        tarjetaExito.style.display = "block";

        // Limpiar formulario
        formulario.reset();

        // Ir hacia la tarjeta
        tarjetaExito.scrollIntoView({
            behavior: "smooth"
        });

    }

    catch (error) {

        console.error(error);

        mensaje.style.color = "red";
        mensaje.textContent = "❌ Ocurrió un error al registrar la información.";

    }

    finally {

        // Activar nuevamente el botón
        boton.disabled = false;
        boton.textContent = "Registrarme";

    }

});