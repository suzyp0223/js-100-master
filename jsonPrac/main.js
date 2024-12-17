fetch("./sample.json")
  .then(async (result) => {
    console.log('result: ', result);
    if (result.ok) {
      const data = await result.json();
      console.log(data);
    }
  });

fetch("http://ohou.se")
  .then((res) => {
    console.log("success,", err);
  })
  .catch((err) => {
    console.log('err:', err);
  });