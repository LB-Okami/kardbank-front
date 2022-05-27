
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sEmail = document.querySelector('#m-email')
const sCpf = document.querySelector('#m-cpf')
const sNumero = document.querySelector('#m-numero')
const btnSalvar = document.querySelector('#btnSalvar')

let isEdited = false;
let itens
let id
let userId;
const userData = []


function getAll(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function getById(id) {
    let request = new XMLHttpRequest()
    request.open("GET", `https://kardbank-teste.herokuapp.com/users/${id}`, false)
    request.send()
    return request.responseText
}

function save(element) {

    let request = new XMLHttpRequest()
    request.open("POST", `https://kardbank-teste.herokuapp.com/users`, true)
    request.setRequestHeader("Content-type", "application/json")

    request.send(JSON.stringify(element))

    return request.responseText
}

function updateItem(id, element) {
    let request = new XMLHttpRequest()
    request.open("PUT", `https://kardbank-teste.herokuapp.com/users/${id}`, true)
    request.setRequestHeader("Content-type", "application/json")

    request.send(JSON.stringify(element))
    return request.responseText
}

function deleteItem(id) {
    let request = new XMLHttpRequest()
    request.open("DELETE", `https://kardbank-teste.herokuapp.com/users/${id}`, false)
    request.send()
    return request.responseText
}

function openModal(edit = false, id = 0, element) {
    modal.classList.add('active')
    
    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }
    
    if (edit) {
        userId = id
        let data = getById(id)
        let user = JSON.parse(data)

        sNome.value = user.name
        sEmail.value = user.email
        sCpf.value = user.cpf
        sNumero.value = user.number
    } else {
        sNome.value = ''
        sEmail.value = ''
        sCpf.value = ''
        sNumero.value = ''
    }
    
}

function editItem(id) {
    isEdited = true;
    openModal(true, id)
  }
  

function criaLinha(usuario) {
    linha = document.createElement("tr")
    
    tdId = document.createElement("td")
    tdNome = document.createElement("td")
    tdEmail = document.createElement("td")
    tdCpf = document.createElement("td")
    tdNumber = document.createElement("td")
    
    tdId.innerHTML = usuario.id
    tdNome.innerHTML = usuario.name
    tdEmail.innerHTML = usuario.email
    tdCpf.innerHTML = usuario.cpf
    tdNumber.innerHTML = usuario.number
    
    linha.appendChild(tdId)
    linha.appendChild(tdNome)
    linha.appendChild(tdEmail)
    linha.appendChild(tdCpf)
    linha.appendChild(tdNumber)
    
    
    return linha
}

function insertItem(item) {
    let tr = document.createElement('tr')
    
    tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.email}</td>
    <td>${item.cpf}</td>
    <td>${item.number}</td>
    <td class="acao">
    <button onclick="editItem(${item.id})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
    <button onclick="deleteItem(${item.id})"><i class='bx bx-trash'></i></button>

    </td>
    `
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
    
    if (sNome.value == '' || sEmail.value == '' || sNumero.value == '' || sCpf == '') {
        return
    }

    e.preventDefault();
 
    nome = document.getElementById('m-nome').value
    email = document.getElementById('m-email').value
    cpf = document.getElementById('m-cpf').value
    number = document.getElementById('m-numero').value

    

    if(isEdited) {
        body = {
            "id": userId, 
            "name": nome,
            "email": email,
            "cpf": cpf,
            "number": number
        }

        updateItem(userId, body)
        isEdited = false;
    }
    else {
        body = {
            "name": nome,
            "email": email,
            "cpf": cpf,
            "number": number
        }

        save(body)

    }

    
    modal.classList.remove('active')
    id = undefined
}


const setItensBD = () => database.setItem('kardbank', JSON.stringify(itens))

function main() {
    data = getAll("https://kardbank-teste.herokuapp.com/users")
    let usuarios = JSON.parse(data)
    
    usuarios.forEach(element => {
        insertItem(element)
    });
    
}

console.log("Rodando")
main()