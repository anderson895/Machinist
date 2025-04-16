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


class InquiryController extends Controller
{
    
    public function get()
    {
        $inquiries = Inquiry::with(['files', 'user'])->orderBy('created_at', 'desc')->get();

        return Inertia::render('Inquiries', [
            'inquiries' => $inquiries,
        ]);
    }

    public function store(Request $request)
    {
        $userId = auth()->id();

        $validated = $request->validate([
            'description' => 'required|string',
            'delivery_time' => 'required|date|after_or_equal:today',
            'mop' => 'required|string',
            'mod' => 'required|string',
            'files' => 'nullable|array',
            'files.*' => 'file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);

        $inquiry = Inquiry::create([
            'user_id' => $userId,
            'description' => $validated['description'],
            'delivery_time' => $validated['delivery_time'],
            'mop' => $validated['mop'],
            'mod' => $validated['mod'],
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $extension = $file->getClientOriginalExtension();
                $filename = 'inquiry-' . uniqid() . '.' . $extension;
                $file->move(public_path('uploads'), $filename);

                InquiryFile::create([
                    'inquiry_id' => $inquiry->id,
                    'file_name' => $filename,
                    'label' => $extension,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Inquiry submitted successfully!');
    }

    public function postOffer(Request $request)
    {
        $userId = auth()->id();

        $validated = $request->validate([
            'inquiry_id' => 'required|int',
            'description' => 'required|string',
            'price' => 'required|numeric|min:1',
            'delivery_time' => 'required|date|after_or_equal:today',
            'mop' => 'required|string',
            'mod' => 'required|string',
            'files' => 'nullable|array',
            'files.*' => 'file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);

        $offerThread = OfferThread::firstOrCreate([
            'user_id' => $userId,
            'inquiry_id' => $validated['inquiry_id'],
        ]);
        

        $offer = Offer::create([
            'thread_id' => $offerThread->id,
            'description' => $validated['description'],
            'price' => $validated['price'],
            'delivery_time' => $validated['delivery_time'],
            'mop' => $validated['mop'],
            'mod' => $validated['mod'],
        ]);


        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $extension = $file->getClientOriginalExtension();
                $filename = 'offer-' . uniqid() . '.' . $extension;
                $file->move(public_path('uploads'), $filename);

                OfferFile::create([
                    'offer_id' => $offer->id,
                    'file_name' => $filename,
                    'label' => $extension,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Offer submitted successfully!');
    }

}
