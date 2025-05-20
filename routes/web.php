<?php

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
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\HelpController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::get('/dashboard', [DashboardController::class, 'getDashboarData'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':admin,manufacturer,user'])
    ->name('dashboard');



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


    
Route::get('/orders', [OrderController::class, 'get'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':manufacturer'])
    ->name('orders');

Route::get('/my-orders', [OrderController::class, 'getMyOrders'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':manufacturer,user'])
    ->name('my-orders');

Route::post('/order-offer', [OrderController::class, 'orderOffer'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':manufacturer,user'])
    ->name('order-offer');


 Route::get('/order-details', [OrderController::class, 'getOrderDetails'])
    ->middleware(['auth', 'verified'])
    ->name('order-details');

Route::post('/save-order', [OrderController::class, 'updateOrder'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':manufacturer'])
    ->name('save-order');

Route::post('/upload-pof', [OrderController::class, 'uploadPof'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':manufacturer,user'])
    ->name('upload-pof');
    
Route::post('/upload-pod', [OrderController::class, 'uploadPod'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':manufacturer,user'])
    ->name('upload-pod');



Route::get('/messages', [MessageController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('messages');

Route::get('/view-message', [MessageController::class, 'viewMessage'])
    ->middleware(['auth', 'verified'])
    ->name('view-message');

Route::post('/send-message', [MessageController::class, 'sendMessage'])
    ->middleware(['auth', 'verified'])
    ->name('send-message');
    

Route::get('/help', function(){
    return Inertia::render('Help');
})->middleware(['auth', 'verified'])->name('help');

Route::post('/post-report', [HelpController::class, 'storeHelpReport'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':user,manufacturer'])
    ->name('post-report');

Route::get('/reports', [HelpController::class, 'viewHelpReports'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])
    ->name('reports');


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

require __DIR__.'/auth.php';
