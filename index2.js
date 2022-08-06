


function entrar(){
    
    let login = '123';
    let password = '123';
    let usuario = document.getElementById('login').value
    let senha = document.getElementById('password').value
    
    if ( usuario == login && senha == password){
        window.location.href = "http://seusite.com"  
    } else{
        alert(usuario)
    }
    
}