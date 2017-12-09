mapboxgl.accessToken = 'pk.eyJ1IjoicG9wdWxvdXNtYXAiLCJhIjoiY2oxbWxjOWF1MDBhZzMzcGpreGR3OGJpbiJ9.zlYdACNoreNJ61pfd67KIg';
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/populousmap/cj821itn4069b2ro1xh44nror',
	center: [-126.196992, 54.588569], 
	zoom: 4.5
});

map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {

	map.addSource("data-points", {
		"type": "vector",
		"url": "mapbox://populousmap.cj2p0vytf02jz2wqb59dpnlmg-7vbi6"
	})

	map.addLayer({
		'id': 'breweries',
		'type': 'circle',
		'source': "data-points",
		'source-layer': 'Development_Test',
		'paint': {
			'circle-color': '#000000',
		}
	});

	var wasLoaded = false;
	map.on('render', function() {
	    if (!map.loaded() || wasLoaded) return;
	    console.log(map.querySourceFeatures('data-points'));
	    wasLoaded = true;
	});

	// When a click event occurs on a feature in the data-points layer, open a popup at the
	// location of the feature, with description HTML from its properties.
	map.on('click', 'data-points', function (e) {
		var post = JSON.parse(e.features[0].properties.post);
		var customFields = JSON.parse(e.features[0].properties.custom_fields);
		var categoies = JSON.parse(e.features[0].properties.categories);
		var popupText = '<h3 class="title">' 
			+ post.post_title 
			+ '</h3><p>' 
			+ customFields.year 
			+ '</p><p>' 
			+ post.post_content 
			+ '</p><p class="read-more"><a href="' 
			+ post.guid 
			+ '">Read More</a></p><img src="' 
			+ e.features[0].properties.featured_image 
			+ '"><p class="source"><a href="' 
			+ customFields.source 
			+ '" target="_blank">Source<span class="dashicons dashicons-external"></span></a></p>';
		new mapboxgl.Popup()
		.setLngLat(e.features[0].geometry.coordinates)
		.setHTML(popupText)
		.addTo(map);
		console.log(e);
	});

});

