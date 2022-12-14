import { refreshToken } from "./fetch_authorization";

const getFileName = async (eventId) => {
  console.log("In progress (Get FileName)");
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/files/${eventId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  if (res.status === 200) {
    console.log("Successfully executed! " + res.status);
    return await res.json();
  } else if (res.status === 401) {
    await refreshToken(localStorage.getItem("refreshToken"));
    await getFileName(eventId);
    window.location.reload();
  } else if (res.status === 500) {
    return res.json();
  } 
  else {
    console.log("Failed to execute! " + res.status);
  }
};

const downloadFile = async (eventId, filName) => {
  console.log("In progress (Get Download File)");
  const res = await fetch(
    `${import.meta.env.VITE_BACK_URL}/files/${eventId}/${filName}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );

  if (res.status === 200) {
    console.log("Successfully executed! " + res.status);
    const blob = await res.blob();
    return window.URL.createObjectURL(blob);
    console.log(blob);
    console.log(fileUrl.value);
    // return await res.json();
  } else if (res.status === 401) {
    await refreshToken(localStorage.getItem("refreshToken"));
    await getUserDetail(id);
    window.location.reload();
  } else if (res.status === 500) {
    return res.json();
  } else {
    console.log("Failed to execute! " + res.status);
  }
};

export { getFileName , downloadFile };
