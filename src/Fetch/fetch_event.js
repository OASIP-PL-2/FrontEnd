const editEventDetail = async (event , id) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACK_URL}/events/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem('user'),
          },
          body: JSON.stringify(event),
        }
      );
      return res
}

const getEvents = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events`, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('user'),
        }
      });
    if (res.status === 200) {
      return await res.json();
    } else console.log("error, cannot get data");
  };

export {editEventDetail , getEvents}