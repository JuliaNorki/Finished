const form_del = document.getElementById('formForDeleting');
const id_del = document.getElementById('id_del');
const name_del = document.getElementById('name_del');
const lastname_del = document.getElementById('lastname_del');
const age_del = document.getElementById('age_del');
const username_del = document.getElementById('username_del');

async function deleteModalData(id) {
    const urlForDel = '/rest/admin/users/' + id;
    let usersPageDel = await fetch(urlForDel);
    if (usersPageDel.ok) {
        let userData =
            await usersPageDel.json().then(user => {
                id_del.value = `${user.id}`;
                name_del.value = `${user.name}`;
                lastname_del.value = `${user.lastname}`;
                age_del.value = `${user.age}`;
                username_del.value = `${user.username}`;
            })
    } else {
        alert(`Error, ${usersPageDel.status}`)
    }
}

function deleteUser() {

    form_del.addEventListener('submit', deletingUser);

    function deletingUser(event) {
        event.preventDefault();
        let url = '/rest/admin/users/' + id_del.value

        let method = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(url, method).then(() => {
            $("#deleteCloseBtn").click();
            getAllUserRest();
        });
    }
}

