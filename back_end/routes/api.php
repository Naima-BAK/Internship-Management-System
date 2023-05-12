<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\TeacherController;
use App\Http\Controllers\API\StageStatusController;

use App\Http\Controllers\API\RoleController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



// -----------------------------Authentification-----------------------------
// register & login route :
Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
// logout route :
Route::middleware(['auth:sanctum'])->group(function(){ 
Route::post('logout',[AuthController::class,'logout']);
});
// ---------------------------------------------------------------------------


// ------------------Admin & teacher permissions :-----------------------------
// isAPIAdmin ---> middlware ApiAdminMiddleware
Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function () {
Route::get('checkingAuthenticated', function(){
     return response()->json(['message'=>'You are in', 'status'=>200], 200);
});

// ---------------------------Admin part : -------------------------------------

Route::get('stage_status',[StageStatusController::class,'index']);
Route::get('role_user',[RoleController::class,'index']);

// Gestion des étudiants :
Route::get('view_student',[StudentController::class,'index']);
Route::get('show_student/{id}',[StudentController::class,'show']);
Route::get('edit_student/{id}',[StudentController::class,'edit']);
Route::put('update_student/{id}',[StudentController::class,'update']);
Route::DELETE('delete_student/{id}',[StudentController::class,'destroy']);
Route::post('add_Student',[AuthController::class,'store_student']);

// gestion des enseignant :
Route::get('view_teacher',[TeacherController::class,'index']);
Route::get('show_teacher/{id}',[TeacherController::class,'show']);
Route::get('edit_teacher/{id}',[TeacherController::class,'edit']);
Route::put('update_teacher/{id}',[TeacherController::class,'update']);
Route::DELETE('delete_teacher/{id}',[TeacherController::class,'destroy']);
Route::post('add_teacher',[AuthController::class,'store_teacher']);

});

// ---------------------------------------------------------------------------------------

