const username = document.getElementById('username');
const username = document.getElementById('password');


function checkLogin(user){
    fetch('http://localhost:3003/user', {
        method: 'POST',
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

/*for (i = 0; i < users.length; i++) {
    if (usernameOutput == usernameValue[i]){


    }
  }
  */