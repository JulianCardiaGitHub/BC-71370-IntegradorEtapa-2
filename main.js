import './sass/main.scss'
import Handlebars from "handlebars";

const start = async () => {
   
   try {
    const respuesta = await fetch('templates/card.hbs')

    if( !respuesta.ok ) {
        throw new Error('No se obtiene la card')
    }

    const plantilla = await respuesta.text ()

    const template = Handlebars.compile(plantilla)

    //const respuestaBack = await fetch('http://localhost:8080/productos/')
    const respuestaBack = await fetch('https://66ae86aeb05db47acc57cbad.mockapi.io/productos/')

    if ( !respuestaBack.ok ) {
        throw new Error('Error con los productos', respuestaBack.status)
    }
    const dataProductos = await respuestaBack.json()

    const data = { productos: dataProductos }

    const html = template(data)

     console.log(html)

     const contenedorCards = document.querySelector('#contenedor-cards')

        contenedorCards.innerHTML = html
   } catch (error) {
    console.log('[start]:', error)
   }

}
window.addEventListener('DOMContentLoaded',  start)