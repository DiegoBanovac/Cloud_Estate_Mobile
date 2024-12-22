<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <header class="h1">Featured</header>
    <q-input class="search-bar" rounded outlined v-model="text">
      <template v-slot:append>
        <q-avatar icon="search"></q-avatar>
      </template>
    </q-input>

    <q-card
      v-for="nekretnina in nekretnine"
      :key="nekretnina.Sifra_nekretnine"
      class="my-card"
      flat
      bordered>
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
      />

      <q-card-section>
        <div class="text-overline text-orange-9">{{ nekretnina.Tip_nekretnine }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ nekretnina.Adresa_nekretnine }}</div>
        <div class="text-caption text-grey">
          {{ nekretnina.Opis_nekretnine }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="Share" />
        <q-btn flat color="secondary" label="Book" />
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
</style>
