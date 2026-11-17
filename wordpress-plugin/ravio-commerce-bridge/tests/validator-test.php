<?php
// Run: php tests/validator-test.php   (plain PHP 8.1+, no WordPress needed). Exit code 0 = all pass.
require __DIR__ . '/../includes/class-sslc-validator.php';

$tran  = 'RAVIO-123-' . str_repeat( 'a', 20 );
$good  = array( 'status' => 'VALID', 'tran_id' => $tran, 'val_id' => 'V1', 'amount' => '1500.00', 'currency_type' => 'BDT', 'risk_level' => '0' );
$fails = 0;
function t( string $name, bool $cond ): void { global $fails; echo ( $cond ? 'PASS ' : 'FAIL ' ) . $name . "\n"; if ( ! $cond ) { $fails++; } }
function ev( array $v, string $total = '1500.00', string $cur = 'BDT', ?string $tr = null ): array {
	global $tran; return Ravio_SSLC_Validator::evaluate( $v, $tr ?? $tran, $cur, $total, 'V1' );
}

t( 'valid payment accepted',            ev( $good )['ok'] === true && ev( $good )['reason'] === 'valid' );
t( 'VALIDATED status accepted',         ev( array( 'status' => 'VALIDATED' ) + $good )['ok'] === true );
t( 'FAILED status rejected',            ev( array( 'status' => 'FAILED' ) + $good )['reason'] === 'status_not_valid' );
t( 'INVALID_TRANSACTION rejected',      ev( array( 'status' => 'INVALID_TRANSACTION' ) + $good )['ok'] === false );
t( 'missing status rejected',           ev( array_diff_key( $good, array( 'status' => 1 ) ) )['ok'] === false );
t( 'tran_id mismatch rejected',         ev( array( 'tran_id' => 'RAVIO-123-' . str_repeat( 'b', 20 ) ) + $good )['reason'] === 'tran_id_mismatch' );
t( 'empty expected tran rejected',      ev( $good, '1500.00', 'BDT', '' )['ok'] === false );
t( 'val_id mismatch rejected',          ev( array( 'val_id' => 'OTHER' ) + $good )['reason'] === 'val_id_mismatch' );
t( 'val_id mismatch is case-sensitive',  ev( array( 'val_id' => 'v1' ) + $good )['reason'] === 'val_id_mismatch' );
t( 'val_id missing rejected',           ev( array_diff_key( $good, array( 'val_id' => 1 ) ) ) === array( 'ok' => false, 'risky' => false, 'reason' => 'val_id_missing' ) );
t( 'val_id empty string rejected',      ev( array( 'val_id' => '' ) + $good )['reason'] === 'val_id_missing' );
t( 'val_id null rejected',              ev( array( 'val_id' => null ) + $good )['reason'] === 'val_id_missing' );
t( 'val_id array rejected',             ev( array( 'val_id' => array( 'V1' ) ) + $good )['reason'] === 'val_id_missing' );
t( 'val_id bool rejected',              ev( array( 'val_id' => true ) + $good )['reason'] === 'val_id_missing' );
t( 'val_id missing + everything else valid is still rejected', ev( array_diff_key( $good, array( 'val_id' => 1 ) ) )['ok'] === false );
t( 'requested val_id empty rejected even if response echoes one', Ravio_SSLC_Validator::evaluate( $good, $tran, 'BDT', '1500.00', '' )['reason'] === 'val_id_mismatch' );
t( 'numeric val_id echoed as int matches string request', Ravio_SSLC_Validator::evaluate( array( 'val_id' => 240101 ) + $good, $tran, 'BDT', '1500.00', '240101' )['ok'] === true );
t( 'amount lower rejected',             ev( array( 'amount' => '1499.99' ) + $good )['reason'] === 'amount_mismatch' );
t( 'amount higher rejected',            ev( array( 'amount' => '1500.01' ) + $good )['reason'] === 'amount_mismatch' );
t( 'amount non-numeric rejected',       ev( array( 'amount' => 'abc' ) + $good )['ok'] === false );
t( 'amount missing rejected',           ev( array_diff_key( $good, array( 'amount' => 1 ) ) )['ok'] === false );
t( 'sub-cent noise tolerated (rounding)', ev( array( 'amount' => '1500.004' ) + $good )['ok'] === true );
t( 'currency mismatch rejected',        ev( array( 'currency_type' => 'USD' ) + $good )['reason'] === 'currency_mismatch' );
t( 'currency missing rejected',         ev( array_diff_key( $good, array( 'currency_type' => 1 ) ) )['reason'] === 'currency_mismatch' );
t( 'currency case-insensitive',         ev( array( 'currency_type' => 'bdt' ) + $good )['ok'] === true );
t( 'risk_level 1 flagged risky',        ev( array( 'risk_level' => '1' ) + $good ) === array( 'ok' => true, 'risky' => true, 'reason' => 'valid' ) );
t( 'tran parse: valid',                 Ravio_SSLC_Validator::order_id_from_tran( $tran ) === 123 );
t( 'tran parse: short suffix rejected', Ravio_SSLC_Validator::order_id_from_tran( 'RAVIO-123-abc123' ) === null );
t( 'tran parse: injection rejected',    Ravio_SSLC_Validator::order_id_from_tran( "RAVIO-1-" . str_repeat( 'a', 20 ) . "' OR 1=1" ) === null );
t( 'tran parse: foreign prefix rejected', Ravio_SSLC_Validator::order_id_from_tran( 'XYZ-123-' . str_repeat( 'a', 20 ) ) === null );

echo $fails ? "\n$fails FAILED\n" : "\nALL PASSED\n";
exit( $fails ? 1 : 0 );
