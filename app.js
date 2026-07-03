import supabase from "./supabase.js";

const formulario = document.getElementById("formRegistro");

formulario.addEventListener("submit", async function(e){

    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("Correo").value;
    const telefono = document.getElementById("telefono").value;
    const ciudad = document.getElementById("Ciudad").value;
    const empresa = document.getElementById("empresa").value;
    const boleto = document.getElementById("boleto").value;
    const taller = document.getElementById("taller").value;

    console.log(nombre);
    console.log(correo);
    console.log(telefono);

    const { data, error } = await supabase
    .from("Participantes")
    .insert([
        {  
            nombre: nombre,
            Correo: correo,
            teléfono: telefono,
            Ciudad: ciudad,
            Empresa: empresa,
            boleto: boleto,
            taller: taller
        }
    ]);

    if(error){

        console.log(error);

        alert("Ocurrió un error al guardar.");

    }
    else{

        alert("Registro guardado correctamente.");

    }

});