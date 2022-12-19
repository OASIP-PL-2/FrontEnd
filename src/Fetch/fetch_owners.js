import { refreshToken } from "./fetch_authorization";

const checkOwner = async (userId) => {
  if (localStorage.getItem("accessToken") == null) {
    return 0;
  }
  console.log("In progress (Check Owner)");
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/owners/${userId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  if (res.status === 200) {
    console.log("Successfully executed! " + res.status);
    return await res.json();
  } else if (res.status === 401) {
    await refreshToken(localStorage.getItem("refreshToken"));
    await checkOwner();
    window.location.reload()
  } else {
    console.log("Failed to execute! " + res.status);
  }
};


export { checkOwner };
