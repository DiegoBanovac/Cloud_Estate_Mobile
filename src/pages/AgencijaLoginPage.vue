<template>
  <q-page padding>
    <!-- Login Form -->
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <h2 class="text-center">Agencija prijava</h2>
        </q-card-section>

        <q-card-section>
          <!-- Email Input Field -->
          <q-input
            v-model="user.email"
            label="Email"
            filled
            :rules="[val => val && val.length > 0,'Unesite email']"
            class="q-mb-md"
          />

          <!-- Password Input Field -->
          <q-input
            v-model="user.password"
            label="Lozinka"
            type="password"
            filled
            :rules="[val => val && val.length > 0,'Unesite lozinku']"
            class="q-mb-md"
          />

          <!-- Submit Button -->
          <q-btn
            label="Potvrdi"
            color="primary"
            @click="submitForm"
            class="full-width"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from "axios"; // Uvoz axios za slanje POST zahtjeva
import { useRouter } from "vue-router"; // Uvoz Vue Router-a

export default {
  setup() {
    const router = useRouter(); // Inicijaliziraj router

    return {
      router
    };
  },
  data() {
    return {
      user: {
        email: '', // Polje za email
        password: '' // Polje za lozinku
      }
    };
  },
  methods: {
    // Metoda za podnošenje forme
    submitForm() {
  if (this.isFormValid()) {
    axios
      .post("http://localhost:3000/api/login_agencija", {
        email: this.user.email,
        lozinka: this.user.password,
      })
      .then((response) => {
        const { message, korisnik, token } = response.data;
        console.log(message);

        if (korisnik && korisnik.Naziv_agencije) {
          // Spremanje imena korisnika u localStorage
          localStorage.setItem("Naziv_agencije", korisnik.Naziv_agencije);
          localStorage.setItem("Sifra_agencije", korisnik.Sifra_agencije);
          localStorage.setItem("Email_agencije", korisnik.Email_agencije);
          localStorage.setItem("jwt_token", token); 
        }

        alert("Prijava uspješna!");
        this.router.push("/agencija");
      })
      .catch((error) => {
        console.error("Greška prilikom prijave:", error);
        alert("Neispravan email ili lozinka.");
      });
  } else {
    alert("Molimo ispunite sve obavezne podatke.");
  }
},



    // Provjera validnosti forme
    isFormValid() {
      return this.user.email && this.user.password;
    },

    // Resetiranje forme
    resetForm() {
      this.user.email = "";
      this.user.password = "";
    }
  }
};
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
