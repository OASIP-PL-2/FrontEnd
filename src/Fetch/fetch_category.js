import { refreshToken } from "./fetch_authorization";

const getCategories = async () => {
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
      await refreshToken(localStorage.getItem("refreshToken"));
      await getCategories()
      window.location.reload()
    } else {
      console.log("Failed to execute! " + res.status);
      return res.status;
    }
}

const editCategory = async (id,editCategory) => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/categories/${id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify(editCategory),
    }
  )

  if (res.status === 200) {
    console.log("Successfully executed! " + res.status);
    return res.status;
  } else if (res.status === 401) {
    await refreshToken(localStorage.getItem("refreshToken"));
    await editCategory(editCategory)
    window.location.reload()
  } else {
    console.log("Failed to execute! " + res.status);
    return res.status;
  }

};


export {getCategories, editCategory};

