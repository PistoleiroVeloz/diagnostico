// script.js

// Função para salvar as respostas e redirecionar para a página de diagnóstico
function handleFormSubmit(event) {
    event.preventDefault();

    // Capturar as respostas como arrays
    const responses = {
        date: new Date().toLocaleString(),
        question1: [],
        question2: []
    };

    // Coletar respostas da pergunta 1
    document.querySelectorAll('input[name="question1"]:checked').forEach((checkbox) => {
        responses.question1.push(checkbox.value);
    });

    // Coletar respostas da pergunta 2
    document.querySelectorAll('input[name="question2"]:checked').forEach((checkbox) => {
        responses.question2.push(checkbox.value);
    });

    // Armazenar as respostas localmente
    localStorage.setItem('diagnosticResponses', JSON.stringify(responses));

    // Redirecionar para a página de diagnóstico
    window.location.href = 'diagnostico.html';
}

// Função para exibir os cartões de diagnóstico
function displayDiagnosis() {
    // Recuperar as respostas
    const responses = JSON.parse(localStorage.getItem('diagnosticResponses'));

    // Definir as ferramentas e seus benefícios
    const tools = [
        {
            name: 'Curso Básico de Gestão de Projetos',
            description: 'Pode se beneficiar do Curso Básico de Gestão de Projetos para estruturar melhor as iniciativas.',
            link: '#',
            relatedAnswers: ['1a', '2c']
        },
        {
            name: 'Planilha de Suporte',
            description: 'A Planilha de Suporte para registro e acompanhamento de projetos pode ajudar a organizar o mapa básico.',
            link: '#',
            relatedAnswers: ['1b', '2a', '2b']
        },
        {
            name: 'Artefatos do Processo de Gestão de Projetos',
            description: 'Utilizar os Artefatos do Processo de Gestão de Projetos pode fortalecer o planejamento colaborativo.',
            link: '#',
            relatedAnswers: ['1c', '2b', '2e']
        },
        {
            name: 'Case de Sucesso do Projeto de Implantação do Laboratório de Inovação',
            description: 'O Case de Sucesso pode fornecer aprendizados valiosos de experiências anteriores.',
            link: '#',
            relatedAnswers: ['1d', '1e', '2d']
        }
    ];

    // Criar um conjunto para armazenar as ferramentas selecionadas sem duplicatas
    const selectedToolsSet = new Set();

    // Concatenar todas as respostas com o número da pergunta
    const selectedAnswers = [];

    responses.question1.forEach((answer) => {
        selectedAnswers.push('1' + answer);
    });

    responses.question2.forEach((answer) => {
        selectedAnswers.push('2' + answer);
    });

    // Selecionar as ferramentas relevantes com base nas respostas
    tools.forEach(tool => {
        // Verificar se há interseção entre as respostas selecionadas e as respostas relacionadas ao artefato
        const hasRelatedAnswer = tool.relatedAnswers.some(answer => selectedAnswers.includes(answer));

        if (hasRelatedAnswer) {
            selectedToolsSet.add(tool);
        }
    });

    // Exibir os cartões
    const diagnosisCardsDiv = document.getElementById('diagnosisCards');

    selectedToolsSet.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h2');
        title.textContent = tool.name;

        const description = document.createElement('p');
        description.textContent = tool.description;

        const link = document.createElement('a');
        link.href = tool.link;
        link.textContent = 'Acessar';
        link.target = '_blank';

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(link);

        diagnosisCardsDiv.appendChild(card);
    });
}

// Verificar em qual página estamos e executar a função correspondente
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('diagnosticForm')) {
        document.getElementById('diagnosticForm').addEventListener('submit', handleFormSubmit);
    } else if (document.getElementById('diagnosisCards')) {
        displayDiagnosis();
    }
});
