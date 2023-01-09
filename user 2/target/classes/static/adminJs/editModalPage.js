const form_ed = document.getElementById('formForEditing');
const id_ed = document.getElementById('id_ed');
const name_ed = document.getElementById('name_ed');
const lastname_ed = document.getElementById('lastname_ed');
const age_ed = document.getElementById('age_ed');
const username_ed = document.getElementById('username_ed');
const password_ed = document.getElementById('password_ed');

async function editModalData(id) {
    const urlDataEd = '/rest/admin/users/' + id;
    let usersPageEd = await fetch(urlDataEd);
    if (usersPageEd.ok) {
        let userData =
            await usersPageEd.json().then(async user => {
                id_ed.value = `${user.id}`;
                name_ed.value = `${user.name}`;
                lastname_ed.value = `${user.lastname}`;
                age_ed.value = `${user.age}`;
                username_ed.value = `${user.username}`;
                password_ed.value = `${user.password}`;
            })
    } else {
        alert(`Error, ${usersPageEd.status}`)
    }
}

async function editUser() {
    let urlEdit = '/rest/admin/users/' + id_ed.value
    let listOfRole = [];

    for (let i = 0; i < form_ed.rolesForEditing.options.length; i++) {
        if (form_ed.rolesForEditing.options[i].selected) {
            listOfRole.push("ROLE_" + form_ed.rolesForEditing.options[i].value);
        }
    }

    let method = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: document.getElementById("id_ed").value,
            name: document.getElementById("name_ed").value,
            lastname: document.getElementById("lastname_ed").value,
            age: document.getElementById("age_ed").value,
            username: document.getElementById("username_ed").value,
            password: document.getElementById("password_ed").value,
            roles: listOfRole
        })
    }

    await fetch(urlEdit, method).then(() => {
        $('#editCloseBtn').click();
        getAllUserRest();
    })
}




