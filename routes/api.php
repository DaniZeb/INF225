<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\ReservaController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::resource('/patients', PatientController::class);
Route::post('/patients/search', [PatientController::class, 'search']);
Route::resource('/examenes', ExamenController::class);
Route::get('/examenes/patient/{patient_id}', [ExamenController::class, 'getExamenesByPatientId']);
Route::apiResource('reservas', ReservaController::class);