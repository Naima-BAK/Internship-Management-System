<?php


namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;



class ImageController extends Controller
{


    //ajouter le logo de l'entreprise
    public function upload(Request $request){
 
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
}
