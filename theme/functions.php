<?php

call_user_func( function() {
    $setupScripts = [
        '/lib/setup/Autoload.php',
        '/lib/setup/LayoutWrapper.php',
        '/lib/setup/Assets.php',
    ];
    foreach ( $setupScripts as $setupScript ) {
        require_once locate_template( $setupScript );
    }
});
