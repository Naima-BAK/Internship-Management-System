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

                $internship->university_supervisor = $request->university_supervisor; 
                $internship->save();

        // ----------------
        $user_name = $user->name;//name of receiver
        $email = $user->email;//mail of receiver

        $data = array(
        "name"=>$user_name,
        "body"=>"Vous pouvez contactez votre encadrant ",
        "your_pass" =>$request->university_supervisor
        );

        Mail::send(['text' => 'mail2'], $data, 
        function($msg) use($email, $user_name){
            $msg->to($email, $user_name)->subject('Encadrant de stage');
            $msg->from('n.bakenchich@gmail.com','IMS Administration');//source mail
        });
        
                  return response()->json([
                      'status'=>200,
                      'message'=>"l'encadrant est affecté avec succès",
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
           

}

