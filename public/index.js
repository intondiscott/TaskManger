const button = document.querySelector(".text_btn");
const text_val = document.querySelector(".text");
// look up all tasks
const lookUp = async () => {
  try {
    const {
      data: { task },
    } = await axios.get("/app");
    if (task < 1) {
      const show = document.createElement("h2");
      const text = document.createTextNode(
        "No current task available at this time..."
      );
      show.appendChild(text);
      document.body.appendChild(show);
      return;
    }
    const stuff = task.map((task) => {
      const { completed, _id: taskID, name } = task;
      const tasks = document.createElement("h2");
      tasks.classList = "tasks task";
      const del = document.createElement("button");
      del.classList = "tasks button";
      del.textContent = "del";
      const crossOff = document.createElement("input");
      crossOff.type = "checkbox";
      crossOff.classList = "tasks check";
      const text = document.createTextNode(name);
      tasks.appendChild(text);
      document.body.appendChild(tasks);
      document.body.appendChild(crossOff);
      document.body.appendChild(del);
      completed
        ? (crossOff.checked = true) && tasks.classList.toggle("toggle")
        : false;
      crossOff.onchange = async (e) => {
        e.preventDefault();

        try {
          await axios.patch(`app/${taskID}`, {
            name,
            completed: crossOff.checked,
          });
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };
      del.addEventListener("click", async (e) => {
        e.preventDefault();
        await axios.delete(`app/${taskID}`);
        document.body.removeChild(tasks);
        document.body.removeChild(crossOff);
        document.body.removeChild(del);
        window.location.reload();
      });
    });
  } catch (error) {
    console.log(error);
  }
};
const loading = () => {
  setTimeout(() => {
    lookUp(), document.body.removeChild(loadingScreen);
  }, 1000);
  const loadingScreen = document.createElement("h2");
  const text = document.createTextNode("Loading tasks from api...");
  loadingScreen.appendChild(text);
  document.body.appendChild(loadingScreen);
};

loading();
// create task
button.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = text_val.value;
  try {
    await axios.post("app", { name });
    window.location.reload();
    text_val.value = "";
  } catch (error) {
    console.log({ msg: error });
  }
});
