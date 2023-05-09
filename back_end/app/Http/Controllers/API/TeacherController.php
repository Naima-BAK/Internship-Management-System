<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Models\User;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    
// index : pour afficher les données de la table users (where role  is teacher)
    public function index()
     {
      
      $teacher = DB::table('users')->where('role_as', 3)->get();
         return response()->json([
             'status'=>200,
             'teacher'=>$teacher,
         ]);
     }

}
