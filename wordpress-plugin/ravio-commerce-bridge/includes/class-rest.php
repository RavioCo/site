<?php
defined( 'ABSPATH' ) || exit;

/** GET /wp-json/ravio/v1/markets : countries the store serves, their states and their allowed payment methods. */
class Ravio_REST {
	public static function init(): void {
		add_action( 'rest_api_init', static function () {
			register_rest_route( 'ravio/v1', '/markets', array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => array( __CLASS__, 'markets' ),
			) );
		} );
	}

	public static function markets(): WP_REST_Response {
		$wc        = WC();
		$countries = $wc->countries->get_countries();
		$allowed   = Ravio_Settings::get()['shipping_countries'];
		$gateways  = $wc->payment_gateways->payment_gateways();
		$out       = array();
		foreach ( $allowed as $code ) {
			if ( ! isset( $countries[ $code ] ) ) {
				continue;
			}
			$methods = array();
			foreach ( Ravio_Market_Rules::allowed_gateways_for( $code ) as $id ) { // already excludes blocked (bKash) and enforces COD = BD
				if ( isset( $gateways[ $id ] ) && 'yes' === $gateways[ $id ]->enabled ) {
					$methods[] = array( 'id' => $id, 'title' => wp_strip_all_tags( $gateways[ $id ]->get_title() ) );
				}
			}
			$out[] = array(
				'code'            => $code,
				'name'            => $countries[ $code ],
				'states'          => (array) $wc->countries->get_states( $code ),
				'payment_methods' => $methods,
			);
		}
		$res = new WP_REST_Response( array( 'base_currency' => get_woocommerce_currency(), 'countries' => $out ) );
		$res->header( 'Cache-Control', 'no-store' );
		return $res;
	}
}
