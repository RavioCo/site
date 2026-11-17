<?php
/**
 * Pure decision logic for SSLCOMMERZ validation responses. NO WordPress/WooCommerce dependency, so it can be
 * unit-tested with plain PHP: `php tests/validator-test.php`.
 */
final class Ravio_SSLC_Validator {

	/** tran_id format: RAVIO-<order id>-<20 random alphanumerics>. */
	const TRAN_PATTERN = '/^RAVIO-(\d+)-([A-Za-z0-9]{20})$/';

	public static function order_id_from_tran( string $tran ): ?int {
		return preg_match( self::TRAN_PATTERN, $tran, $m ) ? (int) $m[1] : null;
	}

	private static function cents( $v ): ?int {
		return ( is_numeric( $v ) ) ? (int) round( (float) $v * 100 ) : null;
	}

	/**
	 * @param array  $v              Decoded JSON from the validation API.
	 * @param string $expected_tran  tran_id stored on the order when the session was created.
	 * @param string $order_currency e.g. BDT
	 * @param string $order_total    order total as a decimal string
	 * @param string $requested_val  val_id we asked the API about
	 * @return array{ok:bool,risky:bool,reason:string}
	 */
	public static function evaluate( array $v, string $expected_tran, string $order_currency, string $order_total, string $requested_val ): array {
		$no = static fn( string $why ) => array( 'ok' => false, 'risky' => false, 'reason' => $why );

		if ( ! in_array( $v['status'] ?? '', array( 'VALID', 'VALIDATED' ), true ) ) {
			return $no( 'status_not_valid' );
		}
		if ( '' === $expected_tran || ! hash_equals( $expected_tran, (string) ( $v['tran_id'] ?? '' ) ) ) {
			return $no( 'tran_id_mismatch' );
		}
		// val_id: FAIL CLOSED. The response must echo a non-empty val_id that exactly equals the one we asked about.
		// (Previously a missing val_id skipped this check.)
		$echoed = ( isset( $v['val_id'] ) && is_scalar( $v['val_id'] ) && ! is_bool( $v['val_id'] ) ) ? (string) $v['val_id'] : '';
		if ( '' === $echoed ) {
			return $no( 'val_id_missing' );
		}
		if ( '' === $requested_val || ! hash_equals( $requested_val, $echoed ) ) {
			return $no( 'val_id_mismatch' );
		}
		$paid = self::cents( $v['amount'] ?? null );
		$due  = self::cents( $order_total );
		if ( null === $paid || null === $due || $paid !== $due ) {
			return $no( 'amount_mismatch' );
		}
		// Currency must be PRESENT and equal. A missing currency is a rejection, not a pass.
		if ( ! isset( $v['currency_type'] ) || strtoupper( (string) $v['currency_type'] ) !== strtoupper( $order_currency ) ) {
			return $no( 'currency_mismatch' );
		}
		return array( 'ok' => true, 'risky' => '1' === (string) ( $v['risk_level'] ?? '0' ), 'reason' => 'valid' );
	}
}
