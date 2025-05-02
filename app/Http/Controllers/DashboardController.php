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


class DashboardController extends Controller
{
    function getCustomerDashboard($userId)
    {
        $inquiriesCount = Inquiry::where('user_id', $userId)->count();

        $offersToInquiriesCount = OfferThread::whereHas('inquiry', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->count();
        
        $ordersCount = Order::whereHas('offer.thread.inquiry', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->count();

        return Inertia::render('Dashboard', [
            'inquiriesCount' => $inquiriesCount,
            'offersToInquiriesCount' => $offersToInquiriesCount,
            'ordersCount' => $ordersCount,
        ]);
    }

    function getManufacturerDashboard($userId)
    {
        $inquiriesCount = Inquiry::where('user_id', $userId)->count();

        $offersToInquiriesCount = OfferThread::whereHas('inquiry', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->count();
        
        $ordersCount = Order::whereHas('offer.thread.inquiry', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->count();


        $manufacturerOffersCount = OfferThread::where('user_id', $userId)->count();
        $ordersToManufacturerCount = Order::whereHas('offer.thread', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->count();

        return Inertia::render('Dashboard', [
            'inquiriesCount' => $inquiriesCount,
            'offersToInquiriesCount' => $offersToInquiriesCount,
            'ordersCount' => $ordersCount,
            'manufacturerOffersCount' => $manufacturerOffersCount,
            'ordersToManufacturerCount' => $ordersToManufacturerCount
        ]);
    }

    function getAdminDashboard($userId)
    {
        return Inertia::render('Dashboard', []);
    }

    function getDashboarData()
    {
        $user = Auth::user();

        if($user->role == 'user')
        {
            return $this->getCustomerDashboard($user->id);
        }

        if ($user->role === 'manufacturer') {
            return $this->getManufacturerDashboard($user->id);
        }

        if ($user->role === 'admin') {
            return $this->getAdminDashboard($user->id);
        }

        abort(403, 'Unauthorized.');
    }
}
