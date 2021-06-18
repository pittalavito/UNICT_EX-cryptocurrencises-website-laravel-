<?php
    
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;
    
    class User extends Model
    {   
        /**
        * The attributes that are mass assignable.
        *
        * @var array
        */
        protected $fillable = [
            'username', 
            'password', 
            'email', 
            'nome', 
            'cognome', 
            'img'
        ];
        
        /**
        * The attributes that should be hidden for arrays.
        *
        * @var array
        */
        protected $hidden = [
          'password', 'remember_token', 'email'
        ];
        
        public $timestamps = false;

        public function assets() {
            return $this->hasMany("App\Models\AssetsWatchlist" , "us");
        }

        public function news() {
            return $this->hasMany("App\Models\NewsWatchlist", "us");
        }

        public function portfolio() {
            return $this->hasMany("App\Models\Portfolio", "us");
        }

        public function transactions(){
            return $this->hasMany("App\Models\Transaction" , "us");
        }
    }
?>
