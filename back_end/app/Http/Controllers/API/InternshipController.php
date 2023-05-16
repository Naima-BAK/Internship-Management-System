<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Internship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class InternshipController extends Controller
{
    // index : pour afficher les données de la table internships.
    public function index()
     {
      // get() : select * from internships.
      $internship = DB::table('internships')->get();
      return response()->json([
             'status'=>200,
             'internship'=>$internship,
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
               $internship = new Internship;
                $internship->name = $req->name;
                 $internship->email = $req->email;
                 $internship->activity = $req->activity;
                 $internship->phone = $req->phone;
                 $internship->website = $req->website;
                 $internship->city = $req->city;
                 $internship->country = $req->country;
                 $internship->address = $req->address;
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
           $internship = Internship::find($id);
           if($internship)
           {
               $internship->name = $request->name;
               $internship->email = $request->email;
               $internship->activity = $request->activity;
               $internship->phone = $request->phone;
               $internship->website = $request->website;
               $internship->city = $request->city;
               $internship->country = $request->country;
               $internship->address = $request->address;
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
}
