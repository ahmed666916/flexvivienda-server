<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\StripeClient;
use Stripe\PaymentIntent;

class PaymentController extends Controller
{
    // 🔹 Admin: List payment intents (or payouts)
    public function index()
    {
        $stripe = new StripeClient(config('services.stripe.secret'));
        // Example: list last 10 payment intents
        $intents = $stripe->paymentIntents->all(['limit' => 10]);
        return response()->json($intents);
    }

    // 🔹 Create Payment Intent for frontend
    public function createIntent(Request $r)
    {
        $data = $r->validate([
            'amount'   => 'required|numeric|min:0.5', // dollars
            'currency' => 'sometimes|string|size:3',
        ]);

        $amountCents = (int) ($data['amount'] * 100); // convert to cents
        Stripe::setApiKey(config('services.stripe.secret'));

        $pi = PaymentIntent::create([
            'amount'                     => $amountCents,
            'currency'                   => $data['currency'] ?? 'usd',
            'automatic_payment_methods'  => ['enabled' => true],
            'metadata'                   => [
                'user_id' => $r->user()->id ?? null,
            ],
        ]);

        return ['clientSecret' => $pi->client_secret];
    }

    // 🔹 Stripe Webhook
    public function webhook(Request $r)
    {
        // TODO: verify signature with config('services.stripe.webhook_secret')
        // $event = \Stripe\Event::constructFrom(json_decode($r->getContent(), true));
        // handle events (payment_intent.succeeded, etc.)
        // update Booking.payment_status accordingly

        return response()->json(['ok' => true]);
    }
}
