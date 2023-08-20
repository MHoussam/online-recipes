<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;

class UserController extends Controller
{
    public function getRecipes() {
        $recipes = Recipe::all();

        return response()->json($recipes);
    }
}
