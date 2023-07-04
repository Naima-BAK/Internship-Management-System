<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\Sanctum;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Internship;

use App\Models\Email;
use App\Models\AdminNotification;
use App\Models\NotificationStudent;
use App\Models\Notification;

use Mail;

class AuthController extends Controller
{

    public function index()
    {
        $users = DB::table('users')->get();
        return response()->json($users);
    }

    
    public function index_get_students(Request $request)
    {

        $teacher = User::find($request->teacher);
        $users = User::join('internships', 'users.id', '=', 'internships.user_id')
                        ->where('internships.university_supervisor', $teacher->name)
                        ->where('users.role_as', 1)
                        ->get(['users.*']);

                        $userToAdd = User::find(14);
                        $users->push($userToAdd);
        return response()->json($users);
    }

    public function index_get_supervisor(Request $request)
    {

        $internships = Internship::where('user_id', $request->student)->get();
        $users = User::join('internships as i1', 'users.name', '=', 'i1.university_supervisor')
                        
                            ->where('users.role_as', 3)
                            ->get(['users.*']);
        $userToAdd = User::find(14);
        $users->push($userToAdd);
                            return response()->json($users);
    }

    public function register(Request $req)
    {
        $validator = Validator::make($req->all(),[
           'name'=> 'required',
           'email'=> 'required|email|max:190|unique:users,email',
           'password' => 'required|min:8'
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }else{
               $user = User::create([
                 'name' => $req->name,
                 'email' => $req->email,
                 'password' => Hash::make($req->password),
               ]);
               $token = $user->createToken($user->email.'_token')->plainTextToken;
               return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' =>$token,
                'message' => 'registered Sucessfully',
               ]);
               
            }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email'=>'required|max:191',
            'password'=>'required',
           ],
            [
                'email.required'=>'Le champ Adresse email est obligatoire.',
                'email.max'=>'La longueur de l\'adresse e-mail est trop longue. La longueur maximale est de 191',
                'password.required'=>'Le champ Mot de passe est obligatoire.',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->errors(),
            ]);
        }
        else
        {
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
               return response()->json([
                   'status'=>401,
                   'message'=>'Login et mot de passe incorrects, veuillez les
                   vérifier.',
               ]);
            }
            else
            {
                $credentials = $request->only('email', 'password');
                $userAgent = $request->header('User-Agent'); // get the user agent string
                if (Auth::attempt($credentials)) {
                    $device = DB::table('devices')->insert([
                        'user_id' => $user->id,
                        'name' => $userAgent, // store the user agent string as the device name
                        'connection_date' => Carbon::now(),
                        'ip_address' => $request->ip(),
                    ]);

                $devices =  DB::table('devices')->where('user_id',$user->id)->get();
                

                $devicesjson = [];

                foreach ($devices as $d) {
                    $devicesjson[] = [
                        "name" => $d->name,
                        "connection_date" => $d->connection_date,
                        "ip_address" => $d->ip_address
                    ];
                }
                if($user->role_as == 2)// 2 = admin
                {
                    $role = 'admin';
                    $token = $user->createToken('_AdminToken',['server:admin'])->plainTextToken;
                }
                else  if($user->role_as == 3)//3 = teacher
                {
                    $role = 'teacher';
                    $token = $user->createToken('_TeacherToken',['server:teacher'])->plainTextToken;
                }
                else
                {
                    $role = '';// 1 = student
                    $token = $user->createToken($user->email.'_Token',[''])->plainTextToken;
                }
            }
 
                return response()->json([
                    'status'=>200,
                    'username'=>$user->name,
                    'id'=> $user->id,
                    'email'=> $user->email,
                    'image'=> $user->image,
                    'token'=>$token,
                    'message'=>'Connecté avec succès',
                    'role'=>$role,
                    'devices'=>$devicesjson
                ]);
            }
        }
    } 


    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'logged out Sucessfully',
           ]);
    }

    public function store_student(Request $req)
    {
        $validator = Validator::make($req->all(),
            [
           'name'=> 'required',
           'email'=> 'required|email|max:190|unique:users,email',
           'password' => 'required|min:8',
           'level' => 'required',
           'sector' => 'required',
          
           'stage_status' => 'required',
            ],
            [
                'name.required'=>'Le champ nom est obligatoire.',
                'password.required'=>'Le champ password est obligatoire.',
                'email.required'=>'Le champ email est obligatoire.',
                'level.required'=>'Le champ niveau est obligatoire.',
                'sector.required'=>'Le champ filiere est obligatoire.',
                
                'password.min'=>'La longueur minimale est de 8.',
                'stage_status.required'=>'Le champ stage_status est obligatoire.',
                'email.max'=>'La longueur d\'email est trop longue. La longueur maximale est de 190.',
            ]
        );

        $role_as = 1;
        if($validator->fails())
        {
             return response()->json([
                 'status'=>400,
                 // getMessageBag() : Obtenez tous les messages d'erreur de validation.
                 'errors'=>$validator->getMessageBag(),
             ]);
    
        }else
        {
               $user = User::create([
                 'name' => $req->name,
                 'email' => $req->email,
                 'password' => Hash::make($req->password),
                 'level' => $req->level,
                 'sector' => $req->sector,
                 'role_as' => $role_as,
                 'stage_status' => $req->stage_status,
               ]);
                // ----Send email to student ------------
                $user_name = $req->name;//name of srudent
                $email = $req->email;//mail of dustudent

                $data = array(
                 
                        "name"=>$user_name,
                        "body"=>"Nous sommes heureux de vous informer que vous pouvez désormais accéder à l'application Internship MS en utilisant les identifiants suivants :
   
                           utilisateur :".$email."
                           Mot de passe : ".$req->password,
                       
                   
                );

                //data : information to (send name of receiver and the body of email).
                //'mail' : name of view
                Mail::send(['text' => 'mail'], $data, 
                function($msg) use($email, $user_name){
                    $msg->to($email, $user_name)->subject("Accès à l'application");
                    $msg->from('n.bakenchich@gmail.com','IMS Administration');//source mail
                });
                // -----------------
               $token = $user->createToken($user->email.'_token')->plainTextToken;

               //add email history :
               $body = $data['body'];
               $emailhistory = Email::create([
                'user_name' => $user_name,
                'user_email' =>$email,
                'body' => $body,
                'subject' => 'Internship-Management-System app password',   
                'selected_user' => $role_as     
              ]);

               //admin notification : ajout d'un etudiant
              $admin_notification = AdminNotification::create(
                [
                     'type' => "L'ajout d'un nouveau étudiant",
                     'notification' =>"Vous avez ajouter l'étudiant ".$user_name,
                     'user_name' => $user_name,
                      'user_email' =>$email,
                      'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                    </svg>'
    
                ]);

  

              //envoie d'un email
               $admin_notification = AdminNotification::create(
                [
                    'type' => "L'envoie des emails",
                    'notification' =>"Vous avez envoyez  un password générer via email à ".$user_name,
                    'user_name' => $user_name,
                    'user_email' =>$email,
                    'icon' => ''
                
                ]);


                $idbb = 14;
                 //add notification for student :
                    $notification = NotificationStudent::create(
                    [
                        'type' => "Consultez votre boite gmail",
                        'notification' =>" Vous avez reçu un email",
                        'user_name' =>$user_name,                       
                         'user_id'=>$idbb
               
                    ]);

               return response()->json([
                   'status' => 200,
                   'username' => $user->name,
                   'token' =>$token,
                   'message' => 'l\'étudiant est ajouter avec succès',
               ]);
               
            }
    }


    public function store_teacher(Request $req)
    {
        $validator = Validator::make($req->all(),[
           'name'=> 'required',
           'email'=> 'required|email|max:190|unique:users,email',
           'password' => 'required|min:8',
           'job' => 'required',
            ],
            [
            'name.required'=>'Le champ nom est obligatoire.',
            'password.required'=>'Le champ password est obligatoire.',
            'email.required'=>'Le champ email est obligatoire.',
            'job.required'=>'Le champ filiere est obligatoire.',
            'password.min'=>'La longueur minimale est de 8.',
            'email.max'=>'La longueur d\'email est trop longue. La longueur maximale est de 190.',
            ]
    
        );


        $roleas = 3;
        if($validator->fails()){
             return response()->json([
            'status'=>400,
            // getMessageBag() : Obtenez tous les messages d'erreur de validation.
            'errors'=>$validator->getMessageBag(),
             ]);
    
        }else
        {
               $user = User::create([
                 'name' => $req->name,
                 'email' => $req->email,
                 'password' => Hash::make($req->password),
                 'job' => $req->job,
                 'role_as' => $roleas,
               ]);
               // ----------------
               $user_name = $req->name;//name of receiver
               $email = $req->email;//mail of receiver

                $data = array(
                     "name"=>$user_name,
                     "body"=>"Nous sommes heureux de vous informer que vous pouvez désormais accéder à l'application Internship MS en utilisant les identifiants suivants :

                        utilisateur :".$email."
                        Mot de passe : ".$req->password,
                    
                );

                 //data : information to (send name of receiver and the body of email).
                 //'mail' : name of view
          
                 Mail::send(['text' => 'mail_password'], $data, 

                 function($msg) use($email, $user_name){
                       $msg->to($email, $user_name)->subject("Accès à l'application");
                       $msg->from('n.bakenchich@gmail.com','IMS Administration');//source mail
                  });
                 // -----------------
              
               $token = $user->createToken('_TeacherToken',['server:teacher'])->plainTextToken;

                //add email history :
                $body = $data['body'];
      $emailhistory = Email::create([
                 'user_name' => $user_name,
                 'user_email' =>$email,
                 'body' => $body,
                 'subject' => 'Internship-Management-System app password',     
                 'selected_user' => $roleas     
   
               ]);
                //admin notification
              $admin_notification = AdminNotification::create([
                'type' => "L'ajout d'un nouveau enseignant",
                'notification' =>"Vous avez ajouter l'enseignant ".$user_name,
                'user_name' => $user_name,
                'user_email' =>$email,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
              </svg>'
                
              ]);
               $admin_notification = AdminNotification::create([
                'type' => "L'envoie des emails",
                'notification' =>"Vous avez envoyez  un password générer via email à ".$user_name,
                'user_name' => $user_name,
                'user_email' =>$email,
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-envelope-plus-fill" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z"/>
                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/>
              </svg>'
                

              ]);
              $idbb = 14;
              //add notification for teacher :
                $notification = Notification::create(
                    [
                        'type' => "Consultez votre boite gmail",
                        'notification' =>" Vous avez reçu un email",
                        'user_name' =>$user_name,                       
                         'user_id'=>$idbb
               
                    ]);

               return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' =>$token,
                'message' => "l'enseignant est ajouter avec succès",
               ]);              
            }
    }


    public function upload_profile_image(Request $request)
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


     // this function used to update data of admin user :
     public function update_admin_data(Request $request, $id)
     {
 
        $validator = Validator::make($request->all(),[
            'name'=> 'required',
            'email'=> 'required|email|max:190,email',
            
         ],
         [
             'name.required'=>'Le champ nom est obligatoire.',
             'email.required'=>'Le champ email est obligatoire.',
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
            $admin = User::find($id);
            if($admin)
            {
                $admin->name = $request->input('name');
                $admin->email = $request->input('email');            
                $admin->save(); 
                
                //admin notification
                $admin_notification = AdminNotification::create([
                    'type' => "Paramètres de  profile",
                    'notification' =>"Vous avez modifier votre données de profile",
                    'user_name' => $admin->name,
                    'user_email' =>$admin->email,
                    
                  ]);
                return response()->json([
                    'status'=>200,
                    'message'=>"Vos données sont mises à jour avec succès",
                ]);
              
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'utilisateur non trouvé!'
                ]);
            }
        }
     }

     //get admin data  by id
     public function edit_admin_data($id)
     {
         $admin = User::find($id);
         if($admin)
         {
             return response()->json([
                 'status'=>200,
                 'admin'=>$admin
             ]);
         }
         else
         {
             return response()->json([
                 'status'=>404,
                 'message'=>'user non trouvé!'
             ]);
         }
     }

     public function destroy($id)
     {
         
         $user = User::find($id);
         
         if($user)
         {
             $user->delete(); 
              $admin_notification = AdminNotification::create([
                'type' => "Suppression d'un utilisateur",
                'notification' =>"Vous avez supprimer l'utilisateur numéro".$user->id,
                'user_name' => $user->name,
                'user_email' =>$user->email,
                'icon' =>' <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-person-fill-x" viewBox="0 0 16 16">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z"/>
              </svg>'
                
              ]);
             return response()->json([
                 'status'=>200,
                 'message'=>'votre compte est supprimée avec succès',
             ]);
             
    
         }
         else
         {
             return response()->json([
                 'status'=>404,
                 'message'=>'user non trouvé!',
             ]);
         }
         
     }
   
     public function getEmails()
     {
         $emails = DB::table('emails')->get();
         return response()->json([
             'status'=>200,
             'emails'=>$emails,
         ]);
     }
     public function getEmailsStudent(Request $request)
     {
        $user_email = $request->input('user_email');
         $emails = DB::table('emails')
         ->where('selected_user',1)
         ->where('user_email',$user_email)->get();
         return response()->json([
             'status'=>200,
             'emails'=>$emails,
         ]);
     }
     public function getEmailsTeacher(Request $request)
     {
        $user_email = $request->input('user_email');

         $emails = DB::table('emails')
         ->where('selected_user',3)
         ->where('user_email',$user_email)
         ->get();
         return response()->json([
             'status'=>200,
             'emails'=>$emails,
         ]);
     }
    
 
}
