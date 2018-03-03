<div id='map'></div>
<div class='categories'>
	<div class='categories-menu'><span class="dashicons dashicons-menu"></span>Filters &amp; Legend</div>
	<div class='categories-hide'><span class="dashicons dashicons-hidden"></span>Hide Filters</div>
	<ul class="filters">
		<?php 

		$args = array(
			'taxonomy' => 'category',
			'type' => 'post',
			'orderby' => 'name'
		);
		$categories = get_categories( $args );

		foreach ($categories as $category) {
			$show_on_map_meta = get_term_meta( $category->term_id, 'show_on_map', true );
			if ( $show_on_map_meta == 'show_on_map' ) {
				echo '<li>' . $category->name . '</li>';
			}
		}

		?>
	</ul>
	<div class='search'>
		<input type='text' name='tag-search' id='tag-search' placeholder="Search tags">
	</div>
	<div class='categories-close'><span class="dashicons dashicons-yes"></span>Done</div>
	<div class='legend'>
		<ul>
			<li id="social">Social</li>
			<li id="economic">Economic</li>
			<li id="political">Political</li>
			<li id="environmental">Environmental</li>
		</ul>
	</div>
</div>
<div class="year-slider">
	<input type="number" min="-20" max="40" step="1" id="input-number-low">
	<div id="html5"></div>
	<input type="number" min="-20" max="40" step="1" id="input-number-high">
</div>
