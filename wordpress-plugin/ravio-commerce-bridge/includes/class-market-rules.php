<?php
defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\StoreApi\Exceptions\RouteException;

/**
 * Enforces market rules in THREE places so a headless client cannot bypass them:
 *  1. Which countries WooCommerce will ship to.
 *  2. Which gateways are offered (classic filter).
 *  3. A hard server-side check when the Store API checkout request is turned into an order.
 */
class Ravio_Market_Rules {
	public static function init(): void {
		add_filter( 'woocommerce_countries_shipping_countries', array( __CLASS__, 'shipping_countries' ) );
		add_filter( 'woocommerce_available_payment_gateways', array( __CLASS__, 'filter_gateways' ), 99 );
		add_action( 'woocommerce_store_api_checkout_update_order_from_request', array( __CLASS__, 'validate_checkout' ), 10, 2 );
		add_filter( 'rest_pre_dispatch', array( __CLASS__, 'require_proxy_secret' ), 5, 3 );
	}

	/** Intersect WooCommerce's list with the owner's verified allow-list. */
	public static function shipping_countries( $countries ) {
		$allowed = Ravio_Settings::get()['shipping_countries'];
		return array_intersect_key( (array) $countries, array_flip( $allowed ) );
	}

	/** Gateways that must never be offered, whatever the settings say. */
	public static function is_blocked_gateway( string $id ): bool {
		// bKash stays unavailable until a real, verified integration exists and the owner defines RAVIO_BKASH_VERIFIED in wp-config.php.
		if ( false !== stripos( $id, 'bkash' ) && ! ( defined( 'RAVIO_BKASH_VERIFIED' ) && RAVIO_BKASH_VERIFIED ) ) {
			return true;
		}
		return false;
	}

	/** Hard-coded country ceilings that settings cannot widen. */
	private static function ceiling( string $id ): ?array {
		return in_array( $id, array( 'cod', 'bkash' ), true ) ? array( 'BD' ) : null;
	}

	public static function allowed_gateways_for( string $country ): array {
		$country = strtoupper( $country );
		$out     = array();
		foreach ( Ravio_Settings::get()['gateway_countries'] as $id => $list ) {
			if ( self::is_blocked_gateway( $id ) ) {
				continue;
			}
			$cap = self::ceiling( $id );
			if ( null !== $cap && ! in_array( $country, $cap, true ) ) {
				continue; // COD is Bangladesh-only by policy, not by setting.
			}
			if ( in_array( $country, $list, true ) ) {
				$out[] = $id;
			}
		}
		return $out;
	}

	public static function filter_gateways( $gateways ) {
		if ( is_admin() && ! wp_doing_ajax() ) {
			return $gateways;
		}
		if ( ! function_exists( 'WC' ) || ! WC()->customer ) {
			return $gateways;
		}
		$country = WC()->customer->get_billing_country();
		if ( ! $country ) {
			return $gateways;
		}
		$ok = self::allowed_gateways_for( $country );
		return array_filter( (array) $gateways, static function ( $g, $id ) use ( $ok ) {
			if ( self::is_blocked_gateway( (string) $id ) ) {
				return false;
			}
			return in_array( $id, $ok, true ) || ! array_key_exists( $id, Ravio_Settings::get()['gateway_countries'] );
		}, ARRAY_FILTER_USE_BOTH );
	}

	/** Authoritative check. Throws -> Store API returns a 4xx and NO order proceeds to payment. */
	public static function validate_checkout( $order, $request ): void {
		$billing = strtoupper( (string) $order->get_billing_country() );
		$ship    = strtoupper( (string) ( $order->get_shipping_country() ?: $billing ) );
		$method  = (string) $order->get_payment_method();

		$ship_ok = Ravio_Settings::get()['shipping_countries'];
		if ( $order->needs_shipping_address() && ! in_array( $ship, $ship_ok, true ) ) {
			throw new RouteException( 'ravio_country_not_served', __( 'We do not currently deliver to this country.', 'ravio-bridge' ), 400 );
		}
		// Fail closed: a method must be explicitly allowed for the billing country. Blocked ids (e.g. bKash) never pass.
		if ( self::is_blocked_gateway( $method ) || ! in_array( $method, self::allowed_gateways_for( $billing ), true ) ) {
			throw new RouteException( 'ravio_payment_not_available', __( 'This payment method is not available for your country.', 'ravio-bridge' ), 400 );
		}
		// The cart session the shopper saw must match what is being ordered (stops stale rate/country combinations).
		if ( $order->needs_shipping_address() && function_exists( 'WC' ) && WC()->customer && strtoupper( (string) WC()->customer->get_shipping_country() ) !== $ship ) {
			throw new RouteException( 'ravio_address_stale', __( 'Your delivery address changed. Please review delivery options and try again.', 'ravio-bridge' ), 409 );
		}
	}

	/**
	 * The proxy secret is MANDATORY outside local/development environments.
	 * Protected: /wc/store/* and /ravio/v1/*. Not touched: wp-admin, /wc/v3 (own authentication), wc-api callbacks.
	 * Missing constant in production => 503 (fail closed). Wrong/missing header => 403.
	 */
	public static function require_proxy_secret( $result, $server, $request ) {
		$route = $request->get_route();
		if ( 0 !== strpos( $route, '/wc/store/' ) && 0 !== strpos( $route, '/ravio/v1/' ) ) {
			return $result;
		}
		$configured = defined( 'RAVIO_PROXY_SECRET' ) ? (string) RAVIO_PROXY_SECRET : '';
		if ( strlen( $configured ) < 32 ) {
			if ( in_array( wp_get_environment_type(), array( 'local', 'development' ), true ) ) {
				return $result;
			}
			return new WP_Error( 'ravio_misconfigured', 'Service unavailable.', array( 'status' => 503 ) );
		}
		if ( ! hash_equals( $configured, (string) $request->get_header( 'X-Ravio-Proxy-Secret' ) ) ) {
			return new WP_Error( 'ravio_forbidden', 'Forbidden.', array( 'status' => 403 ) );
		}
		return $result;
	}
}
