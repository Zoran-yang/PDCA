export default function fetchToServer(situation, data) {
  const url = "http://localhost:3000/" + situation;
  let method;
  switch (situation) {
    // case "getTaskInfos":
    //     method = "POST"

    //     break;
    case "updateTaskInfos":
      method = "PATCH";
      fetchData(url, method, data);
      break;
    default:
      console.log("fetchToServer: situation not found");
      break;
  }
}

function fetchData(
  url,
  method,
  data,
  serverErrorHandle = async () => {
    console.log(await res.json());
    throw new Error("Request failed.");
  }
) {
  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      } else {
        serverErrorHandle();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
