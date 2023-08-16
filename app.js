const express = require("express")
const cors = require("cors")
const JsonDB = require("simple-json-db")
const bodyParser = require("body-parser")

const app = express()
let DB;

app.use(express.static(__dirname + "/static"))
app.use(cors())
app.use(bodyParser.json())

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html")
})
app.get("/autos", (request, response) => {
    response.json(DB.JSON())
})

app.get("/autos/get/:id", (request, response) => {
    response.json(DB.get(request.params.id))
})

app.post("/autos/save", (request, response) => {
    const last_auto = Object.values(DB.JSON()).pop()
    const last_id = last_auto.id
    const new_id = Number(last_id) + 1
    const car_profile = {
            "id": new_id,
            "Marka": request.body.Marka,
            "Model": request.body.Model, 
            "Godište": request.body.Godište,
            "Karoserija": request.body.Karoserija,
            "Gorivo": request.body.Gorivo,
            "Kubikaža": request.body.Kubikaža,
            "Snaga": request.body.Snaga,
            "Kilometraža": request.body.Kilometraža,
            "Menjač": request.body.Menjač,
            "Boja": request.body.Boja,
            "Registrovan": request.body.Registrovan,
            "Cena": request.body.Cena,
            "Zamena": request.body.Zamena,
            "Slika": request.body.Slika,
            "password": request.body.password
    }
    DB.set(String(new_id), car_profile)
    response.status(201)
    response.send({ "message": "New car profile succesfuly created!" })
})

app.delete("/autos/delete/:id", (request, response) => {
    const id = request.params.id 
    DB.delete(id)
    response.status(202)
    response.send({"mesagge": "Car profile deleted!"})
})

app.put("/autos/update", (request, response) => {
    const car_profile = request.body
    const str_id = String(car_profile.id)
    DB.set(str_id, car_profile)
    response.status(201)
    response.send({"message": "Car updated!"})
})

app.listen(50000, "127.0.0.1", () => {
    console.log("Server has started on http://127.0.0.1:50000")
    DB = new JsonDB(__dirname + "/data/autos.json")
})