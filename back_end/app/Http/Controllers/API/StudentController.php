<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Models\User;
use Illuminate\Http\Request;

class StudentController extends Controller
{
     // index : pour afficher les données de la table categories
     public function index()
     {
      // all() : get all from students from users
      $student = DB::table('users')->where('role_as', 0)->get();
         return response()->json([
             'status'=>200,
             'student'=>$student,
         ]);
     }














































     // la fontion destroy pour supprimer un étudiant dans la base de donnes
     public function destroy($id)
     {
         
         $student = User::find($id);
         
         if($student)
         {
             $student->delete();
             return response()->json([
                 'status'=>200,
                 'message'=>'étudiant supprimée avec succès',
             ]);
         }
         else
         {
             return response()->json([
                 'status'=>404,
                 'message'=>'étudiant non trouvé!',
             ]);
         }
         
     }
}
