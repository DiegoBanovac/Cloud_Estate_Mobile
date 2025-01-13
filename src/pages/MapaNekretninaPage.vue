<template>
  <q-page padding>
    <div id="map-container"></div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MapaNekretninaPage',
  data() {
    return {
      nekretnine: []  // Ovdje ćemo spremiti podatke o nekretninama
    };
  },
  mounted() {
    this.loadGoogleMapsScript();
    this.fetchNekretnine();
  },
  beforeUnmount() {
    // Opcionalno: Uklonite script tag kad se komponenta uništi
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

        // Definirajte globalnu funkciju koja se poziva kad je skripta učitana
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

        this.nekretnine.forEach(nekretnina => {
          this.geocodeAddress(nekretnina.Adresa_nekretnine, map, nekretnina, AdvancedMarkerElement, PinElement);
        });
      } else {
        console.error('Google Maps API nije učitan.');
      }
    },
    fetchNekretnine() {
      axios.get('http://localhost:3000/api/nekretnine/kupnja')
        .then(response => {
          this.nekretnine = response.data;
          this.initMap();  // Ponovno inicijaliziraj mapu s učitanim podacima
        })
        .catch(error => {
          console.error('Greška prilikom dohvata podataka: ', error);
        });
    },
    geocodeAddress(address, map, nekretnina, AdvancedMarkerElement, PinElement) {
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address }, (results, status) => {
    if (status === 'OK') {
      // Create the PinElement
      const pinElement = new PinElement({
        background: '#007bff',
        borderColor: '#137333',
        glyphColor: '#000000',
      });

      const marker = new AdvancedMarkerElement({
        map,
        position: results[0].geometry.location,
        content: pinElement.element, // Use the generated pin element
      });

      // Generate the HTML content for the InfoWindow
      const infoWindowContent = `
        <div style="width: 300px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 1rem;">
            <img src="${nekretnina.Slika_nekretnine}" alt="Nekretnina" style="width: 100%; height: auto; border-radius: 8px;" />
          </div>
          <div style="font-size: 14px;">
            <h4 style="margin: 0;">${nekretnina.Adresa_nekretnine}</h4>
            <p style="margin: 4px 0; color: #666;">${nekretnina.Tip_nekretnine}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
              <span style="font-weight: bold; font-size: 16px; color: #007bff;">€${nekretnina.Cijena_nekretnine}</span>
              <div>
                <button style="background-color: #007bff; color: white; border: none; border-radius: 20px; padding: 0.5rem 1rem; margin-right: 0.5rem; cursor: pointer;">Kupi</button>
                <button style="background-color: white; color: black; border: 1px solid #e0e0e0; border-radius: 20px; padding: 0.5rem 1rem; cursor: pointer;">Podijeli</button>
              </div>
            </div>
          </div>
        </div>
      `;

      // Create the InfoWindow
      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
      });

      // Add click event listener to the marker
      marker.addListener('click', () => {
        infoWindow.open({
          anchor: marker,
          map,
        });
      });
    } else {
      console.error('Geocoding neuspješan za adresu: ' + address);
    }
  });
}
  }
};
</script>

<style scoped>
#map-container {
  height: 100vh;
  width: 100%;
}
</style>
