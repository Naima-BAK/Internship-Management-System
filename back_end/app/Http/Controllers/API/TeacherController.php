<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TeacherController extends Controller
{
    
// index : pour afficher les données de la table users (where role  is teacher)
    public function index()
     {
      // get() : select * from users  where role_as = 3;
      $teacher = DB::table('users')->where('role_as', 3)->get();
         return response()->json([
             'status'=>200,
             'teacher'=>$teacher,
         ]);
     }



    // 
     public function show($id)
     {
         $teacher = User::find($id);
         if($teacher)
         {
             return response()->json([
                 'status'=>200,
                 'teacher'=>$teacher
             ]);
         }
         else
         {
             return response()->json([
                 'status'=>404,
                 'message'=>'Enseignant non trouvé!'
             ]);
         }
     }


     public function edit($id)
     {
         $teacher = User::find($id);
         if($teacher)
         {
             return response()->json([
                 'status'=>200,
                 'teacher'=>$teacher
             ]);
         }
         else
         {
             return response()->json([
                 'status'=>404,
                 'message'=>'Enseignant non trouvé!'
             ]);
         }
     }


     public function update(Request $request, $id){

        $validator = Validator::make($request->all(),[
            'name'=> 'required',
            'email'=> 'required|email|max:190,email',
            'job' => 'required',
         ],
         [
             'name.required'=>'Le champ nom est obligatoire.',
             'email.required'=>'Le champ email est obligatoire.',
             'job.required'=>'Le champ niveau est obligatoire.',
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
            $teacher = User::find($id);
            if($teacher)
            {
                $teacher->name = $request->input('name');
                $teacher->email = $request->input('email');
                $teacher->job = $request->input('job');
                $teacher->save();
                return response()->json([
                    'status'=>200,
                    'message'=>"Enseignant mise à jour avec succès",
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Enseignant non trouvé!'
                ]);
            }
        }
    }


    // la fontion destroy pour supprimer un Ensegnant dans la base de donnes
    public function destroy($id)
    {
        
        $teacher = User::find($id);
        
        if($teacher)
        {
            $teacher->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Ensegnant supprimée avec succès',
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'Ensegnant non trouvé!',
            ]);
        }
        
    }
     

}
