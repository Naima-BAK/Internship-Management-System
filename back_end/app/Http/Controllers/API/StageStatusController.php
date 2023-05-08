<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\StatusStages;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;



class StageStatusController extends Controller
{
    
     // index : pour afficher les données de la table stage_status
     public function index()
     {
      // all() : get all status  from stage_status
      $stageSts = DB::table('status_stages')->get();
         return response()->json([
             'status'=>200,
             'stageSts'=>$stageSts,
         ]);
     }

}
