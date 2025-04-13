<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Middleware\RoleMiddleware;

use App\Models\User;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::get('/manage-user', function () {
    $users = User::where('role', '!=', 'admin')->orderBy('created_at', 'asc')->get();

    return Inertia::render('Admin/ManageUser', [
        'users' => $users
    ]);
})->middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->name('manage-user');

Route::get('/manage-user-details', function (Request $request) {
    $userId = $request->query('id');
    $user = User::where('id', $userId)->first();

    return Inertia::render('Admin/ManageUserDetails', [
        'user' => $user
    ]);
})->middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->name('manage-user-details');

Route::post('/approve-user', function (Request $request) {
    $user = User::findOrFail($request->id);

    $user->is_approved = true;
    $user->save();

    return back()->with('success', 'User approved successfully.');
})->middleware(['auth', 'verified', RoleMiddleware::class . ':admin']);



Route::get('/test-page', function () {
    return Inertia::render('TestPage');
})->middleware(['auth', 'verified', RoleMiddleware::class . ':admin,test,user'])->name('test-page');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
