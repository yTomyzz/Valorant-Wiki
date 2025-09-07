function mostrarConteudo(arquivo) {
    const conteudoDiv = document.getElementById("conteudo");
    const barra = document.getElementById("barra-carregamento");

    // Animação da barra de carregamento (início)
    barra.style.width = "30%";

    // Efeito fade no conteúdo
    conteudoDiv.classList.add("fade-out");

    setTimeout(() => {
        fetch(arquivo)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Página não encontrada.");
                }
                barra.style.width = "70%"; // progresso
                return response.text();
            })
            .then(data => {
                conteudoDiv.innerHTML = data;
                conteudoDiv.classList.remove("fade-out");
                barra.style.width = "100%"; // finaliza
                setTimeout(() => barra.style.width = "0", 300); // esconde
            })
            .catch(error => {
                conteudoDiv.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`;
                conteudoDiv.classList.remove("fade-out");
                barra.style.width = "0";
            });
    }, 400);
}

// Função para ativar topicos após o conteúdo carregar
function ativarAcordeao() {
    const topicos = document.querySelectorAll(".topico h3");

    topicos.forEach(titulo => {
        titulo.addEventListener("click", () => {
            const topico = titulo.parentElement;
            topico.classList.toggle("ativo");
        });
    });
}

// Chamar a função sempre que novo conteúdo for carregado
function mostrarConteudo(arquivo) {
    const conteudoDiv = document.getElementById("conteudo");
    const barra = document.getElementById("barra-carregamento");

    barra.style.width = "30%";
    conteudoDiv.classList.add("fade-out");

    setTimeout(() => {
        fetch(arquivo)
            .then(response => {
                if (!response.ok) throw new Error("Página não encontrada.");
                barra.style.width = "70%";
                return response.text();
            })
            .then(data => {
                conteudoDiv.innerHTML = data;
                conteudoDiv.classList.remove("fade-out");
                barra.style.width = "100%";
                setTimeout(() => barra.style.width = "0", 300);

                // Ativa topicos após inserir conteúdo
                ativarAcordeao();
            })
            .catch(error => {
                conteudoDiv.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`;
                conteudoDiv.classList.remove("fade-out");
                barra.style.width = "0";
            });
    }, 400);
}
