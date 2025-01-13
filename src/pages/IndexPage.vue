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
            label="Kupi"
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

    <q-dialog v-model="dialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h5 font-weight-bold">{{ selectedNekretnina.Adresa_nekretnine }}</div>
          <div class="text-subtitle2 text-blue-8">{{ selectedNekretnina.Tip_nekretnine }}</div>
          <div class="text-caption text-grey-8 q-mt-sm">
            {{ selectedNekretnina.Opis_nekretnine }}
          </div>
          <div class="q-mt-md">
            <div class="text-body1 text-dark">Agencija:</div>
            <a :href="'mailto:' + selectedNekretnina.Email_agencije" class="text-primary">
              {{ selectedNekretnina.Email_agencije }}
            </a>
          </div>
        </q-card-section>

        <!-- Dodani podaci s ikonicama -->
        <q-card-section class="q-mt-md">
          <div class="info-row">
            <div class="info-item">
              <q-icon name="hotel" size="sm" />
              <span>{{ selectedNekretnina.Broj_soba }} sobe</span>
            </div>
            <div class="info-item">
              <q-icon name="bathtub" size="sm" />
              <span>{{ selectedNekretnina.Broj_kupaonica }} kupaonice</span>
            </div>
            <div class="info-item">
              <q-icon name="square_foot" size="sm" />
              <span>{{ selectedNekretnina.Kvadratura_nekretnine }}m²</span>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <q-carousel
            v-model="currentDialogSlide"
            animated
            arrows
            navigation
            infinite
            style="height: 200px; width: 100%"
          >
            <q-carousel-slide :name="1" :img-src="selectedNekretnina.Slika_nekretnine" />
            <q-carousel-slide :name="2" :img-src="selectedNekretnina.Slika_nekretnine_2" />
            <q-carousel-slide :name="3" :img-src="selectedNekretnina.Slika_nekretnine_3" />
          </q-carousel>
        </q-card-section>

        <div style="display: flex; justify-content: flex-end; padding: 0.5rem">
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="dialogOpen = false"
            style="color: #007bff; font-size: 1.2rem"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
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
    }
  },
  mounted() {
    this.fetchNekretnine()
  },
  methods: {
    async fetchNekretnine() {
      try {
        const response = await axios.get('http://localhost:3000/api/nekretnine')
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
      this.currentDialogSlide = 1 // Postavite početni slajd na 1
      this.dialogOpen = true
    },
    sendMessage() {
      if (this.message.trim()) {
        // Logika za slanje poruke (možete dodati funkcionalnost prema backendu)
        this.messageSent = true
        this.message = '' // Očisti polje za unos
      }
    },
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

<style scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}

.search-bar {
  width: 100%;
}

.h2 {
  font-family: 'Roboto', serif;
  font-weight: 500;
  font-size: 1.5rem;
  color: rgb(45, 144, 226);
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
}

.info-item q-icon {
  margin-right: 0.5rem;
}

.q-card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-top: 3rem;
}

.price {
  font-family: 'Roboto', serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #007bff;
  white-space: nowrap;
  margin-right: 1rem;
}

/* Stil za plavi okvir pop-up prozora */
.q-dialog .q-card {
  border: 3px solid #007bff; /* Povećana debljina plavog okvira */
  border-radius: 10px; /* Zaokruženi rubovi */
}

/* Stil za gumb za zatvaranje */
.q-dialog .q-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
}

/* Dodatni stilovi za bolji izgled */
.text-h5 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.text-subtitle2 {
  font-size: 1rem;
  color: #007bff; /* Plava boja za tip nekretnine */
  margin-bottom: 5px;
}

.text-caption {
  color: #555;
  font-size: 0.875rem;
  margin-bottom: 15px;
}

.q-mt-md {
  margin-top: 16px;
}

.text-body1 {
  font-size: 1rem;
  color: #333;
}

.text-primary {
  color: #007bff; /* Plava boja za e-mail */
  font-weight: bold;
}
</style>
