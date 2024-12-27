<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="custom-header">
      <q-toolbar class="text-black">
      <q-toolbar-title class="h1">Cloud Estate</q-toolbar-title>
      <q-btn flat round dense icon="account_circle" />
    </q-toolbar>
    </q-header>
    <!-- Footer s gumbovima -->
    <q-footer class="custom-toolbar">
      <q-toolbar class="q-pa-none">
        <div class="row full-width justify-around items-center">
          <!-- Hamburger menu gumb -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="toggleLeftDrawer"
              class="icon-button"
            />
            <div class="button-text">Menu</div>
          </div>

          <!-- Drugi gumb -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="home_work"
              aria-label="Favorites"
              class="icon-button"
            />
            <div class="button-text">Buy</div>
          </div>

          <!-- Treći gumb -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="pin_drop"
              aria-label="Map"
              class="icon-map"
            />
            <div class="button-text-map">Map</div>
          </div>

          <!-- Četvrti gumb -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="apartment"
              aria-label="Inbox"
              class="icon-button"
            />
            <div class="button-text">Rent</div>
          </div>

          <!-- Peti gumb -->
          <div class="button-container">
            <q-btn
              flat
              dense
              round
              icon="real_estate_agent"
              aria-label="Agencies"
              class="icon-button"
            />
            <div class="button-text">Agencies</div>
          </div>
        </div>
      </q-toolbar>
    </q-footer>

    <!-- Drawer sa strane -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

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
}
.custom-header {
  height: 60px; /* Visina footer-a */
  background-color: #ffffff;

}
.custom-toolbar {
  height: 60px; /* Visina footer-a */
  background-color: #ffffff;
  border-top: 2px solid #007bff;
  border-radius: 15px;
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
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Naslovnica",
    caption: "Početna stranica",
    icon: "house",
    link: "#/",
  },
  {
    title: "Kupi nekretninu",
    caption: "Dostupne nekretnine za kupnju",
    icon: "home_work",
    link: "#/kupnja_nekretnina",
  },
  {
    title: "Iznajmi nekretninu",
    caption: "Nekretnine za najam",
    icon: "apartment",
    link: "#/najam_nekretnina",
  },
  {
    title: "Mapa",
    caption: "Mapa s dostupnim nekretninama",
    icon: "map",
    link: "#/mapa_nekretnina",
  },
  {
    title: "Agencije",
    caption: "Lista agencija koje surađuju s nama",
    icon: "real_estate_agent",
    link: "#/popis_agencija",
  },
  {
    title: "Prijava",
    caption: "Prijava postojećih korisnika",
    icon: "login",
    link: "#/login",
  },
  {
    title: "Registracija",
    caption: "Registracija novih korisnika",
    icon: "how_to_reg",
    link: "#/registracija",
  },
  {
    title: "O nama",
    caption: "Opis naše vizije i misije",
    icon: "info",
    link: "#/o_nama",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
