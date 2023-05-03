<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\StudentController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



// ----------------------Authentification-----------------------------
// register & login route :
Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
// logout route :
Route::middleware(['auth:sanctum'])->group(function(){ 
     Route::post('logout',[AuthController::class,'logout']);
});
// ---------------------------------------------------------------


// Admin & teacher permissions :
// isAPIAdmin ---> middlware ApiAdminMiddleware
Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function () {
    Route::get('checkingAuthenticated', function(){
        return response()->json(['message'=>'You are in', 'status'=>200], 200);
    });

    // Student :
    //la fonction store pour ajouter les données de l'étudiant à la base de données
    Route::post('add_student',[StudentController::class,'store']);
    // index : pour afficher les données de la table categories
    Route::get('view_student',[StudentController::class,'index']);
    Route::get('edit_student/{id}',[StudentController::class,'edit']);
    Route::put('update_student/{id}',[StudentController::class,'update']);
    Route::DELETE('delete_student/{id}',[StudentController::class,'destroy']);

});

// ---------------------------------------------------------------------------------------


// Route::middleware(['auth:sanctum','isAPITeacher'])->group(function () {
//     Route::get('checkingAuthenticated', function(){
//         return response()->json(['message'=>'You are in', 'status'=>200], 200);
//     });
// });
// -----------------------------------------------------------------
