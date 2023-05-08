<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use Mail;

class AuthController extends Controller
{
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



    public function login(Request $request){
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
                return response()->json([
                    'status'=>200,
                    'username'=>$user->name,
                    'token'=>$token,
                    'message'=>'Connecté avec succès',
                    'role'=>$role,
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




    public function store(Request $req)
    {
        $validator = Validator::make($req->all(),[
           'name'=> 'required',
           'email'=> 'required|email|max:190|unique:users,email',
           'password' => 'required|min:8',
           'level' => 'required',
           'sector' => 'required',
           'role_as' => 'required',
           'stage_status' => 'required',
        ],
        [
            'name.required'=>'Le champ nom est obligatoire.',
            'password.required'=>'Le champ password est obligatoire.',
            'email.required'=>'Le champ email est obligatoire.',
            'level.required'=>'Le champ niveau est obligatoire.',
            'sector.required'=>'Le champ filiere est obligatoire.',
            'role_as.required'=>'Le champ role est obligatoire.',
            'password.min'=>'La longueur minimale est de 8.',
            'stage_status.required'=>'Le champ stage_status est obligatoire.',
            'email.max'=>'La longueur d\'email est trop longue. La longueur maximale est de 190.',
        ]
    
    );

    if($validator->fails()){
        return response()->json([
            'status'=>400,
            // getMessageBag() : Obtenez tous les messages d'erreur de validation.
            'errors'=>$validator->getMessageBag(),
        ]);
    
        }else{
               $user = User::create([
                 'name' => $req->name,
                 'email' => $req->email,
                 'password' => Hash::make($req->password),
                 'level' => $req->level,
                 'sector' => $req->sector,
                 'role_as' => $req->role_as,
                 'stage_status' => $req->stage_status,
               ]);
// ----------------
$user_name = $req->name;//name of receiver
$email = $req->email;//mail of receiver

$data = array(
  "name"=>$user_name,
  "body"=>"here is your password for the trainee management platform",
  "your_pass" => $req->password
);

//data : information to (send name of receiver and the body of email).
//'mail' : name of view
  Mail::send(['text' => 'mail'], $data, 
  function($msg) use($email, $user_name){
    $msg->to($email, $user_name)->subject('Internship-Management-System app password');
    $msg->from('n.bakenchich@gmail.com','IMS Administration');//source mail
});
// -----------------
               $token = $user->createToken($user->email.'_token')->plainTextToken;
               return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' =>$token,
                'message' => 'l\'étudiant est ajouter avec succès',
               ]);
               
            }
    }
}
