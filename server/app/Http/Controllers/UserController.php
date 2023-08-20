<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Like;
use App\Models\Shopping;

class UserController extends Controller
{
    public function getRecipes() {
        $recipes = Recipe::all();

        return response()->json($recipes);
    }

    public function likeRecipes(Request $request) {
        $recipe_id = $request->recipeId;
        $liker_id = $request->userId;
        
        $likeNB = Like::liked($liker_id , $recipe_id)->get();

        if($likeNB->count() == 0){
            $likes = new Like;            
            $likes->recipe_id = $recipe_id;
            $likes->liker_id = $liker_id;
            $likes->save();

            Recipe::where('id', $recipe_id)->increment('likes');
    
            return response()->json('Liked');
        } else {
            $likeNB[0]->delete();

            Recipe::where('id', $recipe_id)->decrement('likes');
    
            return response()->json('Unliked');
        }
    }

    public function checkLikes(Request $request) {
        $liker_id = $request->userId;
        
        $liked = Like::where('liker_id', $liker_id)->get();

        return response()->json($liked);
    }

    public function AddShoppingList(Request $request) {
        $user_id = $request->userId;
        $recipe_id = $request->recipeId;
        
        $shoppingNB = Shopping::added($user_id , $recipe_id)->get();

        if($shoppingNB->count() == 0){
            $shoppinglist = new Shopping;            
            $shoppinglist->recipe_id = $recipe_id;
            $shoppinglist->user_id = $user_id;
            $shoppinglist->save();
    
            return response()->json('Added');
        } else {
            $shoppingNB[0]->delete();
    
            return response()->json('Removed');
        }
    }

    public function getShoppingList(Request $request) {
        $user_id = $request->userId;
        
        $shopping = Shopping::where('user_id', $user_id)->get();

        return response()->json($shopping);
    }
}
