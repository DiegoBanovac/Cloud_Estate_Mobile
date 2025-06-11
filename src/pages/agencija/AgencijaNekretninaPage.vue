<template>
  <div class="q-pa-md">
    <!-- Naslov -->
    <header class="div-naslov h2 q-mb-md">Vaše nekretnine</header>

    <!-- Filteri i Search Bar u istom retku -->
    <div class="div-pocetak row q-col-gutter-md q-mb-lg items-start items-md-center">
      <!-- Filteri -->
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
            <!-- Dodajte opcije za najam ako su primjenjive -->
            <q-item
              clickable
              v-close-popup
              @click="toggleType('Najam stana')"
              :active="selectedTypes.includes('Najam stana')"
            >
              <q-item-section>
                <q-item-label>Najam stana</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="toggleType('Najam kuće')"
              :active="selectedTypes.includes('Najam kuće')"
            >
              <q-item-section>
                <q-item-label>Najam kuće</q-item-label>
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

      <!-- Search bar and Add button -->
      <div class="col-12 col-md-auto self-start self-md-end row items-center q-gutter-md">
        <q-input
          class="search-bar col-grow"
          rounded
          outlined
          v-model="text"
          style="max-width: 300px;"
          dense
        >
          <template v-slot:append>
            <q-avatar icon="search"></q-avatar>
          </template>
        </q-input>

        <q-btn
          flat
          label="Dodaj nekretninu"
          @click="openAddDialog()"
          style="
            background-color: #007bff;
            color: white;
            border-radius: 30px;
            padding: 0.5rem 1.5rem;
            font-weight: bold;
          "
        />
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
            <q-carousel-slide
              :name="1"
              :img-src="getImagePath(nekretnina.Slika_nekretnine, nekretnina.Tip_nekretnine_2, nekretnina)"
            />
            <q-carousel-slide
              :name="2"
              :img-src="getImagePath(nekretnina.Slika_nekretnine_2, nekretnina.Tip_nekretnine_2, nekretnina)"
            />
            <q-carousel-slide
              :name="3"
              :img-src="getImagePath(nekretnina.Slika_nekretnine_3, nekretnina.Tip_nekretnine_2, nekretnina)"
            />
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
                style="background-color: white; color: black; border-radius: 30px; border: 1px solid #e0e0e0; padding: 0.5rem 1.5rem; font-weight: 400; margin-right: 0.5rem;"
                @click="removeNekretnina(nekretnina)"
              >
                <q-icon name="remove" size="sm" style="color: lightgrey;" />
              </q-btn>
              <q-btn
                flat
                label="Uredi"
                @click="openEditDialog(nekretnina)"
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

    <!-- Dijalog za uređivanje -->
    <q-dialog v-model="editDialogOpen">
      <q-card style="width: 500px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6">Uredi nekretninu</div>
          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
            style="position: absolute; right: 8px; top: 8px;"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="updateNekretnina">
            <q-input
              filled
              v-model="editForm.Tip_nekretnine"
              label="Tip nekretnine"
              class="q-mb-md"
            />

            <q-input
              filled
              v-model="editForm.Adresa_nekretnine"
              label="Adresa"
              class="q-mb-md"
            />

            <q-input
              filled
              v-model="editForm.Opis_nekretnine"
              label="Opis"
              type="textarea"
              class="q-mb-md"
            />

            <div class="row q-col-gutter-md q-mb-md">
              <div class="col">
                <q-input
                  filled
                  v-model.number="editForm.Broj_soba"
                  label="Broj soba"
                  type="number"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model.number="editForm.Broj_kupaonica"
                  label="Broj kupaonica"
                  type="number"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md q-mb-md">
              <div class="col">
                <q-input
                  filled
                  v-model.number="editForm.Kvadratura_nekretnine"
                  label="Kvadratura (m²)"
                  type="number"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model.number="editForm.Cijena_nekretnine"
                  label="Cijena (€)"
                  type="number"
                />
              </div>
            </div>

            <!-- Dodatna polja za slike ako je potrebno -->

            <div class="q-mt-lg">
              <q-btn
                label="Spremi promjene"
                type="submit"
                color="primary"
                class="full-width"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dijalog za dodavanje nove nekretnine (prvi dio) -->
    <q-dialog v-model="addDialogStep1Open">
      <q-card style="width: 500px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6">Dodaj novu nekretninu - Korak 1</div>
          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
            style="position: absolute; right: 8px; top: 8px;"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="nextStepAddDialog">
            <q-select
              filled
              v-model="addForm.Tip_nekretnine"
              :options="['Stan', 'Kuća', 'Najam stana', 'Najam kuće']"
              label="Tip nekretnine"
              class="q-mb-md"
              :rules="[val => !!val || 'Odaberite tip nekretnine']"
            />
            <q-input
              filled
              v-model="addForm.Adresa_nekretnine"
              label="Adresa"
              class="q-mb-md"
              :rules="[val => !!val || 'Unesite adresu']"
            />
            <q-input
              filled
              v-model="addForm.Opis_nekretnine"
              label="Opis"
              type="textarea"
              class="q-mb-md"
              :rules="[val => !!val || 'Unesite opis']"
            />

            <div class="row q-col-gutter-md q-mb-md">
              <div class="col">
                <q-input
                  filled
                  v-model.number="addForm.Broj_soba"
                  label="Broj soba"
                  type="number"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model.number="addForm.Broj_kupaonica"
                  label="Broj kupaonica"
                  type="number"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md q-mb-md">
              <div class="col">
                <q-input
                  filled
                  v-model.number="addForm.Kvadratura_nekretnine"
                  label="Kvadratura (m²)"
                  type="number"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model.number="addForm.Cijena_nekretnine"
                  label="Cijena (€)"
                  type="number"
                />
              </div>
            </div>
            <div class="q-mt-lg">
              <q-btn
                label="Dalje"
                type="submit"
                color="primary"
                class="full-width"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dijalog za dodavanje nove nekretnine (drugi dio: upload slika) -->
    <q-dialog v-model="addDialogStep2Open" persistent>
      <q-card style="width: 500px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6">Dodaj novu nekretninu - Korak 2 (Slike)</div>
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="cancelAddDialog"
            style="position: absolute; right: 8px; top: 8px;"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="addNewNekretnina">
            <q-file
              filled
              v-model="addForm.Slika_nekretnine"
              label="Slika 1"
              accept=".jpg, image/*"
              class="q-mb-md"
              @update:model-value="handleFileChange('Slika_nekretnine', $event)"
              :rules="[val => !!val || 'Slika 1 je obavezna']"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-file
              filled
              v-model="addForm.Slika_nekretnine_2"
              label="Slika 2 (nije obavezno)"
              accept=".jpg, image/*"
              class="q-mb-md"
              @update:model-value="handleFileChange('Slika_nekretnine_2', $event)"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-file
              filled
              v-model="addForm.Slika_nekretnine_3"
              label="Slika 3 (nije obavezno)"
              accept=".jpg, image/*"
              class="q-mb-md"
              @update:model-value="handleFileChange('Slika_nekretnine_3', $event)"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <div class="q-mt-lg row q-gutter-md justify-between">
              <q-btn
                label="Natrag"
                color="grey"
                @click="previousStepAddDialog"
                class="col-auto"
              />
              <q-btn
                label="Dodaj nekretninu"
                type="submit"
                color="primary"
                class="col-auto"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar' // Import useQuasar

const Email_agencije = ref("");
onMounted(() => {
  Email_agencije.value = localStorage.getItem("Email_agencije");
  console.log("Email_agencije:", Email_agencije.value);
});

export default {
  setup() {
    const $q = useQuasar(); // Initialize useQuasar
    return { $q }; // Make $q available in the component instance
  },
  data() {
    return {
      text: "",
      nekretnine: [],
      currentSlide: [],
      selectedTypes: [],
      selectedRooms: [],
      selectedBathrooms: [],
      minArea: null,
      maxArea: null,
      minPrice: null,
      maxPrice: null,
      editDialogOpen: false,
      editForm: {
        Sifra_nekretnine: null,
        Tip_nekretnine: '',
        Adresa_nekretnine: '',
        Opis_nekretnine: '',
        Broj_soba: null,
        Broj_kupaonica: null,
        Kvadratura_nekretnine: null,
        Cijena_nekretnine: null
      },
      addDialogStep1Open: false, // For the first step of adding
      addDialogStep2Open: false, // For the second step (image upload)
      addForm: {
        Sifra_nekretnine: null, // Will be generated on server or by logic
        Tip_nekretnine: '',
        Adresa_nekretnine: '',
        Opis_nekretnine: '',
        Broj_soba: null,
        Broj_kupaonica: null,
        Kvadratura_nekretnine: null,
        Cijena_nekretnine: null,
        Slika_nekretnine: null, // File object for image 1
        Slika_nekretnine_2: null, // File object for image 2
        Slika_nekretnine_3: null, // File object for image 3
        Email_agencije: Email_agencije.value // Auto-fill agency email
      }
    };
  },
  mounted() {
    this.fetchNekretnine();
  },
  methods: {
    async fetchNekretnine() {
      try {
        const Email_agencije = localStorage.getItem("Email_agencije");
        if (!Email_agencije) {
          this.$q.notify({
            type: 'negative',
            message: 'Niste prijavljeni. Molimo prijavite se.'
          });
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/nekretnine_agencija?Email_agencije=${Email_agencije}`
        );
        this.nekretnine = response.data;
        this.currentSlide = this.nekretnine.map(() => 1);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja podataka:", error);
        this.$q.notify({
          type: 'negative',
          message: 'Došlo je do greške prilikom dohvaćanja nekretnina.'
        });
      }
    },
    // Updated getImagePath to accept the full nekretnina object
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
    openEditDialog(nekretnina) {
      this.editForm = {
        Sifra_nekretnine: nekretnina.Sifra_nekretnine,
        Tip_nekretnine: nekretnina.Tip_nekretnine,
        Adresa_nekretnine: nekretnina.Adresa_nekretnine,
        Opis_nekretnine: nekretnina.Opis_nekretnine,
        Broj_soba: nekretnina.Broj_soba,
        Broj_kupaonica: nekretnina.Broj_kupaonica,
        Kvadratura_nekretnine: nekretnina.Kvadratura_nekretnine,
        Cijena_nekretnine: nekretnina.Cijena_nekretnine
      };
      this.editDialogOpen = true;
    },
    async updateNekretnina() {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/nekretnine/${this.editForm.Sifra_nekretnine}`,
          this.editForm
        );

        if (response.data.success) {
          this.$q.notify({
            type: 'positive',
            message: 'Nekretnina uspješno ažurirana!'
          });

          // Update local list of properties
          const index = this.nekretnine.findIndex(
            n => n.Sifra_nekretnine === this.editForm.Sifra_nekretnine
          );

          if (index !== -1) {
            // Merge updated data into the existing object
            this.nekretnine[index] = { ...this.nekretnine[index], ...this.editForm };
          }

          this.editDialogOpen = false;
        } else {
          this.$q.notify({
            type: 'negative',
            message: response.data.message || 'Nekretnina nije pronađena ili podaci nisu promijenjeni.'
          });
        }
      } catch (error) {
        console.error("Greška prilikom ažuriranja nekretnine:", error);
        this.$q.notify({
          type: 'negative',
          message: 'Došlo je do greške prilikom ažuriranja nekretnine.'
        });
      }
    },
    // --- Methods for adding a new property ---
    openAddDialog() {
      // Reset form and open first step dialog
      this.addForm = {
        Sifra_nekretnine: null,
        Tip_nekretnine: '',
        Adresa_nekretnine: '',
        Opis_nekretnine: '',
        Broj_soba: null,
        Broj_kupaonica: null,
        Kvadratura_nekretnine: null,
        Cijena_nekretnine: null,
        Slika_nekretnine: null,
        Slika_nekretnine_2: null,
        Slika_nekretnine_3: null,
        Email_agencije: localStorage.getItem("Email_agencije")
      };
      this.addDialogStep1Open = true;
    },
    nextStepAddDialog() {
      // Basic validation for step 1
      if (!this.addForm.Tip_nekretnine || !this.addForm.Adresa_nekretnine || !this.addForm.Opis_nekretnine ||
          this.addForm.Broj_soba === null || this.addForm.Broj_soba <= 0 ||
          this.addForm.Broj_kupaonica === null || this.addForm.Broj_kupaonica < 0 ||
          this.addForm.Kvadratura_nekretnine === null || this.addForm.Kvadratura_nekretnine <= 0 ||
          this.addForm.Cijena_nekretnine === null || this.addForm.Cijena_nekretnine <= 0) {
        this.$q.notify({
          type: 'negative',
          message: 'Molimo popunite sva obavezna polja.'
        });
        return;
      }
      this.addDialogStep1Open = false;
      this.addDialogStep2Open = true;
    },
    previousStepAddDialog() {
      this.addDialogStep2Open = false;
      this.addDialogStep1Open = true;
    },
    cancelAddDialog() {
      this.addDialogStep1Open = false;
      this.addDialogStep2Open = false;
      // You might want to reset addForm here too
    },
    handleFileChange(field, file) {
      this.addForm[field] = file;
    },
    async addNewNekretnina() {
      if (!this.addForm.Slika_nekretnine) {
        this.$q.notify({
          type: 'negative',
          message: 'Molimo odaberite barem jednu sliku.'
        });
        return;
      }

      const formData = new FormData();
      for (const key in this.addForm) {
        if (this.addForm[key] !== null) {
          // Special handling for Tip_nekretnine_2 needed by multer's destination logic
          // The backend expects 'Tip_nekretnine_2' to be 'stanovi', 'kuce', etc.
          // Let's derive it here based on Tip_nekretnine for formData
          if (key === 'Tip_nekretnine') {
            formData.append(key, this.addForm[key]);
            let derivedTipNekretnine2 = '';
            if (this.addForm[key] === "Stan") derivedTipNekretnine2 = "stanovi";
            else if (this.addForm[key] === "Kuća") derivedTipNekretnine2 = "kuce";
            else if (this.addForm[key] === "Najam stana") derivedTipNekretnine2 = "najam_stanovi";
            else if (this.addForm[key] === "Najam kuće") derivedTipNekretnine2 = "najam_kuce";
            formData.append('Tip_nekretnine_2', derivedTipNekretnine2); // Add this field for multer
          } else if (this.addForm[key] instanceof File) {
            formData.append(key, this.addForm[key], this.addForm[key].name);
          } else {
            formData.append(key, this.addForm[key]);
          }
        }
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/dodaj_nekretninu",
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        if (response.data.success) {
          this.$q.notify({
            type: 'positive',
            message: 'Nekretnina uspješno dodana!'
          });
          this.addDialogStep2Open = false;
          this.fetchNekretnine(); // Refresh the list of properties
        } else {
          this.$q.notify({
            type: 'negative',
            message: response.data.message || 'Greška prilikom dodavanja nekretnine.'
          });
        }
      } catch (error) {
        console.error("Greška prilikom dodavanja nekretnine:", error);
        this.$q.notify({
          type: 'negative',
          message: 'Došlo je do greške prilikom dodavanja nekretnine.'
        });
      }
    },
    // --- End methods for adding a new property ---

    async removeNekretnina(nekretnina) { // New method to remove a property
      try {
        // Confirm with the user before deleting (using Quasar Dialog instead of alert)
        this.$q.dialog({
          title: 'Potvrda brisanja',
          message: `Jeste li sigurni da želite obrisati nekretninu na adresi: ${nekretnina.Adresa_nekretnine}?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          // Send DELETE request to backend
          const response = await axios.delete(
            `http://localhost:3000/api/nekretnine/${nekretnina.Sifra_nekretnine}`,
            // IMPORTANT: Send Tip_nekretnine in the request body for the backend to determine the table
            { data: { Tip_nekretnine: nekretnina.Tip_nekretnine } }
          );

          if (response.data.success) {
            this.$q.notify({
              type: 'positive',
              message: 'Nekretnina uspješno obrisana!'
            });
            this.fetchNekretnine(); // Refresh the list of properties
          } else {
            this.$q.notify({
              type: 'negative',
              message: response.data.message || 'Greška prilikom brisanja nekretnine.'
            });
          }
        }).onCancel(() => {
          this.$q.notify({
            type: 'info',
            message: 'Brisanje nekretnine je otkazano.'
          });
        });
      } catch (error) {
        console.error("Greška prilikom brisanja nekretnine:", error);
        this.$q.notify({
          type: 'negative',
          message: 'Došlo je do greške prilikom brisanja nekretnine.'
        });
      }
    },

    // Old removeFavorite method (if still needed elsewhere, otherwise remove)
    async removeFavorite(nekretnina) {
      try {
        const Sifra_korisnika = localStorage.getItem('Sifra_korisnika');
        if (!Sifra_korisnika) {
          this.$q.notify({
            type: 'negative',
            message: 'Niste prijavljeni. Molimo prijavite se.'
          });
          return;
        }

        const payload = {
          Sifra_korisnika,
          Adresa_nekretnine: nekretnina.Adresa_nekretnine,
        };

        const checkResponse = await axios.post("http://localhost:3000/api/provjeri_favorit", {
          Sifra_korisnika,
          Adresa_nekretnine: nekretnina.Adresa_nekretnine,
        });

        if (!checkResponse.data.exists) {
          this.$q.notify({
            type: 'info',
            message: 'Nekretnina nije u favoritima.'
          });
          return;
        }

        await axios.post("http://localhost:3000/api/izbrisi_favorit", payload);
        this.$q.notify({
          type: 'positive',
          message: 'Nekretnina je uspješno uklonjena iz favorita!'
        });

        this.fetchNekretnine();
      } catch (error) {
        console.error("Greška prilikom uklanjanja iz favorita:", error);
        this.$q.notify({
          type: 'negative',
          message: 'Došlo je do greške. Molimo pokušajte ponovo.'
        });
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
  width: 100% // This was contributing to the issue. 'col-grow' handles this better.

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
</style>
