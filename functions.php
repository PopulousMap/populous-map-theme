<?php

function render_populous_map_func() {
    return "<div id='map'></div>";
}

add_shortcode('render_populous_map', 'render_populous_map_func');

add_action( 'wp_enqueue_scripts', 'load_render_map_script' );
function load_render_map_script(){
  wp_enqueue_script( 'render_map_script', get_stylesheet_directory_uri() . '/render-map.js', array( 'jquery' ), false, true );
}
