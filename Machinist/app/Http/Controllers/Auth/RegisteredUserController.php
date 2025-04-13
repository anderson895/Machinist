<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserFile;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    private function storeUserFile($file, $userId, $label)
    {
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('uploads'), $filename);

        UserFile::create([
            'user_id' => $userId,
            'file_name' => $filename,
            'label' => $label,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'contact_no' => 'required|string|max:15',
            'valid_id' => 'nullable|file|mimes:png,jpeg,jpg|max:2048',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'contact_no' => $request->contact_no,
            'contact_person' => $request->contact_person,
        ]);

        if ($request->hasFile('valid_id')) {
            $this->storeUserFile($request->file('valid_id'), $user->id, 'Valid ID');
        }

        if ($user->role == 'manufacturer') {
            if ($request->hasFile('business_permit')) {
                $this->storeUserFile($request->file('business_permit'), $user->id, 'Business Permit');
            }

            if ($request->hasFile('company_profile')) {
                $this->storeUserFile($request->file('company_profile'), $user->id, 'Company Profile');
            }

            if ($request->hasFile('location_map')) {
                $this->storeUserFile($request->file('location_map'), $user->id, 'Location Map');
            }
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
