<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\StripeClient;

class PaymentController extends Controller
{
    public function createIntent(Request $r)
    {
        $data = $r->validate([
            'amount' => 'required|integer|min:50', // cents
            'currency' => 'sometimes|string|size:3'
        ]);
        $stripe = new StripeClient(config('services.stripe.secret'));
        $pi = $stripe->paymentIntents->create([
            'amount' => $data['amount'],
            'currency' => $data['currency'] ?? 'usd',
            'automatic_payment_methods' => ['enabled'=>true],
            'metadata' => ['user_id'=>$r->user()->id],
        ]);
        return ['clientSecret'=>$pi->client_secret];
    }

    public function webhook(Request $r)
    {
        // verify signature if you set webhook secret
        // update Booking payment_status here
        return response()->json(['ok'=>true]);
    }
}
