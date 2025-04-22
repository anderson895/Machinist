<?php
//start cache removal library
use Illuminate\Support\Facades\Artisan;
//end cache removal library

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Middleware\RoleMiddleware;

use App\Models\User;
use App\Models\UserFile;
use App\Models\Inquiry;

use App\Http\Controllers\InquiryController;


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
})->middleware(['auth', 'verified', RoleMiddleware::class . ':admin,manufacturer,user'])->name('dashboard');



Route::get('/manage-user', function () {
    $users = User::where('role', '!=', 'admin')->orderBy('created_at', 'asc')->get();

    return Inertia::render('Admin/ManageUser', [
        'users' => $users
    ]);
})->middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->name('manage-user');

Route::get('/manage-user-details', function (Request $request) {
    $userId = $request->query('id');
    $user = User::where('id', $userId)->first();

    $files = UserFile::where('user_id', $userId)->get();

    return Inertia::render('Admin/ManageUserDetails', [
        'user' => $user,
        'files' => $files
    ]);
})->middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->name('manage-user-details');

Route::post('/approve-user', function (Request $request) {
    $user = User::findOrFail($request->id);

    $user->is_approved = true;
    $user->save();

    return back()->with('success', 'User approved successfully.');
})->middleware(['auth', 'verified', RoleMiddleware::class . ':admin']);



Route::get('/inquiries', [InquiryController::class, 'get'])
    ->middleware(['auth', 'verified'])
    ->name('inquiries');

Route::post('/post-inquiry', [InquiryController::class, 'store'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':manufacturer,user'])
    ->name('inquiries.store');

Route::post('/update-inquiry', [InquiryController::class, 'update'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':manufacturer,user'])
    ->name('update-inquiry');


Route::post('/post-offer', [InquiryController::class, 'postOffer'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':manufacturer,user'])
    ->name('inquiries.postOffer');

Route::get('/offer-thread', [InquiryController::class, 'getOfferThread'])
    ->middleware(['auth', 'verified'])
    ->name('offer-thread');



Route::get('/test-page', function () {
    return Inertia::render('TestPage');
})->middleware(['auth', 'verified', RoleMiddleware::class . ':admin,test,user'])->name('test-page');

Route::get('/not-approved', function () {
    return Inertia::render('Auth/NotApproved');
})->middleware(['auth', 'verified'])->name('not-approved');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/clear-cache', function () {
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');
    Artisan::call('cache:clear');
    return "All Laravel caches cleared!";
});


require __DIR__.'/auth.php';
