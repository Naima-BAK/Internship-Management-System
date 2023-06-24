<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;


class SettingController extends Controller
{
   
    public function index($id)
    {
        $setting = Setting::find($id);
        if($setting)
        {
            return response()->json([
                'status'=>200,
                'setting'=>$setting
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>' non trouvé!'
            ]);
        }
    }

    public function update_website_name(Request $request)
    {

       $validator = Validator::make($request->all(),
          [ 'website_name'=> 'required'],
          [ 'website_name.required'=>'Le champ nom de site web est obligatoire.']
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
           $setting = Setting::find(1);
           if($setting)
           {
               $setting->website_name = $request->input('website_name');
               $setting->save();

               return response()->json([
                   'status'=>200,
                   'message'=>"le nom de site web est mise à jour avec succès",
               ]);
               
           }
           else
           {
               return response()->json([
                   'status'=>404,
                   'message'=>'non trouvé!'
               ]);
           }
       }
    }
   
    public function update_contactData( Request $request)
    {

       $validator = Validator::make($request->all(),
          [ 'contact_email'=> 'required',
          'contact_phone'=> 'required',
          'contact_localization'=> 'required'],
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
           $setting = Setting::find(1);
           if($setting)
           {
               $setting->contact_email = $request->input('contact_email');
               $setting->contact_phone = $request->input('contact_phone');
               $setting->contact_localization = $request->input('contact_localization');
               $setting->save();

               return response()->json([
                   'status'=>200,
                   'message'=>"les données de contact sont mises à jour avec succès",
               ]);            
           }
           else
           {
               return response()->json([
                   'status'=>404,
                   'message'=>'non trouvé!'
               ]);
           }
       }

    }

    public function update_SocialNetworksLinks( Request $request)
    {

       $validator = Validator::make($request->all(),
          [ 'facebook'=> 'required',
          'instagram'=> 'required',
          'linkedin'=> 'required'],
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
           $setting = Setting::find(1);
           if($setting)
           {
               $setting->facebook = $request->input('facebook');
               $setting->instagram = $request->input('instagram');
               $setting->linkedin = $request->input('linkedin');
               $setting->save();

               return response()->json([
                   'status'=>200,
                   'message'=>"les liens réseaux ciciaux sont mises à jour avec succès",
               ]);            
           }
           else
           {
               return response()->json([
                   'status'=>404,
                   'message'=>'non trouvé!'
               ]);
           }
       }

    }


      //ajouter le logo 
      public function upload_website_logo(Request $request)
      {
 
             
            $image = $request->file('selectedFile');
            $id = $request->input('setting_id');

            $setting =  Setting::find($id);
            if($setting)
            {
                if ($image->isValid()) {
                     $path = "C:/xampp/htdocs/Internship-Management-System/front_end/public/website_logo";
                     //  image :
                     $extensionFile = $image->getClientOriginalExtension();
                     $filename = time() . '.' . $extensionFile;
                     $image->move($path, $filename);
              
                     $setting->website_logo = $filename;
                     $setting->save();
                     return response()->json([
                         'status'=>200,
                         'message'=>"le logo est mise à jour avec succès",
                     ]);
                }
            }          
                return response()->json([
                    'status'=>404,
                    'message'=>"error",
                ]);
        
        
      }

      //update le favicon 
      public function upload_website_favicon(Request $request)
      {
 
             
            $image = $request->file('selectedFile');
            $id = $request->input('setting_id');

            $setting =  Setting::find($id);
            if($setting)
            {
                if ($image->isValid()) {
                     $path = "C:/xampp/htdocs/Internship-Management-System/front_end/public/website_favicon";
                     //  image :
                     $extensionFile = $image->getClientOriginalExtension();
                     $filename = time() . '.' . $extensionFile;
                     $image->move($path, $filename);
              
                     $setting->website_favicon = $filename;
                     $setting->save();
                     return response()->json([
                         'status'=>200,
                         'message'=>"favicon est mise à jour avec succès",
                     ]);
                }
            }          
                return response()->json([
                    'status'=>404,
                    'message'=>"error",
                ]);
        
        
      }

}
