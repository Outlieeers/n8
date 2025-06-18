# Flowith Pessoal (MVP)

Uma versão pessoal e simplificada da plataforma de IA conversacional Flowith.AI, focada no uso individual e controle do usuário. Esta é a versão MVP (Minimum Viable Product).

## Visão Geral

Este projeto visa criar uma interface de chat individual, rica em funcionalidades, permitindo aos usuários conectar suas próprias chaves de API para interagir com diversos modelos de linguagem grande (LLMs) e outras ferramentas de IA. O foco está na privacidade, customização e controle total dos dados pelo usuário.

Este MVP inclui:
- Interface de chat com tema escuro padrão.
- Envio de mensagens para a API da OpenAI (GPT-3.5-turbo).
- Streaming de respostas da IA em tempo real.
- Armazenamento local de conversas e API key (OpenAI) via `localStorage`.
- Configuração da API key diretamente na interface.

## Tecnologias Utilizadas (Frontend)

- React 18+ com TypeScript
- Vite para build e desenvolvimento rápido
- Tailwind CSS para estilização
- Zustand para gerenciamento de estado global
- IndexedDB/localStorage para armazenamento local

## Pré-requisitos

- Node.js (versão 18.x ou superior recomendada)
- npm (geralmente vem com o Node.js)
- Uma chave API da OpenAI

## Como Começar

### 1. Clonar o Repositório
```bash
git clone <URL_DO_REPOSITORIO_AQUI> # Substitua pela URL correta quando disponível
cd flowith-personal
```

### 2. Instalar Dependências
Execute o seguinte comando na raiz do projeto (`flowith-personal`):
```bash
npm install
```

### 3. Configurar sua Chave API da OpenAI
Antes de rodar o aplicativo, você precisará da sua chave API da OpenAI.

1.  Após iniciar o aplicativo (veja o próximo passo), você verá uma interface com uma barra lateral esquerda.
2.  Na barra lateral, localize a seção "Chave API OpenAI".
3.  Cole sua chave API (que começa com `sk-...`) no campo de texto.
4.  Clique no botão "Salvar Chave". Um alerta confirmará que a chave foi salva localmente no seu navegador.

    **Importante:** Sua chave API é armazenada no `localStorage` do seu navegador. Não compartilhe seu navegador ou computador com esta chave armazenada se a segurança for uma grande preocupação em um ambiente compartilhado. Para uso pessoal, isso geralmente é aceitável.

### 4. Rodar o Aplicativo em Modo de Desenvolvimento
Execute o comando:
```bash
npm run dev
```
Isso iniciará o servidor de desenvolvimento Vite. Abra seu navegador e acesse o endereço fornecido (geralmente `http://localhost:5173` ou similar).

### 5. Utilizando o Chat
Com a chave API configurada, você pode começar a enviar mensagens para a IA através da interface de chat.

## Estrutura do Projeto (Simplificada)

```
/flowith-personal/
├── public/               # Arquivos estáticos
├── src/
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── Chat/         # Componentes específicos do chat (Input, Message, View)
│   │   ├── Layout/       # Componentes de estrutura (Header, Sidebar, Layout)
│   │   └── Settings/     # Componentes de configuração (ApiKeyInput)
│   ├── hooks/            # Hooks React customizados (vazio por enquanto)
│   ├── services/         # Módulos de serviço (ex: chamadas API)
│   │   └── api/
│   │       └── openai.ts # Lógica de integração com OpenAI
│   ├── stores/           # Stores Zustand para gerenciamento de estado
│   │   ├── chatStore.ts
│   │   └── settingsStore.ts
│   ├── types/            # Definições de tipo TypeScript (vazio por enquanto, tipos estão nos componentes)
│   └── utils/            # Funções utilitárias (vazio por enquanto)
│   ├── App.tsx           # Componente raiz da aplicação
│   ├── main.tsx          # Ponto de entrada da aplicação
│   └── index.css         # Estilos globais e importações Tailwind
├── tailwind.config.js  # Configuração do Tailwind CSS
├── vite.config.ts      # Configuração do Vite
└── README.md           # Este arquivo
```

## Próximos Passos (Pós-MVP)

- Suporte a mais modelos e provedores (Anthropic, Google Gemini, etc.).
- Editor de agentes customizados.
- Upload e análise de documentos.
- Geração de imagens.
- E muito mais conforme o plano original.

## Contribuindo

Este é um projeto pessoal, mas sugestões são bem-vindas. Sinta-se à vontade para abrir Issues para bugs ou sugestões de funcionalidades.
EOT
