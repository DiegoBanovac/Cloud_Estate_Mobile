<template>
  <q-page>
    <div class="opis">
      <!-- Naslov -->
      <h2>O nama</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mauris nulla, malesuada nec sollicitudin a, laoreet ut nisl. Phasellus fringilla arcu at magna bibendum vulputate. Maecenas pharetra erat nec dui interdum, vel auctor dolor maximus. Sed odio ligula, pulvinar id tempor non, lacinia et eros. Fusce vehicula faucibus tincidunt. Sed vel libero vel arcu fringilla bibendum. Sed sed commodo purus.</p>

      <q-img
        src="../assets/slika_kuca.jpg"
        alt="slika"
        style="max-width: 100%; height: auto; cursor: pointer;"
      />
    </div>


    <div class="footer">
      <p>Email: cloudestate@gmail.com</p>
      <p>Adresa: Cesta za Valaltu-Lim 7, 52210, Rovinj</p>
      <p>&copy; 2024 CloudEstate LLC. Sva prava zadržana.</p>
      <p>Telefon: +385 123 456 789</p>
      <p>Radno vrijeme: Ponedjeljak - Petak, 9:00 - 17:00</p>
    </div>
  </q-page>
</template>

<script>
</script>

<style scoped>
h2 {
  text-align: center;
}

.footer {
  text-align: center;
  padding: 20px;
  font-size: 14px;
}

.footer p {
  margin: 5px 0;
}
</style>
