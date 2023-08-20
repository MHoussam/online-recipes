<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::group(["middleware" => "auth:api"], function(){
    Route::group(["prefix" => "user"], function(){
        // Route::get("all", [UserController::class, "getAllUsers"]);
        Route::get("profile", [AuthController::class, "profile"]);
        Route::post("logout", [AuthController::class, "logout"]);
        Route::post("refresh", [AuthController::class, "refresh"]);
    });

    Route::post("all", [UserController::class, "getRecipes"]);
    Route::post("like", [UserController::class, "likeRecipes"]);
    Route::post("liked", [UserController::class, "checkLikes"]);
    Route::post("shopping", [UserController::class, "addShoppingList"]);
    Route::post("shoppingList", [UserController::class, "getShoppingList"]);
    Route::post("displayShopping", [UserController::class, "getShoppings"]);
});

Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
Route::post("login", [AuthController::class, "login"]);
Route::post("register", [AuthController::class, "register"]);