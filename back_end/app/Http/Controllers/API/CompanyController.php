<?php
namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    // index : pour afficher les données de la table companies (where role  is student)
    public function index()
     {
     // get() : select * from companies.
      $company = DB::table('companies')->get();
         return response()->json([
             'status'=>200,
             'company'=>$company,
         ]);
     }



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

                 return response()->json([
                    'status'=>200,
                    'message'=>'Entreprise ajoutée avec succès',
                ]);            
            }
    }





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
                'message'=>'Enseignant non trouvé!'
            ]);
        }
    }



    public function update(Request $request, $id){

       $validator = Validator::make($request->all(),[
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