<?php

namespace App\Http\Controllers\API;
use stdClass;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Color;


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
            return response()->json([
                'status'=>200,
                'message'=>'la couleur est changé',
                
            ]);
         }
      

          
        // }
    }

}
