<?php
    
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;
    
    class AssetsWatchlist extends Model
    {   
        /**
        * The table associated with the model.
        *
        * @var string
        */
        protected $table = 'assets_watchlist';
        
        
        protected $fillable = [ 'us', 'id_crypto'];
        
        public $timestamps = false;
        
        public function user() {
            return $this->belongsTo("App\Models\User" , "us");
        }
    }

?>