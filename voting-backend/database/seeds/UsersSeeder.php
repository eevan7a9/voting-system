<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            "id" => 1,
            "name" => "Sample User_1",
            "email" => "user1@gmail.com",
            "password" => bcrypt('secret'),
        ]);
        User::create([
            "id" => 2,
            "name" => "Sample User_2",
            "email" => "user2@gmail.com",
            "password" => bcrypt('secret'),
        ]);
        User::create([
            "id" => 3,
            "name" => "Sample User_3",
            "email" => "user3@gmail.com",
            "password" => bcrypt('secret'),
        ]);
        User::create([
            "id" => 4,
            "name" => "Sample User_4",
            "email" => "user4@gmail.com",
            "password" => bcrypt('secret'),
        ]);
        User::create([
            "id" => 5,
            "name" => "Sample User_5",
            "email" => "user5@gmail.com",
            "password" => bcrypt('secret'),
        ]);
        User::create([
            "id" => 6,
            "name" => "Sample User_6",
            "email" => "user6@gmail.com",
            "password" => bcrypt('secret'),
        ]);
    }
}
