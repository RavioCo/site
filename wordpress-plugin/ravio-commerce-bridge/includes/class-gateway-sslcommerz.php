<?php
defined( 'ABSPATH' ) || exit;

require_once __DIR__ . '/class-sslc-validator.php';

/**
 * SSLCOMMERZ hosted-redirect gateway (custom, Store-API friendly).
 *
 * Why custom: a stock plugin that works in classic checkout is not proven to work in Store API checkout.
 * This gateway needs NO browser-posted fields: process_payment() creates a session server-side and returns the
 * hosted page URL as `redirect`, which the Store API returns to the storefront as payment_result.redirect_url.
 *
 * Trust model: the browser redirect is NEVER trusted. The order is completed only after a server-to-server call to
 * SSLCOMMERZ's validation API confirms status, tran_id, amount and currency. Handlers are idempotent.
 *
 * !! Endpoint names and response fields below are written from memory of SSLCOMMERZ's public developer docs and have NOT
 * !! been verified against current documentation or run against the sandbox. Verify before relying on them.
 * Credentials are read from the gateway settings or from constants in wp-config.php (preferred):
 *   define('RAVIO_SSLC_STORE_ID', '...'); define('RAVIO_SSLC_STORE_PASSWORD', '...');
 */
class Ravio_Gateway_SSLCommerz extends WC_Payment_Gateway {

	public function __construct() {
		$this->id                 = 'ravio_sslcommerz';
		$this->method_title       = 'SSLCOMMERZ (RAVIO)';
		$this->method_description = 'Hosted redirect payment through SSLCOMMERZ. Requires an approved merchant account. Sandbox by default.';
		$this->has_fields         = false;
		$this->supports           = array( 'products' ); // Refunds: NOT implemented (process manually in the SSLCOMMERZ merchant panel).
		$this->init_form_fields();
		$this->init_settings();
		$this->title   = $this->get_option( 'title', 'Card, mobile banking and net banking' );
		$this->enabled = $this->get_option( 'enabled', 'no' );
		add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );
	}

	public function init_form_fields(): void {
		$this->form_fields = array(
			'enabled'  => array( 'title' => 'Enable', 'type' => 'checkbox', 'label' => 'Enable SSLCOMMERZ', 'default' => 'no' ),
			'title'    => array( 'title' => 'Title', 'type' => 'text', 'default' => 'Card, mobile banking and net banking' ),
			'sandbox'  => array( 'title' => 'Sandbox', 'type' => 'checkbox', 'label' => 'Use sandbox (keep ON until merchant approval and a verified test order)', 'default' => 'yes' ),
			'store_id' => array( 'title' => 'Store ID', 'type' => 'text', 'description' => 'Prefer defining RAVIO_SSLC_STORE_ID in wp-config.php.' ),
			'store_pw' => array( 'title' => 'Store password', 'type' => 'password', 'description' => 'Prefer defining RAVIO_SSLC_STORE_PASSWORD in wp-config.php.' ),
		);
	}

	private function creds(): array {
		return array(
			defined( 'RAVIO_SSLC_STORE_ID' ) ? RAVIO_SSLC_STORE_ID : $this->get_option( 'store_id' ),
			defined( 'RAVIO_SSLC_STORE_PASSWORD' ) ? RAVIO_SSLC_STORE_PASSWORD : $this->get_option( 'store_pw' ),
		);
	}

	private function host(): string {
		return 'yes' === $this->get_option( 'sandbox', 'yes' ) ? 'https://sandbox.sslcommerz.com' : 'https://securepay.sslcommerz.com';
	}

	public function is_available() {
		[ $id, $pw ] = $this->creds();
		return 'yes' === $this->enabled && $id && $pw && parent::is_available();
	}

	public function process_payment( $order_id ) {
		$order = wc_get_order( $order_id );
		[ $store_id, $store_pw ] = $this->creds();
		$cb = add_query_arg( 'wc-api', 'ravio_sslc', home_url( '/' ) );

		$body = array(
			'store_id'         => $store_id,
			'store_passwd'     => $store_pw,
			'total_amount'     => wc_format_decimal( $order->get_total(), 2 ),
			'currency'         => $order->get_currency(),
			'tran_id'          => 'RAVIO-' . $order->get_id() . '-' . wp_generate_password( 20, false, false ),
			'success_url'      => add_query_arg( 'r', 'success', $cb ),
			'fail_url'         => add_query_arg( 'r', 'fail', $cb ),
			'cancel_url'       => add_query_arg( 'r', 'cancel', $cb ),
			'ipn_url'          => add_query_arg( 'r', 'ipn', $cb ),
			'cus_name'         => trim( $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() ),
			'cus_email'        => $order->get_billing_email(),
			'cus_add1'         => $order->get_billing_address_1(),
			'cus_city'         => $order->get_billing_city(),
			'cus_postcode'     => $order->get_billing_postcode() ?: '0000',
			'cus_country'      => WC()->countries->countries[ $order->get_billing_country() ] ?? $order->get_billing_country(),
			'cus_phone'        => $order->get_billing_phone() ?: '00000000000',
			'shipping_method'  => $order->needs_shipping_address() ? 'Courier' : 'NO',
			'product_name'     => 'RAVIO order #' . $order->get_order_number(),
			'product_category' => 'Apparel',
			'product_profile'  => 'physical-goods',
		);
		$res = wp_remote_post( $this->host() . '/gwprocess/v4/api.php', array( 'timeout' => 20, 'body' => $body ) );
		$json = is_wp_error( $res ) ? null : json_decode( wp_remote_retrieve_body( $res ), true );
		if ( ! is_array( $json ) || empty( $json['GatewayPageURL'] ) || 'SUCCESS' !== ( $json['status'] ?? '' ) ) {
			$order->add_order_note( 'SSLCOMMERZ session creation failed.' );
			wc_add_notice( 'Payment could not be started. Please try again or choose another method.', 'error' );
			return array( 'result' => 'failure' );
		}
		$order->update_meta_data( '_ravio_sslc_tran_id', $body['tran_id'] );
		$order->update_status( 'pending', 'Redirected to SSLCOMMERZ.' );
		$order->save();
		return array( 'result' => 'success', 'redirect' => esc_url_raw( $json['GatewayPageURL'] ) );
	}

	public static function register_callbacks(): void {
		add_action( 'woocommerce_api_ravio_sslc', array( __CLASS__, 'callback' ) );
	}

	/** Handles success / fail / cancel (browser) and ipn (server). Browser data is only a hint; validation is server-side. */
	public static function callback(): void {
		$g   = new self();
		$r   = isset( $_GET['r'] ) ? sanitize_key( wp_unslash( $_GET['r'] ) ) : '';
		$tran = isset( $_POST['tran_id'] ) ? sanitize_text_field( wp_unslash( $_POST['tran_id'] ) ) : '';
		$val  = isset( $_POST['val_id'] ) ? sanitize_text_field( wp_unslash( $_POST['val_id'] ) ) : '';
		$order = self::order_from_tran( $tran );

		if ( ! $order ) {
			status_header( 400 );
			exit;
		}
		if ( in_array( $r, array( 'fail', 'cancel' ), true ) ) {
			if ( $order->has_status( array( 'pending' ) ) ) {
				$order->update_status( 'cancel' === $r ? 'cancelled' : 'failed', 'SSLCOMMERZ reported ' . $r . '.' );
			}
			self::back_to_storefront( $order );
		}
		if ( ! in_array( $r, array( 'success', 'ipn' ), true ) || '' === $val ) {
			status_header( 400 );
			exit;
		}
		$g->settle( $order, $val );
		if ( 'ipn' === $r ) {
			status_header( 200 );
			exit;
		}
		self::back_to_storefront( $order );
	}

	private static function order_from_tran( string $tran ) {
		$id = Ravio_SSLC_Validator::order_id_from_tran( $tran );
		if ( null === $id ) {
			return null;
		}
		$order = wc_get_order( $id );
		return ( $order && hash_equals( (string) $order->get_meta( '_ravio_sslc_tran_id' ), $tran ) ) ? $order : null;
	}

	/** Idempotent: safe to call from both the browser return and the IPN, in any order, any number of times. */
	private function settle( WC_Order $order, string $val_id ): void {
		if ( $order->is_paid() ) {
			return;
		}
		$lock = 'ravio_sslc_lock_' . $order->get_id();
		if ( ! add_option( $lock, time(), '', 'no' ) ) { // atomic via UNIQUE option_name
			if ( (int) get_option( $lock ) < time() - 60 ) { delete_option( $lock ); }
			return;
		}
		try {
			$order = wc_get_order( $order->get_id() ); // re-read inside the lock
			if ( $order->is_paid() ) {
				return;
			}
			[ $store_id, $store_pw ] = $this->creds();
			$url = add_query_arg( array( 'val_id' => $val_id, 'store_id' => $store_id, 'store_passwd' => $store_pw, 'format' => 'json' ), $this->host() . '/validator/api/validationserverAPI.php' );
			$res = wp_remote_get( $url, array( 'timeout' => 20 ) );
			$v   = is_wp_error( $res ) ? null : json_decode( wp_remote_retrieve_body( $res ), true );
			if ( ! is_array( $v ) ) {
				$order->add_order_note( 'SSLCOMMERZ validation unreachable; order left pending for IPN retry.' );
				return;
			}
			$d = Ravio_SSLC_Validator::evaluate( $v, (string) $order->get_meta( '_ravio_sslc_tran_id' ), $order->get_currency(), (string) $order->get_total(), $val_id );
			if ( ! $d['ok'] ) {
				$order->add_order_note( 'SSLCOMMERZ validation rejected (' . $d['reason'] . '). Not marked paid.' );
				return;
			}
			if ( $d['risky'] ) {
				$order->update_status( 'on-hold', 'SSLCOMMERZ flagged this payment as risky. Review in the merchant panel.' );
				return;
			}
			$order->payment_complete( (string) ( $v['bank_tran_id'] ?? $val_id ) );
			$order->add_order_note( 'SSLCOMMERZ payment validated server-side (val_id ' . $val_id . ').' );
		} finally {
			delete_option( $lock );
		}
	}

	private static function back_to_storefront( WC_Order $order ): void {
		$base = Ravio_Settings::get()['storefront_url'];
		$url  = add_query_arg( array( 'id' => $order->get_id(), 'key' => $order->get_order_key(), 'email' => rawurlencode( $order->get_billing_email() ) ), $base . '/order/' );
		wp_redirect( $url ); // phpcs:ignore WordPress.Security.SafeRedirect -- storefront_url is validated https in settings.
		exit;
	}
}
