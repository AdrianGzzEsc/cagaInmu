
const express = require('express'); 
const path = require('path');
const { google } = require("googleapis");
const { request } = require('http');
var bodyParser = require('body-parser');
const app = express();              
const port = 5000;                  

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
    console.log(req.body)
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    });
    const authClientObject = await auth.getClient();
const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
const spreadsheetId = "1u9w3qrqN_SUq2LWgmZ906d6bfXs29nEkRRlmyMgyQT8";

    await googleSheetsInstance.spreadsheets.values.append({
        auth, //auth object
        spreadsheetId, //spreadsheet id
        range: "Hoja 1!A:B", //sheet name and range of cells
        valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
        resource: {
            values: [["Git followers tutorial", "Mia Roberts"]],
        },
    });
})

app.listen(port, () => {           
    console.log(`Now listening on port ${port}`); 
}); 