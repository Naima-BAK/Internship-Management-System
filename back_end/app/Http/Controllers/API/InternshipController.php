<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Internship;
use App\Models\User;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Mail;
class InternshipController extends Controller
{
    // index : pour afficher les données de la table internships.
    public function index()
     {
      // get() : select * from internships.
      $internship = DB::table('internships')->get();
      $user = User::get();
      $company = Company::get();
      return response()->json([
             'status'=>200,
             'internship'=>$internship,
             'user'=>$user,
             'company'=>$company,
         ]);
     }


      // 
      public function show($id)
      {
          $internship = Internship::find($id);
          if($internship)
          {

            $user = User::find($internship->user_id);
            $company = Company::find($internship->company_id);
            $internship->student_name = $user->name;
            $internship->company_name = $company->name;
            $internship->company_logo = $company->logo;
              return response()->json([
                  'status'=>200,
                  'internship'=>$internship,
              ]);
          }
          else
          {
              return response()->json([
                  'status'=>404,
                  'message'=>'stage non trouvé!'
              ]);
          }
      }


     public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),[
                'theme'=> 'required',
                'user_id'=> 'required',
                'company_id' => 'required',
                'start_date' => 'required',
                'end_date' => 'required',
                'internship_supervisor' => 'required',
             ],
             [
                 'theme.required'=>'Le champ thème est obligatoire.',
                 'user_id.required'=>'Le champ etudiant est obligatoire.',
                 'company_id.required'=>'Le champ entreprise est obligatoire.',
                 'start_date.required'=>'Le champ date debut est obligatoire.',
                 'end_date.required'=>'Le champ date fin est obligatoire.',
                 'internship_supervisor.required'=>"Le champ encadrant de la part de l'entreprise est obligatoire.",
              ]
        );
       if($validator->fails()){
        return response()->json([
            'status'=>400,
            // getMessageBag() : Obtenez tous les messages d'erreur de validation.
            'errors'=>$validator->getMessageBag(),
        ]);
    
        }else{
               $internship = new Internship;
               $internship->theme = $request->theme;
               $internship->user_id = $request->user_id;
               $internship->company_id = $request->company_id;
               $internship->start_date = $request->start_date;
               $internship->end_date = $request->end_date;
               if($request->university_supervisor)
               {
                  $internship->university_supervisor = $request->university_supervisor;

               }
               else{
                $internship->university_supervisor = '';
               }
               $internship->internship_supervisor = $request->internship_supervisor;
               $internship->save();
                 return response()->json([
                    'status'=>200,
                    'message'=>'stage ajoutée avec succès',
                ]);            
            }
    }


    public function edit($id)
    {
        $internship = Internship::find($id);
        if($internship)
        {
            $user = User::find($internship->user_id);
            $company = Company::find($internship->company_id);
            $internship->student_name = $user->name;
            $internship->company_name = $company->name;
            return response()->json([
                'status'=>200,
                'internship'=>$internship
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'stage non trouvé!'
            ]);
        }
    }



    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(),[
        'theme'=> 'required',
        'user_id'=> 'required',
        'company_id' => 'required',
        'start_date' => 'required',
        'end_date' => 'required',
        'internship_supervisor' => 'required',
     ],
     [
         'theme.required'=>'Le champ thème est obligatoire.',
         'user_id.required'=>'Le champ etudiant est obligatoire.',
         'company_id.required'=>'Le champ entreprise est obligatoire.',
         'start_date.required'=>'Le champ date debut est obligatoire.',
         'end_date.required'=>'Le champ date fin est obligatoire.',
         'internship_supervisor.required'=>"Le champ encadrant de la part de l'entreprise est obligatoire.",
      ]
     );
   
       if($validator->fails())
       {
           return response()->json([
               'status'=>422,
               'errors'=>$validator->getMessageBag(),
           ]);
       }
       else
       {
           $internship = Internship::find($id);
           if($internship)
           {
               $internship->theme = $request->theme;
               $internship->user_id = $request->user_id;
               $internship->company_id = $request->company_id;
               $internship->start_date = $request->start_date;
               $internship->end_date = $request->end_date;
               if($request->university_supervisor)
               {
                  $internship->university_supervisor = $request->university_supervisor;

               }
               else{
                $internship->university_supervisor = '';
               }
               $internship->internship_supervisor = $request->internship_supervisor;
               $internship->save();
               return response()->json([
                   'status'=>200,
                   'message'=>"stage mise à jour avec succès",
               ]);
           }
           else
           {
               return response()->json([
                   'status'=>404,
                   'message'=>'stage non trouvé!'
               ]);
           }
       }
   }


       // la fontion destroy pour supprimer un Ensegnant dans la base de donnes
       public function destroy($id)
       {
           
           $internship = Internship::find($id);
           
           if($internship)
           {
               $internship->delete();
               return response()->json([
                   'status'=>200,
                   'message'=>'stage supprimé avec succès',
               ]);
           }
           else
           {
               return response()->json([
                   'status'=>404,
                   'message'=>'stage non trouvé!',
               ]);
           }
           
       }


       public function affect($id)
       {
           $internship = Internship::find($id);
           if($internship)
           {
 
             $user = User::find($internship->user_id);
             $internship->student_name = $user->name;
             $internship->student_sector = $user->sector;
             
             $teacher_it = DB::table('users')->where('role_as', 3)->where('job', 'like','%IT%')->get();
             $teacher_jr = User::where('role_as', 3)->where('job', 'like','%Journalisme%')->get();
             $teacher_agro = User::where('role_as', 3)->where('job', 'like','%agro%')->get();
             $teacher_gc = User::where('role_as', 3)->where('job', 'like','%Génie civil%')->get();

               return response()->json([
                   'status'=>200,
                   'internship'=>$internship,
                   'teacher_it'=>$teacher_it,
                   'teacher_jr'=>$teacher_jr,
                   'teacher_agro'=>$teacher_agro,
                   'teacher_gc'=>$teacher_gc,
               ]);           
           }
           else
           {
               return response()->json([
                   'status'=>404,
                   'message'=>'stage non trouvé!'
               ]);
           }
       }

       public function affect_teacher(Request $request, $id){
              $validator = Validator::make($request->all(),[          
                  'university_supervisor' => 'required',
                ],
                [
                   'university_supervisor.required'=>"Le champ encadrant est obligatoire.",
                ]
            );
      
          if($validator->fails())
          {
              return response()->json([
                  'status'=>422,
                  'errors'=>$validator->getMessageBag(),
              ]);
          }
          else
          {
              $internship = Internship::find($id);
              if($internship)
              {
                $user = User::find($internship->user_id);
                $teacher = DB::table('users')->where('role_as', 3)->where('job', 'like','%'.$request->university_supervisor.'%')->get();
                $internship->university_supervisor = $request->university_supervisor;
                $internship->save();
                  return response()->json([
                      'status'=>200,
                      'message'=>"l'encadrant est affecté avec succès",
                  ]);


                  $teacher_name = $request->university_supervisor;//name of receiver
                  $teacher_email = $teacher->email;//mail of receiver
   
                  $student_name = $user->name;//name of receiver
                  $student_email = $user->email;//mail of receiver
          
                  $data_student = array(
                       "name"=>$student_name,
                       "body"=>"Vous pouvez contactez votre encadrant ",
                       "encadrant" => $teacher_name
                  );
                  $data_teacher = array(
                    "name"=>$teacher_name,
                    "body"=>"Vous pouvez encadrez l'étudiant(e) ",
                    "student" => $student_name
               );
          
                 //data : information to (send name of receiver and the body of email).
                 //'mail' : name of view
          
                 Mail::send(['text' => 'encadrant_student'], $data_student, 
          
                 function($msg) use($student_email, $student_name){
                       $msg->to($student_email, $student_name)->subject('Votre encadrant de stage');
                       $msg->from('n.bakenchich@gmail.com','IMS Administration');//source mail
                  });

                  Mail::send(['text' => 'encadrant_teacher'], $data_teacher, 
          
                  function($msg) use($teacher_email, $teacher_name){
                        $msg->to($teacher_email, $teacher_name)->subject('Votre encadrant de stage');
                        $msg->from('n.bakenchich@gmail.com','IMS Administration');//source mail
                   });
              }
              else
              {
                  return response()->json([
                      'status'=>404,
                      'message'=>'stage non trouvé!'
                  ]);
              }
          }
        }
           

}

