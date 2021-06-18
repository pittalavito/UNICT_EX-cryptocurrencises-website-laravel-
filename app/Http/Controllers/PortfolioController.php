<?php

    namespace App\Http\Controllers;
    use Illuminate\Support\Facades\Session;
    use Illuminate\Routing\Controller as BaseController;
    use App\Models\User;

    class PortfolioController extends BaseController {

        public function portfolio() {
            $session = session('id');
            $user = User::find($session);
            if (!isset($user)) return redirect('login');
            
            return view("portfolio")->with("user", $user);
        }

        public function portfolioLoad(){
            
            $user = User::find(session('id'));
            $operazioni   = $user->portfolio()->get();
            $transactions = $user->transactions()->orderBy("since" , "DESC")->get();
            $balance      = $user->balance;     
            

            if(count($operazioni  )=== 0)$operazioni   ='Portfolio is empty';
            if(count($transactions)=== 0)$transactions ='Nessun movimento';
            
            $result = [
                "operazioni"=> $operazioni , 
                "balance"   => $balance ,
                "moviments" => $transactions
            ] ;
            return response()->json($result);
        }
    }

?>