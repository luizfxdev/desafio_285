/**
 * Labirinto Dinâmico do Mago Lovindor - Script Principal
 *
 * Sistema interativo para resolver o desafio das salas mágicas seguindo as regras:
 * 1. Para cada sala, inverter seus dígitos
 * 2. Somar o número original com o invertido
 * 3. Se a soma tiver 3 dígitos, usar apenas o último dígito como próxima sala
 * 4. Repetir o processo por 10 iterações
 *
 * @version 1.0
 * @author Seu Nome
 */

/**
 * Classe principal que gerencia o labirinto mágico e a interface do usuário
 * @class MazeLabyrinth
 */
class MazeLabyrinth {
  /**
   * Construtor da classe - inicializa elementos DOM e estado da aplicação
   * @constructor
   */
  constructor() {
    // Elementos da interface do usuário
    this.inputField = document.getElementById('numbers-input'); // Campo para entrada dos números das salas
    this.discoverBtn = document.getElementById('discover-btn'); // Botão para iniciar a descoberta
    this.returnBtn = document.getElementById('return-btn'); // Botão para retornar/limpar
    this.resultSection = document.getElementById('result-section'); // Seção para mostrar resultados
    this.calculationDetails = document.getElementById('calculation-details'); // Detalhes dos cálculos
    this.finalResult = document.getElementById('final-result'); // Resultado final

    // Estado da aplicação
    this.isCalculating = false; // Flag para controlar se um cálculo está em andamento

    // Inicializar eventos e valores padrão
    this.initializeEvents();
    this.inputField.value = '0, 47'; // Valores padrão para demonstração
  }

  /**
   * Configura os event listeners para os elementos da interface
   * @method initializeEvents
   */
  initializeEvents() {
    // Evento do botão DESCOBRIR - inicia o processo de cálculo
    this.discoverBtn.addEventListener('click', () => this.handleDiscover());

    // Evento do botão RETORNAR - limpa os resultados e prepara para nova entrada
    this.returnBtn.addEventListener('click', () => this.handleReturn());

    // Permitir que o Enter submeta o formulário
    this.inputField.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        this.handleDiscover();
      }
    });

    // Validação de input em tempo real para garantir apenas caracteres válidos
    this.inputField.addEventListener('input', () => this.validateInput());
  }

  /**
   * Valida a entrada do usuário para permitir apenas números, vírgulas, espaços e hífens
   * @method validateInput
   */
  validateInput() {
    const value = this.inputField.value;
    const validPattern = /^[\d,\s-]*$/; // Regex para validar caracteres permitidos

    if (!validPattern.test(value)) {
      // Remove caracteres inválidos mantendo apenas os permitidos
      this.inputField.value = value.replace(/[^\d,\s-]/g, '');
    }
  }

  /**
   * Inverte os dígitos de um número (ex: 47 vira 74)
   * @method reverseNumber
   * @param {number} num - Número a ser invertido
   * @returns {number} Número com dígitos invertidos
   */
  reverseNumber(num) {
    return parseInt(num.toString().split('').reverse().join('')) || 0;
  }

  /**
   * Calcula a próxima sala seguindo as regras do Mago Lovindor
   * @method calculateNextRoom
   * @param {number} currentRoom - Número da sala atual
   * @returns {Object} Objeto com detalhes do cálculo:
   *   - currentRoom: Sala atual
   *   - reversed: Número invertido
   *   - sum: Soma do original com o invertido
   *   - nextRoom: Próxima sala resultante
   *   - isThreeDigits: Flag indicando se a soma tem três dígitos
   */
  calculateNextRoom(currentRoom) {
    const reversed = this.reverseNumber(currentRoom);
    const sum = currentRoom + reversed;

    // Se a soma tem 3 dígitos, pega apenas o último dígito
    const nextRoom = sum >= 100 ? sum % 10 : sum;

    return {
      currentRoom,
      reversed,
      sum,
      nextRoom,
      isThreeDigits: sum >= 100
    };
  }

  /**
   * Encontra o caminho através de 10 salas a partir de uma sala inicial
   * @method findPathForRoom
   * @param {number} startingRoom - Sala inicial para iniciar o caminho
   * @param {number} [steps=10] - Número de passos/iterações (padrão: 10)
   * @returns {Object} Objeto contendo:
   *   - path: Array com a sequência de salas visitadas
   *   - calculations: Array com detalhes de cada cálculo
   */
  findPathForRoom(startingRoom, steps = 10) {
    const path = []; // Armazena a sequência de salas
    const calculations = []; // Armazena os detalhes de cada cálculo
    let currentRoom = startingRoom;

    for (let i = 0; i < steps; i++) {
      const calculation = this.calculateNextRoom(currentRoom);
      path.push(currentRoom);
      calculations.push(calculation);
      currentRoom = calculation.nextRoom;

      // Detecção de loop para otimização - se encontramos uma sala repetida
      if (i > 0 && path.indexOf(currentRoom) !== -1) {
        // Se já percorremos várias iterações e detectamos um loop, podemos parar
        if (i >= 5) break;
      }
    }

    return { path, calculations };
  }

  /**
   * Processa e valida a entrada do usuário
   * @method parseInput
   * @returns {number[]} Array de números válidos
   * @throws {Error} Se a entrada estiver vazia ou contiver valores inválidos
   */
  parseInput() {
    const value = this.inputField.value.trim();

    // Verificar se há entrada
    if (!value) {
      throw new Error('Por favor, insira pelo menos um número de sala.');
    }

    // Processar cada número separado por vírgula
    const numbers = value.split(',').map(num => {
      const parsed = parseInt(num.trim());

      // Validar se é um número não-negativo
      if (isNaN(parsed) || parsed < 0) {
        throw new Error(`"${num.trim()}" não é um número válido.`);
      }

      return parsed;
    });

    // Verificar se pelo menos um número foi fornecido
    if (numbers.length === 0) {
      throw new Error('Nenhum número válido foi encontrado.');
    }

    return numbers;
  }

  /**
   * Renderiza os detalhes dos cálculos na interface
   * @method renderCalculationDetails
   * @param {Object[]} results - Array de resultados para exibir
   */
  renderCalculationDetails(results) {
    // Limpar conteúdo anterior
    this.calculationDetails.innerHTML = '';

    // Processar cada resultado individualmente
    results.forEach((result, index) => {
      const { path, calculations } = result;
      const startingRoom = path[0];

      // Criar elemento para exibir este cálculo
      const sectionDiv = document.createElement('div');
      sectionDiv.className = 'calculation-step';

      let html = `
        <div class="step-title">
          🏰 Jornada iniciando na Sala ${startingRoom}:
        </div>
      `;

      // Mostrar os primeiros 5 passos com detalhes
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

      // Indicador se há mais passos não mostrados em detalhe
      if (calculations.length > 5) {
        html += `<div class="step-detail">... (continuando até 10 salas)</div>`;
      }

      // Mostrar o caminho completo
      html += `
        <div class="step-detail">
          <strong>Caminho das 10 salas:</strong> [${path.join(', ')}]
        </div>
      `;

      sectionDiv.innerHTML = html;
      this.calculationDetails.appendChild(sectionDiv);
    });
  }

  /**
   * Renderiza o resultado final na interface
   * @method renderFinalResult
   * @param {Object[]} results - Array de resultados para exibir
   */
  renderFinalResult(results) {
    // Formatar os caminhos para exibição
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

  /**
   * Exibe uma mensagem de erro na interface
   * @method showError
   * @param {string} message - Mensagem de erro a ser exibida
   */
  showError(message) {
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

  /**
   * Manipula o clique no botão "Descobrir" - inicia o processo de cálculo
   * @method handleDiscover
   * @async
   */
  async handleDiscover() {
    // Prevenir múltiplos cliques simultâneos
    if (this.isCalculating) return;

    try {
      this.isCalculating = true;
      this.discoverBtn.textContent = 'CALCULANDO...';
      this.discoverBtn.style.opacity = '0.7';

      // Processar a entrada do usuário
      const startingRooms = this.parseInput();

      // Pequeno delay para melhor experiência do usuário
      await new Promise(resolve => setTimeout(resolve, 800));

      // Calcular caminhos para cada sala inicial fornecida
      const results = startingRooms.map(room => this.findPathForRoom(room, 10));

      // Exibir resultados
      this.renderCalculationDetails(results);
      this.renderFinalResult(results);
      this.resultSection.classList.add('show');
    } catch (error) {
      // Exibir erros de forma amigável
      this.showError(error.message);
    } finally {
      // Restaurar estado do botão independentemente do resultado
      this.isCalculating = false;
      this.discoverBtn.textContent = 'DESCOBRIR';
      this.discoverBtn.style.opacity = '1';
    }
  }

  /**
   * Manipula o clique no botão "Retornar" - limpa a interface para nova entrada
   * @method handleReturn
   */
  handleReturn() {
    // Limpar todos os dados anteriores
    this.inputField.value = '';
    this.calculationDetails.innerHTML = '';
    this.finalResult.innerHTML = '';
    this.resultSection.classList.remove('show');

    // Resetar estado da aplicação
    this.isCalculating = false;
    this.discoverBtn.textContent = 'DESCOBRIR';
    this.discoverBtn.style.opacity = '1';

    // Focar no campo de entrada para nova jornada
    this.inputField.focus();

    // Efeito visual de feedback no botão
    this.returnBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.returnBtn.style.transform = '';
    }, 150);

    console.log('🧙‍♂️ Dados anteriores limpos. Pronto para nova jornada!');
  }
}

// Inicializar a aplicação quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
  const maze = new MazeLabyrinth();

  // Adicionar classe para ativar animações CSS
  document.body.classList.add('loaded');

  console.log('🧙‍♂️ Labirinto do Mago Lovindor inicializado com sucesso!');
});

/**
 * Cria efeitos visuais de partículas mágicas para melhorar a experiência
 * @function createMagicParticles
 */
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

  // Criar múltiplas partículas com posições e tempos aleatórios
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

      // Remover partícula após conclusão da animação
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 7000);
    }, i * 200);
  }
}

// Iniciar animação de partículas após um breve delay na inicialização
setTimeout(createMagicParticles, 1000);
