<?php
/**
 * Plugin Name:       RAVIO Commerce Bridge
 * Description:       Market rules (Bangladesh / international), payment-method restrictions, headless storefront endpoints and a hosted-redirect SSLCOMMERZ gateway for the RAVIO Next.js storefront.
 * Version:           0.1.0
 * Requires at least: 6.5
 * Requires PHP:      8.1
 * Requires Plugins:  woocommerce
 * Author:            Ravio & Co.
 * License:           GPL-2.0-or-later
 * Text Domain:       ravio-bridge
 *
 * STATUS: written but NOT executed (no PHP/WordPress runtime was available when authored). Treat as unreviewed code:
 * lint it, install it on STAGING first, and run docs/PAYMENTS-AND-TESTING.md before use.
 */
defined( 'ABSPATH' ) || exit;

define( 'RAVIO_BRIDGE_VERSION', '0.1.0' );
define( 'RAVIO_BRIDGE_DIR', plugin_dir_path( __FILE__ ) );

require_once RAVIO_BRIDGE_DIR . 'includes/class-settings.php';
require_once RAVIO_BRIDGE_DIR . 'includes/class-market-rules.php';
require_once RAVIO_BRIDGE_DIR . 'includes/class-rest.php';

add_action( 'before_woocommerce_init', static function () {
	if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
		\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
	}
} );

add_action( 'plugins_loaded', static function () {
	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}
	Ravio_Settings::init();
	Ravio_Market_Rules::init();
	Ravio_REST::init();

	require_once RAVIO_BRIDGE_DIR . 'includes/class-gateway-sslcommerz.php';
	add_filter( 'woocommerce_payment_gateways', static function ( $gateways ) {
		$gateways[] = 'Ravio_Gateway_SSLCommerz';
		return $gateways;
	} );
	Ravio_Gateway_SSLCommerz::register_callbacks();
}, 20 );
