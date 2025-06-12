<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pa-md" style="max-width: 400px">
      <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
        <q-input filled v-model="ime" label="Ime" :rules="[val => !!val || 'Polje je obavezno']" />
        <q-input filled v-model="prezime" label="Prezime" :rules="[val => !!val || 'Polje je obavezno']" />
        <q-input filled v-model="email" label="E-mail" :rules="[val => !!val || 'Polje je obavezno']" />
        <q-input filled v-model="telefon" label="Telefon" :rules="[val => !!val || 'Polje je obavezno']" />
        <q-input filled v-model="lozinka" type="password" label="Lozinka" :rules="[val => !!val || 'Polje je obavezno']" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
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
import { useQuasar } from 'quasar';

export default {
  setup() {
    const $q = useQuasar();
    const ime = ref(null);
    const prezime = ref(null);
    const email = ref(null);
    const telefon = ref(null);
    const lozinka = ref(null);
    const router = useRouter();

    const showSuccessNotification = () => {
      $q.notify({
        type: 'positive',
        message: 'Uspješno ste registrirani!',
        position: 'top',
        timeout: 2500,
        actions: [{ icon: 'close', color: 'white' }]
      });
    };

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
        return true;
      } catch (error) {
        console.error(error);
        $q.notify({
          type: 'negative',
          message: 'Došlo je do greške prilikom registracije',
          position: 'top',
          timeout: 2500
        });
        return false;
      }
    };

    const handleSubmit = async () => {
      // Validacija se sada obavlja kroz Q-form rules, ali dodajemo i ovu dodatnu provjeru
      if (!ime.value || !prezime.value || !email.value || !telefon.value || !lozinka.value) {
        $q.notify({
          type: 'warning',
          message: 'Molimo popunite sva polja prije potvrde.',
          position: 'top',
          timeout: 2500
        });
        return;
      }

      const success = await insertKorisnik();
      if (success) {
        showSuccessNotification();
        // Čekamo da notifikacija bude vidljiva barem 2 sekunde prije nego što preusmjerimo
        setTimeout(() => {
          router.push('/login');
        }, 2500);
      }
    };

    return {
      ime,
      prezime,
      email,
      telefon,
      lozinka,
      handleSubmit
    };
  },
};
</script>
