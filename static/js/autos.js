function getAllAutos() {
    const divCars = document.querySelector("#autos")
    const tplCars = document.querySelector("#car_template").innerHTML
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {
        if(xhr.status == 200 && xhr.readyState == 4) {
            let autos = (JSON.parse(xhr.responseText))
            autos = Object.values(autos)
            divCars.innerHTML = ""
            for(let c of autos) {
                divCars.innerHTML += tplCars.replace(/##avatar##/g,c.Slika)
                .replace(/##year##/g,c.Godište)
                .replace(/##make##/g,c.Marka)
                .replace(/##model##/g,c.Model)
                .replace(/##motor##/g,c.Kubikaža)
                .replace(/##power##/g,c.Snaga) 
                .replace(/##km##/g,c.Kilometraža)
                .replace(/##price##/g,c.Cena)
                .replace(/##id##/g, c.id)
                .replace(/##password##/g,c.password)  
            } 
        }
    })
    xhr.open("GET", "/autos")
    xhr.send()
}

function fillModalForCar(car_id) {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {
        if(xhr.status == 200 && xhr.readyState == 4) {
            const car_profile = JSON.parse(xhr.responseText)
            fillForm(car_profile)
            toggleModalWindow(true)
        }
    })
    xhr.open("GET", "/autos/get/" + car_id)
    xhr.send()
}

function makeNewCarProfile() {
    const xhr = new XMLHttpRequest()
    const new_car_profile = saveNewCarData()
    xhr.addEventListener("load", () => {
        if(xhr.status == 201 && xhr.readyState == 4) {
            alert("New car profile succesfuly saved!")
            toggleModalWindow(false)
            getAllAutos()
        }
    })
    xhr.open("POST", "/autos/save")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(new_car_profile))
}

function updateCarProfile() {
    const xhr = new XMLHttpRequest()
    const new_car_profile = saveNewCarData()
    xhr.addEventListener("load", () => {
        if(xhr.status == 201 && xhr.readyState == 4) {
            toggleModalWindow(false)
            getAllAutos()
            alert("Car profile succesfuly updated!")
        }
    })
    xhr.open("PUT", "/autos/update")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(new_car_profile))
}

function deleteCar(id) {
    const url = "/autos/delete/" + id
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {
        if(xhr.status == 202 && xhr.readyState == 4) {
            getAllAutos()
            alert("Car has been deleted!")
        }
    })
    xhr.open("DELETE", url)
    xhr.send()
}

function saveNewCarData() {
    let inID = inputID.value.trim("")
    let in1 = make.value
    let in2 = model.value.trim("")
    let in3 = year.value.trim("")
    let in4 = type.value.trim("") 
    let in5 = fuel.value.trim("")
    let in6 = engine.value.trim("")
    let in7 = power.value.trim("") 
    let in8 = km.value.trim("") 
    let in9 = gear.value.trim("")
    let in10 = color.value.trim("")
    let in11 = registration.value.trim("")
    let in12 = price.value.trim("")
    let in13 = change.value.trim("")
    let in14;
    let in15 = password.value.trim("")

    let allInputs = [
        make.value,
        model.value.trim(""),
        year.value.trim(""),
        type.value.trim(""), 
        fuel.value.trim(""),
        engine.value.trim(""),
        power.value.trim(""), 
        km.value.trim(""), 
        gear.value.trim(""),
        color.value.trim(""),
        registration.value.trim(""),
        price.value.trim(""),
        change.value.trim(""),
        password.value.trim("")
    ]

    for(let inp of allInputs) {
        if(in15.length != 4) {
            pasErrDiv.style.display = "block"
            allErrDiv.style.display = "none"
            throw new Error("The password must be filled out only with 4 characters")
        } else if(inp.length < 2) {
            allErrDiv.style.display = "block"
            pasErrDiv.style.display = "none"
            throw new Error("The feelds must be filled out with at least 2 characters!")
        } else {
            pasErrDiv.style.display = "none"
            allErrDiv.style.display = "none"
        }
    }

    if(in1 == "Alfa Romeo") {
        in14 = "/img/alfa.webp"
    } else if (in1 == "Fiat") {
        in14 = "/img/fiat.svg"
    } else if(in1 == "Peugeot" || in1 == "Volkswagen") {
        in14 = `/img/${in1}.svg`
    } else {
        in14 = `/img/${in1}.webp`
    }

    return {
        "id": inID,
        "Marka": in1,
        "Model": in2, 
        "Godište": in3,
        "Karoserija": in4,
        "Gorivo": in5,
        "Kubikaža": in6,
        "Snaga": in7,
        "Kilometraža": in8 ,
        "Menjač": in9,
        "Boja": in10,
        "Registrovan": in11,
        "Cena": in12,
        "Zamena": in13,
        "Slika": in14,
        "password": in15
    }
}

function cleanForm() {
    pasErrDiv.style.display = "none"
    allErrDiv.style.display = "none"

    inputID.value = ""
    make.value = ""
    model.value = ""
    year.value = ""
    type.value = ""
    fuel.value = ""
    engine.value = ""
    power.value = ""
    km.value = ""
    gear.value = ""
    color.value = ""
    registration.value = ""
    price.value = ""
    change.value = ""
    password.value = ""
}

function fillForm(car_profile) {
    inputID.value = car_profile.id
    make.value = car_profile.Marka
    model.value = car_profile.Model
    year.value = car_profile.Godište
    type.value = car_profile.Karoserija
    fuel.value = car_profile.Gorivo
    engine.value = car_profile.Kubikaža
    power.value = car_profile.Snaga
    km.value = car_profile.Kilometraža
    gear.value = car_profile.Menjač
    color.value = car_profile.Boja
    registration.value = car_profile.Registrovan
    price.value = car_profile.Cena
    change.value = car_profile.Zamena
    password.value = car_profile.password
}

function toggleModalWindow(visible) {
    modal.style.display = visible ? "flex": "none"
}

function getAllDataOfOneAuto(id) {
    const divCars = document.querySelector("#autos")
    const tplAllData = document.querySelector("#car_all_data").innerHTML
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {
        if(xhr.status == 200 && xhr.readyState == 4) {
            let autos = (JSON.parse(xhr.responseText))
            divCars.innerHTML = ""
            divCars.innerHTML = tplAllData.replace(/##avatar##/g,autos[id].Slika)
            .replace(/##year##/g,autos[id].Godište)
            .replace(/##make##/g,autos[id].Marka)
            .replace(/##model##/g,autos[id].Model)
            .replace(/##motor##/g,autos[id].Kubikaža)
            .replace(/##power##/g,autos[id].Snaga) 
            .replace(/##km##/g,autos[id].Kilometraža)
            .replace(/##price##/g,autos[id].Cena)
            .replace(/##id##/g, autos[id].id)
            .replace(/##password##/g,autos[id].password)
            .replace(/##type##/g,autos[id].Karoserija)
            .replace(/##gear##/g,autos[id].Menjač)
            .replace(/##fuel##/g,autos[id].Gorivo)
            .replace(/##color##/g,autos[id].Boja)
            .replace(/##reg##/g,autos[id].Registrovan)
            .replace(/##ch##/g,autos[id].Zamena) 
        } 
    })
    xhr.open("GET", "/autos")
    xhr.send()
}

window.addEventListener("load", getAllAutos)

document.body.addEventListener("click", (e) => {
    if(e.target.tagName == "BUTTON") {
        if(e.target.classList.contains("add")) {
            cleanForm()
            toggleModalWindow(true)
        } else if(e.target.classList.contains("cancel")) {
            toggleModalWindow(false)
        } else if(e.target.classList.contains("save")) {
            const id = document.querySelector("#input_id").value
            if(id == "") {
                makeNewCarProfile()
            } else {
                updateCarProfile()
            }
            
        } else if(e.target.classList.contains("delete_button")) {
            const name = e.target.getAttribute("data-name")
            const pass = e.target.getAttribute("data-password")
            let val = prompt("Please enter the password you put when making this car profile")
            if(val == "undefined") {
                alert("Wrong password! You are not authorized to cancel this profile!")
                //throw new Error("Wrong password!")
                return
            }
            if(val == pass) {
                if(confirm(`Do you really want to delete "${name}"?`)) {
                    const id = e.target.getAttribute("data-id")
                    deleteCar(id)
                }
            } else {
                alert("Wrong password! You are not authorized to cancel this profile!")
                throw new Error("Wrong password!")
            }
            
        } else if(e.target.classList.contains("edit_button")) {
            
            const pass = e.target.getAttribute("data-password")
            let val = prompt("Please enter the password you put when making this car profile")
            if(val == "undefined") {
                alert("Wrong password! You are not authorized to edit this profile!")
                throw new Error("Wrong password!")
            } 
            if(val == pass) {
                const id = e.target.getAttribute("data-id")
                fillModalForCar(id)
            } else {
                alert("Wrong password! You are not authorized to edit this profile!")
                throw new Error("Wrong password!")
            }
            
        } else if(e.target.classList.contains("view_button")) {
            const id = e.target.getAttribute("data-id")
            addBtn.style.display = "none"
            getAllDataOfOneAuto(id)
        } else if(e.target.classList.contains("close_all_data_button")) {
            getAllAutos()
            addBtn.style.display = "block"
        }
    } 
})

const inputID = document.querySelector("#input_id")
const modal = document.querySelector("#modal")
const addBtn = document.querySelector("#add")
const cancelBtn = document.querySelector("#cancel")
const saveBtn = document.querySelector("#save")

const make = document.querySelector("#make")
const model = document.querySelector("#model")
const year = document.querySelector("#year")
const type = document.querySelector("#type")
const fuel = document.querySelector("#fuel")
const engine = document.querySelector("#engine")
const power = document.querySelector("#power")
const km = document.querySelector("#km")
const gear = document.querySelector("#gear")
const color = document.querySelector("#color")
const registration = document.querySelector("#registration")
const price = document.querySelector("#price")
const change = document.querySelector("#change")
const password = document.querySelector("#password")
const menuBtn = document.querySelector(".menu_btn")
const menuDiv = document.querySelector("#menu_div")

const allErrDiv = document.querySelector(".all")
const pasErrDiv = document.querySelector(".pas")

menuBtn.addEventListener("click", () => {
    menuDiv.style.display = "flex"
})
menuDiv.addEventListener("click", () => {
    menuDiv.style.display = "none"
})



/*
            <div>
                <label for="photo">Photo:</label>
                <input type="text" id="photo" />
            </div>
*/