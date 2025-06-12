<template>
  <div class="q-pa-md">
    <!-- Naslov -->
    <header class="div-naslov h2 q-mb-md">Nekretnine za najam</header>

    <!-- Filteri i Search Bar u istom retku -->
<!-- Filteri i Search Bar: responzivan layout -->
<div class="div-pocetak row q-col-gutter-md q-mb-lg items-start items-md-center">
  <!-- Filteri: zauzimaju cijelu širinu na malim ekranima, auto širinu na većim -->
  <div class="col-12 col-md-auto row q-gutter-sm items-center">
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

    <q-btn-dropdown class="filter-button" label="Više">
      <q-list style="min-width: 200px;">
        <!-- Sobe -->
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

        <!-- Kupaonice -->
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

        <!-- Kvadratura -->
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

        <!-- Cijena -->
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

  <!-- Search bar: dolje na mobitelima, desno na većim ekranima -->
  <div class="col-12 col-md-auto self-start self-md-end">
    <q-input
      class="search-bar"
      rounded
      outlined
      v-model="text"
      style="max-width: 300px; width: 100%;"
      dense
    >
      <template v-slot:append>
        <q-avatar icon="search"></q-avatar>
      </template>
    </q-input>
  </div>
</div>

    <!-- Prikaz nekretnina u gridu -->
    <div class="row q-col-gutter-lg justify-center">
      <q-col
        v-for="(nekretnina, index) in filtriraneNekretnine"
        :key="nekretnina.Sifra_nekretnine"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <q-card class="my-card full-height column justify-between" flat bordered>
          <!-- Carousel -->
          <q-carousel
            v-model="currentSlide[index]"
            animated
            arrows
            navigation
            infinite
            style="height: 200px;"
          >
            <q-carousel-slide :name="1" :img-src="getImagePath(nekretnina.Slika_nekretnine, 'najam')" />
            <q-carousel-slide :name="2" :img-src="getImagePath(nekretnina.Slika_nekretnine_2, 'najam')" />
            <q-carousel-slide :name="3" :img-src="getImagePath(nekretnina.Slika_nekretnine_3, 'najam')" />
          </q-carousel>

          <!-- Info -->
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

          <!-- Cijena + gumbi -->
          <q-card-actions class="q-card-actions">
            <span class="price">€{{ nekretnina.Cijena_nekretnine }}</span>
            <div class="button-group">
              <q-btn
                flat
                @click="addFavorite(nekretnina)"
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
                "
              />
            </div>
          </q-card-actions>
        </q-card>
      </q-col>
    </div>

    <!-- Dijalog -->
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
import { ref } from 'vue'

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
    this.fetchNekretnine();
  },
  methods: {
    async fetchNekretnine() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/nekretnine/najam"
        );
        this.nekretnine = response.data;
        this.currentSlide = this.nekretnine.map(() => 1);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja podataka:", error);
      }
    },
    getImagePath(filename, type, nekretnina) { // Added nekretnina parameter
      if (!filename) {
        console.warn('getImagePath: Filename is missing. Cannot construct path.');
        return '../../assets/placeholder.jpg'; // Ensure you have a placeholder image
      }

      let folderName = 'default'; // Default folder if no type is matched

      // The 'type' parameter comes from Tip_nekretnine_2 alias in backend query
      // which is 'kupnja' or 'najam'
      if (type === 'kupnja' || type === 'najam') {
        folderName = type;
      } else if (nekretnina && nekretnina.Tip_nekretnine) {
        // Fallback: If 'type' is not 'kupnja' or 'najam', try to infer from nekretnina.Tip_nekretnine
        const propType = nekretnina.Tip_nekretnine;
        if (propType === "Stan" || propType === "Kuća") {
          folderName = "kupnja";
        } else if (propType === "Najam stana" || propType === "Najam kuće") {
          folderName = "najam";
        }
      }

      const imageUrl = `http://localhost:3000/uploads/${folderName}/${filename}`;
      console.log(`Attempting to load image from: ${imageUrl}`);
      return imageUrl;
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
    async addFavorite(nekretnina) {
  try {
    const Sifra_korisnika = localStorage.getItem('Sifra_korisnika');
    // DOHVAĆANJE TOKENA
    const token = localStorage.getItem('jwt_token'); // Dohvatite JWT token iz localStorage-a

    if (!Sifra_korisnika || !token) { // Dodana provjera tokena
      alert("Niste prijavljeni. Molimo prijavite se.");
      // Očistite localStorage i preusmjerite na stranicu za prijavu ako nema tokena
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('Ime_korisnika');
      localStorage.removeItem('Sifra_korisnika');
      // Ovdje biste trebali dodati preusmjeravanje, npr. router.push('/login');
      return;
    }

    const payload = {
      Sifra_korisnika, // Ovu vrijednost backend sada zanemaruje i koristi Sifra_korisnika iz tokena
      Adresa_nekretnine: nekretnina.Adresa_nekretnine,
      Kvadratura_nekretnine: nekretnina.Kvadratura_nekretnine,
      Broj_soba: nekretnina.Broj_soba,
      Broj_kupaonica: nekretnina.Broj_kupaonica,
      Cijena_nekretnine: nekretnina.Cijena_nekretnine,
      Opis_nekretnine: nekretnina.Opis_nekretnine,
      Tip_nekretnine: nekretnina.Tip_nekretnine,
      Slika_nekretnine: nekretnina.Slika_nekretnine,
      Slika_nekretnine_2: nekretnina.Slika_nekretnine_2,
      Slika_nekretnine_3: nekretnina.Slika_nekretnine_3,
      Email_agencije: nekretnina.Email_agencije,
      Tip_nekretnine_2: 'Najam', // Pretpostavka, prilagodite ako je dinamicki
    };

    // Konfiguracija zaglavlja s tokenom
    const config = {
      headers: {
        'x-auth-token': token // Dodajte token u 'x-auth-token' zaglavlje
      }
    };

    // Provjera je li nekretnina već dodana
    const checkResponse = await axios.post("http://localhost:3000/api/provjeri_favorit", {
      Sifra_korisnika, // Ovu vrijednost backend sada zanemaruje i koristi Sifra_korisnika iz tokena
      Adresa_nekretnine: nekretnina.Adresa_nekretnine,
    }, config); // Dodajte config za slanje tokena i kod provjere favorita

    if (checkResponse.data.exists) {
      alert("Nekretnina se već nalazi u favoritima.");
      return;
    }

    // Dodavanje u favorite
    await axios.post("http://localhost:3000/api/dodaj_favorit", payload, config); // Dodajte config za slanje tokena
    alert("Nekretnina je uspješno dodana u favorite!");
  } catch (error) {
    console.error("Greška prilikom dodavanja u favorite:", error);
    // Unaprijeđeno rukovanje greškama, posebno za 401 Unauthorized
    if (error.response && error.response.status === 401) {
      alert("Sesija je istekla ili niste autorizirani. Molimo prijavite se ponovno.");
      localStorage.removeItem('jwt_token'); // Obrišite nevažeći token
      localStorage.removeItem('Ime_korisnika');
      localStorage.removeItem('Sifra_korisnika');
      // Ovdje dodajte preusmjeravanje na login stranicu, npr. this.router.push('/login');
    } else {
      alert("Došlo je do greške. Molimo pokušajte ponovo.");
    }
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

.div-naslov
  margin-left: 15px

  @media (max-width: 599px)
    margin-left: 53px

.div-pocetak
  margin-left: 0px

  @media (max-width: 599px)
    margin-left: 35px

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
