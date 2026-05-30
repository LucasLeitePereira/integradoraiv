## Objetivo

Formulário interativo multi-etapas baseado no PDF, **acessível para idosos**, com:
- **Imagens geradas por IA** ilustrando cada golpe
- **Página de administração** (simulada) para visualizar respostas fictícias

## Fluxo do usuário (público, sem login)

1. **Tela 1 — Boas-vindas + LGPD + Dados pessoais**
  - Texto + checkbox obrigatório de aceite LGPD
  - Nome completo, e-mail **ou** CPF (um torna o outro opcional)
  - "Mora em Niterói?" Sim/Não → se Não, mostra UF + Município
  - Botão **Continuar** → simula o início do formulário (não salva em banco)
2. **Tela 2 — Como funciona** → botão **Vamos começar!**
3. **Loop dos 5 casos** (Phishing/Detran, Falsa Central 0800, Falso Perfil WhatsApp, Boleto Falso, Maquininha)
  - **Tela de aprendizado**: imagem IA do golpe + caso prático + explicação + caso real RJ + o que fazer → **Entendi, avançar**
  - **Tela de perguntas**: já conhecia? / já sofreu? / conhece alguém? + 1 pergunta de retenção (múltipla escolha, com indicação visual de acerto após responder) → **Próximo caso** (simula salvamento local, sem backend)
4. **Tela final**: agradecimento + resumo

## Design e acessibilidade (foco em idosos)

- Tipografia base 18–20px, títulos 28–36px, line-height generoso
- Alto contraste, paleta sóbria via tokens em `src/styles.css`
- Botões grandes (min 56px), foco visível forte, áreas de toque ≥ 44px
- Um passo por tela, linguagem simples, barra de progresso ("Etapa X de 12")
- Botões **Voltar** e **Avançar** sempre claros
- Labels associados, `aria-live` para feedback, `lang="pt-BR"`, suporte total a teclado


Página de administração (simulada)

- Rota `/admin` (sem autenticação)
- Lista fictícia de respostas (mockadas em arquivo local)
- Nome, contato, localização, data, % de acerto nas perguntas de retenção
- Detalhe expansível com todas as respostas de cada caso
- Filtros: por caso, por cidade, por data (apenas frontend, sem backend)
- Botão **Exportar CSV** (gera CSV localmente)


## Sem backend/persistência

Todo o fluxo é simulado no frontend. Nenhum dado é salvo em banco ou enviado para servidores. As respostas são mantidas apenas em memória/localStorage durante a sessão. A página de administração mostra dados fictícios (mockados).

## Imagens

Uma imagem por caso (5 no total), geradas com `imagegen--generate_image` (quality `standard`), salvas em `src/assets/`:
- Phishing: print estilizado de e-mail falso do "Detran-RJ"
- Vishing/SMS: print de SMS falso de "Banco do Brasil" com 0800 suspeito
- WhatsApp: print de conversa de WhatsApp com "filho" pedindo Pix urgente
- Boleto: print de e-mail de condomínio com boleto anexo
- Maquininha: foto de maquininha com visor quebrado/coberto com fita

Estilo consistente: limpo, alto contraste, sem texto que possa confundir leitores, com legenda em português abaixo no próprio componente.


## Estrutura de arquivos

```text
src/
  data/cases.ts                          # conteúdo dos 5 casos + perguntas
  data/mock_responses.ts                  # respostas fictícias para admin
  assets/                                # imagens geradas
  context/SurveyContext.tsx              # estado do formulário (frontend)
  components/survey/
    ProgressBar.tsx
    StepShell.tsx
    CaseLearn.tsx
    CaseQuiz.tsx
  components/admin/
    ResponsesTable.tsx
    ResponseDetail.tsx
  routes/
    index.tsx                            # tela 1
    intro.tsx                            # tela 2
    caso.$step.tsx                       # loop (1..10)
    fim.tsx                              # tela final
    admin.tsx                            # página admin (sem login)
  styles.css                             # tipografia/contraste ampliados
```

## Etapas de implementação


1. Gerar as 5 imagens de IA
2. Tokens de design (`styles.css`) e componentes base (StepShell, ProgressBar)
3. Telas públicas (1, 2, loop, fim) com `SurveyContext` (apenas frontend, sem persistência real)
4. Página `/admin` (lista, detalhe, export CSV) usando dados mockados

## Observações


Todo o fluxo é simulado, sem autenticação ou backend. Nenhum dado real é enviado ou persistido.
