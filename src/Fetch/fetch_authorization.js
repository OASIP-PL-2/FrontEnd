
const Register = async (user) =>{
    console.log(user);
    if(user == 0){return 0}
        console.log('In progress (Register)');
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if(res.status === 201){
            console.log('Successfully executed! ' + res.status);
            Swal.fire(
                'Register Successfully',
                'You clicked the button!',
                'success'
            ).then((res) => {
                let newUser = { email: user.email, password: user.password }
                let isRegis = true;
                Login(newUser , isRegis);
            })
        }else {
            const response = await res.json() 
            Swal.fire({
                icon: 'warning',
                text: response.message,
            }) 
            console.log('Failed to execute! ' + res.status);
        }
}

const Login = async (user , isRegis = false) => {
    console.log('In progress (Login)');
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ email: user.email, password: user.password })
    })
    if(res.status == 200) {
        const response = await res.json()
        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem("userDetail", JSON.stringify(response.user));
        localStorage.setItem('isLoginMs', false)
        console.log('Successfully executed! ' + res.status);
        if(!(isRegis)){
            Swal.fire(
                'Login Successfully',
                'You clicked the button!',
                'success'
            ).then((res) => {
                window.location.replace("https://intproj21.sit.kmutt.ac.th/pl2/");
            })
        }else{
            window.location.replace("https://intproj21.sit.kmutt.ac.th/pl2/");
        }
        return 200;
    }else if(res.status == 401){
        Swal.fire(
            "Password Wrong!",
            'Please Try again',
            'error'
        )
    }else if(res.status == 404){
        Swal.fire(
            "Email dosen't not exit",
            'Please Try again',
            'warning'
        )
    }
    else{ 
        console.log('Failed to execute! ' + res.status);
        return res.status
    }
}

const refreshToken = async (refreshtoken) => {
    console.log("In progress (Refresh Token)");
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/refresh`, {
      headers: {
        Authorization: "Bearer " + refreshtoken,
      },
    });
    if (res.status === 200) {
      console.log('???????????? 200');
      const response = await res.json();
      console.log("Successfully executed! " + res.status);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("userDetail", JSON.stringify(response.user));
    } else if (res.status === 401) {
      console.log('please login.....');
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userDetail')
    }
  };

export {Register , Login , refreshToken};