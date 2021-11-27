mapboxgl.accessToken = 'pk.eyJ1Ijoic3Vla2kiLCJhIjoiY2tqMDd1ZGZ3MWJzMDJ4bTBlY2R4d3ZleiJ9.brLbO0NpdUR4Bbbqd0MM8w';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [0, 0], // starting position [lng, lat]
    zoom: 1 // starting zoom
});
map.addControl(new mapboxgl.FullscreenControl()); // add fullscreen option

const url = 'http://127.0.0.1:3000'
fetch (url)
    .then(obj => obj.text())
    .then(data => {
        let json = JSON.parse(data);
        let cities = json.cities;

        cities.forEach(city => {
            // create popup
            let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<div style="text-align: left;">
                    <b>Name:</b> ${city.name} <br>
                    <b>Country:</b> ${city.country} <br>
                    <b>Population:</b> ${city.population}
                </div>`
            );

            // add popup to map
            new mapboxgl.Marker()
                .setLngLat([city.longitude, city.latitude])
                .setPopup(popup)
                .addTo(map);
        })
    });