<?php


namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use App\Models\User;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class ImageController extends Controller
{


    //ajouter le logo de l'entreprise
    public function upload(Request $request)
    {
 
        $image = $request->file('selectedFile');
        $id = $request->input('idCompany');
    
        $company =  Company::find($id);
             if($company)
             {
                if ($image->isValid()) {
                    $path = "C:/xampp/htdocs/Internship-Management-System/front_end/public/companies_logo";
            //  image :
             $extensionFile = $image->getClientOriginalExtension();
             $filename = time() . '.' . $extensionFile;
             $image->move($path, $filename);
            
             
                $company->logo = $filename;
                $company->save();
                return response()->json([
                    'status'=>200,
                    'message'=>"logo mise à jour avec succès",
                ]);
             }}
         return response()->json(['plz try again']);
    }



    public function updatePassword(Request $request) {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ],
        [
            'current_password.required' => 'Le champ mot de passe est obligatoire.',
    'new_password.min' => 'Le champ mot de passe doit comporter au moins :min caractères.',
    'new_password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
    'new_password.required' => 'Le champ nouveau mot de passe est obligatoire.',
    'new_password.min' => 'Le champ nouveau mot de passe doit comporter au moins :min caractères.',
]
    );

        $user_id = $request->current_user;
        $user = User::find($user_id);
        
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'The provided current password does not match our records.'], 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'status'=>200,
            'message'=>'votre mot de passe et modifier ',
        ]);
    }
    
    
 
}
