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

    public function getMyOrders()
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
        ->whereHas('offer.thread.inquiry', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->get();

        // return response()->json([
        //     'orders' => $orders
        // ]);

        return Inertia::render('Orders/MyOrders', [
            'orders' => $orders
        ]);
    }

    public function orderOffer(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:offers,id',
            'purchase_order' => 'required|file|mimes:pdf|max:10240'
        ]);

        $file = $request->file('purchase_order');
        $extension = $file->getClientOriginalExtension();
        $filename = 'order-' . uniqid() . '.' . $extension;
        $file->move(public_path('uploads'), $filename);

        $order = Order::create([
            'offer_id' => $validated['id'],
            'status' => 'Pending',
            'purchase_order' => $filename
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

    public function updateOrder(Request $request)
    {
        $userId = auth()->id();

        $validated = $request->validate([
            'id' => 'required|exists:orders,id',
            'status' => 'required|string',
            'total_amount' => 'required|numeric|min:1',
            'notes' => 'required|string',
        ]);

        $order = Order::where('id', $validated['id'])
        ->firstOrFail();

        $order->update([
            'status' => $validated['status'],
            'total_amount' => $validated['total_amount'],
            'notes' => $validated['notes'],
        ]);

        return redirect()->back()->with('success', 'Order update submitted successfully!');
    }
    
    public function uploadPof(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'proof_of_payment' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        $file = $request->file('proof_of_payment');
        $extension = $file->getClientOriginalExtension();
        $filename = 'pof-' . uniqid() . '.' . $extension;
        $file->move(public_path('uploads'), $filename);

        $order = Order::findOrFail($validated['order_id']);
        $order->proof_of_payment = $filename;
        $order->save();

        return back()->with('success', 'Proof of Payment Uploaded Successfully!');
    }

    public function uploadPod(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'proof_of_delivery' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        $file = $request->file('proof_of_delivery');
        $extension = $file->getClientOriginalExtension();
        $filename = 'pod-' . uniqid() . '.' . $extension;
        $file->move(public_path('uploads'), $filename);

        $order = Order::findOrFail($validated['order_id']);

        if($order->offer->mod == "Pick Up")
        {
            $order->status = "Picked Up";
        }
        elseif ($order->offer->mod == "Deliver")
        {
            $order->status = "Delivered";
        }

        $order->proof_of_delivery = $filename;
        $order->save();

        return back()->with('success', 'Proof of Delivery Uploaded Successfully!');
    }
}
