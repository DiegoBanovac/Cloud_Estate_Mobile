<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pa-md" style="max-width: 400px">

<q-form
  class="q-gutter-md"
>
  <q-input
    filled
    v-model="ime"
    label="Ime"
  />

  <q-input
    filled
    v-model="prezime"
    label="Prezime"
  />
  <q-input
    filled
    v-model="email"
    label="E-mail"
  />
  <q-input
    filled
    v-model="telefon"
    label="Telefon"
  />
  <q-input
    filled
    v-model="lozinka"
    type="password"
    label="Lozinka"
  />



  <div>
    <q-btn label="Submit" type="submit" color="primary" @click="handleSubmit" />
    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
  </div>
</q-form>

</div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const ime = ref(null);
    const prezime = ref(null);
    const email = ref(null);
    const telefon = ref(null);
    const lozinka = ref(null);
    const router = useRouter(); // Inicijaliziraj router

    const insertKorisnik = async () => {
      const formData = {
        ime: ime.value,
        prezime: prezime.value,
        email: email.value,
        telefon: telefon.value,
        lozinka: lozinka.value,
      };
      try {
        const result = await axios.post('http://localhost:3000/api/registracija_korisnika', formData);
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    const navigateTo = (route) => {
      router.push(route);
    };

    const handleSubmit = () => {
      // Provjera da li su sva polja popunjena
      if (!ime.value || !prezime.value || !email.value || !telefon.value || !lozinka.value) {
        alert('Molimo popunite sva polja prije potvrde.');
        return;
      }

      // Ako su sva polja popunjena, izvršavaju se funkcije
      insertKorisnik();
      navigateTo('/login');
    };

    return {
      ime,
      prezime,
      email,
      telefon,
      lozinka,
      handleSubmit,
    };
  },
};
</script>


