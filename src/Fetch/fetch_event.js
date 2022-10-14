const editEventDetail = async (event , id) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACK_URL}/events/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem('accessToken'),
          },
          body: JSON.stringify(event),
        }
      );
      return res
}

const getEvents = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events`, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('accessToken'),
        }
      });
    if (res.status === 200) {
      return await res.json();
    } else console.log("error, cannot get data");
  };

const addNewEvent = async (data) => {
  
  //   console.log([...data]);
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events`, {
      mode: 'no-cors',
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
      },
      body: data,
    });

    console.log(res.status);
    // const response = await res.json() 
    // console.log(response.message);

    if(res.status === 0) {
      console.log('success');
    }else if(res.status === 400) {
      console.log('bad');
    }

  //   fetch(`${import.meta.env.VITE_BACK_URL}/events`, {
  //     mode: 'no-cors',
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       "Authorization": "Bearer " + localStorage.getItem("accessToken"),
  //     },
  //     body: data,
  //   })
  //   .then(res => console.log(res.status))
  //   .then(data => console.log(data))
    
  };

export {editEventDetail , getEvents , addNewEvent}