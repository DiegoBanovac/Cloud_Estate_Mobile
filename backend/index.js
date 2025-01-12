const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors());
// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: 'student.veleri.hr',
    user: 'pmocibob',
    password: '11',
    database: 'pmocibob'
  });
 
app.use(express.urlencoded({ extended: true }));
 
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


app.get("/api/nekretnine", (request, response) => {
    
    connection.query("SELECT * FROM Nekretnina", (error, results) => {
      if (error) throw error;
      response.send(results);
    });
/*
    request - slanje zahtjeva s klijentske strane
    response - slanje odgovora sa serverske strane

    npm install -g nodemon
*/
    //response.send("popis knjiga");
});
app.get("/api/nekretnine/kupnja", (request, response) => {
    
  connection.query("SELECT * FROM Nekretnina_kupnja", (error, results) => {
    if (error) throw error;
    response.send(results);
  });
/*
  request - slanje zahtjeva s klijentske strane
  response - slanje odgovora sa serverske strane

  npm install -g nodemon
*/
  //response.send("popis knjiga");
});
app.get("/api/nekretnine/najam", (request, response) => {
    
  connection.query("SELECT * FROM Nekretnina_najam", (error, results) => {
    if (error) throw error;
    response.send(results);
  });
/*
  request - slanje zahtjeva s klijentske strane
  response - slanje odgovora sa serverske strane

  npm install -g nodemon
*/
  //response.send("popis knjiga");
});

app.get("/api/nekretnine/:id", (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM Nekretnina WHERE id = ?", id, (error, results) => {
        if (error) throw error;
        response.send(results);
      });
    //response.send("jedna knjiga "+id);
});

app.post("/api/Opis_nekretnine", (request, response) => {
    const data = request.body;
    opis = [[data.Cijena_nekretnine, data.Kvadratura_nekretnine, data.Kvadratura_nekretnine]]

    connection.query("INSERT INTO Nekretnina (Cijena_nekretnine, Kvadratura_nekretnine, Kvadratura_nekretnine) VALUES ?", [rezervacija], (error, results) => {
      if (error) throw error;
      response.send(results);
    });
    
    //response.send("Poslano "+data.id_knjiga);
  });

// Endpoint za dohvat podataka o agencijama
app.get("/api/agencije", (request, response) => {
  // SQL upit za dohvat podataka iz tablice Agencija
  connection.query(
    "SELECT Naziv_Agencije, Adresa_Agencije, Telefon_Agencije, Email_Agencije FROM Agencija",
    (error, results) => {
      if (error) throw error;
      response.send(results);
    }
  );
});
//login
app.post("/api/login", (request, response) => {
  const { email, lozinka } = request.body;

  if (!email || !lozinka) {
    return response.status(400).send("Molimo unesite email i lozinku.");
  }

  connection.query(
    "SELECT Ime_korisnika, Email_korisnika, Lozinka_korisnika FROM Korisnik WHERE Email_korisnika = ? AND Lozinka_korisnika = ?",
    [email, lozinka],
    (error, results) => {
      if (error) {
        console.error(error);
        return response.status(500).send("Greška u bazi podataka.");
      }

      if (results.length > 0) {
        return response.status(200).send({
          message: "Uspješan login!",
          korisnik: results[0],
        });
      } else {
        return response.status(401).send("Neispravan email ili lozinka.");
      }
    }
  );
});
app.post("/api/registracija_korisnika", (req,res) => {
  const data = req.body;
  korisnik=[[data.ime,data.prezime,data.email,data.telefon,data.lozinka]]
  connection.query("INSERT INTO Korisnik (Ime_korisnika,Prezime_korisnika,Email_korisnika,Telefon_korisnika,Lozinka_korisnika) VALUES ?",
    [korisnik], (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});
  app.listen(port, () => {
    console.log("Server running at port: " + port);
});