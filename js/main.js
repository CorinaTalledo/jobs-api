
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const showView = (vistaAMostrar) => {
    $$(".view").forEach((view) => view.classList.add("visually-hidden"));
    $(`#${vistaAMostrar}`).classList.remove("visually-hidden");
};


//------------------------------------------------
//                BOTONES NAVBAR
//------------------------------------------------

$("#btn-jobs").addEventListener("click", () =>
    showView("section-jobs")
);


$("#show-form").addEventListener("click", () =>
    showView("section-add-job"),
    $("#add-thumbnail").style.backgroundImage = `url("https://ambientesdigital.com/wp-content/uploads/2013/03/250x250.jpg")`
);



//------------------------------------------------
//                    INICIALIZAR
//------------------------------------------------

const inicializar = (data) =>{
    renderJobs(data);
}



//------------------------------------------------
//            FUNCIONES QUE SE REUTILIZAN
//------------------------------------------------

// IMAGEN: Completa el contenedor de la imagen segun el valor del input
const fillThumbnails = (idUrl, idThumbnail) =>{
    if($(`#${idUrl}`).value){
        $(`#${idThumbnail}`).style.backgroundImage = `url(${$(`#${idUrl}`).value})`
    } else {
        $(`#${idThumbnail}`).style.backgroundImage = `url("https://ambientesdigital.com/wp-content/uploads/2013/03/250x250.jpg")`
    }
}


// SKILLS:

let arraySkills = []


// Funcionalidad del input para crear el array
const inputSkill = (inputId, listId) =>{

    $(`#${inputId}`).addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Permite que el enter no baje de linea
            
            const newSkill = $(`#${inputId}`).value.charAt(0).toUpperCase() + $(`#${inputId}`).value.slice(1);
    
            if (newSkill && arraySkills.length < 8) {
                arraySkills.push(newSkill);
                showSkill(listId);
                $(`#${inputId}`).value = "";
            }
        }
    });
}


// Permite visualizar cada elemento del array por separado
const showSkill = (listId) => {

    $(`#${listId}`).innerHTML = ""

    arraySkills.forEach((skill) => {
        $(`#${listId}`).innerHTML += `
        <li class="list-group-item badge text-bg-dark d-flex justify-content-between align-items-center">
            <span>${skill}</span>
            <a class="btn btn-outline-dark d-flex align-items-center justify-content-center p-0" onclick="deleteSkill('${skill}', '${listId}')">
                <i class="fa-regular fa-circle-xmark"></i>
            </a>    
        </li>`;
    });
}


// Elimina el elemento tanto del array como de la pantalla
const deleteSkill = (skill, listId) =>{
    const index = arraySkills.indexOf(skill); // Busca el índice de la skill en el array
    if (index !== -1) {
        arraySkills.splice(index, 1); // Elimina el skill del array si se encuentra
        showSkill(listId); // Actualiza la vista de la lista
    }
}



//------------------------------------------------
//                  FILTROS
//------------------------------------------------

//PRIMER SELECT: 

//Completa el array de opciones y las muestra en el primer select
const firstSelectFilter = (data, filter) => {
    const arrayOfOptions = [];

    data.forEach((job) => {
        const value = job[filter];
        if (!arrayOfOptions.includes(value)) {
            arrayOfOptions.push(value);
        }
    }); 

    $("#select-option-filter").innerHTML = "";
    $("#select-option-filter").innerHTML = "<option selected>" + filter.charAt(0).toUpperCase() + filter.slice(1) + "</option>";

    arrayOfOptions.forEach((option) => {
        $("#select-option-filter").innerHTML += `<option>${option}</option>`;
    });
}


// Add event listener del primer select
$("#select-filter").addEventListener("change", () => {

    const selectedFilter = $("#select-filter").value

    renderFilterOptions(selectedFilter)
})


// SEGUNDO SELECT:

// Arrays globales que se van a llenar con todas las opciones
const locations = [];
const categories = [];
const seniorities = [];


// Toma las opciones para llenar los arrays (segundo select)
const fillFilterArrays = (data) => {

    data.forEach((job) => {
        if(!locations.includes(job.location)) {
            locations.push(job.location);
        }

        if(!categories.includes(job.category)) {
            categories.push(job.category);
        }

        if(!seniorities.includes(job.seniority)) {
            seniorities.push(job.seniority);
        }
    });
}


// Muestra las opciones en el segundo select
const renderFilterOptions = (filterType) =>{
    if(filterType === "location"){
        $("#select-option-filter").innerHTML = "";
        $("#select-option-filter").innerHTML = "<option selected>Select a Location</option>";
    
        locations.forEach((location) => {
            $("#select-option-filter").innerHTML += `<option>${location}</option>`;
        });
    } else if(filterType === "category"){
        $("#select-option-filter").innerHTML = "";
        $("#select-option-filter").innerHTML = "<option selected>Select a Category</option>";
    
        categories.forEach((category) => {
            $("#select-option-filter").innerHTML += `<option>${category}</option>`;
        });
    } else if (filterType === "seniority"){
        $("#select-option-filter").innerHTML = "";
        $("#select-option-filter").innerHTML = "<option selected>Select a Seniority</option>";
    
        seniorities.forEach((seniority) => {
            $("#select-option-filter").innerHTML += `<option>${seniority}</option>`;
        });
    } else {
        $("#select-option-filter").innerHTML = `<option>Select a Filter</option>`;
    }
}


// Unifica los values de los selects para ir a buscar a la API
const renderFilter = () =>{
    let key = $("#select-filter").value
    let value = $("#select-option-filter").value

    getFilterParams(key, value);
}

// Boton para buscar el filtro seleccionado
$("#btn-search").addEventListener("click", () => renderFilter())


// Boton para limpiar lo seleccionado en los filtros
$("#btn-clear").addEventListener("click", () => getJobs())



//------------------------------------------------
//      VISUALIZACION DE LOS TRABAJOS CREADOS
//------------------------------------------------

const renderJobs = (jobs) =>{

    showView("section-jobs")

    $("#cards-jobs").innerHTML = "";

    for (let { name, description, category, seniority, location, id } of jobs) {
        $("#cards-jobs").innerHTML +=
            `<div class="card p-2 g-col-4 shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 300px; height: 320px; id="${id}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${name}</h5>
                    <p class="job-description card-text">${description}</p>
                    <div class="mb-3">
                        <span class="badge text-bg-success">${location}</span>
                        <span class="badge text-bg-success">${category}</span>
                        <span class="badge text-bg-success">${seniority}</span>
                    </div>
                    <button type="button" class="btn btn-dark" onclick="getDetail('${id}')">See Details</button>
                </div>
            </div>`;   
    }
};



//------------------------------------------------
//                CREAR TRABAJOS
//------------------------------------------------

// Crea el objeto
const createJob = () => {

    let newJob = {
        name: $("#add-job-title").value,
        image: $("#add-img").value,
        description: $("#add-description").value,
        location: $("#add-location").value,
        category: $("#add-category").value,
        seniority: $("#add-seniority").value,
        benefits: {
            "vacation": $("#add-vacations").value,
            "health_ensurance": $("#add-health-ensurance").value,
            "internet_paid": $("#add-internet-paid").checked
        },
        salary: Number($("#add-salary").value),
        long_term: $("#add-long-term").checked,
        skills: arraySkills
        }

    addJob(newJob)
}


// EN EL FORMULARIO:

// Ejecuta la funcion que completa la img segun el link del input
$("#add-img").addEventListener('input', ()=> fillThumbnails("add-img", "add-thumbnail"));


// Ejecuta la funcion que completa y muestra el array de skills
inputSkill("add-skills", "add-skills-list")


//Boton para enviar el formulario
$("#btn-add-job").addEventListener("click", (e) => {
    e.preventDefault() // Evita que se envie sin guardar la info
    createJob() // Crea el trabajo
    resetForm() // Resetea todo el formulario
})


// Funcion para resetar todo el formulario
const resetForm = () =>{
    $(`#${"add-thumbnail"}`).style.backgroundImage = `url("https://ambientesdigital.com/wp-content/uploads/2013/03/250x250.jpg")`;

    $(`#${"add-skills-list"}`).innerHTML = "";

    $(`#${"add-job-form"}`).reset()
}



//------------------------------------------------
//               VISTA VER DETALLES
//------------------------------------------------


// Tarjeta del trabajo seleccionado
const renderDetails = ({image, name, description, category, seniority, location, id}) =>{

    showView("section-detail")
    
    $("#section-detail").innerHTML = `
        <div class="card mb-3 m-auto w-50" style="height: 290px;">
            <div class="row g-0 h-100">
                <div class="col-md-4 h-100">
                    <img src="${image}" class="thumbnail img-fluid rounded-start" id="detail-thumbnail" onerror="this.src='https://ambientesdigital.com/wp-content/uploads/2013/03/250x250.jpg'">
                </div>
                <div class="col-md-8 h-100">
                    <div class="card-body h-100 d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title" id="detail-name">${name}</h5>
                            <p class="card-text job-description" id="detail-description">${description}</p>
                        </div>
                        <div>
                            <div class="mb-3">
                                <span class="badge text-bg-success" id="detail-location">${location}</span>
                                <span class="badge text-bg-success" id="detail-category">${category}</span>
                                <span class="badge text-bg-success" id="detail-seniority">${seniority}</span>
                            </div>

                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-success" onclick="getEditJob('${id}')"><i class="fa-solid fa-pencil me-2"></i>Edit</button>
                                <button type="button" class="btn btn-danger"  id="btn-delete-job" onclick="removeJob('${id}')"><i class="fa-solid fa-trash-can me-2"></i>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}


// Funcionalidad del boton "Delete"
const removeJob = (id) => {

    const confirmDelete = confirm("Are you sure you want to delete this job offer?");

    if (confirmDelete) {

        deleteJob(id)
    }
}



//------------------------------------------------
//            FORMULARIO EDITAR TRABAJO
//------------------------------------------------

// Llena el formualrio con la info del trabajo
const showEditForm = ({name, description, image, location, seniority, category, long_term, salary, benefits, skills, id}) =>{

    showView("section-edit-job"),

    $("#edit-job-thumbnail").style.backgroundImage = `url(${image})`

    $("#edit-job-name").value = name;
    $("#edit-job-description").value = description;
    $("#edit-job-img").value = image;
    $("#edit-job-location").value = location;
    $("#edit-job-seniority").value = seniority;
    $("#edit-job-category").value = category;
    $("#edit-job-long-term").checked = long_term;
    $("#edit-job-salary").value = salary;
    $("#edit-job-vacation").value = benefits.vacation;
    $("#edit-job-health").value = benefits.health_ensurance;
    $("#edit-job-internet").checked = benefits.internet_paid;
    $("#edit-job-skills").value = "";

    arraySkills = skills || [];

    showSkill("edit-skills-list")

    id = id    

    $("#btn-edit-job").onclick = (e) => {
        e.preventDefault();
        editJob(id)
    } 
}

// Ejecuta la funcion para visualizar y crear el array de skills
inputSkill("edit-job-skills", "edit-skills-list")


// Permite cambiar la info del objeto
const editForm = () =>{
    let formData = {
        name: $("#edit-job-name").value,
        description: $("#edit-job-description").value,
        image: $("#edit-job-img").value,
        location: $("#edit-job-location").value,
        seniority: $("#edit-job-seniority").value,
        category: $("#edit-job-category").value,
        long_term: $("#edit-job-long-term").checked,
        salary: $("#edit-job-salary").value,
        benefits: {
            vacation: $("#edit-job-vacation").value,
            health_ensurance: $("#edit-job-health").value,
            internet_paid: $("#edit-job-internet").checked,
        },
        skills: arraySkills,
    }

    return formData
}

// Permite modificar el enlace de la foto y que se visualice en el thumnail
$("#edit-job-img").addEventListener('input', ()=> fillThumbnails("edit-job-img", "edit-job-thumbnail"));



window.onload = getJobs()
