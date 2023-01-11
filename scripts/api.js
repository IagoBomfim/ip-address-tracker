import { apiKey } from '../config.js'

const IpInfo = document.getElementById('ip-info');
const location = document.getElementById('location-info');
const timezone = document.getElementById('timezone-info');
const isp = document.getElementById('isp-info')
const mapDiv = document.getElementById('map');

const responseApi = {};

var Map = new L.map(mapDiv, {
  center: [51.505, -0.09],
  zoom: 13
});

export async function ipify(ipAdress) {

  let data = {};
  const response = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAdress}`)
    .then(response => data = response.data)
    .catch(err => console.log(err))

  IpInfo.innerText = data.ip;
  location.innerText = data.location.city;
  timezone.innerText = data.location.timezone;
  isp.innerText = data.isp;

  return data;
};

export function setMap() {
  var layer = new L.TileLayer('http://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png');
  
  Map.addLayer(layer);
};

export function setMaker(long, lat) {

  // Create a marker with a custom icon
  let marker = new L.marker([long, lat], {
    icon: L.icon({
      iconUrl: '/images/icon-location.svg',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      opacity: 0.5
    })
  });
  
  marker.addTo(Map);
}