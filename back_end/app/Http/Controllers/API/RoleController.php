<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;



class RoleController extends Controller
{
    
     // index : pour afficher les données de la table stage_status
     public function index()
     {
      // all() : get all status  from stage_status
      $role = DB::table('roles')->get();
         return response()->json([
             'status'=>200,
             'role'=>$role,
         ]);
     }
}
