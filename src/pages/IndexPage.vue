<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <header class="h2">Istaknuto</header>

    <!-- Prikaz nekretnina -->
    <q-card
      v-for="(nekretnina, index) in filtriraneNekretnine"
      :key="nekretnina.Sifra_nekretnine"
      class="my-card"
      flat
      bordered
    >
      <q-carousel
        v-model="currentSlide[index]"
        animated
        arrows
        navigation
        infinite
        style="height: 300px; width: 100%;"
      >
        <q-carousel-slide :name="1" :img-src="nekretnina.Slika_nekretnine" />
        <q-carousel-slide :name="2" :img-src="nekretnina.Slika_nekretnine_2" />
        <q-carousel-slide :name="3" :img-src="nekretnina.Slika_nekretnine_3" />
      </q-carousel>

      <q-card-section>
        <div class="text-overline text-blue-8">
          {{ nekretnina.Tip_nekretnine }}
        </div>
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{ nekretnina.Adresa_nekretnine }}
        </div>
        <div class="text-caption text-grey">{{ nekretnina.Opis_nekretnine }}</div>
        <div class="info-row">
          <div class="info-item">
            <q-icon name="hotel" size="sm" />
            <span>{{ nekretnina.Broj_soba }} sobe</span>
          </div>
          <div class="info-item">
            <q-icon name="bathtub" size="sm" />
            <span>{{ nekretnina.Broj_kupaonica }} kupaonice</span>
          </div>
          <div class="info-item">
            <q-icon name="square_foot" size="sm" />
            <span>{{ nekretnina.Kvadratura_nekretnine }}m²</span>
          </div>
        </div>
      </q-card-section>

      <!-- Updated Actions -->
      <q-card-actions class="q-card-actions">
        <span class="price">€{{ nekretnina.Cijena_nekretnine }}</span>
        <div class="button-group">
          <q-btn
            flat
            label="Kupi"
            style="
              background-color: #007bff;
              color: white;
              border-radius: 30px;
              padding: 0.5rem 1.5rem;
              font-weight: bold;
              margin-right: 0.5rem;
            "
          />
          <q-btn
            flat
            label="Podijeli"
            style="
              background-color: white;
              color: black;
              border-radius: 30px;
              border: 1px solid #e0e0e0;
              padding: 0.5rem 1.5rem;
              font-weight: 400;
            "
          />
        </div>
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
      nekretnine: [], // Spremanje podataka o nekretninama
      currentSlide: [], // Trenutno prikazani slajd za svaku nekretninu
    };
  },
  mounted() {
    this.fetchNekretnine();
  },
  methods: {
    async fetchNekretnine() {
      try {
        const response = await axios.get(
          "http://192.168.1.37:3000/api/nekretnine"
        );
        this.nekretnine = response.data;
        this.currentSlide = this.nekretnine.map(() => 1); // Inicijaliziraj svaki slajd na 1
      } catch (error) {
        console.error("Greška prilikom dohvaćanja podataka:", error);
      }
    },
    handleImageError(event) {
      event.target.src = "https://via.placeholder.com/350x200?text=No+Image";
    },
  },
  computed: {
    // Filtriranje nekretnina prema adresi
    filtriraneNekretnine() {
      return this.nekretnine.filter((nekretnina) =>
        nekretnina.Adresa_nekretnine.toLowerCase().includes(this.text.toLowerCase())
      );
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px

.search-bar
  width: 100%

.h2
  font-family: "Roboto", serif
  font-weight: 500
  font-size: 1.5rem
  color: rgb(45, 144, 226)

.info-row
  display: flex
  justify-content: space-between
  margin-top: 0.5rem

.info-item
  display: flex
  align-items: center
  font-size: 0.9rem
  color: #666

.info-item q-icon
  margin-right: 0.5rem

.q-card-actions
  display: flex
  justify-content: space-between
  align-items: center
  padding-left: 1rem
  padding-top: 3rem

.price
  font-family: "Roboto", serif
  font-weight: 700
  font-size: 1.2rem
  color: #007bff
  white-space: nowrap
  margin-right: 1rem
</style>
