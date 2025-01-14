<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <header class="h1">Agencije</header>

    <!-- Pretraga -->
    <q-input class="search-bar" rounded outlined v-model="searchText">
      <template v-slot:append>
        <q-avatar icon="search"></q-avatar>
      </template>
    </q-input>

    <!-- Prikaz agencija -->
    <q-card
      v-for="agencija in filtriraneAgencije"
      :key="agencija.Naziv_Agencije"
      class="my-card"
      flat
      bordered
    >
      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ agencija.Naziv_Agencije }}</div>

        <div class="text-caption text-grey">
          Telefon: {{ agencija.Telefon_Agencije }}<br />
          Email: {{ agencija.Email_Agencije }}<br />
          Adresa: {{ agencija.Adresa_Agencije }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="Kontaktiraj" :href="'tel:' + agencija.Telefon_Agencije" />
        <!-- Button koji vodi na vanjski web link -->
        <q-btn flat color="secondary" label="Posjetite web" :href="'https://www.svetiste-mbb.hr/'" target="_blank" />
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
      searchText: "", // Za pretragu
      agencije: [] // Spremanje podataka o agencijama
    };
  },
  mounted() {
this.fetchAgencije();
  },
  methods: {
    async fetchAgencije() {
      try {
        const response = await axios.get("http://localhost:3000/api/agencije");
        this.agencije = response.data;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja podataka:", error);
      }
    }
  },
  computed: {
    // Filtriranje agencija prema pretraživačkom tekstu
    filtriraneAgencije() {
      return this.agencije.filter((agencija) =>
        agencija.Naziv_Agencije.toLowerCase().includes(this.searchText.toLowerCase()));
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
  color: black
  margin-top: 1rem

</style>
