<?php

function wpmdb_setup_cli_addon() {
	$container = \DeliciousBrains\WPMDB\Container::getInstance();

	// Load pro classes
	$register_pro = new \DeliciousBrains\WPMDB\Pro\RegisterPro();
	$register_pro->loadContainer();

	// Register CLI classes with the Container
	( new \DeliciousBrains\WPMDBCli\Initialize() )->registerAddon();

	$container->get( 'cli_addon' )->register();
	$container->get( 'cli_addon_cli' )->register();

	load_plugin_textdomain( 'wp-migrate-db-pro-cli', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

	if ( defined( 'WP_CLI' ) && WP_CLI ) {
		\DeliciousBrains\WPMDBCli\Command::register();
	}
}

function wpmdb_get_cli_addon_instance() {
	return \DeliciousBrains\WPMDB\Container::getInstance()->get( 'cli_addon_cli' );
}
