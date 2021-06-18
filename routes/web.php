<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {   return redirect('login');  });

// ---- AUTENTIFICAZIONE ------------------------------------------------------------
Route::get ( "/signup",   "SignupController@signup"   )->name("signup");
Route::post( "/signup",   "SignupController@create"   );
Route::get ( "/login",    "LoginController@login"     )->name("login");
Route::post( "/login",    "LoginController@checkLogin");
Route::get ( "/logout",   "LoginController@logout"    )->name("logout");

Route::get ( "/signup/unique/{content}", "SignupController@checkUnique");

// ---- PAGINE ---------------------------------------------------------------
Route::get("/home",          "HomeController@home"     )->name('home');
Route::get("/news" ,         "NewsController@news"     )->name('news');
Route::get("/portfolio","PortfolioController@portfolio")->name('portfolio');

Route::post("/home/load"      ,"HomeController@homeLoad");
Route::post("/news/load"      ,"NewsController@newsLoad");
Route::post("/portfolio/load" ,"PortfolioController@portfolioLoad");


//-----ROUTE DI CHIAMATE JS PER MODIFICHE DATABASE --------//
Route::post("/updateAssets" ,"UpdateDbController@updateAssetsWatchlist");
Route::post("/updateNews"   ,"UpdateDbController@updateNewsWatchlist");
Route::post("/updateShop"   ,"UpdateDbController@shop");