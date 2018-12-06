<?php

namespace DeliciousBrains\WPMDBCli;

use DeliciousBrains\WPMDB\Container;

class Initialize {

	public function __construct() { }

	public function registerAddon() {
		$container = Container::getInstance();
		$container->add( 'cli_addon', 'DeliciousBrains\WPMDBCli\CliAddon' )
		          ->withArguments( [
			          'addon',
			          'properties',
			          'dynamic_properties',
		          ] );

		$container->add( 'cli_addon_cli', 'DeliciousBrains\WPMDBCli\Cli' )
		          ->withArguments( [
			          'form_data',
			          'util',
			          'cli_manager',
			          'table',
			          'error_log',
			          'initiate_migration',
			          'finalize_migration',
			          'http_helper',
			          'migration_manager',
			          'migration_state_manager',
			          'connection',
			          'backup_export',
			          'properties',
			          'multisite',
			          'import',
			          'dynamic_properties',
		          ] );

		$container->add( 'cli_settings', 'DeliciousBrains\WPMDBCli\Setting' )
		          ->withArguments( [
			          'form_data',
			          'util',
			          'cli_manager',
			          'table',
			          'error_log',
			          'initiate_migration',
			          'finalize_migration',
			          'http_helper',
			          'migration_manager',
			          'migration_state_manager',
			          'dynamic_properties',
			          'license',
			          'settings',
		          ] );
	}
}
