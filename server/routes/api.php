<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(["middleware" => "auth:api"], function(){
    Route::group(["prefix" => "user"], function(){
        Route::get("all", [UserController::class, "getAllUsers"]);
        Route::get("profile", [AuthController::class, "profile"]);
        Route::post("logout", [AuthController::class, "logout"]);
        Route::post("refresh", [AuthController::class, "refresh"]);
    });

    // Route::get("stays/{id?}", [StayController::class, "getStays"]);
    // Route::get("bookings", [UserController::class, "getBookings"]);
    // Route::get("user_stays", [UserController::class, "getStays"]);

});

Route::group(["prefix" => "guest"], function(){
    //catch api for unauthorized users
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    //login & signup 
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
});