const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/kupnja_nekretnina', component: () => import('pages/KupnjaNekretninaPage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/registracija', component: () => import('pages/RegistracijaPage.vue') },
      { path: '/najam_nekretnina', component: () => import('pages/NajamNekretninaPage.vue') },
      { path: "/popis_agencija",component: () => import("pages/PopisAgencijaPage.vue"),},
      { path: '/mapa_nekretnina', component: () => import('pages/MapaNekretninaPage.vue') },
      { path: "/o_nama", component: () => import("pages/ONamaPage.vue") },
      { path: "/login_agencija", component: () => import("pages/AgencijaLoginPage.vue") }
    ]},
    {
      path: "/korisnik",
      component: () => import("layouts/KorisnikLayout.vue"),
      children: [
        { path: '', component: () => import('pages/korisnik/KorisnikIndexPage.vue') },
        { path: '/korisnik/kupnja_nekretnina', component: () => import('pages/korisnik/KorisnikKupnjaNekretninaPage.vue') },
        { path: '/korisnik/najam_nekretnina', component: () => import('pages/korisnik/KorisnikNajamNekretninaPage.vue') },
        { path: "/korisnik/popis_agencija",component: () => import("pages/korisnik/KorisnikPopisAgencijaPage.vue"),},
        { path: '/korisnik/mapa_nekretnina', component: () => import('pages/korisnik/KorisnikMapaNekretninaPage.vue') },
        { path: "/korisnik/o_nama", component: () => import("pages/korisnik/KorisnikONamaPage.vue") },
        { path: "/korisnik/favoriti", component: () => import("pages/korisnik/FavoritiPage.vue") }
      ]},
      {
        path: "/agencija",
        component: () => import("layouts/AgencijaLayout.vue"),
        children: [
          { path: '', component: () => import('pages/agencija/AgencijaIndexPage.vue') },
          { path: '/agencija/kupnja_nekretnina', component: () => import('pages/agencija/AgencijaKupnjaNekretninaPage.vue') },
          { path: '/agencija/najam_nekretnina', component: () => import('pages/agencija/AgencijaNajamNekretninaPage.vue') },
          { path: "/agencija/popis_agencija",component: () => import("pages/agencija/AgencijaPopisAgencijaPage.vue"),},
          { path: '/agencija/mapa_nekretnina', component: () => import('pages/agencija/AgencijaMapaNekretninaPage.vue') },
          { path: "/agencija/o_nama", component: () => import("pages/agencija/AgencijaONamaPage.vue") },
          { path: "/agencija/popis_nekretnina", component: () => import("pages/agencija/AgencijaNekretninaPage.vue") }
      ]}


];

export default routes;
