<?php

namespace App\Http\Controllers\API;
use stdClass;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Color;
use App\Models\AdminNotification;

class ColorController extends Controller
{
    
   
    public function index($id)
    {
        $colors = Color::find($id);
        if($colors)
        {
            return response()->json([
                'status'=>200,
                'colors'=>$colors
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

    public function index_student($id)
    {
        $colors = Color::find($id);
        if($colors)
        {
            return response()->json([
                'status'=>200,
                'colors'=>$colors
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

    public function index_teacher($id)
    {
        $colors = Color::find($id);
        if($colors)
        {
            return response()->json([
                'status'=>200,
                'colors'=>$colors
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
    
    public function update_colors(Request  $request)
    {

        $colorChosen = $request->input('colorChosen');      
              
         $colorupdate = Color::find(1);
         if($colorupdate)
         {
            //The function uses an if-else block to check which color was chosen,
            // and then sets the corresponding color values for the navbar and sidebar.
            // If the chosen color is not recognized, it sets default color values.
            if($colorChosen == "black"){
              $colorupdate->navbarbackground  = "#f8f9fa";
                $colorupdate->navbarcolor = "black";
                $colorupdate->navbaricon = "white";
                $colorupdate->navbarbutton = "#58D3F7";
                $colorupdate->sidebarbackground = "dark";
                $colorupdate->sidebarbg = "";
                $colorupdate->sidebarecolor = "rgba(255, 255, 255, 0.5)";
                $colorupdate->sidebaricon = "#58D3F7";
                $colorupdate->save();

            }else if ($colorChosen == "white"){
                $colorupdate->navbarbackground  = "#f8f9fa";
                $colorupdate->navbarcolor = "black";
                $colorupdate->navbaricon = "white";
                $colorupdate->navbarbutton = "orange";
                $colorupdate->sidebarbackground = "";
                $colorupdate->sidebarbg = "white";

                $colorupdate->sidebarecolor = "black";
                $colorupdate->sidebaricon = "orange";

                $colorupdate->save();

            }else if ($colorChosen == "blue"){
               

                $colorupdate->navbarbackground  = "#f8f9fa";
                $colorupdate->navbarcolor = "black";
                $colorupdate->navbaricon = "white";
                $colorupdate->navbarbutton = "#58D3F7";
                $colorupdate->sidebarbackground = "";
                $colorupdate->sidebarbg = "#87CEEB";
                $colorupdate->sidebarecolor = "rgba(255, 255, 255, 0.5)";
                $colorupdate->sidebaricon = "white";

                $colorupdate->save();

            }else if ($colorChosen == "purple"){
                $colorupdate->navbarbackground  = "#f8f9fa";
                $colorupdate->navbarcolor = "black";
                $colorupdate->navbaricon = "white";
                $colorupdate->navbarbutton = "purple";
                $colorupdate->sidebarbackground = "";
                $colorupdate->sidebarbg = "#C8A2C8";
                $colorupdate->sidebarecolor = "rgba(255, 255, 255, 0.5)";
                $colorupdate->sidebaricon = "white";

                $colorupdate->save();
            }else
            {
                $colorupdate->navbarbackground  = "#f8f9fa";
                $colorupdate->navbarcolor = "black";
                $colorupdate->navbaricon = "white";
                $colorupdate->navbarbutton = "#87AE73";
                $colorupdate->sidebarbackground = "";
                $colorupdate->sidebarbg = "#87AE73";
                $colorupdate->sidebarecolor = "rgba(255, 255, 255, 0.5)";
                $colorupdate->sidebaricon = "white";
                $colorupdate->save();
            }  
             //admin notification
             $admin_notification = AdminNotification::create([
              'type' => "Paramètres de couleur",
              'notification' =>"Vous avez changé la couleur de votre espace de travail", 
              'user_name'=>'',
              'user_email'=>'',
              'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette-fill" viewBox="0 0 16 16">
              <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>'
            ]);
            return response()->json([
                'status'=>200,
                'message'=>'La couleur est changé',
                
            ]);
         }
      

          
        // }
    }

    public function update_colors_student(Request  $request)
    {

        $colorChosen = $request->input('colorChosen');      
              
         $colorupdate = Color::find(2);
         if($colorupdate)
         {
            //The function uses an if-else block to check which color was chosen,
            // and then sets the corresponding color values for the navbar and sidebar.
            // If the chosen color is not recognized, it sets default color values.
            if($colorChosen == "black"){
              $colorupdate->navbarbackground  = "#f8f9fa";
                $colorupdate->navbarcolor = "black";
                $colorupdate->navbaricon = "white";
                $colorupdate->navbarbutton = "#58D3F7";
                $colorupdate->sidebarbackground = "dark";
                $colorupdate->sidebarbg = "";
                $colorupdate->sidebarecolor = "rgba(255, 255, 255, 0.5)";
                $colorupdate->sidebaricon = "#58D3F7";
                $colorupdate->save();

            }else if ($colorChosen == "white"){
                $colorupdate->navbarbackground  = "#f8f9fa";
                $colorupdate->navbarcolor = "black";
                $colorupdate->navbaricon = "white";
                $colorupdate->navbarbutton = "orange";
                $colorupdate->sidebarbackground = "";
                $colorupdate->sidebarbg = "white";

                $colorupdate->sidebarecolor = "black";
                $colorupdate->sidebaricon = "orange";

                $colorupdate->save();

            }else if ($colorChosen == "blue"){
               

                $colorupdate->navbarbackground  = "#f8f9fa";
                $colorupdate->navbarcolor = "black";
                $colorupdate->navbaricon = "white";
                $colorupdate->navbarbutton = "#58D3F7";
                $colorupdate->sidebarbackground = "";
                $colorupdate->sidebarbg = "#87CEEB";
                $colorupdate->sidebarecolor = "rgba(255, 255, 255, 0.5)";
                $colorupdate->sidebaricon = "white";

                $colorupdate->save();

            }else if ($colorChosen == "purple"){
                $colorupdate->navbarbackground  = "#f8f9fa";
                $colorupdate->navbarcolor = "black";
                $colorupdate->navbaricon = "white";
                $colorupdate->navbarbutton = "purple";
                $colorupdate->sidebarbackground = "";
                $colorupdate->sidebarbg = "#C8A2C8";
                $colorupdate->sidebarecolor = "rgba(255, 255, 255, 0.5)";
                $colorupdate->sidebaricon = "white";

                $colorupdate->save();
            }else
            {
                $colorupdate->navbarbackground  = "#f8f9fa";
                $colorupdate->navbarcolor = "black";
                $colorupdate->navbaricon = "white";
                $colorupdate->navbarbutton = "#87AE73";
                $colorupdate->sidebarbackground = "";
                $colorupdate->sidebarbg = "#87AE73";
                $colorupdate->sidebarecolor = "rgba(255, 255, 255, 0.5)";
                $colorupdate->sidebaricon = "white";
                $colorupdate->save();
            }  

            // //notification student :
            // $student_notification = StudentNotification::create([
            //     'type' => "Paramètres de couleur",
            //     'notification' =>"Vous avez changé la couleur de votre espace de travail", 
            //   ]);
            return response()->json([
                'status'=>200,
                'message'=>'la couleur est changé',
                
            ]);
         }
      

          
        // }
    }

    public function update_colors_teacher(Request  $request)
    {
        $colorChosen = $request->input('colorChosen');      
              
        $colorupdate = Color::find(3);
        if($colorupdate)
        {
           //The function uses an if-else block to check which color was chosen,
           // and then sets the corresponding color values for the navbar and sidebar.
           // If the chosen color is not recognized, it sets default color values.
           if($colorChosen == "black"){
             $colorupdate->navbarbackground  = "#f8f9fa";
               $colorupdate->navbarcolor = "black";
               $colorupdate->navbaricon = "white";
               $colorupdate->navbarbutton = "#58D3F7";
               $colorupdate->sidebarbackground = "dark";
               $colorupdate->sidebarbg = "";
               $colorupdate->sidebarecolor = "rgba(255, 255, 255, 0.5)";
               $colorupdate->sidebaricon = "#58D3F7";
               $colorupdate->save();

           }else if ($colorChosen == "white"){
               $colorupdate->navbarbackground  = "#f8f9fa";
               $colorupdate->navbarcolor = "black";
               $colorupdate->navbaricon = "white";
               $colorupdate->navbarbutton = "orange";
               $colorupdate->sidebarbackground = "";
               $colorupdate->sidebarbg = "white";

               $colorupdate->sidebarecolor = "black";
               $colorupdate->sidebaricon = "orange";

               $colorupdate->save();

           }else if ($colorChosen == "blue"){
              

               $colorupdate->navbarbackground  = "#f8f9fa";
               $colorupdate->navbarcolor = "black";
               $colorupdate->navbaricon = "white";
               $colorupdate->navbarbutton = "#58D3F7";
               $colorupdate->sidebarbackground = "";
               $colorupdate->sidebarbg = "#87CEEB";
               $colorupdate->sidebarecolor = "rgba(255, 255, 255, 0.5)";
               $colorupdate->sidebaricon = "white";

               $colorupdate->save();

           }else if ($colorChosen == "purple"){
               $colorupdate->navbarbackground  = "#f8f9fa";
               $colorupdate->navbarcolor = "black";
               $colorupdate->navbaricon = "white";
               $colorupdate->navbarbutton = "purple";
               $colorupdate->sidebarbackground = "";
               $colorupdate->sidebarbg = "#C8A2C8";
               $colorupdate->sidebarecolor = "rgba(255, 255, 255, 0.5)";
               $colorupdate->sidebaricon = "white";

               $colorupdate->save();
           }else
           {
               $colorupdate->navbarbackground  = "#f8f9fa";
               $colorupdate->navbarcolor = "black";
               $colorupdate->navbaricon = "white";
               $colorupdate->navbarbutton = "#87AE73";
               $colorupdate->sidebarbackground = "";
               $colorupdate->sidebarbg = "#87AE73";
               $colorupdate->sidebarecolor = "rgba(255, 255, 255, 0.5)";
               $colorupdate->sidebaricon = "white";
               $colorupdate->save();
           }  

           // //notification student :
           // $student_notification = StudentNotification::create([
           //     'type' => "Paramètres de couleur",
           //     'notification' =>"Vous avez changé la couleur de votre espace de travail", 
           //   ]);
           return response()->json([
               'status'=>200,
               'message'=>'la couleur est changé',
               
           ]);
        }
     
    }

}
