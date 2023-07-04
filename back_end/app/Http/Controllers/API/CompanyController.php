<?php
namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\AdminNotification;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    // index : pour afficher les données de la table companies (where role  is company)
    public function index()
    {
     // get() : select * from companies.
      $company = DB::table('companies')->get();
         return response()->json([
             'status'=>200,
             'company'=>$company,
         ]);
    }

    // // this function used to show data of a company selected by id
    public function show($id)
    {
          $company = Company::find($id);
          if($company)
          {
              return response()->json([
                  'status'=>200,
                  'company'=>$company
              ]);
          }
          else
          {
              return response()->json([
                  'status'=>404,
                  'message'=>'Company non trouvé!'
              ]);
          }
    }

    // this function used to add data to the companies table
     public function store(Request $req)
    {
        $validator = Validator::make($req->all(),[
           'name'=> 'required',
           'email'=> 'required|email|max:190|unique:users,email',
           'activity' => 'required',
           'phone' => 'required',
        //    'website' => 'required',
           'address' => 'required',
           'city' => 'required',
           'country' => 'required',
        ],
        [
            'name.required'=>'Le champ nom est obligatoire.',
            'activity.required'=>'Le champ activity est obligatoire.',
            'email.required'=>'Le champ email est obligatoire.',
            'phone.required'=>'Le champ filiere est obligatoire.',
            // 'website.required'=>'Le champ email est obligatoire.',
            'city.required'=>'Le champ filiere est obligatoire.',
            'address.required'=>'Le champ email est obligatoire.',
            'country.required'=>'Le champ filiere est obligatoire.',
         ]
       );
        if($validator->fails()){
        return response()->json([
            'status'=>400,
            // getMessageBag() : Obtenez tous les messages d'erreur de validation.
            'errors'=>$validator->getMessageBag(),
        ]);
    
        }else{
               $companys = new Company;
                  $companys->name = $req->name;
                 $companys->email = $req->email;
                 $companys->activity = $req->activity;
                 $companys->phone = $req->phone;
                 $companys->website = $req->website;
                 $companys->city = $req->city;
                 $companys->country = $req->country;
                 $companys->address = $req->address;
                 $companys->save();

                 $admin_notification = AdminNotification::create([
                    'type' => "L'ajout d'une nouvelle entreprise ",
                    'notification' =>"Vous avez ajouté l'entreprise ".$req->name, 
                    'user_name'=>'',
                    'user_email'=>'',
                    'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-building-fill-add" viewBox="0 0 16 16">
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Z"/>
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.493 4.493 0 0 0 12.5 8a4.493 4.493 0 0 0-3.59 1.787A.498.498 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.476 4.476 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1V1Zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
                  </svg>'
                   
                  ]);
                 return response()->json([
                    'status'=>200,
                    'message'=>'Entreprise ajoutée avec succès',
                ]);            
            }
    }

    //
    public function edit($id)
    {
        $company = Company::find($id);
        if($company)
        {
            return response()->json([
                'status'=>200,
                'company'=>$company
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'Entreprise non trouvé!'
            ]);
        }
    }

    // this function used to update data of companies table from databse
    public function update(Request $request, $id)
    {

       $validator = Validator::make($request->all(),[
        'name'=> 'required',
        'email'=> 'required|email|max:190|unique:users,email',
        'activity' => 'required',
        'phone' => 'required', 
        'address' => 'required',
        'city' => 'required',
        'country' => 'required',
     ],
     [
         'name.required'=>'Le champ nom est obligatoire.',
         'activity.required'=>'Le champ activity est obligatoire.',
         'email.required'=>'Le champ email est obligatoire.',
         'phone.required'=>'Le champ filiere est obligatoire.',
         // 'website.required'=>'Le champ email est obligatoire.',
         'city.required'=>'Le champ filiere est obligatoire.',
         'address.required'=>'Le champ email est obligatoire.',
         'country.required'=>'Le champ filiere est obligatoire.',
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
           $companys = Company::find($id);
           if($companys)
           {
               $companys->name = $request->input('name');
               $companys->email = $request->input('email');
               $companys->activity = $request->activity;
               $companys->phone = $request->phone;
               $companys->website = $request->website;
               $companys->city = $request->city;
               $companys->country = $request->country;
               $companys->address = $request->address;
               $companys->save();
               return response()->json([
                   'status'=>200,
                   'message'=>"Entreprise mise à jour avec succès",
               ]);
           }
           else
           {
               return response()->json([
                   'status'=>404,
                   'message'=>'Entreprise non trouvé!'
               ]);
           }
       }
    }

    // la fontion destroy pour supprimer un Ensegnant dans la base de donnes
    public function destroy($id)
    {
           
           $company = Company::find($id);
           
           if($company)
           {
               $company->delete();
                //admin notification :
            $admin_notification = AdminNotification::create([
                'type' => "Suppression d'une entreprise ",
                'notification' =>"Vous avez supprimé l'entreprise numéro".$company->id, 
                'user_name'=>$company->name,
                'user_email' => '',
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-building-dash" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Z"/>
                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1V1Z"/>
                <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
              </svg>'
              ]);
               return response()->json([
                   'status'=>200,
                   'message'=>'Entreprise supprimée avec succès',
               ]);
           }
           else
           {
               return response()->json([
                   'status'=>404,
                   'message'=>'Entreprise non trouvé!',
               ]);
           }
           
    }

}
