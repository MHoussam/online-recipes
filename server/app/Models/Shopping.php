<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Shopping extends Model
{
    use HasFactory;

    public function Recipe() {
        return $this->belongsTo(Recipe::class, 'recipe_id');
    }

    public function scopeAdded($query, $user_id, $recipe_id) {
        return $query->where("user_id", $user_id)
                     ->where('recipe_id', $recipe_id);
    } 
}
