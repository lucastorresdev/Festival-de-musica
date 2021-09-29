document.addEventListener('DOMContentLoaded', function(){
    scrollNav()
    navegacionFija();
});

function navegacionFija(){

    const barra = document.querySelector('.header');

    //Registrar el intersection observer

    const observer = new IntersectionObserver( function(entries){
       if(entries[0].isIntersecting){
           barra.classList.remove('fijo');
       }else{
           barra.classList.add('fijo')
       }
    });

    //Elemento observar

    observer.observe(document.querySelector('.sobre-festival'));
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach( function(enlace){
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({
                behavior:'smooth',
            });
        });
    });
}
document.addEventListener('DOMContentLoaded', function(){
crearGaleria();
});

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i=1; i<=12; i++){
        const imagen=document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId=i;

        //Añadir la función de mostrarImagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    const id = parseInt(e.target.dataset.imagenId);

    //Generar la imagen

    const imagen =document.createElement('IMG');
    imagen.src=`build/img/grande/${id}.webp`;

    const overlay=document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overley');

    //Cuando se da click, cerrar la imagen
    overlay.onclick=function(){
        overlay.remove();
    }


    //Boton para cerrar la imagen
    const cerrarimagen=document.createElement('P');
    cerrarimagen.textContent='X';
    cerrarimagen.classList.add('btn-cerrar');
    overlay.appendChild(cerrarimagen);

    //Cuando se presiona, se cierra la imagen
    cerrarimagen.onclick=function(){
        overlay.remove();
    }
    overlay.appendChild(cerrarimagen);

    //Mostrar en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);

}