(function($) {

	// Functions

	/* Adds a filter to the map that only shows points within the year range */
	var allFilters = [];
	var years;

	function setYearRange(yearRange) {
		years = yearRange;
	}

	function filterByYearRange() {
		var low = years[0];
		var high = years[1];
		var allYears = [];
		for (i = low; i <= high; i++) {
			allYears.push(i.toString());
		}
		var filter = ["in", "custom_field_year"];
		var yearFilter = filter.concat(allYears);
		allFilters.push(yearFilter);
	}

	function filterByCategory() {
		$(".active").each(function() {
			var categoryFilter = ['has', 'category_' + $( this ).text().toLowerCase() ];
			console.log(categoryFilter);
			allFilters.push(categoryFilter);
		});	
	}

	function setMapFilters() {
		allFilters = ["all"];
		filterByYearRange();
		filterByCategory();
		console.log(allFilters);
		map.setFilter('allPoints', allFilters);
	}

	function setSliderHandle(i, value) {
		var r = [null,null];
		r[i] = value;
		html5Slider.noUiSlider.set(r);
	}

	/* Display the map */

	mapboxgl.accessToken = 'pk.eyJ1IjoicG9wdWxvdXNtYXAiLCJhIjoiY2oxbWxjOWF1MDBhZzMzcGpreGR3OGJpbiJ9.zlYdACNoreNJ61pfd67KIg';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/populousmap/cj821itn4069b2ro1xh44nror',
		center: [-126.196992, 54.588569], 
		maxBounds: [
			[-150, 44],
			[-108, 63]
		],
		zoom: 4.5
	});

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
					["string", ["get", "custom_field_segment"]],
					"Social", "#7FC9DB",
					"Economic", "#EC7349",
					"Political", "#FCF77E",
					"Environmental", "#8BD462",
					"#000000"
					],
			},
		});

		// When a click event occurs on a feature in the data-points layer, open a popup at the
		// location of the feature, with description HTML from its properties.
		map.on('click', 'allPoints', function (e) {
			var properties = e.features[0].properties;
			var popupText = '<h3 class="title">' 
				+ properties.post_title 
				+ '</h3><p>' 
				+ properties.custom_field_year 
				+ '</p>';
			if (properties.post_excerpt != '') {
				popupText += '<p>' 
					+ properties.post_excerpt 
					+ '</p>';
			}
			if (properties.post_content != '') {
				popupText += '<p class="read-more"><a href="' 
					+ properties.guid 
					+ '">Read More</a></p>';
			}
			if (properties.hasOwnProperty('featured_image') && properties.featured_image != '') {
				popupText += '<img src="' 
					+ properties.featured_image 
					+ '">';
			}
			if (properties.custom_field_source != '') {
				popupText += '<p class="source"><a href="' 
				+ properties.custom_field_source 
				+ '" target="_blank">Source<span class="dashicons dashicons-external"></span></a></p>';
			}
			new mapboxgl.Popup()
			.setLngLat(e.features[0].geometry.coordinates)
			.setHTML(popupText)
			.addTo(map);
			console.log(e);
		});

		// Create a dual slider

		var html5Slider = document.getElementById('html5');

		var input0 = document.getElementById('input-number-low');
		var input1 = document.getElementById('input-number-high');
		var inputs = [input0, input1];

		noUiSlider.create(html5Slider, {
			start: [ 1750, 2018 ],
			connect: true,
			step: 1,
			tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
			range: {
				'min': 1750,
				'max': 2018
			}
		});

		var yearRange = html5Slider.noUiSlider.get();

		html5Slider.noUiSlider.on('update', function( values, handle ) {
			inputs[handle].value = values[handle];
			setYearRange( html5Slider.noUiSlider.get() );
			setMapFilters();
		});

		// Listen to keydown events on the input field.
		inputs.forEach(function(input, handle) {

			input.addEventListener('change', function(){
				setSliderHandle(handle, this.value);
			});

			input.addEventListener('keydown', function( e ) {

				var values = html5Slider.noUiSlider.get();
				var value = Number(values[handle]);

				// [[handle0_down, handle0_up], [handle1_down, handle1_up]]
				var steps = html5Slider.noUiSlider.steps();

				// [down, up]
				var step = steps[handle];

				var position;

				// 13 is enter key
				if ( e.which == 13 ) {
					setSliderHandle(handle, this.value);
				}
			});
		});

		$(".categories-menu").click( function() {
			$(".categories ul").slideToggle();
			$(".categories-close").slideToggle();
		} );

		$(".categories-close").click( function() {
			$(".categories-close").slideToggle();
			$(".categories ul").slideToggle();
		} );

		$(".categories-hide").click( function() {
			$( this ).slideToggle();
			$(".categories ul").slideToggle( 400, function() {
				$(".categories-menu").css('display', 'inline-block');
			});
		} );

		$("li").click( function() { 
			$( this ).toggleClass('active');
			var category = $( this ).text();
			setMapFilters();
		});

	});

})( jQuery );
