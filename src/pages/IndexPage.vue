<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <header class="h1">Featured</header>

    <!-- Pretraga -->
    <q-input class="search-bar" rounded outlined v-model="text">
      <template v-slot:append>
        <q-avatar icon="search"></q-avatar>
      </template>
    </q-input>

    <!-- Prikaz nekretnina -->
    <q-card
      v-for="nekretnina in filtriraneNekretnine"
      :key="nekretnina.Sifra_nekretnine"
      class="my-card"
      flat
      bordered>
      <q-img
        :src="nekretnina.Slika_nekretnine"
        alt="Slika nekretnine"
        spinner-color="orange"
        @error="handleImageError"
      />

      <q-card-section>
        <div class="text-overline text-blue-7">{{ nekretnina.Tip_nekretnine }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ nekretnina.Adresa_nekretnine }}</div>
        <div class="text-caption text-grey">
          {{ nekretnina.Opis_nekretnine }}
        </div>
        <div class="text-caption text-black">
          {{ nekretnina.Kvadratura_nekretnine + "m2" }}
        </div>
      </q-card-section>

      <q-card-actions class="buttons">
        <q-btn flat color="primary" label="Book" />
        <q-btn flat color="secondary" label="Share" />
        <q-space />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      text: "", // Za pretragu
      nekretnine: [] // Spremanje podataka o nekretninama
    };
  },
  mounted() {
    this.fetchNekretnine();
  },
  methods: {
    async fetchNekretnine() {
      try {
        const response = await axios.get("http://192.168.1.37:3000/api/nekretnine");
        this.nekretnine = response.data;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja podataka:", error);
      }
    },
    handleImageError(event) {
      event.target.src = "https://via.placeholder.com/350x200?text=No+Image";
    }
  },
  computed: {
    // Filtriranje nekretnina prema adresi
    filtriraneNekretnine() {
      return this.nekretnine.filter((nekretnina) =>
        nekretnina.Adresa_nekretnine.toLowerCase().includes(this.text.toLowerCase())
      );
    }
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px

.search-bar
  width: 100%

.h1
  font-family: "Roboto", serif
  font-weight: 500
  font-size: 1.5rem
  color: rgb(45, 144, 226)

.buttons
  margin-left: 13rem
</style>
