const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use a connection pool for better connection management
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "student.veleri.hr",
  user: "pmocibob",
  password: "11",
  database: "pmocibob",
});

// Helper function to execute queries
const executeQuery = (query, params = []) =>
  new Promise((resolve, reject) => {
    pool.query(query, params, (error, results) => {
      if (error) {
        console.error("Database error:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

// Routes

// Fetch all properties
app.get("/api/nekretnine", async (req, res) => {
  try {
    const results = await executeQuery("SELECT * FROM Nekretnina");
    res.json(results);
  } catch (error) {
    res.status(500).send("Error fetching properties.");
  }
});

// Fetch properties for purchase
app.get("/api/nekretnine/kupnja", async (req, res) => {
  try {
    const results = await executeQuery("SELECT * FROM Nekretnina_kupnja");
    res.json(results);
  } catch (error) {
    res.status(500).send("Error fetching purchase properties.");
  }
});

// Fetch properties for rent
app.get("/api/nekretnine/najam", async (req, res) => {
  try {
    const results = await executeQuery("SELECT * FROM Nekretnina_najam");
    res.json(results);
  } catch (error) {
    res.status(500).send("Error fetching rental properties.");
  }
});

// Fetch property by ID
app.get("/api/nekretnine/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const results = await executeQuery("SELECT * FROM Nekretnina WHERE id = ?", [id]);
    res.json(results);
  } catch (error) {
    res.status(500).send("Error fetching property by ID.");
  }
});

// Add a new property
app.post("/api/Opis_nekretnine", async (req, res) => {
  try {
    const { Cijena_nekretnine, Kvadratura_nekretnine } = req.body;
    const query = "INSERT INTO Nekretnina (Cijena_nekretnine, Kvadratura_nekretnine) VALUES ?";
    const values = [[Cijena_nekretnine, Kvadratura_nekretnine]];
    const results = await executeQuery(query, [values]);
    res.json(results);
  } catch (error) {
    res.status(500).send("Error adding property.");
  }
});

// Fetch agency details
app.get("/api/agencije", async (req, res) => {
  try {
    const query = "SELECT Naziv_Agencije, Adresa_Agencije, Telefon_Agencije, Email_Agencije FROM Agencija";
    const results = await executeQuery(query);
    res.json(results);
  } catch (error) {
    res.status(500).send("Error fetching agencies.");
  }
});

// User login
app.post("/api/login", async (req, res) => {
  try {
    const { email, lozinka } = req.body;
    if (!email || !lozinka) {
      return res.status(400).send("Molimo unesite email i lozinku.");
    }

    const query =
      "SELECT Sifra_korisnika, Ime_korisnika, Email_korisnika FROM Korisnik WHERE Email_korisnika = ? AND Lozinka_korisnika = ?";
    const results = await executeQuery(query, [email, lozinka]);

    if (results.length > 0) {
      res.status(200).send({ message: "Uspješan login!", korisnik: results[0] });
    } else {
      res.status(401).send("Neispravan email ili lozinka.");
    }
  } catch (error) {
    res.status(500).send("Greška u bazi podataka.");
  }
});

// User registration
app.post("/api/registracija_korisnika", async (req, res) => {
  try {
    const { ime, prezime, email, telefon, lozinka } = req.body;
    const query =
      "INSERT INTO Korisnik (Ime_korisnika, Prezime_korisnika, Email_korisnika, Telefon_korisnika, Lozinka_korisnika) VALUES ?";
    const values = [[ime, prezime, email, telefon, lozinka]];
    const results = await executeQuery(query, [values]);
    res.json(results);
  } catch (error) {
    res.status(500).send("Error registering user.");
  }
});
app.post("/api/kontaktiraj", async (req, res) => {
  try {
    const { ime, email, telefon, poruka, agencija } = req.body;
    const query =
      "INSERT INTO Kontakt (Ime_korisnika, Email_korisnika, Telefon_korisnika, Poruka, Email_agencije) VALUES ?";
    const values = [[ime, email, telefon, poruka, agencija]];
    const results = await executeQuery(query, [values]);
    res.json(results);
  } catch (error) {
    res.status(500).send("Error sending message.");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
