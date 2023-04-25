export default function fetchToServer(
  situation, //the type of operation to server by "updateTaskInfos", "reviseTaskInfos", "deleteTaskInfos"
  data, // the data to be sent to server
  serverResponseHandle = async (res) => {
    // the function to handle the response from server
    return await res.json();
  },
  serverErrorHandle = async (res) => {
    // the function to handle the error from server
    console.log(await res.json());
    throw new Error("Request failed.");
  }
) {
  const url = "http://localhost:3000/" + situation;
  let method;
  switch (situation) {
    // case "getTaskInfos":
    //     method = "POST"

    //     break;
    case "updateTaskInfos":
      method = "PATCH";
      return fetchData(
        url,
        method,
        data,
        serverResponseHandle,
        serverErrorHandle
      );
    case "reviseTaskInfos":
      method = "PATCH";
      return fetchData(
        url,
        method,
        data,
        serverResponseHandle,
        serverErrorHandle
      );
    case "deleteTaskInfos":
      method = "DELETE";
      return fetchData(
        url,
        method,
        data,
        serverResponseHandle,
        serverErrorHandle
      );
    default:
      console.log("fetchToServer: situation not found");
      break;
  }
}

async function fetchData(
  url,
  method,
  data,
  serverResponseHandle,
  serverErrorHandle
) {
  return fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      if (res.ok) {
        serverResponseHandle(res);
      } else {
        serverErrorHandle(res);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
