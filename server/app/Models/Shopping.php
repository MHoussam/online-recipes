<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shopping extends Model
{
    use HasFactory;

    public function scopeAdded($query, $user_id, $recipe_id) {
        return $query->where("user_id", $user_id)
                     ->where('recipe_id', $recipe_id);
    } 
}
