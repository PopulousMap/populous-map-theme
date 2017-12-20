<?php

function render_populous_map_func() {
    ob_start();
    get_template_part('map_display');
    return ob_get_clean(); 
}

add_shortcode('render_populous_map', 'render_populous_map_func');

add_action( 'wp_enqueue_scripts', 'load_render_map_script' );
function load_render_map_script(){
	wp_enqueue_script( 'mapbox_gl_js_script', 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.1/mapbox-gl.js' );
	wp_enqueue_script( 'render_map_script', get_stylesheet_directory_uri() . '/render-map.js', array( 'jquery' ), false, true );
	wp_enqueue_script( 'wNumb_script', get_stylesheet_directory_uri() . '/wNumb.js' );
	wp_enqueue_script( 'noiuslider_script', get_stylesheet_directory_uri() . '/nouislider.min.js' );
	wp_enqueue_style( 'nouislider_style', get_stylesheet_directory_uri() . '/nouislider.min.css' );
	wp_enqueue_style( 'mapbox_gl_js_style', 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.1/mapbox-gl.css' );
} 
