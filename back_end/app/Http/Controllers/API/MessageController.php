<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Message;

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
        return response()->json($message);
    }

    public function conversations(Request $request)
    {
        $user = $request->onUserSelect;
        return $user;
    }
}
