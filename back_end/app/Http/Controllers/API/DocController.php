<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Doc;
use App\Models\User;
use App\Models\NotificationStudent;
use App\Models\AdminNotification;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DocController extends Controller
{
        public function index_Admin_to_student(Request $request)
       {
        $user_id = $request->user_id;
        $sent_by = $request->sent_by;
    
        $documents = Doc::where('user_id', $user_id)
                          ->where('sent_by', $sent_by)
                          ->get();
        
    
        return response()->json([
            'status' => 200,
            'documents' => $documents,
            'message'=>'success'
        ]);
       }

       
       public function index_student_to_Admin(Request $request)
{
    $user_id = $request->user_id;

    $docs = Doc::where('user_id', $user_id)
                     ->where('sent_by', $user_id)
                     ->get();

    return response()->json([
        'status' => 200,
        'docs' => $docs,
        'message' => 'succès'
    ]);
}
       
       public function show($id)
       {
        $document = Document::find($id);

        return response()->json($document);
       }
       public function senDocToAdmin(Request $request)
       {
           $validator = Validator::make($request->all(),[
             'title'=>'required',
             'description' =>'required'

               ],
               [
                'title.required'=>'Le champ titre  est obligatoire.',
                'description.required'=>'Le champ description est obligatoire.',
           ]);

           if($validator->fails()){
            return response()->json([
                'status'=>400,
                'errors'=>$validator->getMessageBag(),
            ]);
           }
          else{
            $user = User::find($request->user_id);
            $doc = $request->file('file');
            if ($doc->isValid()) 
            {
                $path = "C:/xampp/htdocs/Internship-Management-System/front_end/public/documents";
                //document :
                $extensionDoc = $doc->getClientOriginalExtension();
                $docname = time() . '.' . $extensionDoc;
                $doc->move($path, $docname);
                $document = new Doc;
                $document->title = $request->title;
                $document->description = $request->description;
                $document->file = $docname;
                $document->user_id = $request->user_id; 
                $document->user_name = $user->name;
                $document->sent_by = $request->user_id;
                $document->save();
                 $idbb = 14;
                $notification = AdminNotification::create(
                    [
                            'type' => "Documents",
                            'notification' =>" Vous avez reçu".$request->title." de ".$user->name,
                            'user_name' =>$user->name,
                             'user_email' =>'',
                             'icon'=>'',
                             'user_id'=>$idbb
                   
                    ]);
                return response()->json([
                    'status'=>200,
                    'message'=>"Vous avez ajouter le document",
                ]);
           }
        }
       }

       public function store(Request $request)
       {
          $validator = Validator::make($request->all(),[
            'title'=>'required',
            // 'file' =>'required'
            'description' =>'required'

           ],
            [
                'title.required'=>'Le champ titre  est obligatoire.',
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
             $user = User::find($request->user_id);
             $doc = $request->file('file');
             if ($doc->isValid())
              {
                  $path = "C:/xampp/htdocs/Internship-Management-System/front_end/public/documents";
                   //   document :
                   $extensionDoc = $doc->getClientOriginalExtension();
                   $docname = time() . '.' . $extensionDoc;
                   $doc->move($path, $docname);

                   $document = new Doc;
                   $document->title = $request->title;
                   $document->description = $request->description;
                   $document->file = $docname;
                   $document->user_id = $request->user_id; 
                   $document->user_name = $user->name;
                   $document->sent_by = $request->sent_by;

                   $document->save();

                   //notification for students
                   
                    $notification = NotificationStudent::create(
                        [
                         'type' => "Document administratif",
                            'notification' =>" Vous avez reçu document".$request->title." de l'administration",
                         'user_name' =>$user->name,
                          'user_id'=>$user->id
                
                       ]);
                   
                   return response()->json([
                       'status'=>200,
                       'message'=>"Vous avez ajouter le document",
                   ]);
                   
                   
              }
          }
       }

       public function storeDocForAll(Request $request)
       {
        $validator = Validator::make($request->all(),[
            'title'=>'required',
            // 'file' =>'required'
            'description' =>'required'

           ],
            [
                'title.required'=>'Le champ titre  est obligatoire.',
                'description.required'=>'Le champ description est obligatoire.',
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'errors'=>$validator->getMessageBag(),
            ]);
        }
        else{
        
        $doc = $request->file('file');
        if ($doc->isValid()) {
            $path = "C:/xampp/htdocs/Internship-Management-System/front_end/public/documents";
             //   document :
             $extensionDoc = $doc->getClientOriginalExtension();
             $docname = time() . '.' . $extensionDoc;
             $doc->move($path, $docname);

            $document = new Doc;
            $document->title = $request->title;
            $document->description = $request->description;
            $document->file = $docname;
            $document->user_id = $request->sent_by; 
            $document->user_name = 'admin';
            $document->sent_by = $request->sent_by;

            $document->save();

               //notification for students
               $users = User::where('role_as',1)->get();
               foreach($users as $i)
               {
                $notification = NotificationStudent::create(
                    [
                     'type' => "Document administratif",
                        'notification' =>" Vous avez reçu document ".$request->title." de l'administration",
                     'user_name' =>$i->name,
                      'user_id'=>$i->id
            
                   ]);
               }
            // return response()->json($document);
            return response()->json([
                'status'=>200,
                'message'=>"Vous avez ajouter le document",
            ]);
        }}
       }

       public function update(Request $request, $id)
       {
           $document = Document::find($id);
           $document->title = $request->title;
           $document->description = $request->description;
           $document->file = $request->file;
           $document->user_id = $request->user_id;
           $document->save();
   
           return response()->json($document);
       }
   
       public function destroy($id)
       {
           $document = Document::find($id);
           $document->delete();
   
           return response()->json(['message' => 'Document deleted']);
       }
}
