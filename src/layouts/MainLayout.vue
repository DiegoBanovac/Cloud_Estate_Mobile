<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="custom-header">
      <q-toolbar class="text-black items-center q-gutter-sm no-wrap">

  <!-- Hamburger za male ekrane -->
  <q-btn
    flat
    dense
    round
    icon="menu"
    @click="drawerOpen = !drawerOpen"
    class="q-mr-sm"
    v-if="$q.screen.lt.md"
  />

  <!-- Naslov -->
  <q-btn
    flat
    dense
    class="h1 text-primary no-uppercase"
    @click="navigateTo('/')"
    label="Cloud Estate"
  />

  <!-- Navigacija za veće ekrane -->

  <template v-if="$q.screen.gt.sm">
      <div class="row items-center q-gutter-x-lg q-ml-xl nav-center">
    <q-btn
      flat dense label="O nama"
      :class="{ 'text-primary': isActive('/o_nama'), 'text-grey': !isActive('/o_nama') }"
      to="/o_nama"
    />
    <q-btn
      flat dense label="Kupnja"
      :class="{ 'text-primary': isActive('/kupnja_nekretnina'), 'text-grey': !isActive('/kupnja_nekretnina') }"
      to="/kupnja_nekretnina"
    />
    <q-btn
      flat dense label="Mapa"
      :class="{ 'text-primary': isActive('/mapa_nekretnina'), 'text-grey': !isActive('/mapa_nekretnina') }"
      to="/mapa_nekretnina"
    />
    <q-btn
      flat dense label="Najam"
      :class="{ 'text-primary': isActive('/najam_nekretnina'), 'text-grey': !isActive('/najam_nekretnina') }"
      to="/najam_nekretnina"
    />
    <q-btn
      flat dense label="Agencije"
      :class="{ 'text-primary': isActive('/popis_agencija'), 'text-grey': !isActive('/popis_agencija') }"
      to="/popis_agencija"
    />
    </div>
  </template>


  <q-space />

  <!-- Dropdown s prijavom/registracijom -->
  <div class="q-pa-sm">
    <q-btn-dropdown flat round dense icon="account_circle">
      <q-list>
        <q-item clickable v-close-popup @click="navigateTo('/login')">
          <q-item-section>
            <q-item-label>Prijava</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="navigateTo('/registracija')">
          <q-item-section>
            <q-item-label>Registracija</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="navigateTo('/login_agencija')">
          <q-item-section>
            <q-item-label>Prijava agencije</q-item-label>
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
    <q-item clickable @click="navigateTo('/o_nama')">
      <q-item-section>O nama</q-item-section>
    </q-item>
    <q-item clickable @click="navigateTo('/kupnja_nekretnina')">
      <q-item-section>Kupnja</q-item-section>
    </q-item>
    <q-item clickable @click="navigateTo('/mapa_nekretnina')">
      <q-item-section>Mapa</q-item-section>
    </q-item>
    <q-item clickable @click="navigateTo('/najam_nekretnina')">
      <q-item-section>Najam</q-item-section>
    </q-item>
    <q-item clickable @click="navigateTo('/popis_agencija')">
      <q-item-section>Agencije</q-item-section>
    </q-item>
  </q-list>
</q-drawer>

    <!-- Footer s gumbovima -->


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

import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const drawerOpen = ref(false);

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
