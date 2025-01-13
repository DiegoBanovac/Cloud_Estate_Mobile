<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="custom-header">
      <q-toolbar class="text-black">
        <q-btn
          flat
          dense
          class="h1 text-black no-uppercase"
          @click="navigateTo('/')"
        >
          Cloud Estate
        </q-btn>
        <q-space />
        <img
          src="../assets/croatia.png"
          alt="Button Image"
          style="width: 24px; height: 24px; margin-top: 10px; margin-right: 15px;"
        />
        <div class="q-pa-md">
          <q-btn-dropdown flat round dense icon="account_circle" style="margin-top: 10px;">
            <q-list>
              <!-- Stavka za Prijava -->
              <q-item clickable v-close-popup @click="navigateTo('/login')">
                <q-item-section>
                  <q-item-label>Prijava</q-item-label>
                </q-item-section>
              </q-item>

              <!-- Stavka za Registracija -->
              <q-item clickable v-close-popup @click="navigateTo('/registracija')">
                <q-item-section>
                  <q-item-label>Registracija</q-item-label>
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
              class="icon-button"
              to="/o_nama"
            />
            <div class="button-text">O nama</div>
          </div>

          <!-- Gumb za kupnju nekretnina -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="home_work"
              aria-label="Buy"
              class="icon-button"
              to="/kupnja_nekretnina"
            />
            <div class="button-text">Buy</div>
          </div>

          <!-- Gumb za mapu -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="pin_drop"
              aria-label="Map"
              class="icon-map"
              to="/mapa_nekretnina"
            />
            <div class="button-text-map">Map</div>
          </div>

          <!-- Gumb za najam nekretnina -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="apartment"
              aria-label="Rent"
              class="icon-button"
              to="/najam_nekretnina"
            />
            <div class="button-text">Rent</div>
          </div>

          <!-- Gumb za agencije -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="real_estate_agent"
              aria-label="Agencies"
              class="icon-button"
              to="/popis_agencija"
            />
            <div class="button-text">Agencies</div>
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
  height: 60px; /* Visina footer-a */
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding-left: 2px;

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
import { useRouter } from "vue-router";

defineOptions({
  name: "MainLayout",
});

const router = useRouter(); // Inicijaliziraj router

// Funkcija za navigaciju
function navigateTo(route) {
  router.push(route);
}
</script>
