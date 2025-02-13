(document.querySelector("#close") as HTMLButtonElement).onclick = () => {
	fetch("http://localhost:2532/close", { method: "POST" });
}
(document.querySelector("#next") as HTMLButtonElement).onclick = () => {
	document.body.setAttribute("index", "2");
}