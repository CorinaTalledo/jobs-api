

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


const showView = (vistaAMostrar) => {
    $$(".view").forEach((view) => view.classList.add("visually-hidden"));
    $(`#${vistaAMostrar}`).classList.remove("visually-hidden");
};

$("#btn-jobs").addEventListener("click", () =>
    showView("section-jobs")
);

$("#show-form").addEventListener("click", () =>
    showView("section-add-job")
);

//------------------------------------------------

const inicializar = (data) =>{
    renderJobs(data);
}


// FILTROS
// Llena el primer select
const getFilter = (data, filter) => {
    const arrayOfOptions = [];

    console.log(arrayOfOptions);

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

    console.log(arrayOfOptions);
}


// Add event listener del primer select
$("#select-filter").addEventListener("change", () => {

    const selectedFilter = $("#select-filter").value

    renderFilterOptions(selectedFilter)
})


// Arrays globales que se van a llenar con todas las opciones
const locations = [];
const categories = [];
const seniorities = [];


// Toma las opciones para llenar los arrays
const getFilterOptions = (data) => {

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
        $("#select-option-filter").innerHTML = `<option selected>Select a filter</option>`;
    }
}


const renderFilter = () =>{
    let key = $("#select-filter").value
    let value = $("#select-option-filter").value

    getFilterParams(key, value);
}


$("#btn-search").addEventListener("click", () => renderFilter())



// MOSTRAR TRABAJOS

const renderJobs = (jobs) =>{

    showView("section-jobs")

    for (let { name, description, category, seniority, location, id } of jobs) {
        $("#cards-jobs").innerHTML +=
            `<div class="card p-2 g-col-4" style="width: 300px; height: 300px; id="${id}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${name}</h5>
                    <p class="job-description card-text">${description}</p>
                    <div class="mb-3">
                        <span class="badge text-bg-primary">${location}</span>
                        <span class="badge text-bg-primary">${category}</span>
                        <span class="badge text-bg-primary">${seniority}</span>
                    </div>
                    <button type="button" class="btn btn-dark" onclick="seeDetail('${id}')">See Details</button>
                </div>
            </div>`;   
    }
};



// CREAR TRABAJOS

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
        languages: $("#add-languages").value
        }

    addJob(newJob)
}

$("#btn-add-job").addEventListener("click", () => createJob())



// VER DETALES DEL TRABAJO SELECCIONADO

const jobDetails = ({image, name, description, category, seniority, location, id}) =>{

    showView("section-detail")

    $("#section-detail").innerHTML = `
        <div class="card mb-3" style="max-width: 50%;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${image}" class="img-fluid rounded-start">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title" id="detail-name">${name}</h5>
                                <p class="card-text" id="detail-description">${description}</p>
                                <div class="mb-3">
                                    <span class="badge text-bg-primary" id="detail-location">${location}</span>
                                    <span class="badge text-bg-primary" id="detail-category">${category}</span>
                                    <span class="badge text-bg-primary" id="detail-seniority">${seniority}</span>
                                </div>

                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-success" onclick="seeEditForm('${id}')"><i class="fa-solid fa-pencil me-2"></i>Edit</button>
                                    <button type="button" class="btn btn-danger"  id="btn-delete-job" onclick="removeJob('${id}')"><i class="fa-solid fa-trash-can me-2"></i>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
}



const removeJob = (id) => {

    const confirmDelete = confirm("Are you sure you want to delete this job offer?");

    if (confirmDelete) {

        deleteJob(id)
    }
}

$("#btn-delete-job").addEventListener("click", () => removeJob(id))



const seeForm = ({name, description, image, location, seniority, category, long_term, salary, benefits, languages}) =>{

    showView("section-edit-job")

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
    $("#edit-job-languages").value = languages;

    $("#btn-edit-job").addEventListener("click", () => editForm())
}


const editForm = () =>{
    return{
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
        languages: $("#edit-job-languages").value,
    }
}




// El add event listener se activa al hacer click en el boton de editar trabajo.
// Tengo que capturar la informacion de ese trabajo trayendola de la api con un fetch.
// Tengo que meter esa informacion en el formulario.

// Tengo que poder modificar esa informacion
// Tengo que poder guardarla y editarla en la api.






// []



window.onload = getJobs()
