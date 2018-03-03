<?php

function render_populous_map_func() {
    ob_start();
    get_template_part('map_display');
    return ob_get_clean(); 
}

function action_category_field_map_options( $term ) {
	$termMeta = get_term_meta( $term->term_id, 'show_on_map', true );
	?>
	<tr class="form-field">
		<th scope="row"><label for="show_on_map"><?php esc_html_e( 'Show on Map' ); ?></label></th>
		<td>
			<input type="checkbox" name="show_on_map" id="show_on_map" value="show_on_map" <?php checked( $termMeta, 'show_on_map', true ); ?>>
		</td>
	</tr>
	<?php
}

function save_category_field_map_options( $termID ) {
	if ( !empty( $_POST[ 'show_on_map' ] ) ) {
		$data = sanitize_key( $_POST[ 'show_on_map' ] );
		update_term_meta( $termID, 'show_on_map', $data );
	} else {
		update_term_meta( $termID, 'show_on_map', null );
	}
}

add_shortcode('render_populous_map', 'render_populous_map_func');

function load_render_map_script(){
	wp_enqueue_script( 'mapbox_gl_js_script', 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.1/mapbox-gl.js' );
	wp_enqueue_script( 'render_map_script', get_stylesheet_directory_uri() . '/render-map.js', array( 'jquery' ), false, true );
	wp_enqueue_script( 'wNumb_script', get_stylesheet_directory_uri() . '/wNumb.js' );
	wp_enqueue_script( 'noiuslider_script', get_stylesheet_directory_uri() . '/nouislider.min.js' );
	wp_enqueue_style( 'nouislider_style', get_stylesheet_directory_uri() . '/nouislider.min.css' );
	wp_enqueue_style( 'mapbox_gl_js_style', 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.1/mapbox-gl.css' );
} 

add_action('category_edit_form_fields', 'action_category_field_map_options');
add_action( 'create_category', 'save_category_field_map_options');
add_action( 'edited_category', 'save_category_field_map_options');
add_action( 'wp_enqueue_scripts', 'load_render_map_script' );
