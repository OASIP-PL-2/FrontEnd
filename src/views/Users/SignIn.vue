<script setup>
import SignIn from '../../components/UserComponents/SignIn.vue';
const SignInUser = async (user) =>{
    if(user != 0){
        console.log('Sign in..');
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({name : user.name , email : user.email , role : user.role})
            // body: JSON.stringify({name : 'game21' , email : 'game21@gmail.com' , role : 'student'})
        });
        console.log(res.status);
    }
}
</script>
 
<template>
<SignIn @SignInUser="SignInUser"></SignIn>
</template>
 
<style>
</style>