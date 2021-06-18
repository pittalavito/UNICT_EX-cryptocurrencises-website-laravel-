<?php
    
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;
    
    class Transaction extends Model{

        protected $fillable = [
            'us'       ,
            'id_crypto', 
            'quantita' ,
            'importo'  ,
            'tipo'     
        ];
        
        protected $hidden = [
            'us', 'id'
        ];
        
        public $timestamps = false;

        public function user() {
            return $this->belongsTo("App\Models\User", "us");
        }

    }    

?>