
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
                window.location=document.referrer
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

const Login = async (user) => {
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
        localStorage.setItem('user', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        console.log('Successfully executed! ' + res.status);
        Swal.fire(
            'Login Successfully',
            'You clicked the button!',
            'success'
        ).then((res) => {
            window.location=document.referrer
        })
        return 200;
    }else{ 
        console.log('Failed to execute! ' + res.status);
        return res.status
    }
}

export {Register , Login};