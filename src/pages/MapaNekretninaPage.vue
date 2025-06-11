<template>
  <q-page padding>
    <div id="map-container"></div>
  </q-page>
  <!-- Dijalog za prikaz kontaktiranja -->
  <q-dialog v-model="dialogOpen">
    <q-card>
      <q-card-section>
        <header class="h2">Kontaktiraj agenta</header>
        <div style="display: flex; justify-content: flex-end;">
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="dialogOpen = false"
            style="color: #e0e0e0; font-size: 1.2rem; margin-top: 3px;"
          />
        </div>
      </q-card-section>

      <q-form>
        <div class="q-gutter-md">
          <q-input
            filled
            v-model="ime"
            label="Ime"
            style="margin-left: 2rem; margin-right: 1rem;"
          />
          <q-input
            filled
            v-model="email"
            label="E-mail"
            style="margin-left: 2rem; margin-right: 1rem;"
          />
          <q-input
            filled
            v-model="telefon"
            label="Telefon"
            style="margin-left: 2rem; margin-right: 1rem;"
          />
          <q-input
            v-model="poruka"
            filled
            type="textarea"
            label="Poruka"
            style="margin-left: 2rem; margin-right: 1rem;"
          />
          <div>
            <!-- Gumb za slanje -->
            <q-btn
              flat
              label="Pošalji"
              @click="insertKontakt()"
              style="
                margin-top: 25rem;
                background-color: #007bff;
                color: white;
                border-radius: 30px;
                padding: 0.5rem 1.5rem;
                font-weight: bold;"
            />
          </div>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'MapaNekretninaPage',
  data() {
    const ime = ref(null);
    const email = ref(null);
    const telefon = ref(null);
    const poruka = ref(null);
    return {
      nekretnineKupnja: [],
      nekretnineNajam: [],
      currentSlide: [],
      currentDialogSlide: 1, // Trenutni slajd za dijalog
      dialogOpen: false, // Da li je dijalog otvoren
      selectedNekretnina: null, // Odabrana nekretnina za prikaz u dijalogu
      ime,
      email,
      telefon,
      poruka,
    };
  },
  mounted() {
    this.loadGoogleMapsScript();
    this.fetchNekretnineKupnja();
    this.fetchNekretnineNajam();
  },
  beforeUnmount() {
    const script = document.getElementById('google-maps-script');
    if (script) {
      document.head.removeChild(script);
    }
  },
  methods: {
    loadGoogleMapsScript() {
      if (!document.getElementById('google-maps-script')) {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBmYOm-2lLiXJ9wNzyh8vKasapBB3Jtf7k&callback=initMap&v=beta&libraries=marker`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          console.error('Google Maps API nije uspio učitati.');
        };
        document.head.appendChild(script);

        window.initMap = this.initMap;
      } else {
        this.initMap();
      }
    },
    async initMap() {
      if (window.google) {
        const { Map } = await google.maps.importLibrary('maps');
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker');

        const map = new Map(document.getElementById('map-container'), {
          center: { lat: 45.08000, lng: 13.64000 },
          zoom: 15,
          mapId: '365b78d1066bc2c0',
          streetViewControl: false,
        });

        this.nekretnineKupnja.forEach(nekretnina => {
          this.geocodeAddress(nekretnina.Adresa_nekretnine, map, nekretnina, AdvancedMarkerElement, PinElement, '#007bff');
        });

        this.nekretnineNajam.forEach(nekretnina => {
          this.geocodeAddress(nekretnina.Adresa_nekretnine, map, nekretnina, AdvancedMarkerElement, PinElement, '#26A69A');
        });
      } else {
        console.error('Google Maps API nije učitan.');
      }
    },
    fetchNekretnineKupnja() {
      axios.get('http://localhost:3000/api/nekretnine/kupnja')
        .then(response => {
          this.nekretnineKupnja = response.data;
          this.initMap();
        })
        .catch(error => {
          console.error('Greška prilikom dohvata podataka: ', error);
        });
    },
    fetchNekretnineNajam() {
      axios.get('http://localhost:3000/api/nekretnine/najam')
        .then(response => {
          this.nekretnineNajam = response.data;
          this.initMap();
        })
        .catch(error => {
          console.error('Greška prilikom dohvata podataka: ', error);
        });
    },
    getImagePath(filename, type) {
      return new URL(`/src/assets/nekretnine/${type}/${filename}`, import.meta.url).href
    },
    geocodeAddress(address, map, nekretnina, AdvancedMarkerElement, PinElement, markerColor) {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const pinElement = new PinElement({
            background: markerColor,
            borderColor: '#137333',
            glyphColor: '#000000',
          });

          const marker = new AdvancedMarkerElement({
            map,
            position: results[0].geometry.location,
            content: pinElement.element,
          });

          const infoWindowContent = `
            <div style="width: 300px; font-family: Arial, sans-serif;">
              <div style="text-align: center; margin-bottom: 1rem;">
              <img src="${this.getImagePath(nekretnina.Slika_nekretnine, nekretnina.tip === 'kupnja' ? 'kupnja' : 'najam')}"
                   alt="Nekretnina"
                   style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;" />
            </div>
              <div style="font-size: 14px;">
                <h4 style="margin: 0;">${nekretnina.Adresa_nekretnine}</h4>
                <p style="margin: 4px 0; color: #666;">${nekretnina.Tip_nekretnine}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                  <span style="font-weight: bold; font-size: 16px; color: #007bff;">€${nekretnina.Cijena_nekretnine}</span>
                  <div>
                    </div>
                    <button
                      id="contact-button-${nekretnina.id}"
                      style="
                        background-color: #007bff;
                        color: white;
                        border-radius: 30px;
                        padding: 0.5rem 1.5rem;
                        font-weight: bold;
                        cursor: pointer;
                        border: none;
                      "
                    >
                      KONTAKTIRAJ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;

          const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
          });

          marker.addListener('click', () => {
                  infoWindow.open({
                    anchor: marker,
                    map,
                  });

          setTimeout(() => {
            const contactButton = document.getElementById(`contact-button-${nekretnina.id}`);
            if (contactButton) {
              contactButton.addEventListener('click', () => {
                this.openDialog(nekretnina);
                      });
                  }
                }, 0); // Koristite mali delay kako bi se osiguralo da je DOM spreman.
              });

        } else {
          console.error('Geocoding neuspješan za adresu: ' + address);
        }
      });
    },
    openDialog(nekretnina) {
      this.selectedNekretnina = nekretnina;
      this.dialogOpen = true;
    },
    async insertKontakt() {
      const formData = {
        ime: this.ime,
        email: this.email,
        telefon: this.telefon,
        poruka: this.poruka,
        agencija: this.selectedNekretnina.Email_agencije,
      };
      await axios.post('http://localhost:3000/api/kontaktiraj', formData)
        .then(result => {
          console.log(result.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
#map-container {
  height: 100rem;
  width: 100%;
  border-radius: 20px;
}
/* Stil za gumb za zatvaranje */
.q-dialog .q-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
}

/* Stil za plavi okvir pop-up prozora */
.q-dialog .q-card {
  width: 20rem;
  height: 33rem;
}

.q-form {
  width:20rem;
}
.h2 {
  font-family: "Roboto", serif;
  font-weight: 500;
  font-size: 1.5rem;
  color: black;
}
</style>
