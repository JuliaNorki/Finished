const url = '/rest/admin/allPage'

async function getAllUserRest() {
    let page = await fetch(url)

    if (page.ok) {
        let listOfUsers = await page.json();
        loadTableData(listOfUsers)
    } else {
        alert(`Error, ${page.status}`);
    }
}

function loadTableData(listOfUsers) {
    const tableBody = document.getElementById('tbody');
    let dataHtml = '';

    for (let user of listOfUsers) {
        let roles = [];

        for (let role of user.roles) {
            roles.push(" " + role.role.toString())
        }
        dataHtml += `<tr>
           <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.username}</td>
            <td>${roles}</td>
            <td>
                <button class="btn btn-primary" data-bs-toggle="modal" 
                           data-bs-target="#editModal"
                           onclick="editModalData(${user.id})">
                           Edit
                </button>
            </td>
            <td>
                <button class="btn btn-danger" data-bs-toggle="modal" 
                           data-bs-target="#deleteModal"
                           onclick="deleteModalData(${user.id})">
                    Delete
                </button>
            </td>
            </tr>`
    }
    tableBody.innerHTML = dataHtml;
}

getAllUserRest();