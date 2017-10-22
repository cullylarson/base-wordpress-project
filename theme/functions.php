<?php

call_user_func( function() {
    $setupScripts = [
        __DIR__ . '/lib/setup/Autoload.php',
        __DIR__ . '/lib/setup/LayoutWrapper.php',
        __DIR__ . '/lib/setup/Assets.php',
    ];
    foreach($setupScripts as $setupScript) {
        include_once($setupScript);
    }
});
