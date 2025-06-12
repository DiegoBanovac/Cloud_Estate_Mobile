<template>
  <div class="q-pa-md">
    <header class="div-naslov h2 q-mb-md">Favoriti</header>

    <div class="div-pocetak row q-col-gutter-md q-mb-lg items-start items-md-center">
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
          <q-carousel
            v-model="currentSlide[index]"
            animated
            arrows
            navigation
            infinite
            style="height: 200px;"
          >
            <q-carousel-slide
              :name="1"
              :img-src="getImagePath(nekretnina.Slika_nekretnine, nekretnina.Tip_nekretnine_2)"
            />
            <q-carousel-slide
              :name="2"
              :img-src="getImagePath(nekretnina.Slika_nekretnine_2, nekretnina.Tip_nekretnine_2)"
            />
            <q-carousel-slide
              :name="3"
              :img-src="getImagePath(nekretnina.Slika_nekretnine_3, nekretnina.Tip_nekretnine_2)"
            />
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
      </q-col>
    </div>

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
import { ref, onMounted } from 'vue'

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
    // const sifraKorisnika = localStorage.getItem("Sifra_korisnika"); // Ova linija više nije potrebna za API poziv
    const token = localStorage.getItem('jwt_token'); // Dohvatite JWT token iz localStorage-a

    if (!token) { // Provjera da li token postoji
      alert("Niste prijavljeni. Molimo prijavite se.");
      // Očistite localStorage i preusmjerite na stranicu za prijavu ako nema tokena
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('Ime_korisnika');
      localStorage.removeItem('Sifra_korisnika');
      // Ovdje biste trebali dodati preusmjeravanje, npr. this.router.push('/login');
      return;
    }

    // Konfiguracija zaglavlja s tokenom
    const config = {
      headers: {
        'x-auth-token': token // Dodajte token u 'x-auth-token' zaglavlje
      }
    };

    // GET zahtjev, sada bez sifraKorisnika u URL-u jer se ID dohvaća iz tokena na backendu
    const response = await axios.get(
      "https://cloud-estate-api.onrender.com/api/favoriti", // URL bez query parametra sifraKorisnika
      config // Prosljeđivanje config objekta sa zaglavljem autorizacije
    );

    // Directly use the Tip_nekretnine_2 from the database response
    this.nekretnine = response.data;
    this.currentSlide = this.nekretnine.map(() => 1);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja podataka:", error);
    // Unaprijeđeno rukovanje greškama, posebno za 401 Unauthorized
    if (error.response && error.response.status === 401) {
      alert("Sesija je istekla ili niste autorizirani. Molimo prijavite se ponovno.");
      localStorage.removeItem('jwt_token'); // Obrišite nevažeći token
      localStorage.removeItem('Ime_korisnika');
      localStorage.removeItem('Sifra_korisnika');
      // Ovdje dodajte preusmjeravanje na login stranicu, npr. this.router.push('/login');
    } else {
      alert("Došlo je do greške prilikom dohvaćanja favorita.");
    }
  }
},

    getImagePath(filename, type) {
  if (!filename) {
    console.warn('getImagePath: Filename is missing. Cannot construct path.');
    return '';
  }
  if (!type || type.trim() === '') {
    console.warn(`getImagePath: Type (nekretnina.Tip_nekretnine_2) is missing or empty for filename: ${filename}.`);
    return '';
  }

  const normalizedType = type.toLowerCase().trim();

  // Construct the relative path string based on your component's location:
  // If Favoriti.vue is in 'src/pages/korisnik/', you need to go up two levels (../../)
  // to reach 'src/' and then go down into 'assets/nekretnine/'.
  const relativePathToAsset = `../../assets/nekretnine/${normalizedType}/${filename}`;

  try {
    // IMPORTANT: The URL constructor resolves the first argument relative to the second.
    // import.meta.url points to the current module (e.g., Favoriti.vue).
    const path = new URL(relativePathToAsset, import.meta.url).href;

    console.log(`getImagePath: Generated path for ${filename} (original type: ${type}, normalized: ${normalizedType}, relative path used: ${relativePathToAsset}): ${path}`);
    return path;
  } catch (e) {
    console.error(`getImagePath: Error generating path for ${filename} (original type: ${type}, normalized: ${normalizedType}, relative path used: ${relativePathToAsset}):`, e);
    return '';
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
      await axios.post('https://cloud-estate-api.onrender.com/api/kontaktiraj', formData)
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
    const Sifra_korisnika = localStorage.getItem('Sifra_korisnika'); // Iako će backend koristiti iz tokena, ostavljamo za lokalnu provjeru
    const token = localStorage.getItem('jwt_token'); // Dohvatite JWT token

    if (!Sifra_korisnika || !token) { // Provjerite i sifraKorisnika i token
      alert("Niste prijavljeni. Molimo prijavite se.");
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('Ime_korisnika');
      localStorage.removeItem('Sifra_korisnika');
      // Ovdje dodajte preusmjeravanje na login stranicu, npr. this.router.push('/login');
      return;
    }

    const payload = {
      Sifra_korisnika, // Ovu vrijednost backend sada zanemaruje i koristi Sifra_korisnika iz tokena
      Adresa_nekretnine: nekretnina.Adresa_nekretnine,
    };

    // Konfiguracija zaglavlja s tokenom
    const config = {
      headers: {
        'x-auth-token': token // Dodajte token u 'x-auth-token' zaglavlje
      }
    };

    // Provjera je li nekretnina uopće u favoritima
    // Pobrinite se da i provjeri_favorit ruta na backendu ima 'auth' middleware
    const checkResponse = await axios.post("https://cloud-estate-api.onrender.com/api/provjeri_favorit", {
      Sifra_korisnika, // I ovdje se šalje, ali backend koristi iz tokena
      Adresa_nekretnine: nekretnina.Adresa_nekretnine,
    }, config); // DODANO: config za autorizaciju

    if (!checkResponse.data.exists) {
      alert("Nekretnina nije u favoritima.");
      return;
    }

    // Uklanjanje iz favorita
    // Pobrinite se da i izbrisi_favorit ruta na backendu ima 'auth' middleware
    await axios.post("http://localhost:3000/api/izbrisi_favorit", payload, config); // DODANO: config za autorizaciju
    alert("Nekretnina je uspješno uklonjena iz favorita!");

    // Ponovno učitaj favorite kako bi se lista ažurirala
    // Ova funkcija (fetchFavoriti) također mora slati token! (što smo već riješili)
    this.fetchFavoriti();
  } catch (error) {
    console.error("Greška prilikom uklanjanja iz favorita:", error);
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
