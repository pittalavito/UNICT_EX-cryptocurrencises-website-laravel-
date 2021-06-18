<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;

class SignupController extends BaseController 
{    
    public function signup(){return view('signup');}
    
    //controlla l'unicita di username o mail
    public function checkUnique($content){
        $content = json_decode($content , true);
        $exist = User::where($content['name_attr'], $content['value'])->exists();
        return response()->json($exist);
    }

    protected function create(){
        
        $request = request();
        $img = $request->has('img') ? 'img/users/'.$request['username'].'.jpeg' : NULL;
    
        if($this->error($request) === 0){
            
            $newUser =  User::create([
                'username' => $request['username'],
                'password' => password_hash($request['password'], PASSWORD_BCRYPT),
                'nome'     => $request['nome'],
                'cognome'  => $request['cognome'],
                'email'    => $request['email'],
                'img'      => $img
            ]);
            if ($newUser) {
                Session::put('id', $newUser->id);
                return redirect('home');
            }else  return redirect('signup')->withInput();
        }else  return redirect('signup')->withInput();
    }    

    private function error($data){
        $error = [];

        //USERNAME
        if(preg_match('/^[a-zA-Z0-9_]{1,15}$/', $data['username'])) {
        
            if ( User::where('username',  $data['username'])->exists()) 
            $error[] = "Username già utilizzato";

        }else $error[] = "Formato username non valido";

        //EMAIL
        if(preg_match('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/', $data['email'])){
        
            if (User::where('email', $data['email'])->exists())
            $error[] = "Email già utilizzata";
        
        }else $error[] = "Formato email non valido";
        
        //PASSWORD
        //if(preg_match('/^[A-Za-z0-9]{8,12}$/') , $password) $error[]="lA PASSWORD DEVE CONTERE ECC....";
        if (strlen($data['password']) < 8)                  $error[] = "Password troppo corta";
        if (strcmp($data['password'] , $data['conf_password'])!= 0) $error[] = "Le password non coincidono";
        
        //IMG
        if($_FILES['img']['size'] !== 0 ){
            $img_percorso = 'img/users/';
            $img_tmp = $_FILES['img']['tmp_name'];
            $img_nome = $_FILES['img']['name'];
            $img_error = $_FILES['img']['error'];
            $img_size = $_FILES['img']['size'];
            $img_type = $_FILES['img']['type'];
            $max_size = 4194304;
        
            if($img_size < $max_size){
                if(strcmp($img_type , "image/png")!= 0 || 
                   strcmp($img_type , "image/jpg")!= 0 || 
                   strcmp($img_type , "image/jpeg")!= 0|| 
                   strcmp($img_type , "image/gif")!= 0)  
                {
                    if($img_error == 0){
                        $ext = ".jpeg";
                        $new_name_img = $data['username'].$ext;
                        if(move_uploaded_file($img_tmp, $img_percorso.$new_name_img))
                        $img =  $img_percorso.$new_name_img;
                    }else $error[] ="Error file";
                } else $error[] = "Formato file non valido";
            }else $error[] = "Dimensioni eccessive";
        }

        return count($error);
    }
}

?>
