<?php

    namespace App\Http\Controllers;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Session;
    use Illuminate\Routing\Controller as BaseController;
    use Illuminate\Support\Facades\Http;
    use App\Models\User;

    class NewsController extends BaseController {
         
        public function news() {
            $session = session('id');
            $user = User::find($session);
            if (!isset($user)) return redirect('login');
            
            return view("news")->with("user", $user);
        }

        public function newsLoad(Request $request){

            function gnews_request($search){
                
                $endpoint="https://gnews.io/api/v4/top-headlines?max=9";
                $key =  env('GNEWS_APIKEY');
        
                $json = Http::get($endpoint.$search."&token=".$key);
                if($json->failed())abort(500);
                return $json;
            }

            function newArray($gnews_json){
                
                $article = $gnews_json['articles'];
                $new_array = [];

                for($i = 0 ; $i < count($article) ; $i++){
                    
                    $tmp = $article["$i"];
                    
                    if($tmp['image'] !== null)$image = $tmp['image'];
                    else $image = "img/no_img.png";

                    $new_array[] = [
                        "title"         => $tmp['title'],
                        "image"         => $image,
                        "url"           => $tmp['url'],
                        "description"   => $tmp['description']         
                    ];
                }
                return $new_array;
            }
            //---- MAIN ---- 
            $user = User::find(session('id'));
            
            switch($request->action){
                case 'load':
                    $search = "&q=cryptocurrency&sortby=publishedAt";
                    $gnews = json_decode(gnews_request($search), true);
                    $gnews = newArray($gnews);
                    $watchlist   = $user->news()->get(); 
                    if(count($watchlist) === 0)$watchlist = "No result found";
                    
                   $result= ['gnews'=> $gnews , 'watchlist' => $watchlist];
                   return response()->json($result);
                break;

                case 'watchlist':
                    $watchlist = $user->news()->get();
                    if(count($watchlist) === 0)$watchlist = "No result found";
                    return response()->json($watchlist);
                break;

                case 'search':
                    $search = "&sortby=publishedAt&q=".urldecode((string)$request->value);
                    $gnews = json_decode(gnews_request($search),true);
                    $gnews = newArray($gnews);
                    return response()->json($gnews);
                break;
                default: abort(500);
                
            }
        }
    }

?>