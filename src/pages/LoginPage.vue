<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <h2 class="text-center">Prijava</h2>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="user.email"
            label="Email"
            filled
            :rules="[val => val && val.length > 0,'Unesite email']"
            class="q-mb-md"
          />

          <q-input
            v-model="user.password"
            label="Lozinka"
            type="password"
            filled
            :rules="[val => val && val.length > 0,'Unesite lozinku']"
            class="q-mb-md"
          />

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
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    return {
      router
    };
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    submitForm() {
      if (this.isFormValid()) {
        axios
          .post("https://cloud-estate-api.onrender.com/api/login", {
            email: this.user.email,
            lozinka: this.user.password,
          })
          .then((response) => {
            const { message, korisnik, token } = response.data; // Destructure token from response
            console.log(message);

            if (korisnik && korisnik.Ime_korisnika) {
              localStorage.setItem("Ime_korisnika", korisnik.Ime_korisnika);
              localStorage.setItem("Sifra_korisnika", korisnik.Sifra_korisnika);
              localStorage.setItem("jwt_token", token); // Store the JWT in localStorage
            }

            alert("Prijava uspješna!");
            this.router.push("/korisnik");
          })
          .catch((error) => {
            console.error("Greška prilikom prijave:", error);
            alert("Neispravan email ili lozinka.");
          });
      } else {
        alert("Molimo ispunite sve obavezne podatke.");
      }
    },
    isFormValid() {
      return this.user.email && this.user.password;
    },
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
