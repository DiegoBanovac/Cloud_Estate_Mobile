<template>
  <q-page padding>
    <!-- Login Form -->
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <h2 class="text-center">Prijava</h2>
        </q-card-section>

        <q-card-section>
          <!-- Username Input Field -->
          <q-input
            v-model="user.username"
            label="Korisničko ime"
            filled
            :rules="[val => val && val.length > 0 || 'Unesite korisničko ime']"
            class="q-mb-md"
          />

          <!-- Password Input Field -->
          <q-input
            v-model="user.password"
            label="Lozinka"
            type="password"
            filled
            :rules="[val => val && val.length > 0 || 'Unesite lozinku']"
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
export default {
  data() {
    return {
      // Define the user object for binding to the input fields
      user: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // Method to handle form submission (e.g., checking username and password)
    submitForm() {
      if (this.isFormValid()) {
        // Here you would typically call an API or check credentials
        console.log('Prijava uspješna za korisnika:', this.user.username);

        // Simulate a success message after submission
        this.$q.notify({
          type: 'positive',
          message: 'Prijava uspješna!',
          position: 'top',
        });

        // Reset the form
        this.resetForm();
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Molimo ispunite sve obavezne podatke.',
          position: 'top',
        });
      }
    },

    // Check if the form is valid
    isFormValid() {
      return this.user.username && this.user.password;
    },

    // Reset the form fields
    resetForm() {
      this.user.username = '';
      this.user.password = '';
    }
  }
};
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
¸¸
