import { ipify, setMap, setMaker } from './api.js';

const BtnSubmit = document.getElementById('btn-submit');
const ipInput = document.getElementById('ip-input');

const IpInfo = document.getElementById('ip-info');
const location = document.getElementById('location-info');
const timezone = document.getElementById('timezone-info');
const isp = document.getElementById('isp-info')

IpInfo.innerText = 'loading...';
location.innerText = 'loading...';
timezone.innerText = 'loading...';
isp.innerText = 'loading...';


BtnSubmit.addEventListener('click', async () => {
  dataApi = await ipify(ipInput.value);
})

setMap();

let dataApi = {};

async function getIpClient() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    dataApi = await ipify(response.data.ip)
  } catch (error) {
    console.error(error);
  }
}

await getIpClient();

setMaker(dataApi.location.lng, dataApi.location.lat);