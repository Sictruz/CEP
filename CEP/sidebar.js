document.addEventListener("DOMContentLoaded", async () => {
  const slot = document.getElementById("sidebar-slot");
  if (!slot) return; 

  try {
    const resposta = await fetch("index.html");
    const htmlTexto = await resposta.text();

    const parser = new DOMParser();
    const docIndex = parser.parseFromString(htmlTexto, "text/html");
    const sidebarOriginal = docIndex.querySelector("aside.sidebar");

    if (!sidebarOriginal) return;

  
    const paginaAtual = window.location.pathname.split("/").pop() || "index.html";

    sidebarOriginal.querySelectorAll(".nav-item").forEach((link) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");

      if (link.getAttribute("href") === paginaAtual) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
    slot.replaceWith(sidebarOriginal);
  } catch (erro) {
    console.error("Erro ao carregar a sidebar do index.html:", erro);
  }
});
