<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class StudentController extends Controller
{


// index : pour afficher les données de la table users (where role  is student)
    public function index()
     {
      // all() : get all from students from users
      $student = DB::table('users')->where('role_as', 1)->get();
         return response()->json([
             'status'=>200,
             'student'=>$student,
         ]);
     }


    
    
    
    // 
     public function show($id)
     {
         $student = User::find($id);
         if($student)
         {
             return response()->json([
                 'status'=>200,
                 'student'=>$student
             ]);
         }
         else
         {
             return response()->json([
                 'status'=>404,
                 'message'=>'étudiant non trouvé!'
             ]);
         }
     }





    //  
     public function edit($id)
     {
         $student = User::find($id);
         if($student)
         {
             return response()->json([
                 'status'=>200,
                 'student'=>$student
             ]);
         }
         else
         {
             return response()->json([
                 'status'=>404,
                 'message'=>'étudiant non trouvé!'
             ]);
         }
     }


     public function update(Request $request, $id){

        $validator = Validator::make($request->all(),[
            'name'=> 'required',
            'email'=> 'required|email|max:190,email',
            'level' => 'required',
            'sector' => 'required',  
            'stage_status' => 'required',
         ],
         [
             'name.required'=>'Le champ nom est obligatoire.',
             'email.required'=>'Le champ email est obligatoire.',
             'level.required'=>'Le champ niveau est obligatoire.',
             'sector.required'=>'Le champ filiere est obligatoire.',
             'stage_status.required'=>'Le champ stage_status est obligatoire.',
             'email.max'=>'La longueur d\'email est trop longue. La longueur maximale est de 190.',
         ]);
    
        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->getMessageBag(),
            ]);
        }
        else
        {
            $student = User::find($id);
            if($student)
            {
                $student->name = $request->input('name');
                $student->email = $request->input('email');
                $student->sector = $request->input('sector');
                $student->level = $request->input('level');
                $student->stage_status = $request->input('stage_status');
                $student->save();
                return response()->json([
                    'status'=>200,
                    'message'=>"étudiant mise à jour avec succès",
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'étudiant non trouvé!'
                ]);
            }
        }
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
