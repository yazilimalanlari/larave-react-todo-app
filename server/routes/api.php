<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(TodoController::class)
    ->middleware('auth')->group(function() {
    Route::post('/todo', 'add');
    Route::get('/todo', 'getAll');
    Route::put('/todo/{id}', 'update');
    Route::delete('/todo/{id}', 'remove');
});

Route::post('/auth/register', [UserController::class, 'register']);
Route::post('/auth/login', [UserController::class, 'login']);