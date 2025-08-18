<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    // app/Http/Resources/PropertyResource.php
public function toArray($request): array
{
    $imgs = $this->images->map(fn($img) => $img->full_url)->filter()->values();
    $cover = $this->cover_image_url ?? $this->cover_image ?? $imgs->first();

    return [
        'id'    => (int) $this->id,
        'slug'  => $this->slug,
        'title' => $this->title,

        'city'  => ['name' => optional($this->city)->name],
        'location' => [
            'city' => optional($this->city)->name,
            'lat'  => $this->lat,
            'lng'  => $this->lng,
        ],
        'lat'   => $this->lat,
        'lng'   => $this->lng,

        'price_per_night' => $this->price_per_night,
        'stay_types'      => $this->stayTypes?->pluck('code') ?? [],

        // if you have proxy_url helper; otherwise just return $cover/$imgs
        'cover_image_url' => proxy_url($cover, ['w'=>900,'q'=>80]),
        'cover_thumb'     => proxy_url($cover, ['w'=>360,'q'=>70]),
        'images'          => $imgs->map(fn($u) => proxy_url($u, ['w'=>1200,'q'=>85]))->values(),
        'image_thumbs'    => $imgs->map(fn($u) => proxy_url($u, ['w'=>480,'q'=>70]))->values(),
    ];
}


    /**
     * Accepts many shapes:
     *  - relation collection: [{url: ...}, {image_url: ...}, {path: ...}, ...]
     *  - array of strings/objects
     *  - JSON string '["https://...","/storage/x.jpg"]'
     *  - CSV string 'https://...,/storage/x.jpg'
     */
    protected function normalizeImages($raw): array
    {
        $out = [];

        $pick = function ($val) {
            if (!$val) return null;
            if (is_string($val)) return trim($val);
            if (is_array($val))  return $val['url']
                ?? $val['image_url'] ?? $val['src'] ?? $val['path']
                ?? $val['file'] ?? $val['link'] ?? $val['s3_key'] ?? null;
            if (is_object($val)) return $val->url
                ?? $val->image_url ?? $val->src ?? $val->path
                ?? $val->file ?? $val->link ?? $val->s3_key ?? null;
            return null;
        };

        if (is_iterable($raw)) {
            foreach ($raw as $item) {
                $u = $pick($item);
                if ($u) $out[] = $u;
            }
        } elseif (is_string($raw)) {
            $decoded = json_decode($raw, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                foreach ($decoded as $item) {
                    $u = $pick($item);
                    if ($u) $out[] = $u;
                }
            } else {
                foreach (explode(',', $raw) as $s) {
                    $s = trim($s);
                    if ($s !== '') $out[] = $s;
                }
            }
        }

        // also consider legacy single fields
        foreach (['cover_image_url', 'cover_image', 'image', 'photo'] as $legacy) {
            $u = $pick($this->{$legacy} ?? null);
            if ($u) array_unshift($out, $u);
        }

        // dedupe
        return array_values(array_unique(array_filter($out)));
    }
}
