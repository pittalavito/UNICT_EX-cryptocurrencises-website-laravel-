<?php
    
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;
    
    class NewsWatchlist extends Model
    {   
        /**
        * The table associated with the model.
        *
        * @var string
        */
        protected $table = 'news_watchlist';

        protected $fillable = ['us', 'title' , 'description','image','url'];
        
        protected $hidden = ['us'];
        
        public $timestamps = false;
        
        public function user() {
            return $this->belongsTo("App\Models\User", "us");
        }
    }

?>