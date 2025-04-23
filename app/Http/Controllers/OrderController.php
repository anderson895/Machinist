<?php
namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Inquiry;
use App\Models\InquiryFile;

use App\Models\Offer;
use App\Models\OfferThread;
use App\Models\OfferFile;
use App\Models\User;
use App\Models\InquiryAllowedViewer;
use App\Models\Order;

class OrderController extends Controller
{
    public function get()
    {
        $userId = auth()->id();

        $orders = Order::with([
            'offer',
            'offer.thread',
            'offer.thread.user',
            'offer.thread.inquiry',
            'offer.thread.inquiry.user',
            'offer.files'
        ])
        ->whereHas('offer.thread', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->get();

        // return response()->json([
        //     'orders' => $orders
        // ]);

        return Inertia::render('Orders/Orders', [
            'orders' => $orders
        ]);

    }

    public function orderOffer(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:offers,id',
        ]);

        $order = Order::create([
            'offer_id' => $validated['id'],
            'status' => 'pending'
        ]);

        return redirect()->back()->with('success', 'Order submitted successfully!');
    }

    public function getOrderDetails(Request $request)
    {
        $userId = auth()->id();
        $id = $request->id;

        $order = Order::with([
            'offer',
            'offer.thread',
            'offer.thread.user',
            'offer.thread.inquiry',
            'offer.thread.inquiry.user',
            'offer.files'
        ])
        ->where('id', $id)
        ->first();

        return Inertia::render('Orders/OrderDetails', [
            'order' => $order
        ]);
    }
}
