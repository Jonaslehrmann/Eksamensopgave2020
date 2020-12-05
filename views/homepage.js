window.onload = function checkLogin(){
    console.log(localStorage.getItem('username'))
    if(localStorage.getItem('username') == null){
    alert("You are yet to sign in. You will be redirected to the login page")
    location.href=('login.html')
    }
}

const logoutButton = document.getElementById('logout');

function logout(){
    localStorage.removeItem("username");
    alert('You are now logged out')
    location.href=('login.html')
}



function deleteUser(user){

    console.log(user)  
    fetch('http://localhost:3003/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then(res => res.json())
      .then(data => 
          {
        alert('Your account has successfully been created');
        location.href="login.html"
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      };