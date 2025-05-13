<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Message;
use App\Models\User;

class MessageController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $messages = Message::with('sender', 'receiver')
        ->where(function ($query) use ($user) {
            $query->where('sender_id', $user->id)
                ->orWhere('receiver_id', $user->id);
        })
        ->orderBy('created_at')
        ->get();

        $grouped = $messages->groupBy(function ($message) use ($user) {
            return $message->sender_id === $user->id
                ? $message->receiver_id
                : $message->sender_id;
        });

        $chatData = $grouped->map(function ($msgs, $chatmateId) {
            return [
                'user' => User::find($chatmateId),
                'messages' => $msgs->values(),
            ];
        })->values();

        return Inertia::render('Messages', [
            'messages' => $chatData
        ]);
    }

    public function viewMessage(Request $request)
    {
        $user = Auth::user();
        $chatMateId = $request->id;

        $messages = Message::with('sender', 'receiver')
            ->where(function ($query) use ($user, $chatMateId) {
                $query->where(function ($q) use ($user, $chatMateId) {
                    $q->where('sender_id', $user->id)
                    ->where('receiver_id', $chatMateId);
                })
                ->orWhere(function ($q) use ($user, $chatMateId) {
                    $q->where('sender_id', $chatMateId)
                    ->where('receiver_id', $user->id);
                });
            })
            ->orderBy('created_at')
            ->get();

        $chatMate = User::findOrFail($chatMateId);

        return Inertia::render('ViewMessage', [
            'messages' => $messages,
            'chatMate' => $chatMate,
            'authUserId' => $user->id,
        ]);
    }

    public function sendMessage(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string|max:1000',
        ]);

        $message = Message::create([
            'sender_id' => $user->id,
            'receiver_id' => $validated['receiver_id'],
            'content' => $validated['content'],
        ]);
    
        return redirect()->back()->with('success', 'Inquiry submitted successfully!');
    }
}
