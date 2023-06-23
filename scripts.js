let querySubmit = document.getElementById("submitQuery");
let queryURL = document.getElementById("url");

let fetchURL = async () => {
  await fetch(queryURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      //   console.log(data.reverse());
      console.log(data);
      document.getElementById("originalOutcome").innerHTML = data;
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        document.getElementById("originalOutcome").innerHTML = data[i];
      }

      let reverse = reverseString(data);
      console.log(reverse);
      document.getElementById("inverseOutcome").innerHTML = reverse;
    })
    .catch((error) => console.error("Error:", error));
};

let reverseJSON = (originalData) => {
  let reverse = Object.keys(originalData)
    .sort()
    .reverse()
    .map((key) => ({ ...originalData[key], key }));

  return reverse;
};

let reverseString = (data) => {
  let reverse = reverseJSON(data);

  for (let i in reverse) {
    if (typeof reverse[i].key == "string") {
      reverse[i].key = reverse[i].key.split("").reverse().join("");
    }
  }

  return reverse;
};

let saveValue = (e) => {
  let id = e.id;
  let val = e.value;
  localStorage.setItem(id, val);
};

let getSavedValue = (v) => {
  if (!localStorage.getItem(v)) {
    return "";
  }

  return localStorage.getItem(v);
};

querySubmit.addEventListener("click", (e) => {
  queryURL = document.getElementById("url").value;
  fetchURL();
});

window.addEventListener("load", (e) => {
  queryURL.value = getSavedValue("url");
});
