<?php

function render_populous_map_func() {
    return "<div id='map'></div>
		<script>
		mapboxgl.accessToken = 'pk.eyJ1IjoicG9wdWxvdXNtYXAiLCJhIjoiY2oxbWxjOWF1MDBhZzMzcGpreGR3OGJpbiJ9.zlYdACNoreNJ61pfd67KIg';
		var map = new mapboxgl.Map({
		 container: 'map',
		 style: 'mapbox://styles/populousmap/cj821itn4069b2ro1xh44nror',
		 center: [-126.196992, 54.588569], 
		 zoom: 4.5
		});

		map.scrollZoom.disable();

		</script>";
}

add_shortcode('render_populous_map', 'render_populous_map_func');
