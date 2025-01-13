<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <header class="h2">Nekretnine za najam</header>

    <!-- Pretraga -->
    <q-input class="search-bar" rounded outlined v-model="text">
      <template v-slot:append>
        <q-avatar icon="search"></q-avatar>
      </template>
    </q-input>

    <!-- Filtriranje -->
    <div class="q-pa-md">
      <q-btn-dropdown class="filter-button" label="Vrsta">
        <q-list>
          <q-item
            clickable
            v-close-popup
            @click="toggleType('Stan')"
            :active="selectedTypes.includes('Stan')"
          >
            <q-item-section>
              <q-item-label>Stan</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            @click="toggleType('Kuća')"
            :active="selectedTypes.includes('Kuća')"
          >
            <q-item-section>
              <q-item-label>Kuća</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn-dropdown class="filter-button" label="Cijena">
        <q-card style="min-width: 300px">
          <q-card-section>
            <div class="text-subtitle1">Raspon cijene</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row items-center">
              <q-input
                outlined
                v-model.number="minPrice"
                type="number"
                label="Minimalna"
                style="width: 100px; margin-right: 10px"
              />
              <span>-</span>
              <q-input
                outlined
                v-model.number="maxPrice"
                type="number"
                label="Maksimalna"
                style="width: 100px; margin-left: 10px"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-btn-dropdown>
    </div>

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

      <!-- Actions -->
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

    <!-- Dijalog za prikaz podataka o nekretnini -->
    <q-dialog v-model="dialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h5">{{ selectedNekretnina.Adresa_nekretnine }}</div>
          <div class="text-subtitle2">{{ selectedNekretnina.Tip_nekretnine }}</div>
          <div class="text-caption">{{ selectedNekretnina.Opis_nekretnine }}</div>
          <div class="q-mt-md">
            Agencija:
            <a :href="'mailto:' + selectedNekretnina.Email_agencije">
              {{ selectedNekretnina.Email_agencije }}
            </a>
          </div>
        </q-card-section>

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

        <!-- QCarousel sada koristi v-model za dijalog -->
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

    <!-- Popup poruka -->
    <q-dialog v-model="messageSent">
      <q-card>
        <q-card-section>
          <div class="text-h6">Poruka je uspješno poslana!</div>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Zatvori" @click="messageSent = false" />
        </q-card-actions>
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
        const response = await axios.get('http://localhost:3000/api/nekretnine/najam')
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
.search-bar {
  margin: 1rem 0;
  width: 100%;
}
.filter-button {
  margin: 0.5rem;
}
.my-card {
  width: 300px;
  margin: 1rem;
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
}
.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
}
/* Stil za gumb za zatvaranje */
.q-dialog .q-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
}

/* Stil za plavi okvir pop-up prozora */
.q-dialog .q-card {
  border: 3px solid #007bff; /* Povećana debljina plavog okvira */
  border-radius: 10px; /* Zaokruženi rubovi */
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
