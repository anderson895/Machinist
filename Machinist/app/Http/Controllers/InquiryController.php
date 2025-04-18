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
        $inquiries = Inquiry::with(['files', 'user', 'offerThreads.user', 'offerThreads.offers'])->orderBy('created_at', 'desc')->get();

        return Inertia::render('Inquiries', [
            'inquiries' => $inquiries
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
            'thread_id'     => 'nullable|exists:offer_threads,id',
            'inquiry_id'    => 'required|exists:inquiries,id',
            'description'   => 'required|string',
            'price'         => 'required|numeric|min:1',
            'delivery_time' => 'required|date|after_or_equal:today',
            'mop'           => 'required|string',
            'mod'           => 'required|string',
            'files'         => 'nullable|array',
            'files.*'       => 'file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);


        $inquiry    = Inquiry::findOrFail($validated['inquiry_id']);
        $isInquirer = $inquiry->user_id === $userId;
        
        if (empty($validated['thread_id'])) {
            abort_if($isInquirer, 403, 'You cannot make an offer on your own inquiry.');
    
            $offerThread = OfferThread::firstOrCreate([
                'user_id'    => $userId,
                'inquiry_id' => $inquiry->id,
            ]);
        } else {
            $offerThread = OfferThread::findOrFail($validated['thread_id']);
        }

        $offer = Offer::create([
            'thread_id' => $offerThread->id,
            'description' => $validated['description'],
            'price' => $validated['price'],
            'delivery_time' => $validated['delivery_time'],
            'mop' => $validated['mop'],
            'mod' => $validated['mod'],
            'is_inquirer' => $isInquirer,
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


    public function getOfferThread(Request $request)
    {
        $threadId = $request->query('threadId');

        $offerThread = OfferThread::with(['user', 'inquiry', 'inquiry.user', 'inquiry.files', 'offers', 'offers.files'])
        ->findOrFail($threadId);

        $user = $request->user();

        $isAdmin       = $user->role === 'admin';
        $isInquirer    = $offerThread->inquiry->user_id === $user->id;
        $isOfferMaker  = $offerThread->user_id === $user->id;

        abort_unless(
            $isAdmin || $isInquirer || $isOfferMaker,
            403,
            'You do not have permission to view this offer thread.'
        );

        return Inertia::render('OfferThread', [
            'thread' => $offerThread
        ]);
    }
}
