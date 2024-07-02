<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UnidadRxController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::resource('/patients', PatientController::class);
Route::post('/patients/search', [PatientController::class, 'search']);
Route::resource('/examenes', ExamenController::class);
Route::get('/examenes/patient/{patient_id}', [ExamenController::class, 'getExamenesByPatientId']);
Route::apiResource('/reservas', ReservaController::class);
Route::put('/reservas/{reserva}', [ReservaController::class, 'update']);
Route::delete('/reservas/{reserva}', [ReservaController::class, 'destroy']);
Route::post('/reservas/{reserva}/updateFecha', [ReservaController::class, 'updateFecha']);
Route::apiResource('/users', UserController::class);
Route::apiResource('/unidad-rxes', UnidadRxController::class);
Route::apiResource('patients', PatientController::class);
Route::post('/patients/{patient}/touch', [PatientController::class, 'touch']);
Route::post('/users/search', [UserController::class, 'search']);
Route::put('/users/{user}', [UserController::class, 'update']);

