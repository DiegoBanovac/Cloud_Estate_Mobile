<template>
  <q-page padding>
    <!-- Registration Form -->
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <h2 class="text-center">Registracija</h2>
        </q-card-section>

        <q-card-section>
          <!-- Name Input Field -->
          <q-input
            v-model="user.name"
            label="Ime i prezime"
            filled
            :rules="[val => val && val.length > 0 || 'Unesite ime i prezime']"
            class="q-mb-md"
          />

          <!-- Email Input Field -->
          <q-input
            v-model="user.email"
            label="Email"
            type="email"
            filled
            :rules="[val => val && val.length > 0 || 'Unesite validan email']"
            class="q-mb-md"
          />

          <!-- Password Input Field -->
          <q-input
            v-model="user.password"
            label="Lozinka"
            type="password"
            filled
            :rules="[val => val && val.length >= 6 || 'Lozinka mora biti barem 6 karaktera']"
            class="q-mb-md"
          />

          <!-- Role Selection (if needed) -->
          <q-select
            v-model="user.role"
            :options="roleOptions"
            label="Izaberite ulogu"
            filled
            :rules="[val => val && val.length > 0 || 'Izaberite ulogu']"
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
        name: '',
        email: '',
        password: '',
        role: ''
      },
      // Role options for the select dropdown (you can adjust based on your database roles)
      roleOptions: ['Admin', 'User']
    };
  },
  methods: {
    // Method to handle form submission (e.g., sending data to a server)
    submitForm() {
      if (this.isFormValid()) {
        // Here you would typically call an API or store the data
        console.log('Form submitted:', this.user);

        // Simulate a success message after submission
        this.$q.notify({
          type: 'positive',
          message: 'Registracija uspješna!',
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
      return this.user.name && this.user.email && this.user.password && this.user.role;
    },

    // Reset the form fields
    resetForm() {
      this.user.name = '';
      this.user.email = '';
      this.user.password = '';
      this.user.role = '';
    }
  }
};
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
