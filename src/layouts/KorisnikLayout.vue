<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="custom-header">
      <q-toolbar class="text-black items-center q-gutter-sm no-wrap">

  <q-btn
    flat
    dense
    round
    icon="menu"
    @click="drawerOpen = !drawerOpen"
    class="q-mr-sm"
    v-if="$q.screen.lt.md"
  />

  <q-btn
    flat
    dense
    class="h1 text-primary no-uppercase"
    @click="navigateTo('/korisnik')"
    label="Cloud Estate"
  />

  <template v-if="$q.screen.gt.sm">
      <div class="row items-center q-gutter-x-lg q-ml-xl nav-center">
    <q-btn
      flat dense label="O nama"
      :class="{ 'text-primary': isActive('/korisnik/o_nama'), 'text-grey': !isActive('/korisnik/o_nama') }"
      to="/korisnik/o_nama"
    />
    <q-btn
      flat dense label="Kupnja"
      :class="{ 'text-primary': isActive('/korisnik/kupnja_nekretnina'), 'text-grey': !isActive('/korisnik/kupnja_nekretnina') }"
      to="/korisnik/kupnja_nekretnina"
    />
    <q-btn
      flat dense label="Mapa"
      :class="{ 'text-primary': isActive('/korisnik/mapa_nekretnina'), 'text-grey': !isActive('/korisnik/mapa_nekretnina') }"
      to="/korisnik/mapa_nekretnina"
    />
    <q-btn
      flat dense label="Najam"
      :class="{ 'text-primary': isActive('/korisnik/najam_nekretnina'), 'text-grey': !isActive('/korisnik/najam_nekretnina') }"
      to="/korisnik/najam_nekretnina"
    />
    <q-btn
      flat dense label="Agencije"
      :class="{ 'text-primary': isActive('/korisnik/popis_agencija'), 'text-grey': !isActive('/korisnik/popis_agencija') }"
      to="/korisnik/popis_agencija"
    />
    </div>
  </template>


  <q-space />
  <span v-if="imeKorisnika" class="ime">{{ imeKorisnika }}</span>
  <div class="q-pa-md">
          <q-btn-dropdown flat round dense icon="account_circle">
            <q-list>

              <q-item clickable v-close-popup @click="navigateTo('/korisnik/favoriti')">
                <q-item-section>
                  <q-item-label>Favoriti</q-item-label>
                </q-item-section>
              </q-item>


              <q-item clickable v-close-popup @click="logout">
                <q-item-section>
                  <q-item-label>Odjava</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
</q-toolbar>

    </q-header>

  <q-drawer
  v-model="drawerOpen"
  side="left"
  overlay
  behavior="mobile"
  bordered
>
  <q-list padding>
    <q-item clickable @click="navigateTo('/korisnik/o_nama')">
      <q-item-section>O nama</q-item-section>
    </q-item>
    <q-item clickable @click="navigateTo('/korisnik/kupnja_nekretnina')">
      <q-item-section>Kupnja</q-item-section>
    </q-item>
    <q-item clickable @click="navigateTo('/korisnik/mapa_nekretnina')">
      <q-item-section>Mapa</q-item-section>
    </q-item>
    <q-item clickable @click="navigateTo('/korisnik/najam_nekretnina')">
      <q-item-section>Najam</q-item-section>
    </q-item>
    <q-item clickable @click="navigateTo('/korisnik/popis_agencija')">
      <q-item-section>Agencije</q-item-section>
    </q-item>
  </q-list>
</q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.h1 {
  font-family: "Roboto", serif;
  font-weight: 800;
  font-size: 1.5rem;
  margin-top: 6px;
  white-space: nowrap;
}
.custom-header {
  height: 60px; /* Visina header-a */
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding-left: 5px;
  display: flex;
  align-items: center;
  margin-left: 5px;

}
.custom-toolbar {
  height: 60px; /* Visina footer-a */
  background-color: #ffffff;
  border-top: 0.5px solid #e0e0e0;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.full-width {
  width: 100%;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%; /* Svaki gumb zauzima 20% širine */
}

.icon-button {
  font-size: 18px; /* Manje ikone */
  color: rgb(163, 163, 163);
}
.icon-map {
  font-size: 18px; /* Manje ikone */
  color: #007bff;
}
.button-text-map {
  font-family: "Roboto", serif;
  font-size: 12px; /* Manji tekst */
  font-weight: 400;
  margin-top: 0px; /* Razmak između ikone i teksta */
  color: #007bff;
  text-align: center;
  line-height: 1.2; /* Povećava vertikalnu čitljivost */
}

.button-text {
  font-family: "Roboto", serif;
  font-size: 12px; /* Manji tekst */
  font-weight: 400;
  margin-top: 0px; /* Razmak između ikone i teksta */
  color: rgb(163, 163, 163);
  text-align: center;
  line-height: 1.2; /* Povećava vertikalnu čitljivost */
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

const drawerOpen = ref(false)
const imeKorisnika = ref('')
const sifraKorisnika = ref('')
const jwtToken = ref('') // New ref for JWT token

// Dohvaćanje imena korisnika, šifre i JWT tokena iz localStorage prilikom montiranja komponente
onMounted(() => {
  imeKorisnika.value = localStorage.getItem('Ime_korisnika') || ''
  sifraKorisnika.value = localStorage.getItem('Sifra_korisnika') || ''
  jwtToken.value = localStorage.getItem('jwt_token') || '' // Get JWT token

  console.log('Ime korisnika:', imeKorisnika.value)
  console.log('Sifra korisnika:', sifraKorisnika.value)
  console.log('JWT Token:', jwtToken.value) // Log the JWT token
})

// Funkcija za odjavu
function logout() {
  localStorage.removeItem('Ime_korisnika')
  localStorage.removeItem('Sifra_korisnika')
  localStorage.removeItem('jwt_token') // Also remove JWT token on logout
  router.push('/')
}

// Funkcija za navigaciju na određenu rutu
function navigateTo(destination) {
  router.push(destination)
}

// Funkcija za provjeru aktivne rute
function isActive(path) {
  return route.path === path
}
</script>
