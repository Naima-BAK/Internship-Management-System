<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Message;
use App\Models\Notification;
use App\Models\AdminNotification;
use App\Models\NotificationStudent;

class MessageController extends Controller
{

    //get the messages between currentUser &&  receiver :
    public function index(Request $request)
    {
        $sender_id = intval($request->input('sender_id'));   
        $receiver_id = intval($request->input('receiver_id'));
           
        $whoR = DB::table('messages')
        ->where('receiver_id', $receiver_id)
        ->where('sender_id', $sender_id)
        ->orWhere('receiver_id',$sender_id)
        ->where('sender_id',$receiver_id)


        ->pluck('whoR');

        $messages = DB::table('messages')
        ->whereIn('whoR', $whoR->toArray())
        ->get();
       
        return response()->json([
            'status'=>200,
            'whoR'=>$whoR,
            'messages'=>$messages,
        ]);


         
    }
   

    public function store(Request $request)
    {
        $message = new Message();
        $message->sender_id = $request->input('sender_id');
        $message->receiver_id = $request->input('receiver_id');
        $message->message = $request->input('message');
        $message->whoR = $request->input('sender_id').''.$request->input('receiver_id');
        $message->save();
         $user = User::find($request->input('sender_id'));
         $receiver= User::find($request->input('receiver_id'));
         $role = User::find($receiver->id);

         if($role->role_as == 2){
             $notification = AdminNotification::create(
            [
                    'type' => "Message",
                       'notification' =>" Vous avez reçu un message de".$user->name,
                    'user_name' =>$user->name,
                     'user_email' =>'',
                     'icon'=>'',
                     'user_id'=>$receiver->id
           
            ]);
         }else  if($role->role_as == 3){
                  $notification = Notification::create(
               [
                'type' => "Message",
                   'notification' =>" Vous avez reçu un message de".$user->name,
                'user_name' =>$receiver->name,
                 'user_id'=>$receiver->id
       
                  ]);
         }else{
                $notification = NotificationStudent::create(
                [
                 'type' => "Message",
                    'notification' =>" Vous avez reçu un message de".$user->name,
                 'user_name' =>$receiver->name,
                  'user_id'=>$receiver->id
        
               ]);
         }

        

       
                return response()->json($message);
    }

    public function conversations(Request $request)
    {
        $user = $request->onUserSelect;
        return $user;
    }
    
}
