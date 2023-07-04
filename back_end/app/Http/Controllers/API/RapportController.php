<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rapport;
use App\Models\User;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Internship;
use App\Models\Notification;
use App\Models\NotificationStudent;


class RapportController extends Controller
{
    public function Rapports(Request $request)
    {
     $student = $request->student;
     $user = User::find($student);
     $internship = Internship::where('user_id',$student)->get();
     if($internship){ 
        $teacher = User::where('name',$internship->university_supervisor);
        $documents = Rapport::where('user_id', $student)->where('sent_by', $teacher->id)->get();
        $docs = Rapport::where('user_id', $student)->where('sent_by', $student)->get();
     
 
     return response()->json([
         'status' => 200,
         'documents_teacher' => $documents,
         'documents_student' => $docs,
         'message'=>'success'
     ]);
        }
    }
    public function Rapports_teacher(Request $request)
    {
     $student = $request->student;
     $teacher = $request->teacher;
 
     $documents = Rapport::where('user_id', $student)->where('sent_by', $teacher)->get();
     
 
     return response()->json([
         'status' => 200,
         'documents' => $documents,
         'message'=>'success'
     ]);
    }

    
    public function Rapport_student(Request $request)
    {
        $student = $request->student;
 
        $documents = Rapport::where('user_id', $student)->where('sent_by', $student)->get();
        return response()->json([
            'status' => 200,
            'documents' => $documents,
            'message'=>'success'
        ]);
    }
    
   
    
    public function senDocToTeacher(Request $request)
    {
       $validator = Validator::make($request->all(),
            [
                 'title'=>'required',
                 'version' =>'required',
                 'description' =>'required'

            ],
            [
                 'title.required'=>'Le champ titre  est obligatoire.',
                 'version.required'=>'Le champ version  est obligatoire.',
                 'description.required'=>'Le champ description est obligatoire.',
           ]);

       if($validator->fails()){
         return response()->json([
             'status'=>400,
             'errors'=>$validator->getMessageBag(),
         ]);
       }
       else
       {     
          $student = User::find($request->user_id);
          $teacher = User::find($request->teacher);
          

          $doc = $request->file('file');

          if ($doc->isValid())
           {
               $path = "C:/xampp/htdocs/Internship-Management-System/front_end/public/Rapports";
                //   document :
                $extensionDoc = $doc->getClientOriginalExtension();
                $docname = time() . '.' . $extensionDoc;
                $doc->move($path, $docname);

                //add new doc
                $Rapport = new Rapport;
                $Rapport->title = $request->title;
                $Rapport->version = $request->version;
                $Rapport->description = $request->description;
                $Rapport->file = $docname;
                $Rapport->user_id = $student->id; 
                $Rapport->user_name = $student->name;
                $Rapport->encadrant_name = $teacher->name;
                $Rapport->encadrant_id = $teacher->id;
                $Rapport->sent_by = $student->id;

                $Rapport->save();

                //add notification for teacher :
                    $notification = Notification::create([
                        'type' => "Rapport de stage",
                           'notification' =>$student->name." Vous avez envoyé le document".$request->title,
                        'user_name' =>$teacher->name,
                         'user_id'=>$teacher->id  
                          ]);


                return response()->json([
                    'status'=>200,
                    'message'=>"Vous avez déposé un Rapport",
                ]);
           }
        
       }
    }

    public function Doc_from_teacher(Request $request)
    {
       $validator = Validator::make($request->all(),
            [
                 'title'=>'required',
                 'version' =>'required',
                 'description' =>'required'

            ],
            [
                 'title.required'=>'Le champ titre  est obligatoire.',
                 'version.required'=>'Le champ version  est obligatoire.',
                 'description.required'=>'Le champ description est obligatoire.',
           ]);

       if($validator->fails()){
         return response()->json([
             'status'=>400,
             'errors'=>$validator->getMessageBag(),
         ]);
       }
       else
       {     
        $teacher = User::find($request->teacher_id);
        $student = User::find($request->student_id);      

        $doc = $request->file('file');

            
          if ($doc->isValid())
           {
               $path = "C:/xampp/htdocs/Internship-Management-System/front_end/public/Rapports";
                //   document :
                $extensionDoc = $doc->getClientOriginalExtension();
                $docname = time() . '.' . $extensionDoc;
                $doc->move($path, $docname);

                //add new doc
                $Rapport = new Rapport;
                $Rapport->title = $request->title;
                $Rapport->version = $request->version;
                $Rapport->description = $request->description;
                $Rapport->file = $docname;
                $Rapport->user_id = $student->id; 
                $Rapport->user_name = $student->name;
                $Rapport->encadrant_name = $teacher->name;
                $Rapport->encadrant_id = $teacher->id;
                $Rapport->sent_by = $teacher->id;

                $Rapport->save();

                 //add notification for student :
                    $notification = NotificationStudent::create([
                        'type' => "fichier",
                           'notification' =>$teacher->name." Vous avez envoyé le document ".$request->title,
                        'user_name' =>$student->name,
                         'user_id'=>$student->id  
                          ]);

                return response()->json([
                    'status' => 200,
                    'message' => 'Vous avez envoyé un fichier à ' . $student->name
                ]);
           }
       
        }
       }
    

}
