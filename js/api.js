
// La funcion que lleva info a la api debe recibir un parametro. Al mismo tiempo, la funcion del main tiene llamar a la funcion que lleva la info a la api y el parametro que va a recibir ahi es la que despues va a llevar a la api.

const getJobs = async () => {

    showView("spinner")

    let response = await fetch(
    `https://65209d90906e276284c4940c.mockapi.io/api/jobs`
    );

    let data = await response.json();

    setTimeout(() => {
    inicializar(data);
    }, 2000);

    getFilterOptions(data);
};


const addJob = async (job) => {
    try {
        const response = await fetch(
            `https://65209d90906e276284c4940c.mockapi.io/api/jobs`,
            {
            method: "POST",
            body: JSON.stringify(job),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }
        );

        const data = await response.json();

        if(data){
            getJobs();
        }

    } catch (error) {
        alert(`Hubo un error`)
    }
};


const seeDetail = async (id) => {

    showView("spinner")

    let response = await fetch(`https://65209d90906e276284c4940c.mockapi.io/api/jobs/${id}`);
    
    let data = await response.json();


    setTimeout(() => {
        jobDetails(data);
    }, 2000);
}


const getFilterParams = async (key, value) => {

    showView("spinner")

    // La informacion que toma es la correcta y la devolucion es correcta pero no lo puedo mostrar en el fucking html

    try{
        let response = await fetch(`https://65209d90906e276284c4940c.mockapi.io/api/jobs/?${key}=${value}`)

        if (response) {
            let data = await response.json();
            
            setTimeout(() => {
                // showView("result")
                getJobs();
            }, 2000);

            // console.log(data);
        }
    } catch (error) {
        alert(`Hubo un error`);
    }
}


const deleteJob = async (id) => {

    try {
        let response = await fetch(`https://65209d90906e276284c4940c.mockapi.io/api/jobs/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (response.ok) {
            alert(`El objeto ${id} ha sido eliminado The job offer ..... has been deleted.`)

            getJobs()
        }

    } catch (error) {
        alert(`Hubo un error`);
    }
}


const seeEditForm = async (id) => {

    showView("spinner")

    let response = await fetch(`https://65209d90906e276284c4940c.mockapi.io/api/jobs/${id}`);
    
    let data = await response.json();


    setTimeout(() => {
        seeForm(data);
    }, 2000);
}


const editJob = async (id) => {
    try {
        const response = await fetch(`https://65209d90906e276284c4940c.mockapi.io/api/jobs/${id}`,
            {
            method: "PUT",
            body: JSON.stringify(id),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }
        );

        const data = await response.json();

        console.log(data);

        if(data){
            editForm()
            // getJobs();
        }

    } catch (error) {
        alert(`Hubo un error`)
    }
};



// fetch >> va a la api y el metodo por defecto, el verbo o metodo es get al menos que le digamos otro verbo.

// FUNCION PARA TRAER LOS TRABAJOS DE LA API (SE LLAMA CADA VEZ QUE SE VA A ACTUALIZAR EL HTML)
// FUNCION PARA AGREGAR LOS TRABAJOS (METODO POST)
// FUNCION PARA ELIMINAR (delete)
// FUNCION PARA ACTUALIZAR/EDITAR (patch)
// funcion para filtrar los filtros. Solo debe mostrarse en el home con todas las cards.



// VISTAS: (Funcion que muestra y oculta tiene que ir en otro doc: dom.js)
// - Empleos disponibles
// - Crear un trabajo
// - Editar un trabajo

// El spinner debe llamarse primero adentro de la funcion y el set time out abajo de todo pero dentro de la funcion




//////////////////////////////// PREGUNTAS //////////////////////////////// 

// - Al final tiene que haber un tercer documento para el dom o no?
// - Como hacer para renderizar los trabajos filtrados.
// - Como pasar el nombre del trabajo en vez del id en el alert al eliminarlo.
// - El boton de editar puede abrir una nueva vista en vez de que este abajo del recuadro con la info acotada?
// - Esta bien que aunque el cartel tome la info correcta no se actualice el url?











