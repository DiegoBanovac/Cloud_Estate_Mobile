<template>
  <q-page padding>
    <!-- Login Form -->
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <h2 class="text-center">Prijava</h2>
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

export default {
  data() {
    return {
      user: {
        email: '',  // Polje za email
        password: ''  // Polje za lozinku
      }
    };
  },
methods: {
    // Metoda za podnošenje forme
    submitForm() {
      if (this.isFormValid()) {
        axios.post('http://192.168.1.37:3000/api/login', {
          email: this.user.email,
          lozinka: this.user.password
        })
        .then(response => {
          console.log(response.data.message);
          alert('Prijava uspješna!');  // Prikazuje obavijest korisniku
          this.resetForm();
        })
        .catch(error => {
          console.error("Greška prilikom prijave:", error);
          alert('Neispravan email ili lozinka.');  // Prikazuje grešku
        });
      } else {
        alert('Molimo ispunite sve obavezne podatke.');  // Obavijest ako forma nije ispunjena
      }
    },

    // Provjera validnosti forme
    isFormValid() {
      return this.user.email && this.user.password;
    },

    // Resetiranje forme
    resetForm() {
      this.user.email = '';
      this.user.password = '';
    }
  }
};
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
