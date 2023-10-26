
const getJobs = async () => {

    showView("spinner")

    let response = await fetch(
    `https://65209d90906e276284c4940c.mockapi.io/api/jobs`
    );

    let data = await response.json();

    setTimeout(() => {
    inicializar(data);
    }, 2000);

    fillFilterArrays(data);
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
        alert(`There was a mistake ${error}`)
    }
};


const getFilterParams = async (key, value) => {

    showView("spinner")

    try{
        let response = await fetch(`https://65209d90906e276284c4940c.mockapi.io/api/jobs/?${key}=${value}`)

        if (response) {
            let data = await response.json();

            setTimeout(() => {
                renderJobs(data)
            }, 2000);

        }
    } catch (error) {
        alert(`There was a mistake ${error}`);
    }
}


const getDetail = async (id) => {

    showView("spinner")

    let response = await fetch(`https://65209d90906e276284c4940c.mockapi.io/api/jobs/${id}`);
    
    let data = await response.json();


    setTimeout(() => {
        renderDetails(data);
    }, 2000);
}


const deleteJob = async (id) => {

    try {
        let response = await fetch(`https://65209d90906e276284c4940c.mockapi.io/api/jobs/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (response) {
            alert(`The job offer ${id} has been deleted.`)

            getJobs()
        }

    } catch (error) {
        alert(`There was a mistake ${error}`);
    }
}


const getEditJob = async (id) => {

    showView("spinner")

    let response = await fetch(`https://65209d90906e276284c4940c.mockapi.io/api/jobs/${id}`);
    
    let data = await response.json();

    setTimeout(() => {
        showEditForm(data);
    }, 2000);
}


const editJob = async (id) => {
    try {
        
        const formData = editForm()

        const response = await fetch(`https://65209d90906e276284c4940c.mockapi.io/api/jobs/${id}`,
            {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }
        );

        const data = await response.json();

        if(data){
            alert(`The job offer ${id} has been edited.`)
            getJobs();
        }

    } catch (error) {
        alert(`There was a mistake ${error}`)
    }
};