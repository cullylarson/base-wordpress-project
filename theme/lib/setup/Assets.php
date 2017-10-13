<?php

add_action( 'wp_enqueue_scripts', function() {
    $theme = wp_get_theme();
    $version = empty($theme['Version'])
        ? false
        : $theme['Version'];

    wp_enqueue_style( 'project_name/css', get_template_directory_uri() . '/build/css/main.css', [], $version);

    wp_enqueue_script( 'project_name/js', get_template_directory_uri() . '/build/js/main.js', [], $version);
});

