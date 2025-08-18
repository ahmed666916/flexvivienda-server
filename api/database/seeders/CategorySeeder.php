<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $names = ['Sea View','City Life','Rural','Secluded','Garden','Jacuzzi','Residence','Central'];
        foreach ($names as $n) {
            Category::firstOrCreate(['slug'=>Str::slug($n)], ['name'=>$n,'slug'=>Str::slug($n)]);
        }
    }
}
