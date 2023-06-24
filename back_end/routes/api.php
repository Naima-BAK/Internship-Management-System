<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\TeacherController;
use App\Http\Controllers\API\StageStatusController;
use App\Http\Controllers\API\CompanyController;
use App\Http\Controllers\API\InternshipController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\DocumentController;
use App\Http\Controllers\API\ImageController;
use App\Http\Controllers\API\MessageController;
use App\Http\Controllers\API\SettingController;
use App\Http\Controllers\API\ColorController;


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
//--------------------Student part ---------------------------------------
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users',[AuthController::class,'index']);
 Route::post('/messages', [MessageController::class,'store']); 
 Route::get('/messages', [MessageController::class,'index']);
 Route::post('upload_profile_image',[AuthController::class,'upload_profile_image']);
 Route::put('update_admin_data/{id}',[AuthController::class,'update_admin_data']);
 Route::get('edit_admin_data/{id}',[AuthController::class,'edit_admin_data']);
 Route::DELETE('delete_User/{id}',[AuthController::class,'destroy']);

});


Route::post('/user/update-password', [ImageController::class,'updatePassword'])->middleware('auth:sanctum');






// ------------------Admin & teacher permissions :-----------------------------
// isAPIAdmin ---> middlware ApiAdminMiddleware
Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function () 
{
     Route::get('checkingAuthenticated', function(){
          return response()->json(['message'=>'You are in', 'status'=>200], 200);
     });


    // ---------------------------Admin part : -------------------------------------

    Route::get('stage_status',[StageStatusController::class,'index']);
    Route::get('role_user',[RoleController::class,'index']);
    //admin profile :
    // Route::post('upload_profile_image',[AuthController::class,'upload_profile_image']);
    // Route::put('update_admin_data/{id}',[AuthController::class,'update_admin_data']);
    // Route::get('edit_admin_data/{id}',[AuthController::class,'edit_admin_data']);
    // Route::put('update_admin_password/{id}',[AuthController::class,'updatePassword']);

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

    // gestion des entreprises :
    Route::get('view_company',[CompanyController::class,'index']);
    Route::get('show_company/{id}',[CompanyController::class,'show']);
    Route::get('edit_company/{id}',[CompanyController::class,'edit']);
    Route::put('update_company/{id}',[CompanyController::class,'update']);
    Route::DELETE('delete_company/{id}',[CompanyController::class,'destroy']);
    Route::post('add_company',[CompanyController::class,'store']);
    Route::put('edit_logo_company/{id}',[CompanyController::class,'edit_logo']);
    Route::post('upload_logo',[ImageController::class,'upload']);

    // gestion des stages :
    Route::get('view_internship',[InternshipController::class,'index']);
    Route::get('show_internship/{id}',[InternshipController::class,'show']);
    Route::get('edit_internship/{id}',[InternshipController::class,'edit']);
    Route::put('update_internship/{id}',[InternshipController::class,'update']);
    Route::DELETE('delete_internship/{id}',[InternshipController::class,'destroy']);
    Route::post('add_internship',[InternshipController::class,'store']);
    Route::get('affect_supervisor/{id}',[InternshipController::class,'affect']);
    Route::put('affect_teacher/{id}',[InternshipController::class,'affect_teacher']);
    //test docu
    Route::post('upload',[DocumentController::class,'upload']);
    Route::get('get_images',[DocumentController::class,'getDocs']);
    //document management :
    Route::get('view_document',[DocumentController::class,'index']);
    Route::post('upload_confirmation_all',[DocumentController::class,'upload_confirmation_all']);
    Route::post('upload_confirmation_one',[DocumentController::class,'upload_confirmation_one']);
    
    //settings :
    Route::get('view_setting/{id}',[SettingController::class,'index']);
    Route::put('update_website_name',[SettingController::class,'update_website_name']);
    Route::put('update_contactData',[SettingController::class,'update_contactData']);
    Route::put('update_SocialNetworksLinks',[SettingController::class,'update_SocialNetworksLinks']);
    Route::post('upload_website_logo',[SettingController::class,'upload_website_logo']);
    Route::post('upload_website_favicon',[SettingController::class,'upload_website_favicon']);
    Route::get('view_emails',[AuthController::class,'getEmails']);
    Route::get('view_colors/{id}',[ColorController::class,'index']);
    Route::post('update_colors',[ColorController::class,'update_colors']);


});

//test img


// ---------------------------------------------------------------------------------------

