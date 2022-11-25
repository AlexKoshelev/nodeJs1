console.log("hello from app");
document.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (event.target.dataset.type === "remove") {
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "edit") {
    const content =
      event.target.parentNode.parentNode.childNodes[0].data.trim();
    const value = prompt("Редактировать заметку", content);
    edit(id, value).then(() => window.location.reload());
  }
});
async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}
async function edit(id, content) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: content }),
  });
}
