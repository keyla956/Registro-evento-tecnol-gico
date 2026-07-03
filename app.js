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

    mensaje.textContent = "";
    tarjetaExito.style.display = "none";

    boton.disabled = true;
    boton.textContent = "⏳ Registrando...";

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

        const respuesta = await fetch(URL_SCRIPT, {
            method: "POST",
            redirect: "follow",
            body: JSON.stringify(datos)
        });

        console.log("Status:", respuesta.status);
        console.log("OK:", respuesta.ok);

        const texto = await respuesta.text();

        console.log("Respuesta del servidor:");
        console.log(texto);

        let resultado;

        try {

            resultado = JSON.parse(texto);

        } catch {

            throw new Error("La respuesta del servidor no es un JSON válido.\n\nRespuesta recibida:\n" + texto);

        }

        // Mostrar folio
        folioGenerado.textContent = resultado.folio;

        // Mostrar tarjeta
        tarjetaExito.style.display = "block";

        // Confeti SOLO cuando todo salió bien
        confetti({
            particleCount: 180,
            spread: 100,
            origin: {
                y: 0.6
            }
        });

        formulario.reset();

        tarjetaExito.scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {

        console.error("ERROR COMPLETO:", error);

        alert(error.message);

        mensaje.style.color = "red";
        mensaje.textContent = "❌ Ocurrió un error al registrar la información.";

    } finally {

        boton.disabled = false;
        boton.textContent = "Registrarme";

    }

});
