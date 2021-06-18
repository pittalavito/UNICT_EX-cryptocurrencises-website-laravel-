<?php
    
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;
    
    class Portfolio extends Model
    {   
        /**
        * The table associated with the model.
        *
        * @var string
        */
        protected $table = 'portfolio';
        
        protected $fillable = [
            'us', 'id_crypto', 'quantita','img'
        ];
        
        protected $hidden = ['us' , 'id'];
        
        public $timestamps = false;
        
        public function user() {
            return $this->belongsTo("App\Models\User", "us");
        }
    }

?>