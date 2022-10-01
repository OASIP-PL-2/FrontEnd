import {refreshToken} from './fetch_user.js'

const getCategories = async () => {
  if(localStorage.getItem('accessToken') == null){return 0}
    console.log('In progress (Get Categories)s');
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/categories`, {
      headers: {
        "Authorization": 'Bearer ' + localStorage.getItem('accessToken'),
      }
    })
    if (res.status === 200) {
      const response = await res.json()
      console.log("Successfully executed! " + res.status);
      return response;
    } else if (res.status === 401) {
      refreshToken(localStorage.getItem("refreshToken"));
      deleteUser(id);
    } else {
      console.log("Failed to execute! " + res.status);
      return res.status;
    }
}

export {getCategories};

