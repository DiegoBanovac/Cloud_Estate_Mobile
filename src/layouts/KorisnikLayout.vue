<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="custom-header">
      <q-toolbar class="text-black items-center">
        <q-btn
          flat
          dense
          class="h1 text-primary no-uppercase"
          @click="navigateTo('/korisnik')"
        >
          Cloud Estate
        </q-btn>
        <q-space />
        <span v-if="imeKorisnika" class="q-mr-md">Dobrodošli, {{ imeKorisnika }}!</span>
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

    <!-- Footer s gumbovima -->
    <q-footer class="custom-toolbar">
      <q-toolbar class="q-pa-none">
        <div class="row full-width justify-around items-center">
          <!-- Gumb za "O nama" -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="info"
              aria-label="O nama"
              :class="{'icon-map': isActive('/korisnik/o_nama'), 'icon-button': !isActive('/korisnik/o_nama')}"
              to="/korisnik/o_nama"
            />
            <div
              :class="{'button-text-map': isActive('/korisnik/o_nama'), 'button-text': !isActive('/korisnik/o_nama')}"
            >O nama</div>
          </div>

          <!-- Gumb za kupnju nekretnina -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="home_work"
              aria-label="Buy"
              :class="{'icon-map': isActive('/kupnja_nekretnina'), 'icon-button': !isActive('/kupnja_nekretnina')}"
              to="/korisnik/kupnja_nekretnina"
            />
            <div
              :class="{'button-text-map': isActive('/kupnja_nekretnina'), 'button-text': !isActive('/kupnja_nekretnina')}"
            >Kupnja</div>
          </div>

          <!-- Gumb za mapu -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="pin_drop"
              aria-label="Map"
              :class="{'icon-map': isActive('/korisnik/mapa_nekretnina'), 'icon-button': !isActive('/korisnik/mapa_nekretnina')}"
              to="/korisnik/mapa_nekretnina"
            />
            <div
              :class="{'button-text-map': isActive('/korisnik/mapa_nekretnina'), 'button-text': !isActive('/korisnik/mapa_nekretnina')}"
            >Mapa</div>
          </div>

          <!-- Gumb za najam nekretnina -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="apartment"
              aria-label="Rent"
              :class="{'icon-map': isActive('/korisnik/najam_nekretnina'), 'icon-button': !isActive('/korisnik/najam_nekretnina')}"
              to="/korisnik/najam_nekretnina"
            />
            <div
              :class="{'button-text-map': isActive('/korisnik/najam_nekretnina'), 'button-text': !isActive('/korisnik/najam_nekretnina')}"
            >Najam</div>
          </div>

          <!-- Gumb za agencije -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="real_estate_agent"
              aria-label="Agencies"
              :class="{'icon-map': isActive('/korisnik/popis_agencija'), 'icon-button': !isActive('/korisnik/popis_agencija')}"
              to="/korisnik/popis_agencija"
            />
            <div
              :class="{'button-text-map': isActive('/korisnik/popis_agencija'), 'button-text': !isActive('/korisnik/popis_agencija')}"
            >Agencije</div>
          </div>
        </div>
      </q-toolbar>
    </q-footer>

    <!-- Sadržaj stranice -->
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
}
.custom-header {
  height: 60px; /* Visina header-a */
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding-left: 2px;
  display: flex;
  align-items: center;
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
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const imeKorisnika = ref("");
const sifraKorisnika = ref("");

// Dohvaćanje imena korisnika iz localStorage
onMounted(() => {
  imeKorisnika.value = localStorage.getItem("Ime_korisnika");
  sifraKorisnika.value = localStorage.getItem("Sifra_korisnika");
  console.log("Ime korisnika:", imeKorisnika.value);
  console.log("Sifra korisnika:", sifraKorisnika.value);
});

// Odjava
function logout() {
  localStorage.removeItem("Ime_korisnika");
  router.push("/"); // Preusmjeravanje na početnu stranicu
}

// Navigacija
function navigateTo(route) {
  router.push(route);
}

// Funkcija za provjeru aktivne rute
function isActive(path) {
  return route.path === path;
}
</script>
