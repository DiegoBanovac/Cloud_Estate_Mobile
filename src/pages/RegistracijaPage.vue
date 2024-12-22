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
    <q-btn label="Submit" type="submit" color="primary" @click="insertKorisnik()"/>
    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
  </div>
</q-form>

</div>
  </q-page>
</template>

<script>
//import { useQuasar } from 'quasar'
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup () {
    //const $q = useQuasar()
    const ime = ref(null)
    const prezime = ref(null)
    const email = ref(null)
    const telefon = ref(null)
    const lozinka = ref(null)


    return {
      ime,
      prezime,
      email,
      telefon,
      lozinka
    }
  },
  methods: {
    async insertKorisnik() {
      const formData = {
        "ime": this.ime,
        "prezime": this.prezime,
        "email": this.email,
        "telefon": this.telefon,
        "lozinka": this.lozinka
      }
      await axios.post('http://localhost:3000/api/registracija_korisnika', formData)
        .then(result => {
          console.log(result.data)
        })
        .catch(error => {
          console.error(error)
        })
    },
  }
}


</script>
