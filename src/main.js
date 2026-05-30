import { cases, mockResponses } from './data.js';

let state = {
  currentRoute: 'welcome', // welcome, intro, case, final, admin
  currentCaseIndex: 0,
  user: {
    name: '',
    contact: '', // email or cpf
    city: '',
    state: ''
  },
  score: 0,
  answers: []
};

const appDiv = document.getElementById('app');

function render() {
  appDiv.innerHTML = ''; // clear

  if (window.location.hash === '#/admin') {
    state.currentRoute = 'admin';
  } else if (state.currentRoute === 'admin' && window.location.hash !== '#/admin') {
    state.currentRoute = 'welcome';
  }

  switch(state.currentRoute) {
    case 'welcome':
      appDiv.appendChild(renderWelcome());
      break;
    case 'intro':
      appDiv.appendChild(renderIntro());
      break;
    case 'case':
      appDiv.appendChild(renderCase());
      break;
    case 'final':
      appDiv.appendChild(renderFinal());
      break;
    case 'admin':
      appDiv.appendChild(renderAdmin());
      break;
    default:
      appDiv.appendChild(renderWelcome());
  }
  
  // Scroll to top on navigation
  window.scrollTo(0, 0);
}

function renderProgressBar(current, total) {
  const progress = (current / total) * 100;
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="progress-text" aria-live="polite">Etapa ${current} de ${total}</div>
    <div class="progress-container" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar" style="width: ${progress}%"></div>
    </div>
  `;
  return container;
}

function renderWelcome() {
  const container = document.createElement('div');
  container.className = 'card';
  
  container.innerHTML = `
    <h1>Bem-vindo ao Treinamento de Prevenção a Fraudes</h1>
    <p>Aprenda a identificar e se proteger dos golpes mais comuns.</p>
    
    <form id="welcomeForm" class="mt-lg">
      <div class="form-group checkbox-group">
        <input type="checkbox" id="lgpd" required>
        <label for="lgpd" style="font-weight: normal;">Concordo com o uso dos meus dados para fins deste treinamento (LGPD). Nenhum dado será salvo permanentemente.</label>
      </div>

      <div class="form-group">
        <label for="name">Nome Completo</label>
        <input type="text" id="name" required placeholder="Digite seu nome completo">
      </div>

      <div class="form-group">
        <label for="contact">E-mail ou CPF</label>
        <input type="text" id="contact" required placeholder="Digite seu e-mail ou CPF">
      </div>

      <div class="form-group">
        <label for="isNiteroi">Mora em Niterói?</label>
        <select id="isNiteroi" required>
          <option value="">Selecione...</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
      </div>
      
      <div id="extraLocation" style="display: none;">
        <div class="form-group">
          <label for="uf">Estado (UF)</label>
          <input type="text" id="uf" placeholder="Ex: RJ, SP, MG" maxlength="2">
        </div>
        <div class="form-group">
          <label for="city">Município</label>
          <input type="text" id="city" placeholder="Ex: São Gonçalo">
        </div>
      </div>

      <button type="submit" class="btn">Continuar</button>
    </form>
  `;

  setTimeout(() => {
    const isNiteroiSelect = container.querySelector('#isNiteroi');
    const extraLocationDiv = container.querySelector('#extraLocation');
    
    isNiteroiSelect.addEventListener('change', (e) => {
      if (e.target.value === 'nao') {
        extraLocationDiv.style.display = 'block';
        container.querySelector('#uf').required = true;
        container.querySelector('#city').required = true;
      } else {
        extraLocationDiv.style.display = 'none';
        container.querySelector('#uf').required = false;
        container.querySelector('#city').required = false;
      }
    });

    container.querySelector('#welcomeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      state.user.name = container.querySelector('#name').value;
      state.user.contact = container.querySelector('#contact').value;
      
      if (isNiteroiSelect.value === 'sim') {
        state.user.city = 'Niterói';
        state.user.state = 'RJ';
      } else {
        state.user.city = container.querySelector('#city').value;
        state.user.state = container.querySelector('#uf').value;
      }
      
      state.currentRoute = 'intro';
      render();
    });
  }, 0);

  return container;
}

function renderIntro() {
  const container = document.createElement('div');
  container.className = 'card';
  
  // Total steps: 1 (intro) + 5 (cases) + 1 (final) = 7 steps conceptually
  // We'll consider Intro as step 1
  container.appendChild(renderProgressBar(1, cases.length + 2));

  const content = document.createElement('div');
  content.innerHTML = `
    <h1>Como Funciona?</h1>
    <p>Olá, <strong>${state.user.name}</strong>!</p>
    <p>Neste treinamento, vamos apresentar <strong>${cases.length} casos reais</strong> de golpes que estão acontecendo frequentemente no Brasil.</p>
    <p>Para cada caso, você verá:</p>
    <ul style="margin-left: 2rem; margin-bottom: 1rem; font-size: var(--text-base);">
      <li>Como o golpe funciona.</li>
      <li>O que você deve fazer para se proteger.</li>
      <li>Uma pergunta rápida para testar seus conhecimentos.</li>
    </ul>
    <p>Leia com atenção e boa sorte!</p>
    <br>
    <div class="flex-between">
      <button class="btn btn-secondary" id="btnBack">Voltar</button>
      <button class="btn" id="btnStart">Vamos começar!</button>
    </div>
  `;

  setTimeout(() => {
    content.querySelector('#btnBack').addEventListener('click', () => {
      state.currentRoute = 'welcome';
      render();
    });
    content.querySelector('#btnStart').addEventListener('click', () => {
      state.currentRoute = 'case';
      state.currentCaseIndex = 0;
      render();
    });
  }, 0);

  container.appendChild(content);
  return container;
}

function renderCase() {
  const container = document.createElement('div');
  const currentCase = cases[state.currentCaseIndex];
  
  // Progress: 2 for case 0, 3 for case 1, etc.
  container.appendChild(renderProgressBar(state.currentCaseIndex + 2, cases.length + 2));

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h2>Caso ${state.currentCaseIndex + 1}: ${currentCase.title}</h2>
    
    ${currentCase.image 
      ? '<img src="' + currentCase.image + '" alt="' + currentCase.placeholderImageText + '" style="width: 100%; max-height: 400px; object-fit: contain; margin-bottom: var(--spacing-md); border-radius: var(--border-radius); border: 2px solid var(--border-color);">'
      : '<div class="image-placeholder" aria-label="' + currentCase.placeholderImageText + '">[Espaço para Imagem: ' + currentCase.placeholderImageText + ']</div>'
    }
    
    <div style="background-color: rgba(0,86,179,0.05); padding: 1rem; border-left: 4px solid var(--primary-color); margin-bottom: 1rem;">
      <strong>Como funciona:</strong> ${currentCase.description}
    </div>
    
    <p><strong>Exemplo Real:</strong> ${currentCase.realCase}</p>
    <p><strong>O que fazer:</strong> ${currentCase.whatToDo}</p>
    
    <hr style="margin: 2rem 0; border: none; border-top: 1px solid var(--border-color);">
    
    <h3>${currentCase.question}</h3>
    <div id="optionsContainer" style="margin-top: 1rem;">
      ${currentCase.options.map((opt, index) => `
        <button class="option-btn" data-index="${index}">${opt}</button>
      `).join('')}
    </div>
    
    <div id="feedbackBox" class="feedback-box" aria-live="assertive"></div>
    
    <div class="flex-between mt-lg">
      <button class="btn btn-secondary" id="btnBack">Voltar</button>
      <button class="btn" id="btnNext" disabled>Próximo caso</button>
    </div>
  `;

  setTimeout(() => {
    const optionsContainer = card.querySelector('#optionsContainer');
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    const feedbackBox = card.querySelector('#feedbackBox');
    const btnNext = card.querySelector('#btnNext');
    let hasAnswered = false;

    // Se é a última etapa, mudar texto
    if (state.currentCaseIndex === cases.length - 1) {
      btnNext.textContent = "Finalizar";
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (hasAnswered) return;
        hasAnswered = true;
        
        const selectedIndex = parseInt(btn.getAttribute('data-index'));
        const isCorrect = selectedIndex === currentCase.correctAnswerIndex;
        
        if (isCorrect) {
          btn.classList.add('correct');
          feedbackBox.textContent = "Correto! Muito bem.";
          feedbackBox.className = "feedback-box show success";
          state.score += 20; // Each is worth 20 points (5 * 20 = 100)
        } else {
          btn.classList.add('wrong');
          // Highlight correct answer
          buttons[currentCase.correctAnswerIndex].classList.add('correct');
          feedbackBox.textContent = "Incorreto. A melhor opção seria: " + currentCase.options[currentCase.correctAnswerIndex];
          feedbackBox.className = "feedback-box show error";
        }
        
        btnNext.disabled = false;
        
        // Save answer locally
        state.answers.push({
          caseId: currentCase.id,
          isCorrect: isCorrect
        });
      });
    });

    card.querySelector('#btnBack').addEventListener('click', () => {
      if (state.currentCaseIndex > 0) {
        state.currentCaseIndex--;
        // Reseting score for this step could be tricky if we don't track per case, 
        // but since this is frontend simulation, we can just allow going back and ignoring score complexity,
        // or prevent going back once answered. For simplicity, we just navigate.
        // Usually, in a real form you pop the last answer.
        state.answers.pop();
        render();
      } else {
        state.currentRoute = 'intro';
        render();
      }
    });

    btnNext.addEventListener('click', () => {
      if (state.currentCaseIndex < cases.length - 1) {
        state.currentCaseIndex++;
        render();
      } else {
        state.currentRoute = 'final';
        render();
      }
    });
  }, 0);

  container.appendChild(card);
  return container;
}

function renderFinal() {
  const container = document.createElement('div');
  container.className = 'card text-center';
  
  container.appendChild(renderProgressBar(cases.length + 2, cases.length + 2));

  let feedbackMsg = '';
  if (state.score === 100) {
    feedbackMsg = "Excelente! Você está muito bem preparado contra fraudes.";
  } else if (state.score >= 60) {
    feedbackMsg = "Muito bom! Você acertou a maioria, mas fique sempre atento aos detalhes.";
  } else {
    feedbackMsg = "Cuidado. Recomendamos que você leia novamente as dicas para não cair em golpes.";
  }

  container.innerHTML += `
    <h1 style="color: var(--success); font-size: 3rem; margin: 2rem 0;">🎉</h1>
    <h1>Parabéns por concluir!</h1>
    <p>Obrigado, <strong>${state.user.name}</strong>, por participar do nosso treinamento de prevenção a fraudes.</p>
    
    <div style="background-color: var(--bg-color); padding: 2rem; border-radius: var(--border-radius); margin: 2rem 0;">
      <h2 style="margin-bottom: 0;">Sua pontuação: ${state.score}%</h2>
      <p style="margin-top: 1rem;">${feedbackMsg}</p>
    </div>
    
    <p>Lembre-se: bancos ou instituições sérias nunca pedem senhas por telefone ou WhatsApp.</p>
    
    <button class="btn mt-lg" id="btnRestart">Voltar ao Início</button>
  `;

  setTimeout(() => {
    container.querySelector('#btnRestart').addEventListener('click', () => {
      // Reset state
      state = {
        currentRoute: 'welcome',
        currentCaseIndex: 0,
        user: { name: '', contact: '', city: '', state: '' },
        score: 0,
        answers: []
      };
      render();
    });
  }, 0);

  return container;
}

function renderAdmin() {
  const container = document.createElement('div');
  container.className = 'card';
  
  let rowsHtml = mockResponses.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.email || r.cpf}</td>
      <td>${r.location}</td>
      <td>${r.date}</td>
      <td><strong>${r.score}%</strong></td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="flex-between">
      <h1>Painel de Administração (Simulação)</h1>
      <a href="#/" class="btn btn-secondary" id="btnExitAdmin">Sair</a>
    </div>
    <p>Aqui você visualiza as respostas fictícias armazenadas no sistema.</p>
    
    <div class="flex-between" style="margin: 2rem 0 1rem 0;">
      <div>
        <input type="text" placeholder="Buscar por nome..." style="max-width: 250px; display: inline-block;">
        <button class="btn btn-secondary" style="padding: 12px; min-width: auto;">Buscar</button>
      </div>
      <button class="btn" id="btnExport" style="min-width: auto; padding: 12px 20px;">Exportar CSV</button>
    </div>

    <div style="overflow-x: auto;">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Contato</th>
            <th>Localização</th>
            <th>Data</th>
            <th>Acertos</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;

  setTimeout(() => {
    container.querySelector('#btnExitAdmin').addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = ''; // Clear hash
      state.currentRoute = 'welcome';
      render();
    });

    container.querySelector('#btnExport').addEventListener('click', () => {
      alert("Simulação: CSV exportado com sucesso!");
    });
  }, 0);

  return container;
}

// Handle hash changes for basic routing
window.addEventListener('hashchange', render);

// Initial render
render();
