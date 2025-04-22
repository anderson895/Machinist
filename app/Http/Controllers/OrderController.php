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
}
