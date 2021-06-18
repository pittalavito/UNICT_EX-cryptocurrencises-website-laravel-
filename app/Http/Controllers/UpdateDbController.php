<?php

    namespace App\Http\Controllers;
    use App\Models\User;

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Session;
    use Illuminate\Routing\Controller as BaseController;

    class UpdateDbController extends BaseController {
     
        public function UpdateAssetsWatchlist(Request $content){
            
            switch($content->action){
                case'0': //add
                    User::find(session('id'))->assets()->create(['id_crypto' => $content->id_crypto]);
                break;
                
                case'1': //delete
                    User::find(session('id'))->assets()->where('id_crypto' , $content->id_crypto)->delete(); 
                break;
                default: abort(500); 
            }
            
            $result = [
                'id_crypto'=> $content->id_crypto,
                'action'   => $content->action,
                'num_like' => User::find(session('id'))->n_watch
            ];
            return response()->json($result);
        }
        
        public function UpdateNewsWatchlist (Request $content){
        
            $user = User::find(session('id'));

            switch($content->action){
                case'add':
                    $user->news()->create(
                        [
                            "title"       => $content->title,
                            "description" => $content->description,
                            "image"       => $content->image,
                            "url"         => $content->url
                        ]
                    );
                break;
                case'delete':
                    $user->news()->where('id' , $content->id)->delete();
                break;
                default: abort(500);
            }

            $result = User::find(session('id'))->n_news;
            return response()->json($result);
        }

        public function shop (Request $content){
            
            function UpdateAndReturnSaldo($user , $importo){
                
                $user->balance+= $importo;
                $user->saldo+= $importo;
                $user->save(); 
                
                return User::find(session('id'))->saldo; 
            }

            function SaveTransaction($user , $content){
                
                
                $tipo     = $content->action === "buy" ? 0 : 1 ;
                $importo  = (float)$content->importo;
                $quantita = $importo/ (float)$content->current_price;
                
                if(!$user->transactions()->create(
                        [
                            "importo"     => $importo,
                            "tipo"        => $tipo,
                            "id_crypto"   => $content->id_crypto,
                            "quantita"    => $quantita
                        ]
                    
                    )
                )return false;
                
                return  true;
            }

            function buy($user , $content){
                
                $saldo    = (float)$content->saldo;
                $importo  = (float)$content->importo;
                $price    = (float)$content->current_price;
                $quantita = $importo/$price;
                
                //controllo importi
                if($importo > $saldo  && $importo <= 0 )
                return response()->json('Error => Importo > saldo');
                
                //controllo esistenza di un operazione simile
                $occorrenza = $user->portfolio()->where("id_crypto",$content->id_crypto);
                
                if($occorrenza->exists()){    
                    
                    $tmp = $occorrenza->first();
                    $tmp->quantita+= $quantita;
                    if(!$tmp->save())abort(500);
                      
                }
                else
                if(!$user->portfolio()->create(
                    [
                        'id_crypto'=> $content->id_crypto,
                        'img'      => $content->img,
                        'quantita' => $quantita
                    ]
                ))abort(500);
            }
            
            function sell($user , $content){
                
                $occorrenza = $user->portfolio()->where('id_crypto' , $content->id_crypto)->first();
                
                $quantita_possedute = (float)$occorrenza->quantita;
                $saldo      = (float)$content->saldo;
                $importo    = (float)$content->importo;
                $price      = (float)$content->current_price;
                $quantita   = $importo/$price;

                //controllo importo
                if($importo < 5  )
                return response()->json('Error => Importo < 5');
                
                if($quantita_possedute < $quantita)
                return response()->json('Error => quantita possedute < quantita vendute');

                //verifica operazione da eseguire sul db
                if(($quantita_possedute - $quantita)*$price < 0.01){
                    if(!$occorenza->delete())abort(500);
                }
                else{
                    $occorrenza->quantita-=$quantita;
                    if(!$occorrenza->save())abort(500);
                } 
            }
            
            //---- MAIN ---------------------//
            $user    = User::find(session('id'));

            switch($content->action){
                case 'buy' :   
                    buy($user , $content);  
                    $importo = -(float)$content->importo;
                break;
                
                case 'sell':   
                    sell($user ,$content ); 
                    $importo = (float)$content->importo;
                break;
                default: abort(500);
            }
            $msg = 'Operazione andata a buon fine';
            $result = ['msg'=> $msg , 'saldo' => UpdateAndReturnSaldo($user ,$importo)];
            
            if(SaveTransaction($user , $content))return response()->json($result);
            else abort(500);
            
        }
        
    }

?>