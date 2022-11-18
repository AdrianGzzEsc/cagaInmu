
const express = require('express'); 
const path = require('path');
const { google } = require("googleapis");
const { request } = require('http');
var bodyParser = require('body-parser');
const app = express();              
const port = process.env.PORT || 5000;


app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.get('/', (req, res) => {        
    res.render('inmu');      
                                                       
});

app.post("/", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "src/keys.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    });
    const authClientObject = await auth.getClient();
const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
const spreadsheetId = "1u9w3qrqN_SUq2LWgmZ906d6bfXs29nEkRRlmyMgyQT8";

const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: "Hoja 1!A:A", //range of cells to read from.
})

req.body.id = parseInt(readData.data.values[readData.data.values.length -1]) + 1

    await googleSheetsInstance.spreadsheets.values.append({
        auth, //auth object
        spreadsheetId, //spreadsheet id
        range: "Hoja 1!A:AA", //sheet name and range of cells
        valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
        resource: {
            values: [[req.body.id, req.body.map_id,  req.body.direccion, req.body.descripcion, req.body.pic, req.body.link, req.body.icon, req.body.lat, req.body.lng, req.body.anim, req.body.titulo, req.body.infoopen, req.body.category, req.body.approved, req.body.retina, req.body.type, req.body.did, req.body.sticky, req.body.other_data, req.body.layergroup, req.body.baños, req.body.detalles, req.body.estacionamiento,req.body.habitaciones,req.body.metros,req.body.precio,req.body.precioMuestra, req.body.antiguedad  ]],
        },
    });

    return res.status(201).json('Exito');

})


app.listen(port, () => {           
    console.log(`Now listening on port ${port}`); 
}); 