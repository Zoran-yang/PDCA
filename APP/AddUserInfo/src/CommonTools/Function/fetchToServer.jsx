export default function fetchToServer(
  situation, //the type of operation to server by "updateTaskInfos", "reviseTaskInfos", "deleteTaskInfos"
  data, // the data to be sent to server
  serverResponseHandle = async (res) => {
    // the function to handle the response from server
    const res = await res.json();
    console.log(res);
    return res;
  },
  serverErrorHandle = async (res) => {
    // the function to handle the error from server
    console.log(await res.json());
    throw new Error(`HTTP error: ${res.status}`);
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
  serverErrorHandle,
  timeout = 5000
) {
  try {
    const res = await fetchWithTimeout(url, method, data, timeout);
    if (!res.ok) {
      serverErrorHandle(res);
    }
    serverResponseHandle(res);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}

function fetchWithTimeout(url, method, data, timeout) {
  return new Promise(async (resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      clearTimeout(timeoutId);
      resolve(response);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
}
