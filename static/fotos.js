// Función para actualizar las fotos de los usuarios
async function actualizarFotos() {
    try {
      // Realiza una solicitud al endpoint /data para obtener la lista de usuarios con sus imágenes
      const response = await fetch('/data');
      if (!response.ok) {
        throw new Error("Error al obtener datos para las fotos: " + response.status);
      }
      const persons = await response.json();
      let html = "";
      persons.forEach(person => {
        // Si la propiedad 'imagen' existe, se usa; de lo contrario se usa la imagen por defecto
        const imageUrl = person.imagen ? person.imagen : '/static/default.png';
        html += `
          <div class="col-4 col-md-3 text-center mb-3">
            <img src="${imageUrl}" alt="Foto de ${person.nombre}" class="img-fluid rounded-circle" style="max-height: 100px;">
            <p class="mt-2">${person.nombre}</p>
          </div>
        `;
      });
      // Asume que en tu index.html tienes un contenedor con id "fotos-container"
      document.getElementById("fotos-container").innerHTML = html;
    } catch (error) {
      console.error("Error al actualizar las fotos:", error);
    }
  }
  
  // Llama a la función cuando el DOM se haya cargado y actualiza cada 10 segundos
  document.addEventListener("DOMContentLoaded", function() {
    actualizarFotos();
    setInterval(actualizarFotos, 10000);
  });
  