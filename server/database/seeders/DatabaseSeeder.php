<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('recipes')->insert([
            'publisher_id' => 1,
            'name' => 'alaska wowo',
            'cuisine' => 'American',
            'ingredients' => 'Moose, tomato, potato, , onion, tomato paste.',
            'image_url' => 'images/1.png',
        ]);

        DB::table('recipes')->insert([
            'publisher_id' => 1,
            'name' => 'Lasagna',
            'cuisine' => 'Italian',
            'ingredients' => 'Potato, , onion, tomato paste, tomato.',
            'image_url' => 'images/2.png',
        ]);

        DB::table('recipes')->insert([
            'publisher_id' => 1,
            'name' => 'xcks fox',
            'cuisine' => 'Lebanese',
            'ingredients' => 'Fox, tomato, potato, , onion, tomato paste.',
            'image_url' => 'images/3.png',
        ]);

        DB::table('recipes')->insert([
            'publisher_id' => 1,
            'name' => 'Mansaf',
            'cuisine' => 'Saudi',
            'ingredients' => 'Rice, , onion, tomato paste, tomato.',
            'image_url' => 'images/4.png',
        ]);

        DB::table('recipes')->insert([
            'publisher_id' => 1,
            'name' => 'Fish',
            'cuisine' => 'Jordanian',
            'ingredients' => 'Fish, tomato, potato, , onion, tomato paste.',
            'image_url' => 'images/5.png',
        ]);

        DB::table('recipes')->insert([
            'publisher_id' => 1,
            'name' => 'Wings',
            'cuisine' => 'African',
            'ingredients' => 'Wing, , onion, tomato paste, tomato.',
            'image_url' => 'images/6.png',
        ]);

        DB::table('recipes')->insert([
            'publisher_id' => 1,
            'name' => 'Where',
            'cuisine' => 'Syrian',
            'ingredients' => 'Not, tomato, potato, , onion, tomato paste.',
            'image_url' => 'images/7.png',
        ]);

        DB::table('recipes')->insert([
            'publisher_id' => 1,
            'name' => 'Hot Dog',
            'cuisine' => 'Sweden',
            'ingredients' => 'Dog, , onion, tomato paste, tomato.',
            'image_url' => 'images/8.png',
        ]);
    }
}
