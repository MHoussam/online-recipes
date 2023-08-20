<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    public function scopeLiked($query, $liker_id, $recipe_id) {
        return $query->where("liker_id", $liker_id)
                     ->where('recipe_id', $recipe_id);
    } 
}
