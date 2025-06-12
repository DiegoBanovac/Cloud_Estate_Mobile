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
        style="height: 300px; width: 100%"
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
                @click="triggerAlert"
                style="background-color: white; color: black; border-radius: 30px; border: 1px solid #e0e0e0; padding: 0.5rem 1.5rem; font-weight: 400; margin-right: 0.5rem;"
                >
                <q-icon name="favorite_border" size="sm" style="color: lightgrey;" />
          </q-btn>
          <q-btn
            flat
            label="Kontaktiraj"
            @click="openDialog(nekretnina)"
            style="
              background-color: #007bff;
              color: white;
              border-radius: 30px;
              padding: 0.5rem 1.5rem;
              font-weight: bold;
              margin-right: 0.5rem;
            "
          />

        </div>
      </q-card-actions>
    </q-card>

    <!-- Dijalog za prikaz kontaktiranja -->
    <q-dialog v-model="dialogOpen">
    <q-card>
      <q-card-section>
        <header class="h2">Kontaktiraj agenta</header>
        <div style="display: flex; justify-content: flex-end;">
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="dialogOpen = false"
            style="color: #e0e0e0; font-size: 1.2rem; margin-top: 3px;"
          />
        </div>
      </q-card-section>

      <q-form>
        <div class="q-gutter-md">
          <q-input
            filled
            v-model="ime"
            label="Ime"
            style="margin-left: 2rem; margin-right: 1rem;"
            />
          <q-input
            filled
            v-model="email"
            label="E-mail"
            style="margin-left: 2rem; margin-right: 1rem;"
            />
          <q-input
            filled
            v-model="telefon"
            label="Telefon"
            style="margin-left: 2rem; margin-right: 1rem;"
            />
          <q-input
            v-model="poruka"
            filled
            type="textarea"
            label="Poruka"
            style="margin-left: 2rem; margin-right: 1rem;"
            />
        <div>
          <!-- Gumb za slanje -->
          <q-btn
            flat
            label="Pošalji"
            @click="insertKontakt()"
            style="
              margin-top: 25rem;
              background-color: #007bff;
              color: white;
              border-radius: 30px;
              padding: 0.5rem 1.5rem;
              font-weight: bold;"
          />
          </div>
        </div>
      </q-form>
  </q-card>
</q-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  data() {
    const ime = ref(null)
    const email = ref(null)
    const telefon = ref(null)
    const poruka = ref(null)
    return {
      text: '', // Za pretragu
      nekretnine: [], // Spremanje podataka o nekretninama
      currentSlide: [], // Trenutno prikazani slajd za svaku nekretninu
      currentDialogSlide: 1, // Trenutni slajd za dijalog
      selectedTypes: [], // Tipovi nekretnina za filtriranje
      minPrice: null, // Minimalna cijena
      maxPrice: null, // Maksimalna cijena
      dialogOpen: false, // Da li je dijalog otvoren
      selectedNekretnina: null, // Odabrana nekretnina za prikaz u dijalogu
      message: '', // Unesena poruka
      messageSent: false, // Status da li je poruka poslana
      ime,
      email,
      telefon,
      poruka
    };
  },
  mounted() {
    this.fetchNekretnine()
  },
  methods: {
    async fetchNekretnine() {
      try {
        const response = await axios.get('https://cloud-estate-api.onrender.com/api/nekretnine')
        this.nekretnine = response.data
        this.currentSlide = this.nekretnine.map(() => 1) // Inicijaliziraj svaki slajd na 1
      } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka:', error)
      }
    },
    toggleType(type) {
      const index = this.selectedTypes.indexOf(type)
      if (index === -1) {
        this.selectedTypes.push(type)
      } else {
        this.selectedTypes.splice(index, 1)
      }
    },
    openDialog(nekretnina) {
      this.selectedNekretnina = nekretnina
      this.dialogOpen = true
    },
    async insertKontakt() {
      const formData = {
        "ime": this.ime,
        "email": this.email,
        "telefon": this.telefon,
        "poruka": this.poruka,
        "agencija": this.selectedNekretnina.Email_agencije
      }
      await axios.post('http:/localhost:3000/api/kontaktiraj', formData)
        .then(result => {
          console.log(result.data)
        })
        .catch(error => {
          console.error(error)
        })
    },
    triggerAlert() {
    alert('Molimo prijavite se kako bi dodali nekretninu u favorite!');
  }
  },
  computed: {
    filtriraneNekretnine() {
      return this.nekretnine.filter((nekretnina) => {
        const matchesText = nekretnina.Adresa_nekretnine.toLowerCase().includes(
          this.text.toLowerCase(),
        )
        const matchesType =
          this.selectedTypes.length === 0 || this.selectedTypes.includes(nekretnina.Tip_nekretnine)
        const matchesPrice =
          (!this.minPrice || nekretnina.Cijena_nekretnine >= this.minPrice) &&
          (!this.maxPrice || nekretnina.Cijena_nekretnine <= this.maxPrice)

        return matchesText && matchesType && matchesPrice
      })
    },

  },
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px

.search-bar
  width: 100%

.filter-button
  background-color: white
  color: black
  border-radius: 30px
  border: 1px solid #e0e0e0
  padding: 0.5rem 1.5rem
  font-weight: 400
.h2
  font-family: "Roboto", serif
  font-weight: 500
  font-size: 1.5rem
  color: black

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
  margin-right: 0.7rem

q-item[active]
  background-color: rgba(0, 123, 255, 0.1)
  color: #007bff

.active-filter
  background-color: rgba(0, 123, 255, 0.1)
  color: #007bff
  border-radius: 4px

/* Stil za gumb za zatvaranje */
.q-dialog .q-btn
  position: absolute
  top: 0.5rem
  right: 0.5rem
  z-index: 10


/* Stil za plavi okvir pop-up prozora */
.q-dialog .q-card
  width: 20rem
  height: 33rem


.q-form
  width:20rem
</style>
