mapboxgl.accessToken = 'pk.eyJ1IjoicG9wdWxvdXNtYXAiLCJhIjoiY2oxbWxjOWF1MDBhZzMzcGpreGR3OGJpbiJ9.zlYdACNoreNJ61pfd67KIg';
var layerIDs = []; // Will contain a list used to filter against.
var filterInput = document.getElementById('filter-input');
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/populousmap/cj821itn4069b2ro1xh44nror',
	center: [-126.196992, 54.588569], 
	zoom: 4.5
});

var years = [];

function addYears(low, high) {
	for (i = low; i < high; i++) {
		years.push(i.toString());
	}
}

addYears(1778, 2020);

function filterBy(year) {
	var yearString = year.toString();
    var filters = ['==', ["string", ["get", "custom_field_year"]], yearString];
    map.setFilter('allPoints', filters);

    // Set the label to the month
    document.getElementById('year').textContent = years[year];
}

map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {

	map.addSource("datapoints", {
		"type": "vector",
		"url": "mapbox://populousmap.cj2p0vytf02jz2wqb59dpnlmg-7vbi6"
	});

	map.addLayer({
		'id': 'allPoints',
		'type': 'circle',
		'source': "datapoints",
		'source-layer': 'Development_Test',
		'paint': {
			'circle-color': [
				"match",
				["string", ["get", "custom_field_year"]],
				"1900", "#fbb03b",
				"1901", "#223b53",
				"1902", "#e55e5e",
				"1903", "#3bb2d0",
				"1904", "#ccc",
				"#000000"
				],
		},
	});

	document.getElementById('slider').addEventListener('input', function(e) {
		console.log(e.target.value);
        var year = parseInt(e.target.value, 10);
        filterBy(year);
    });

	// When a click event occurs on a feature in the data-points layer, open a popup at the
	// location of the feature, with description HTML from its properties.
	map.on('click', 'allPoints', function (e) {
		var properties = e.features[0].properties;
		var popupText = '<h3 class="title">' 
			+ properties.post_title 
			+ '</h3><p>' 
			+ properties.custom_field_year 
			+ '</p><p>' 
			+ properties.post_content 
			+ '</p><p class="read-more"><a href="' 
			+ properties.guid 
			+ '">Read More</a></p><img src="' 
			+ properties.featured_image 
			+ '"><p class="source"><a href="' 
			+ properties.custom_field_source 
			+ '" target="_blank">Source<span class="dashicons dashicons-external"></span></a></p>';
		new mapboxgl.Popup()
		.setLngLat(e.features[0].geometry.coordinates)
		.setHTML(popupText)
		.addTo(map);
		console.log(e);
	});

});    