<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Like;
use App\Models\Shopping;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getRecipes() {
        $recipes = Recipe::all();

        return response()->json($recipes);
    }

    // Route::get('displayContacts/{contact_id?}', [WhereController::class, 'displayContacts']);

    // public function displayContacts ($contact_id = null) {
        
    //     if (!is_null($contact_id)) {
    //         $contacts = Contact::where('id', $contact_id)->get();
    //     } 
    //     else {
    //         $contacts = Contact::all();
    //     }

    //     return response()->json($contacts);
    // }

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
    
            return response()->json(['data'=> $likes, 'message'=> 'Liked']);
        } else {
            $likeNB[0]->delete();

            Recipe::where('id', $recipe_id)->decrement('likes');
    
            return response()->json(['message'=> 'Unliked']);
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

            $shoppings = Shopping::where('user_id', $user_id)
                ->where('recipe_id', $recipe_id)    
                ->with('Recipe')->get();
    
            return response()->json(['data'=> $shoppings, 'message'=> 'Added']);
        } else {
            $shoppingNB[0]->delete();
    
            return response()->json(['message'=> 'Removed']);
        }
    }

    public function getShoppings()
    {
        $user = Auth::user()->id;
        
        $shoppings = Shopping::where('user_id', $user)->with('Recipe')->get();
    
        return response()->json($shoppings);
    }    
}