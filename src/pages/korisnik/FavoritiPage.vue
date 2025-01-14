<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <header class="h2">Favoriti</header>

    <!-- Pretraga -->
    <q-input class="search-bar" rounded outlined v-model="text">
      <template v-slot:append>
        <q-avatar icon="search"></q-avatar>
      </template>
    </q-input>

    <div class="q-pa-md">
      <!-- Filter za vrstu nekretnine -->
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

      <!-- Gumb za više filtera -->
      <q-btn-dropdown class="filter-button" label="Više">
        <q-list style="min-width: 200px;">
          <q-item>
            <q-item-section>
              <div class="text-subtitle1">Broj soba</div>
              <q-btn-group spread>
                <q-btn
                  v-for="sobe in [1, 2, 3, 4, 5]"
                  :key="sobe"
                  :label="sobe"
                  flat
                  toggle
                  @click="toggleRooms(sobe)"
                  :class="{ 'active-filter': selectedRooms.includes(sobe) }"
                />
              </q-btn-group>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <div class="text-subtitle1">Broj kupaonica</div>
              <q-btn-group spread>
                <q-btn
                  v-for="kupaone in [1, 2, 3, 4, 5]"
                  :key="kupaone"
                  :label="kupaone"
                  flat
                  toggle
                  @click="toggleBathrooms(kupaone)"
                  :class="{ 'active-filter': selectedBathrooms.includes(kupaone) }"
                />
              </q-btn-group>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <div class="text-subtitle1">Kvadratura</div>
              <div class="row items-center">
                <q-input
                  outlined
                  v-model.number="minArea"
                  type="number"
                  label="Minimalna"
                  style="width: 100px; margin-right: 10px;"
                />
                <span>-</span>
                <q-input
                  outlined
                  v-model.number="maxArea"
                  type="number"
                  label="Maksimalna"
                  style="width: 100px; margin-left: 10px;"
                />
              </div>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <div class="text-subtitle1">Cijena</div>
              <div class="row items-center">
                <q-input
                  outlined
                  v-model.number="minPrice"
                  type="number"
                  label="Minimalna"
                  style="width: 100px; margin-right: 10px;"
                />
                <span>-</span>
                <q-input
                  outlined
                  v-model.number="maxPrice"
                  type="number"
                  label="Maksimalna"
                  style="width: 100px; margin-left: 10px;"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
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
        style="height: 300px; width: 100%;"
      >
        <q-carousel-slide :name="1" :img-src="nekretnina.Slika_nekretnine" />
        <q-carousel-slide :name="2" :img-src="nekretnina.Slika_nekretnine_2" />
        <q-carousel-slide :name="3" :img-src="nekretnina.Slika_nekretnine_3" />
      </q-carousel>

      <q-card-section>
        <div class="text-overline text-primary">
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

      <q-card-actions class="q-card-actions">
        <span class="price">€{{ nekretnina.Cijena_nekretnine }}</span>
        <div class="button-group">
          <q-btn
                flat
                style="background-color: white; color: black; border-radius: 30px; border: 1px solid #e0e0e0; padding: 0.5rem 1.5rem; font-weight: 400; margin-right: 0.5rem;"
                @click="removeFavorite(nekretnina)"
                >
                <q-icon name="remove" size="sm" style="color: lightgrey;" />
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
import axios from "axios";
import { ref, onMounted } from 'vue';

const sifraKorisnika = ref("");
onMounted(() => {
  sifraKorisnika.value = localStorage.getItem("Sifra_korisnika");
  console.log("Sifra korisnika:", sifraKorisnika.value);
});

export default {
  data() {
    const ime = ref(null)
    const email = ref(null)
    const telefon = ref(null)
    const poruka = ref(null)
    return {
      text: "",
      nekretnine: [],
      currentSlide: [],
      currentDialogSlide: 1, // Trenutni slajd za dijalog
      selectedTypes: [],
      selectedRooms: [],
      selectedBathrooms: [],
      minArea: null,
      maxArea: null,
      minPrice: null,
      maxPrice: null,
      dialogOpen: false, // Da li je dijalog otvoren
      selectedNekretnina: null, // Odabrana nekretnina za prikaz u dijalogu
      messageSent: false, // Status da li je poruka poslana
      ime,
      email,
      telefon,
      poruka
    };
  },
  mounted() {
    this.fetchFavoriti();
  },
  methods: {
    async fetchFavoriti() {
      try {
        const sifraKorisnika = localStorage.getItem("Sifra_korisnika");
        if (!sifraKorisnika) {
          alert("Niste prijavljeni. Molimo prijavite se.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/favoriti?sifraKorisnika=${sifraKorisnika}`
        );
        this.nekretnine = response.data;
        this.currentSlide = this.nekretnine.map(() => 1);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja podataka:", error);
      }
    },
    toggleType(type) {
      const index = this.selectedTypes.indexOf(type);
      if (index === -1) {
        this.selectedTypes.push(type);
      } else {
        this.selectedTypes.splice(index, 1);
      }
    },
    toggleRooms(roomCount) {
      const index = this.selectedRooms.indexOf(roomCount);
      if (index === -1) {
        this.selectedRooms.push(roomCount);
      } else {
        this.selectedRooms.splice(index, 1);
      }
    },
    toggleBathrooms(bathroomCount) {
      const index = this.selectedBathrooms.indexOf(bathroomCount);
      if (index === -1) {
        this.selectedBathrooms.push(bathroomCount);
      } else {
        this.selectedBathrooms.splice(index, 1);
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
      await axios.post('http://localhost:3000/api/kontaktiraj', formData)
        .then(result => {
          console.log(result.data)
        })
        .catch(error => {
          console.error(error)
        })
    },

    // Metoda za uklanjanje iz favorita
    async removeFavorite(nekretnina) {
  try {
    const Sifra_korisnika = localStorage.getItem('Sifra_korisnika');
    if (!Sifra_korisnika) {
      alert("Niste prijavljeni. Molimo prijavite se.");
      return;
    }

    const payload = {
      Sifra_korisnika,
      Adresa_nekretnine: nekretnina.Adresa_nekretnine,
    };

    // Provjera je li nekretnina uopće u favoritima
    const checkResponse = await axios.post("http://localhost:3000/api/provjeri_favorit", {
      Sifra_korisnika,
      Adresa_nekretnine: nekretnina.Adresa_nekretnine,
    });

    if (!checkResponse.data.exists) {
      alert("Nekretnina nije u favoritima.");
      return;
    }

    // Uklanjanje iz favorita
    await axios.post("http://localhost:3000/api/izbrisi_favorit", payload);
    alert("Nekretnina je uspješno uklonjena iz favorita!");

    // Ponovno učitaj favorite kako bi se lista ažurirala
    this.fetchFavoriti();
  } catch (error) {
    console.error("Greška prilikom uklanjanja iz favorita:", error);
    alert("Došlo je do greške. Molimo pokušajte ponovo.");
  }
}
  },
  computed: {
    filtriraneNekretnine() {
      return this.nekretnine.filter((nekretnina) => {
        const matchesText = nekretnina.Adresa_nekretnine
          .toLowerCase()
          .includes(this.text.toLowerCase());
        const matchesType =
          this.selectedTypes.length === 0 ||
          this.selectedTypes.includes(nekretnina.Tip_nekretnine);
        const matchesRooms =
          this.selectedRooms.length === 0 ||
          this.selectedRooms.includes(nekretnina.Broj_soba);
        const matchesBathrooms =
          this.selectedBathrooms.length === 0 ||
          this.selectedBathrooms.includes(nekretnina.Broj_kupaonica);
        const matchesArea =
          (!this.minArea || nekretnina.Kvadratura_nekretnine >= this.minArea) &&
          (!this.maxArea || nekretnina.Kvadratura_nekretnine <= this.maxArea);
        const matchesPrice =
          (!this.minPrice || nekretnina.Cijena_nekretnine >= this.minPrice) &&
          (!this.maxPrice || nekretnina.Cijena_nekretnine <= this.maxPrice);

        return (
          matchesText &&
          matchesType &&
          matchesRooms &&
          matchesBathrooms &&
          matchesArea &&
          matchesPrice
        );
      });
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
  margin-right: 1rem

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
