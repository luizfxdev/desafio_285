// Labirinto Dinâmico do Mago Lovindor - Script Principal
// Desenvolvido para resolver o desafio das salas mágicas

class MazeLabyrinth {
  constructor() {
    // Elementos DOM
    this.inputField = document.getElementById('numbers-input');
    this.discoverBtn = document.getElementById('discover-btn');
    this.returnBtn = document.getElementById('return-btn');
    this.resultSection = document.getElementById('result-section');
    this.calculationDetails = document.getElementById('calculation-details');
    this.finalResult = document.getElementById('final-result');

    // Estado da aplicação
    this.isCalculating = false;

    // Inicializar eventos
    this.initializeEvents();

    // Valores padrão para demonstração
    this.inputField.value = '0, 47';
  }

  initializeEvents() {
    // Evento do botão DESCOBRIR
    this.discoverBtn.addEventListener('click', () => this.handleDiscover());

    // Evento do botão RETORNAR
    this.returnBtn.addEventListener('click', () => this.handleReturn());

    // Permitir Enter no campo de input
    this.inputField.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        this.handleDiscover();
      }
    });

    // Validação de input em tempo real
    this.inputField.addEventListener('input', () => this.validateInput());
  }

  validateInput() {
    // Permite apenas números, vírgulas, espaços e hífens
    const value = this.inputField.value;
    const validPattern = /^[\d,\s-]*$/;

    if (!validPattern.test(value)) {
      this.inputField.value = value.replace(/[^\d,\s-]/g, '');
    }
  }

  reverseNumber(num) {
    // Inverte os dígitos do número
    return parseInt(num.toString().split('').reverse().join('')) || 0;
  }

  calculateNextRoom(currentRoom) {
    // Calcula a próxima sala seguindo as regras do Mago Lovindor
    const reversed = this.reverseNumber(currentRoom);
    const sum = currentRoom + reversed;

    // Se a soma tem 3 dígitos, pega o último dígito
    const nextRoom = sum >= 100 ? sum % 10 : sum;

    return {
      currentRoom,
      reversed,
      sum,
      nextRoom,
      isThreeDigits: sum >= 100
    };
  }

  findPathForRoom(startingRoom, steps = 10) {
    // Encontra o caminho das primeiras 10 salas
    const path = [];
    const calculations = [];
    let currentRoom = startingRoom;

    for (let i = 0; i < steps; i++) {
      const calculation = this.calculateNextRoom(currentRoom);
      path.push(currentRoom);
      calculations.push(calculation);
      currentRoom = calculation.nextRoom;

      // Verificar se entrou em loop
      if (i > 0 && path.indexOf(currentRoom) !== -1) {
        // Loop detectado, pode parar ou continuar por mais algumas iterações
        if (i >= 5) break;
      }
    }

    return { path, calculations };
  }

  parseInput() {
    // Parse dos números de entrada
    const value = this.inputField.value.trim();

    if (!value) {
      throw new Error('Por favor, insira pelo menos um número de sala.');
    }

    const numbers = value.split(',').map(num => {
      const parsed = parseInt(num.trim());
      if (isNaN(parsed) || parsed < 0) {
        throw new Error(`"${num.trim()}" não é um número válido.`);
      }
      return parsed;
    });

    if (numbers.length === 0) {
      throw new Error('Nenhum número válido foi encontrado.');
    }

    return numbers;
  }

  renderCalculationDetails(results) {
    // Renderiza os detalhes dos cálculos
    this.calculationDetails.innerHTML = '';

    results.forEach((result, index) => {
      const { path, calculations } = result;
      const startingRoom = path[0];

      const sectionDiv = document.createElement('div');
      sectionDiv.className = 'calculation-step';

      let html = `
                <div class="step-title">
                    🏰 Jornada iniciando na Sala ${startingRoom}:
                </div>
            `;

      // Mostrar primeiros passos detalhados
      calculations.slice(0, 5).forEach((calc, stepIndex) => {
        const explanation = calc.isThreeDigits
          ? ` → ${calc.nextRoom} (último dígito de ${calc.sum})`
          : ` → ${calc.nextRoom}`;

        html += `
                    <div class="step-detail">
                        Passo ${stepIndex + 1}: ${calc.currentRoom} + ${calc.reversed}${explanation}
                    </div>
                `;
      });

      if (calculations.length > 5) {
        html += `<div class="step-detail">... (continuando até 10 salas)</div>`;
      }

      html += `
                <div class="step-detail">
                    <strong>Caminho das 10 salas:</strong> [${path.join(', ')}]
                </div>
            `;

      sectionDiv.innerHTML = html;
      this.calculationDetails.appendChild(sectionDiv);
    });
  }

  renderFinalResult(results) {
    // Renderiza o resultado final
    const paths = results.map(result => `[${result.path.join(', ')}]`);

    this.finalResult.innerHTML = `
            <div class="result-label">
                ✨ Caminhos das Salas Descobertos:
            </div>
            <div class="result-value">
                ${paths.join('<br>')}
            </div>
        `;
  }

  showError(message) {
    // Mostra mensagem de erro
    this.resultSection.classList.add('show');
    this.calculationDetails.innerHTML = `
            <div class="calculation-step" style="border-left-color: #ef4444;">
                <div class="step-title" style="color: #fca5a5;">
                    ⚠️ Erro na Jornada:
                </div>
                <div class="step-detail" style="color: #fecaca;">
                    ${message}
                </div>
            </div>
        `;
    this.finalResult.innerHTML = '';
  }

  async handleDiscover() {
    // Manipula o clique do botão DESCOBRIR
    if (this.isCalculating) return;

    try {
      this.isCalculating = true;
      this.discoverBtn.textContent = 'CALCULANDO...';
      this.discoverBtn.style.opacity = '0.7';

      // Parse dos números de entrada
      const startingRooms = this.parseInput();

      // Simular um pequeno delay para melhor UX
      await new Promise(resolve => setTimeout(resolve, 800));

      // Calcular caminhos para cada sala inicial
      const results = startingRooms.map(room => this.findPathForRoom(room, 10));

      // Renderizar resultados
      this.renderCalculationDetails(results);
      this.renderFinalResult(results);
      this.resultSection.classList.add('show');
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.isCalculating = false;
      this.discoverBtn.textContent = 'DESCOBRIR';
      this.discoverBtn.style.opacity = '1';
    }
  }

  handleReturn() {
    // Manipula o clique do botão RETORNAR
    // Limpar todos os dados anteriores
    this.inputField.value = '';
    this.calculationDetails.innerHTML = '';
    this.finalResult.innerHTML = '';
    this.resultSection.classList.remove('show');

    // Resetar estado da aplicação
    this.isCalculating = false;
    this.discoverBtn.textContent = 'DESCOBRIR';
    this.discoverBtn.style.opacity = '1';

    // Focar no input para nova entrada
    this.inputField.focus();

    // Efeito visual no botão
    this.returnBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.returnBtn.style.transform = '';
    }, 150);

    console.log('🧙‍♂️ Dados anteriores limpos. Pronto para nova jornada!');
  }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  const maze = new MazeLabyrinth();

  // Adicionar classe para animações CSS
  document.body.classList.add('loaded');

  console.log('🧙‍♂️ Labirinto do Mago Lovindor inicializado com sucesso!');
});

// Adicionar alguns efeitos de partículas mágicas (opcional)
function createMagicParticles() {
  const particles = document.createElement('div');
  particles.className = 'magic-particles';
  particles.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;

  document.body.appendChild(particles);

  // Criar partículas individuais
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(139, 92, 246, 0.8);
                border-radius: 50%;
                animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
            `;

      particles.appendChild(particle);

      // Remover partícula após animação
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 7000);
    }, i * 200);
  }
}

// Adicionar animação de partículas na inicialização
setTimeout(createMagicParticles, 1000);
