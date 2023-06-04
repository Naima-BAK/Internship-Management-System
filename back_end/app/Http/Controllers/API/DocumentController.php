<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\User;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class DocumentController extends Controller
{

    public function index()
    {
     // all() : get all status  from stage_status
     $document = DB::table('documents')->get();
     $user = User::get();
        return response()->json([
            'status'=>200,
            'user'=>$user,
            'document'=>$document,
        ]);
    }


    public function upload(Request $request)
    {
 
        $image = $request->file('selectedFile');
        $doc = $request->file('selectedDoc');
        $id = 1;
        if ($image->isValid() && $doc->isValid()) {
             $path = "C:/xampp/htdocs/Internship-Management-System/front_end/public/documents";
            //  image :
             $extensionFile = $image->getClientOriginalExtension();
             $filename = time() . '.' . $extensionFile;
             $image->move($path, $filename);
            //   document :
             $extensionDoc = $doc->getClientOriginalExtension();
             $docname = time() . '.' . $extensionDoc;
             $doc->move($path, $docname);

             Document::create(['user_id'=>$id ,'demande_stage_name'=>$filename,'demande_stage_pdf'=>$docname]);
             return response()->json(['success'=> 'upload saccessfully']);
         }
         return response()->json(['plz try again']);
    }
 
     public function getDocs(){
         $document = DB::table('documents')->get();
         return response()->json([
             'status'=>200,
             'images'=>$document,
         ]);
 
     }

    
     public function upload_confirmation_all(Request $request)
     {
        $student = DB::table('users')->where('role_as', 1)->get();
        $documents = DB::table('documents')->get();
        $doc = $request->file('selectedDoc');
             //this function check if user->id exite in documents table 
            function compare($id)
            {
              $documents = DB::table('documents')->get();
               foreach ($documents as $d)
               {
                   if($id == $d->user_id){
                       return false;
                   }
                  
               }
               return true;
            }

        if ($doc->isValid()) 
        {
            $path = "C:/xampp/htdocs/Internship-Management-System/front_end/public/documents/confirmation";
            $extensionDoc = $doc->getClientOriginalExtension();
            $docname = time() . '.' . $extensionDoc;
            $doc->move($path, $docname);
           
                 foreach ($student as $s)
                 {
                    if(compare($s->id))
                    {
                        $doc = new Document;
                        $doc->user_id = $s->id;
                        $doc->confirmation = $docname;
                        $doc->save();   
                         return response()->json([
                        'status'=>200,
                        'message'=>'Confirmation ajoutée à tous les étudiants'
                        
                    ]);           
                    }else{
            return response()->json([
                'status'=>204,
                'message'=>'Confirmation déjà envoyée'
                
            ]);
                 }
                   
                
        } 
        }
     }


     public function upload_confirmation_one(Request $request)
     {
       
        $doc = $request->file('selectedDoc');
        // $student = $request->input('user_id');
        $user = 18;
            
        if ($doc->isValid()) 
        {
            $path = "C:/xampp/htdocs/Internship-Management-System/front_end/public/documents/confirmation";
            $extensionDoc = $doc->getClientOriginalExtension();
            $docname = time() . '.' . $extensionDoc;
            $doc->move($path, $docname);      

            $doc = new Document;
            $doc->user_id = $user;
            $doc->confirmation = $docname;
            $doc->save();   
             return response()->json([
            'status'=>200,
            'message'=>'Confirmation ajoutée à tous les étudiants'                        
             ]);   
            
        }
        return response()->json([
           'status'=>204,
           'message'=>'Confirmation déjà envoyée'
                
        ]);
                
    } 
      
   
}
