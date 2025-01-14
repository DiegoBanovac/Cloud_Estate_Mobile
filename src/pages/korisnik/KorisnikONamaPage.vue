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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mauris nulla, malesuada nec sollicitudin a, laoreet ut nisl. Phasellus fringilla arcu at magna bibendum vulputate. Maecenas pharetra erat nec dui interdum, vel auctor dolor maximus. Sed odio ligula, pulvinar id tempor non, lacinia et eros. Fusce vehicula faucibus tincidunt. Sed vel libero vel arcu fringilla bibendum. Sed sed commodo purus.
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
