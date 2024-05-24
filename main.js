/*
// Crear mapa
var map = L.map('map').setView([19.4326, -99.1332], 10); // Coordenadas de la Ciudad de México y nivel de zoom

// Agregar mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Cargar archivos GeoJSON
// Alcaldías CDMX
fetch('DATA/Alcaldias_CDMX.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function(feature) {
        return {
          color: '#3D3D3D', // Color del contorno
          weight: 1 // Grosor del contorno
        };
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.nomgeo); // Mostrar nombre en pop-up
      }
    }).addTo(map);
  });

// Áreas Naturales Protegidas
fetch('DATA/ANP_CDMX.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function(feature) {
        return {
          fillColor: '#125B0D', // Color del relleno
          fillOpacity: 0.5 // Opacidad del relleno
        };
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.nombre); // Mostrar nombre en pop-up
      }
    }).addTo(map);
  });

// Áreas Verdes CDMX
fetch('DATA/AreasVerdes_CDMX.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function(feature) {
        return {
          fillColor: '#3FBD00', // Color del relleno
          fillOpacity: 0.5 // Opacidad del relleno
        };
      },
      onEachFeature: function(feature, layer) {
        var popupContent = '<b>' + feature.properties.nombre + '</b><br>';
        if (feature.properties.categoria_) {
          popupContent += 'Categoría: ' + feature.properties.categoria_;
        }
        layer.bindPopup(popupContent); // Mostrar nombre y categoría en pop-up
      }
    }).addTo(map);
  }); */
 // Crear el mapa
var map = L.map('map').setView([19.4326, -99.1332], 10);

// Añadir la capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Cargar y visualizar los GeoJSON
fetch('Alcaldias_CDMX.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function () {
        return {color: "#3D3D3D", fillOpacity: 0};
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.nomgeo) {
          layer.bindPopup(feature.properties.nomgeo);
        }
      }
    }).addTo(map);
  });

fetch('ANP_CDMX.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function () {
        return {color: "#125B0D", fillOpacity: 0.7};
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.nombre) {
          layer.bindPopup(feature.properties.nombre);
        }
      }
    }).addTo(map);
  });

fetch('AreasVerdes_CDMX.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function () {
        return {color: "#3FBD00", fillOpacity: 0.7};
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties) {
          let popupContent = feature.properties.nombre || '';
          if (feature.properties.categoria_) {
            popupContent += `<br>${feature.properties.categoria_}`;
          }
          layer.bindPopup(popupContent);
        }
      }
    }).addTo(map);
  });

// Cargar y visualizar los puntos GeoJSON con colores personalizados
fetch('ARBOLES_BJ.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        var markerOptions = {
          radius: 8,
          fillColor: "#FF0000", // Color rojo para los árboles (puedes personalizarlo según tus preferencias)
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        };
        return L.circleMarker(latlng, markerOptions);
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.ncomun) {
          layer.bindPopup(feature.properties.ncomun);
        }
      }
    }).addTo(map);
  });

/*fetch('ARBOLES_BJ.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        var markerOptions = {
          radius: 3,
          fillColor: feature.properties.color || "#073600",
          color: "#073600",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        };
        return L.circleMarker(latlng, markerOptions);
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
      }
    }).addTo(map); */
