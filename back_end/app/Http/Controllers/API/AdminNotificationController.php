<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class AdminNotificationController extends Controller
{

    public function index()
{
    // $unReadNotifications = DB::table('admin_notifications')->whereNull('read_at')->get();
    $notifications = DB::table('admin_notifications')->get();

    $RecentNotifications = $notifications->sortByDesc('created_at')->first();

     $newNotifications = DB::table('admin_notifications')
    ->where('created_at', '>', $RecentNotifications->created_at)
    ->get();
    
    return response()->json([
        'status'=>200,
        'notifications'=>$notifications
    ]);
}


public function notifications_student(Request $request)
{
    $id = $request->id;
    $user = User::find($id);

    $notifications = DB::table('notification_students')
    ->where('user_id',$id)
    ->orWhere('user_name',$user->name)
    ->orderBy('created_at', 'desc')
    ->get();

   $RecentNotifications = $notifications->sortByDesc('created_at')->first();

    $newNotifications = DB::table('notifications')
   ->where('created_at', '>', $RecentNotifications->created_at)
   ->get();

  return response()->json([
    'status'=>200,
    'notifications'=>$notifications
   ]);
}
public function notifications_teacher(Request $request)
{
    $id = $request->id;
    $user = User::find($id);
    $notifications = DB::table('notifications')
    ->where('user_id', $id)
    ->orWhere('user_name', $user->name)
    ->orderBy('created_at', 'desc')
    ->get();
    //  $RecentNotifications = $notifications->sortByDesc('created_at')->first();

    //   $newNotifications = DB::table('notifications')
    //  ->where('created_at', '>', $RecentNotifications->created_at)
    //  ->get();

     return response()->json([
         'status'=>200,
         'notifications'=>$notifications
     ]);
}
}
