# 🧙‍♂️ Labirinto Dinâmico do Mago Lovindor

Uma aplicação web mágica que resolve o enigma do labirinto do Mago Lovindor, calculando caminhos através de salas numeradas seguindo regras matemáticas especiais.

## 📖 Sobre o Desafio
O Mago Lovindor criou um labirinto mágico onde cada sala possui duas portas: uma leva à próxima sala e outra ao início novamente. Sua missão é descobrir o caminho correto através das primeiras 10 salas seguindo regras matemáticas específicas.

## 🎯 Regras do Labirinto

**Início:** Comece na sala especificada
**Cálculo:** Some o número da sala atual com seu inverso (dígitos invertidos)
**Próxima sala:**O processo é repetido por até 10 iterações, ou até serem detectados loops curtos após 5 etapas.

Se a soma tiver 3 dígitos → próxima sala = último dígito
Caso contrário → próxima sala = soma completa


**Objetivo:** Descobrir as primeiras 10 salas do caminho

## 📊 Exemplos

Sala InicialCaminho das 10 Salas0[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]47[47, 1, 2, 4, 8, 16, 77, 4, 8, 16]12[12, 33, 66, 2, 4, 8, 16, 77, 4, 8]89[89, 7, 14, 55, 0, 0, 0, 0, 0, 0]

## 📁 Estrutura de arquivos
```
projeto/
├── index.html
├── styles.css
├── script.js
├── assets/
│   └── background.mp4
└── README.md
```
### 2. Instalação

Clone ou baixe todos os arquivos

Adicione seu vídeo de background em `` assets/background.mp4 ``

Abra ``index.html `` em qualquer navegador moderno

### 3. Utilização

Digite os números: Insira números de salas separados por vírgula

Exemplo: `` 0, 47, 123 ``


Clique em DESCOBRIR: Calcula os caminhos automaticamente

Visualize os resultados:

Cálculos detalhados passo a passo

Caminho final das 10 salas


Clique em RETORNAR: Limpa todos os dados para nova consulta

## 🎨 Características

### ✨ Design Mágico

**Tema fantasia:** Cores roxas, violetas e douradas

**Fontes elegantes:** Cinzel para títulos, Poppins para textos

**Animações:** Botões com efeito rainbow glowing

**Background:** Vídeo de fundo com overlay mágico

## 📱 Responsivo

Desktop: Container à esquerda, botões lado a lado

Tablet: Layout adaptativo

Mobile: Botões empilhados, elementos proporcionais

## 🔧 Funcionalidades

Validação de entrada: Apenas números inteiros

Cálculos em tempo real: Algoritmo otimizado

Resultados detalhados: Mostra cada passo do cálculo

Interface limpa: Botão RETORNAR remove todos os dados

Scroll personalizado: Barra de rolagem com tema mágico

## 🛠️ Tecnologias

HTML5: Estrutura semântica e acessível
CSS3:

Flexbox/Grid para layout
Animações CSS avançadas
Custom scrollbars
Backdrop filters


JavaScript ES6+:

Classes modernas
Async/await
Manipulação DOM otimizada
Validação em tempo real



## 🎯 Algoritmo Principal

```
javascript

// Exemplo de cálculo para sala 47
47 + 74 (inverso) = 121 → Próxima sala: 1 (último dígito)
1 + 1 (inverso) = 2 → Próxima sala: 2
2 + 2 (inverso) = 4 → Próxima sala: 4
// ... continua até completar 10 salas
```

## 🚀 Recursos Avançados

Animações CSS

Rainbow Glowing: Efeito de borda colorida nos botões
Gradient Text: Títulos com gradiente animado
Fade In: Transições suaves nos resultados
Hover Effects: Interações visuais nos elementos

JavaScript Features

**Classe principal:** `` MazeLabyrinth `` gerencia toda a aplicação
**Validação robusta:** Entrada apenas de números inteiros
**Cálculos otimizados:** Algoritmo eficiente para grandes números
**Debug integrado:** Console logs para desenvolvimento

## 📋 Requisitos

Navegador moderno (Chrome 60+, Firefox 55+, Safari 12+)
JavaScript habilitado
Arquivo de vídeo em `` assets/background.mp4 ``

## 🎨 Personalização

Cores do Tema

```
css

/* Cores principais */
--primary-purple: rgba(138, 43, 226, 0.8)
--secondary-violet: rgba(168, 85, 247, 0.6)
--accent-gold: #ffbf00
--background-dark: rgba(30, 15, 60, 0.95)
```
Fontes

Títulos: Cinzel (serif mágica)
Textos: Poppins (sans-serif moderna)


## 🐛 Troubleshooting

Vídeo não aparece

Verifique se o arquivo está em assets/background.mp4
Confirme o formato MP4 compatível
Teste em navegador diferente

Cálculos incorretos

Verifique entrada apenas com números e vírgulas
Confirme números inteiros positivos
Teste com exemplos conhecidos (0, 47)

Layout quebrado

Confirme CSS carregado corretamente
Teste em diferentes resoluções
Verifique console para erros

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

Fork o projeto
Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)
Commit suas mudanças (git commit -m 'Add some AmazingFeature')
Push para a branch (git push origin feature/AmazingFeature)
Abra um Pull Request

## 🧙‍♂️ Créditos

**Desafio criado por:** OneBitCode
**Implementação:** Sistema web responsivo com tema mágico
**Inspiração:** Jogos de fantasia e enigmas matemáticos
**Resolução feita por:** [Luizfxdev](https://www.linkedin.com/in/luizfxdev)


*"No labirinto do conhecimento, cada sala é uma nova descoberta."*  ✨
