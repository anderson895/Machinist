<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Help;

class HelpController extends Controller
{
    public function storeHelpReport(Request $request)
    {
        $validated = $request->validate([
            'report' => 'required|string',
        ]);

        $help = Help::create([
            'report' => $validated['report']
        ]);

        return redirect()->back()->with('success', 'Report submitted successfully!');
    }

    public function viewHelpReports()
    {
        $reports = Help::get();

        return Inertia::render('Reports', [
            'reports' => $reports,
        ]);
    }
}
