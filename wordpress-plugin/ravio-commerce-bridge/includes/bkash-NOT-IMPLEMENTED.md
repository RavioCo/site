# bKash — not implemented

No bKash gateway code is shipped. Reasons:
- bKash's tokenized-checkout API needs merchant-issued credentials and the merchant's current API documentation; neither was available.
- An unverified payment integration is worse than none.

Plan once the merchant account is approved: either (a) a bKash-supported WooCommerce plugin that passes the Store API proof of concept in docs/PAYMENTS-AND-TESTING.md, or (b) a hosted-redirect gateway modelled on class-gateway-sslcommerz.php (create payment -> redirect -> server-side execute/query -> idempotent settle).
The market rule `bkash => BD` is already enforced by Ravio_Market_Rules for any gateway registered with id `bkash`.
