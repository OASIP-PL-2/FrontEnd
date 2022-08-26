<script setup>
import SignUp from '../../components/UserComponents/SignUp.vue';
const SignUpUser = async (user) =>{
    if(user != 0){
        console.log('Sign in..');
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({name : user.name , email : user.email, password : user.password , role : user.role})
        });
        console.log(res.status);
    }
}
</script>
 
<template>
<SignUp @SignUpUser="SignUpUser"></SignUp>
</template>
 
<style>
</style>