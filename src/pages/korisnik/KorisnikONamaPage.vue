<template>
  <q-page>
    <!-- Banner slika -->
    <q-img
      src="../../assets/pozadina.jpg"
      alt="slika"
      class="banner-slika"
    />

    <!-- Opis sekcija -->
    <div class="opis">
      <h1>O nama</h1>
      <p>
        Cloud Estate je inovativna digitalna platforma koja omogućuje centralizirano oglašavanje, pretragu i upravljanje nekretninama na području cijele Hrvatske. Naša vizija je stvoriti transparentno i učinkovito tržište nekretnina dostupno svima – bilo da ste profesionalna agencija ili privatni korisnik u potrazi za novim domom, investicijom ili poslovnim prostorom.

Agencijama za nekretnine omogućujemo jednostavno objavljivanje i upravljanje ponudom putem modernog i intuitivnog sučelja, dok korisnicima pružamo pouzdanu i preglednu tražilicu kojom brzo dolaze do nekretnine po svojoj mjeri – za kupnju ili najam.

S obzirom na to da smo smješteni u Rijeci, iz prve ruke razumijemo dinamiku hrvatskog tržišta nekretnina i razvijamo rješenja koja odgovaraju stvarnim potrebama korisnika. Naš cilj je digitalizirati i unaprijediti način na koji se nekretnine prezentiraju, traže i kupuju u Hrvatskoj.

Cloud Estate je više od aplikacije – to je prostor gdje se spajaju prilike, ljudi i domovi.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Email: <a href="mailto:cloudestate@gmail.com">cloudestate@gmail.com</a></p>
      <p>Adresa: Cesta za Valaltu-Lim 7, 52210, Rovinj</p>
      <p>&copy; 2024 CloudEstate LLC. Sva prava zadržana.</p>
      <p>Telefon: <a href="tel:+385123456789">+385 123 456 789</a></p>
      <p>Radno vrijeme: Ponedjeljak - Petak, 9:00 - 17:00</p>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style scoped>
/* Stilovi za banner sliku */
.banner-slika {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 0; /* Bez zaobljenja da izgleda kao pravi banner */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.opis {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  line-height: 1.6;
  color: #333;
  font-family: "Roboto", sans-serif;
  text-align: justify;
}
h1 {
  font-family: "Roboto", serif;
  font-weight: 500;
  font-size: 2rem;
  color: #007bff;
  margin-top: 1rem;
  text-align: center;
}
h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #007bff;
}

p {
  margin-bottom: 15px;
  font-size: 1rem;
}

/* Footer stilovi */
.footer {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
  color: #6c757d;
  font-size: 0.9rem;
  border-top: 1px solid #e0e0e0;
}

.footer p {
  margin: 5px 0;
}

.footer a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s;
}

.footer a:hover {
  color: #0056b3;
}
</style>
