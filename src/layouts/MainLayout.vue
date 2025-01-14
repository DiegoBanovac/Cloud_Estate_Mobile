<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="custom-header">
      <q-toolbar class="text-black items-center">
        <q-btn
          flat
          dense
          class="h1 text-primary no-uppercase"
          @click="navigateTo('/')"
        >
          Cloud Estate
        </q-btn>
        <q-space />
        <div class="q-pa-md">
          <q-btn-dropdown flat round dense icon="account_circle">
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
              :class="{'icon-map': isActive('/o_nama'), 'icon-button': !isActive('/o_nama')}"
              to="/o_nama"
            />
            <div
              :class="{'button-text-map': isActive('/o_nama'), 'button-text': !isActive('/o_nama')}"
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
              to="/kupnja_nekretnina"
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
              :class="{'icon-map': isActive('/mapa_nekretnina'), 'icon-button': !isActive('/mapa_nekretnina')}"
              to="/mapa_nekretnina"
            />
            <div
              :class="{'button-text-map': isActive('/mapa_nekretnina'), 'button-text': !isActive('/mapa_nekretnina')}"
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
              :class="{'icon-map': isActive('/najam_nekretnina'), 'icon-button': !isActive('/najam_nekretnina')}"
              to="/najam_nekretnina"
            />
            <div
              :class="{'button-text-map': isActive('/najam_nekretnina'), 'button-text': !isActive('/najam_nekretnina')}"
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
              :class="{'icon-map': isActive('/popis_agencija'), 'icon-button': !isActive('/popis_agencija')}"
              to="/popis_agencija"
            />
            <div
              :class="{'button-text-map': isActive('/popis_agencija'), 'button-text': !isActive('/popis_agencija')}"
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
import { useRouter, useRoute } from "vue-router";

defineOptions({
  name: "MainLayout",
});

const router = useRouter(); // Inicijaliziraj router
const route = useRoute();

// Funkcija za navigaciju
function navigateTo(route) {
  router.push(route);
}

// Funkcija za provjeru trenutne rute
function isActive(path) {
  return route.path === path;
}
</script>
