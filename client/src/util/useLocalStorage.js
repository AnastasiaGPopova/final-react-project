
 function initialEmail(){
    return localStorage.getItem('email')
 } 




function isUserLogedIn(){
   let isLogged = false
   if(localStorage.getItem('email')){
      isLogged = true
   }
   return isLogged
}

function isOwnerRecord(recordUser){
   let isOwner = false
   if(recordUser === localStorage.getItem('userId')){
      isOwner = true
   }
   return isOwner
}


export {initialEmail, isUserLogedIn, isOwnerRecord}