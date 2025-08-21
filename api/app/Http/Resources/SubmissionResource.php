<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubmissionResource extends JsonResource
{
    public function toArray($request)
    {
        $p = $this->payload ?? [];

        return [
            'id'          => $this->id,
            'type'        => $this->type,        // e.g. owner_lead | property_submission
            'status'      => $this->status,      // pending | approved | rejected
            'created_at'  => $this->created_at,
            'reviewed_at' => $this->reviewed_at,
            'admin_notes' => $this->admin_notes,

            // Common fields surfaced for the table/search
            'name'         => $p['name'] ?? ($p['contact']['name'] ?? null),
            'city'         => $p['city'] ?? null,
            'property_type'=> $p['property_type'] ?? null,
            'bedrooms'     => $p['bedrooms'] ?? null,
            'photos'       => $p['photos'] ?? [],
            'notes'        => $this->notes,

            // You still have the full payload if you need it client-side
            'payload'     => $p,
        ];
    }
}
