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
    public function index(Request $request)
     {
      // get() : select * from users where role_as = 1.
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


     //not used 00:48 05/06/2023
     public function upload_profile_image_student(Request $request)
    {      
            $image = $request->file('selectedFile');
            $id = $request->input('profile_id');
            $user =  User::find($id);
            if($user)
            {
                if ($image->isValid()) {
                     $path = "C:/xampp/htdocs/Internship-Management-System/front_end/public/profile";
                     //  image :
                     $extensionFile = $image->getClientOriginalExtension();
                     $filename = time() . '.' . $extensionFile;
                     $image->move($path, $filename);
              
                     $user->image = $filename;
                     $user->save();
                     return response()->json([
                         'status'=>200,
                         'message'=>"profile mise à jour avec succès",
                     ]);
                }
            }          
                return response()->json([
                    'status'=>404,
                    'message'=>"error",
                ]);
        
    }


    public function student_status(Request $request)
     {
        $student_with = User::where('role_as', 1)->where('stage_status', 'Avec stage')->count();
        $student_without = DB::table('users')->where('role_as', 1)->where('stage_status','Sans stage')->count();     
        $student_project = DB::table('users')->where('role_as', 1)->where('stage_status','Projet académique')->count();     

         return response()->json([
             'status'=>200,
             'student_with'=>$student_with,
             'student_without'=>$student_without,
             'student_project'=>$student_project,

         ]);
     }
     public function student_teacher(Request $request)
     {
        $student = User::where('role_as', 1)->count();
        $teacher = DB::table('users')->where('role_as', 3)->count();     

         return response()->json([
             'status'=>200,
             'student'=>$student,
             'teacher'=>$teacher,

         ]);
     }
}
