<?php

    namespace App\Http\Controllers;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Session;
    use Illuminate\Routing\Controller as BaseController;
    use Illuminate\Support\Facades\Http;
    use App\Models\User;

    class HomeController extends BaseController {

        public function home() {
            $session = session('id');
            $user = User::find($session);
            if (!isset($user))return redirect('login');

            return view("home")->with("user", $user);
        }

        public function homeLoad(Request $content){
            /***  RICHIESTE ACCETTATE ****************************************************
            1  {'content'} = q:list                  -->per la lista delle 45 cripto per market cap
            3  {'content'} = q:id ,value:id_crypto   -->per la ricerca della specifica criptovaluta 
            *****************************************************************************/
            
            //RICHIESTA API DI CONIGECKO 
            function request_coingecko($param){
                $endpoint = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
                $json = Http::get($endpoint.$param );
                if($json->failed()) abort(500);
                return $json;
            }

            //RIFORMATTAZIONE DATI DA COINGECKO + TIPO RICHIESTA
            function new_array( $assets , $json , $boolean){
                
                $new_array = [];

                for($i = 0 ; $i < count($json)  ; $i++){
                    
                    $elem = $json["$i"];
                    $bool = $boolean;
                    
                    if($assets !== NULL && $boolean !== 1 ){
                        foreach($assets as $ids)
                        if(strcmp($ids->id_crypto , $elem['id']) == 0 ) 
                        {
                            $bool = 1;
                            break;
                        }
                    }
                    

                    $new_array[] = [
                        "rank"      => $elem['market_cap_rank'],
                        "name"      => $elem['name'],
                        "id"        => $elem['id'],
                        "img"       => $elem['image'],
                        "symbol"    => $elem['symbol'],
                        "mk"        => $elem['market_cap'],
                        "price"     => $elem['current_price'],
                        "var_day"   => $elem['price_change_percentage_24h'],
                        "watchlist" => $bool
                    ];
                }
                return $new_array;
            }
            
            /*************  MAIN  *************************************/
            
            $user = User::find(session('id'));
            
            $assets = $user->assets()->get();
            if(count($assets) === 0) $assets = NULL;
            
            switch($content->q){
                case 'list':
                    //top45
                    $Top45 = "&per_page=45&order=market_cap_desc";
                    $Top45 = json_decode( request_coingecko($Top45), true);
                    $Top45 = new_array( $assets, $Top45 , 0);
                    
                    //lista preferiti
                    if($assets != NULL){
                        
                        $watchlist = "&ids=".$assets[0]->id_crypto;
                        foreach($assets as $ids) $watchlist.="%2C".$ids->id_crypto;
            
                        $watchlist = json_decode(request_coingecko($watchlist) , true);
                        $watchlist = new_array( NULL , $watchlist , 1);

                    }else $watchlist = "isempty";

                    //risposta al client
                    $content = ["Top45" => $Top45 , "watchlist" => $watchlist ];
                    return response()->json($content);
                
                break;
                
                case 'id'  : 
                    
                    $search_crypto ="&ids=".$content->value;
                    $search_crypto = json_decode( request_coingecko($search_crypto), true);
                    $search_crypto = new_array( $assets, $search_crypto , 0);
                    
                    if(count($search_crypto) === 0)return response()->json('No result found');

                    return response()->json($search_crypto);
                break;
                default: abort(500);
            }
            /******* END MAIN ******************************************/    
        }
    }

?>