<?php
defined( 'ABSPATH' ) || exit;

/**
 * Owner-editable market configuration (WooCommerce > RAVIO Markets).
 * Nothing here invents rates, taxes or eligibility: defaults are Bangladesh only, everything else is opt-in.
 */
class Ravio_Settings {
	const OPT = 'ravio_markets';

	public static function defaults(): array {
		return array(
			// Countries the owner has VERIFIED shipping arrangements AND configured WooCommerce shipping zone rates for.
			'shipping_countries'   => array( 'BD' ),
			// Payment method id => countries allowed (ISO 3166-1 alpha-2).
			'gateway_countries'    => array(
				'cod'           => array( 'BD' ),
				'bkash'         => array( 'BD' ),
				'ravio_sslcommerz' => array( 'BD' ),
			),
			'storefront_url'       => 'https://ravioco.com',
		);
	}

	public static function get(): array {
		$saved = get_option( self::OPT, array() );
		return array_replace_recursive( self::defaults(), is_array( $saved ) ? $saved : array() );
	}

	public static function init(): void {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ) );
		add_action( 'admin_init', array( __CLASS__, 'register' ) );
	}

	public static function menu(): void {
		add_submenu_page( 'woocommerce', 'RAVIO Markets', 'RAVIO Markets', 'manage_woocommerce', 'ravio-markets', array( __CLASS__, 'render' ) );
	}

	public static function register(): void {
		register_setting( 'ravio_markets_group', self::OPT, array( 'sanitize_callback' => array( __CLASS__, 'sanitize' ) ) );
	}

	private static function codes( $raw ): array {
		$list = is_array( $raw ) ? $raw : preg_split( '/[\s,]+/', (string) $raw );
		$out  = array();
		foreach ( (array) $list as $c ) {
			$c = strtoupper( trim( (string) $c ) );
			if ( preg_match( '/^[A-Z]{2}$/', $c ) ) {
				$out[ $c ] = $c;
			}
		}
		return array_values( $out );
	}

	public static function sanitize( $in ): array {
		$in  = is_array( $in ) ? $in : array();
		$out = self::defaults();
		$out['shipping_countries'] = self::codes( $in['shipping_countries'] ?? '' );
		foreach ( array_keys( $out['gateway_countries'] ) as $id ) {
			$list = self::codes( $in['gateway_countries'][ $id ] ?? '' );
			if ( in_array( $id, array( 'cod', 'bkash' ), true ) ) {
				$list = array_values( array_intersect( $list, array( 'BD' ) ) ); // policy ceiling: Bangladesh only
			}
			$out['gateway_countries'][ $id ] = $list;
		}
		$url = esc_url_raw( (string) ( $in['storefront_url'] ?? '' ) );
		$out['storefront_url'] = ( 0 === strpos( $url, 'https://' ) ) ? untrailingslashit( $url ) : $out['storefront_url'];
		return $out;
	}

	public static function render(): void {
		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			return;
		}
		$s = self::get();
		echo '<div class="wrap"><h1>RAVIO Markets</h1>';
		echo '<p>Comma-separated ISO country codes. <strong>Only list a country after you have a verified shipping arrangement and have configured a WooCommerce shipping zone with rates for it.</strong> This plugin never sets prices, rates or taxes.</p>';
		echo '<form method="post" action="options.php">';
		settings_fields( 'ravio_markets_group' );
		echo '<table class="form-table">';
		printf( '<tr><th>Shipping countries (allow-list)</th><td><input class="regular-text" name="%s[shipping_countries]" value="%s"></td></tr>', esc_attr( self::OPT ), esc_attr( implode( ',', $s['shipping_countries'] ) ) );
		foreach ( $s['gateway_countries'] as $id => $countries ) {
			printf( '<tr><th>Payment: %1$s</th><td><input class="regular-text" name="%2$s[gateway_countries][%1$s]" value="%3$s"></td></tr>', esc_html( $id ), esc_attr( self::OPT ), esc_attr( implode( ',', $countries ) ) );
		}
		printf( '<tr><th>Storefront URL (https)</th><td><input class="regular-text" name="%s[storefront_url]" value="%s"></td></tr>', esc_attr( self::OPT ), esc_attr( $s['storefront_url'] ) );
		echo '</table>';
		submit_button();
		echo '</form></div>';
	}
}
