<?php
/**
 * Layout
 * - defines the skeleton of the rendered page
 * - called from lib/LayoutWrapper.php
 */
return function($main_content) {
    ob_start();
?><!doctype html>
<html <?php language_attributes(); ?>>

<?php get_template_part( 'template-parts/head' ); ?>

<body <?php body_class(); ?>>

<?php
    // add the <header> element
    do_action( 'get_header' );
    get_template_part( 'template-parts/header' );
?>

<main>
    <?= $main_content; ?>
</main>

<?php
    // add the <footer> element
    do_action( 'get_footer' );
    get_template_part( 'template-parts/footer' );
    wp_footer();
?>
</body>
</html>

<?php
    return ob_get_clean();
};
