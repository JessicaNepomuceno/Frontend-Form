Vou explicar algumas funcionalidades e métodos fundamentais do Jest e Testing Library para que você possa entender como utilizá-los em uma aplicação React com Next.js e TypeScript. Vou seguir o formato solicitado, respondendo a cada pergunta em detalhe e fornecendo exemplos de diferentes níveis de dificuldade.

### 1. Método Jest: `describe`

**O que faz?**  
O método `describe` é usado para agrupar testes relacionados. Ele organiza melhor os testes e fornece uma estrutura lógica ao relatório, tornando-o mais fácil de ler.

**Como funciona?**  
O `describe` recebe dois argumentos: uma descrição do grupo de testes e uma função que contém os testes agrupados. Dentro do bloco `describe`, você pode ter vários testes (`test` ou `it`) e até mesmo outros blocos `describe` para criar subgrupos.

**Cenários recomendados**  
Use `describe` para agrupar testes que verificam funcionalidades relacionadas de um componente ou módulo específico, ou para categorizar testes, como testes de unidade, integração ou comportamentais.

**Prós e contras**  
- **Prós:** Ajuda a organizar testes, facilita o entendimento do relatório de testes e a manutenção do código.
- **Contras:** Pode adicionar complexidade ao código quando utilizado de forma excessiva ou em hierarquias profundas.

**O que considerar ao escolher?**  
Use `describe` para manter a clareza dos testes, especialmente em projetos grandes. Evite criar grupos aninhados demais, pois isso pode dificultar a compreensão.

**Exemplos:**
- **Nível fácil:** Agrupando testes para um componente simples.
    ```javascript
    describe('Botão', () => {
      test('Deve renderizar corretamente', () => {
        // código do teste aqui
      });
    });
    ```
- **Nível médio:** Agrupando testes por comportamento.
    ```javascript
    describe('Formulário de Login', () => {
      describe('Botão de Enviar', () => {
        test('Deve estar desabilitado quando o formulário for inválido', () => {
          // código do teste aqui
        });
      });
    });
    ```
- **Nível difícil:** Organizendo testes complexos de múltiplos cenários.
    ```javascript
    describe('Página de Login', () => {
      describe('Comportamento do formulário', () => {
        test('Deve mostrar mensagem de erro quando credenciais forem inválidas', () => {
          // código do teste aqui
        });
        test('Deve redirecionar para a página principal após login bem-sucedido', () => {
          // código do teste aqui
        });
      });
    });
    ```

### 2. Método Jest: `test` ou `it`

**O que faz?**  
Os métodos `test` e `it` são usados para definir um caso de teste específico. Eles verificam uma funcionalidade ou comportamento esperado de forma isolada.

**Como funciona?**  
Ambos funcionam da mesma forma e são intercambiáveis. Recebem dois argumentos: uma descrição do teste e uma função que contém a lógica do teste. Essa função deve executar a funcionalidade e verificar se o resultado é o esperado.

**Cenários recomendados**  
São usados para testar funcionalidades individuais, como verificar se um componente renderiza corretamente, se funções retornam os valores esperados ou se eventos disparam comportamentos específicos.

**Prós e contras**  
- **Prós:** Facilita a criação de testes isolados e mantém o foco em uma única funcionalidade.
- **Contras:** Testes unitários muito isolados podem ignorar interações complexas entre componentes.

**O que considerar ao escolher?**  
Use `test` ou `it` para testar funcionalidades específicas e focar na granularidade das funcionalidades. Para cenários mais complexos, combine com blocos `describe` para criar agrupamentos lógicos.

**Exemplos:**
- **Nível fácil:** Testando uma função pura.
    ```javascript
    test('Deve retornar a soma de dois números', () => {
      expect(somar(2, 3)).toBe(5);
    });
    ```
- **Nível médio:** Testando a renderização de um componente.
    ```javascript
    it('Deve renderizar o componente Botão com o texto "Enviar"', () => {
      const { getByText } = render(<Botao texto="Enviar" />);
      expect(getByText('Enviar')).toBeInTheDocument();
    });
    ```
- **Nível difícil:** Testando um evento complexo.
    ```javascript
    test('Deve disparar evento de envio quando o formulário estiver válido e o botão for clicado', () => {
      const mockSubmit = jest.fn();
      const { getByLabelText, getByRole } = render(<Formulario onSubmit={mockSubmit} />);
      
      fireEvent.change(getByLabelText('Nome'), { target: { value: 'João' } });
      fireEvent.click(getByRole('button', { name: /enviar/i }));
      
      expect(mockSubmit).toHaveBeenCalled();
    });
    ```

### 3. Testing Library: `render`

**O que faz?**  
A função `render` monta o componente em um ambiente de teste virtual (DOM de teste), possibilitando interações com ele e verificações de elementos.

**Como funciona?**  
Ao renderizar um componente com `render`, ele retorna um conjunto de utilitários para buscar elementos no DOM virtual e interagir com eles.

**Cenários recomendados**  
É utilizada para testar componentes React, verificando sua renderização, comportamento, e interações com o usuário.

**Prós e contras**  
- **Prós:** Simula o comportamento do usuário com a interface, permite testar componentes isolados.
- **Contras:** Pode ter limitações na simulação de comportamentos mais complexos.

**O que considerar ao escolher?**  
Utilize `render` sempre que precisar verificar a presença de elementos ou simular interações com o componente.

**Exemplos:**
- **Nível fácil:** Renderizando um componente básico.
    ```javascript
    const { getByText } = render(<p>Olá, mundo!</p>);
    expect(getByText('Olá, mundo!')).toBeInTheDocument();
    ```
- **Nível médio:** Testando renderização condicional.
    ```javascript
    const { queryByText, rerender } = render(<Mensagem visivel={false} />);
    expect(queryByText('Mensagem secreta')).not.toBeInTheDocument();
    
    rerender(<Mensagem visivel={true} />);
    expect(queryByText('Mensagem secreta')).toBeInTheDocument();
    ```
- **Nível difícil:** Renderizando um componente complexo com estado e efeitos.
    ```javascript
    const { getByText, getByRole } = render(<Contador />);
    const botaoIncremento = getByRole('button', { name: /incrementar/i });
    
    fireEvent.click(botaoIncremento);
    expect(getByText('Contador: 1')).toBeInTheDocument();
    
    fireEvent.click(botaoIncremento);
    expect(getByText('Contador: 2')).toBeInTheDocument();
    ```
    Vamos explorar mais funcionalidades e métodos comuns do Jest e Testing Library, com explicações detalhadas, exemplos práticos de diferentes níveis de dificuldade e as respostas às perguntas solicitadas.

### 4. Jest: `expect`

**O que faz?**  
O `expect` é uma função que realiza asserções em testes, verificando se o resultado obtido é igual ao esperado. Ele é utilizado para validar comportamentos e valores durante o teste.

**Como funciona?**  
O `expect` recebe um valor e aplica um "matcher" para verificar o resultado. Por exemplo, `expect(valor).toBe(esperado)` verifica se `valor` é igual a `esperado`. Há diversos "matchers" disponíveis, como `toEqual`, `toBeTruthy`, `toHaveBeenCalled`, entre outros.

**Cenários recomendados**  
Utilize `expect` para verificar valores de retorno de funções, comportamentos de componentes, chamadas de métodos e estados de variáveis.

**Prós e contras**  
- **Prós:** Possui uma ampla variedade de "matchers" para diferentes tipos de verificação.
- **Contras:** Em testes complexos, o uso de muitos "expects" pode dificultar a legibilidade.

**O que considerar ao escolher?**  
Escolha o matcher apropriado para o tipo de dado ou comportamento que você deseja verificar. Para objetos, prefira `toEqual` em vez de `toBe`, que verifica igualdade de referência.

**Exemplos:**
- **Nível fácil:** Verificando valores simples.
    ```javascript
    expect(2 + 2).toBe(4);
    expect('React').toBe('React');
    ```
- **Nível médio:** Verificando objetos e arrays.
    ```javascript
    const dados = { nome: 'João', idade: 30 };
    expect(dados).toEqual({ nome: 'João', idade: 30 });
    
    const lista = [1, 2, 3];
    expect(lista).toContain(2);
    ```
- **Nível difícil:** Verificando chamadas de funções mockadas.
    ```javascript
    const funcaoMock = jest.fn();
    funcaoMock('dados');
    
    expect(funcaoMock).toHaveBeenCalled();
    expect(funcaoMock).toHaveBeenCalledWith('dados');
    ```

### 5. Testing Library: `fireEvent`

**O que faz?**  
A função `fireEvent` simula eventos de usuário, como cliques, mudanças de valor em campos de texto, pressionamento de teclas, entre outros.

**Como funciona?**  
O `fireEvent` recebe um elemento e o evento que deseja simular, como `click`, `change`, etc. É utilizado para testar a resposta dos componentes aos eventos do usuário.

**Cenários recomendados**  
Use `fireEvent` para testar interações com componentes, como botões, campos de formulário e outros elementos interativos.

**Prós e contras**  
- **Prós:** Simula eventos reais do navegador, ajudando a testar a usabilidade.
- **Contras:** Pode ser mais difícil simular comportamentos complexos ou eventos que requerem configurações específicas.

**O que considerar ao escolher?**  
Utilize `fireEvent` para verificar se os componentes respondem corretamente às interações. Considere cenários em que múltiplos eventos são necessários para reproduzir o comportamento desejado.

**Exemplos:**
- **Nível fácil:** Simulando um clique em um botão.
    ```javascript
    const { getByText } = render(<Botao />);
    fireEvent.click(getByText('Clique aqui'));
    ```
- **Nível médio:** Simulando uma mudança de valor em um campo de texto.
    ```javascript
    const { getByLabelText } = render(<Formulario />);
    const campoNome = getByLabelText('Nome');
    
    fireEvent.change(campoNome, { target: { value: 'Maria' } });
    expect(campoNome.value).toBe('Maria');
    ```
- **Nível difícil:** Simulando múltiplos eventos para testar o comportamento do componente.
    ```javascript
    const { getByLabelText, getByRole } = render(<FormularioCompleto />);
    const campoNome = getByLabelText('Nome');
    const botaoSubmit = getByRole('button', { name: /enviar/i });
    
    fireEvent.change(campoNome, { target: { value: 'Maria' } });
    fireEvent.click(botaoSubmit);
    
    expect(mockSubmitFunction).toHaveBeenCalledWith({ nome: 'Maria' });
    ```

### 6. Testing Library: `screen`

**O que faz?**  
O `screen` é um objeto global que facilita a busca de elementos no DOM renderizado durante os testes. Ele contém métodos como `getByText`, `getByRole`, `queryByText`, etc.

**Como funciona?**  
Os métodos de `screen` são utilizados para encontrar elementos com base em seus atributos, textos, rótulos, funções e outros. Isso permite verificar se os elementos estão presentes e acessíveis no DOM virtual.

**Cenários recomendados**  
Use o `screen` para tornar os testes mais legíveis e evitar a necessidade de utilizar variáveis intermediárias para armazenar o resultado da função `render`.

**Prós e contras**  
- **Prós:** Simplifica a leitura dos testes e torna o código mais limpo.
- **Contras:** Se não usado adequadamente, pode deixar os testes menos explícitos sobre de onde vêm os elementos.

**O que considerar ao escolher?**  
Utilize o `screen` para melhorar a clareza dos testes, especialmente em testes que possuem múltiplas verificações de elementos. Use `queryBy` para checar se um elemento não está presente.

**Exemplos:**
- **Nível fácil:** Verificando a presença de um elemento.
    ```javascript
    render(<Botao texto="Enviar" />);
    expect(screen.getByText('Enviar')).toBeInTheDocument();
    ```
- **Nível médio:** Usando diferentes métodos para buscar elementos.
    ```javascript
    render(<Formulario />);
    expect(screen.getByRole('button', { name: /enviar/i })).toBeEnabled();
    expect(screen.queryByText('Erro')).not.toBeInTheDocument();
    ```
- **Nível difícil:** Verificando múltiplos estados de um componente.
    ```javascript
    render(<Modal visivel={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    
    render(<Modal visivel={true} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    ```

### 7. Testing Library: `waitFor`

**O que faz?**  
O `waitFor` espera que uma condição seja verdadeira antes de prosseguir com o teste. É útil para cenários assíncronos onde há mudanças no DOM após a renderização inicial.

**Como funciona?**  
Recebe uma função que verifica uma condição e repete a verificação até que seja verdadeira ou o tempo limite seja atingido. Usado para lidar com atualizações assíncronas, como chamadas de API e mudanças de estado.

**Cenários recomendados**  
É utilizado para testar interações assíncronas, como atualizações do DOM após requisições de rede ou alterações de estado.

**Prós e contras**  
- **Prós:** Lida bem com atualizações assíncronas, evita condições de corrida nos testes.
- **Contras:** Pode introduzir dependência do tempo nos testes, se não configurado corretamente.

**O que considerar ao escolher?**  
Utilize `waitFor` para cenários assíncronos, certificando-se de que os testes não se tornem instáveis devido a tempos de espera inadequados.

**Exemplos:**
- **Nível fácil:** Esperando uma mensagem de sucesso aparecer.
    ```javascript
    render(<Formulario />);
    fireEvent.click(screen.getByText('Enviar'));
    
    await waitFor(() => expect(screen.getByText('Sucesso!')).toBeInTheDocument());
    ```
- **Nível médio:** Esperando uma mudança de estado com um componente assíncrono.
    ```javascript
    render(<ListaDeUsuarios />);
    await waitFor(() => expect(screen.getByRole('listitem')).toHaveLength(3));
    ```
- **Nível difícil:** Testando a exibição condicional após uma chamada de API.
    ```javascript
    render(<PaginaDeDados />);
    
    await waitFor(() => expect(screen.getByText('Dados carregados')).toBeInTheDocument());
    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
    ```
    Vamos continuar explorando funcionalidades e métodos fundamentais do Jest e Testing Library para escrever testes unitários eficazes em uma aplicação React, Next.js, TypeScript e MUI.

### 8. Jest: `jest.fn()`

**O que faz?**  
O `jest.fn()` cria uma função mock (simulada) para espiar a execução de funções, rastrear chamadas e seus argumentos, ou substituir a implementação de uma função durante o teste.

**Como funciona?**  
O `jest.fn()` pode ser usado de duas maneiras: como uma função simulada simples ou com uma implementação personalizada. Ele rastreia quantas vezes foi chamado, com quais argumentos e o valor de retorno.

**Cenários recomendados**  
Use `jest.fn()` para espiar funções de callback, funções que manipulam eventos, ou para substituir funções externas durante o teste.

**Prós e contras**  
- **Prós:** Permite espiar comportamentos sem alterar o código principal e rastrear chamadas e argumentos facilmente.
- **Contras:** Se usado excessivamente, pode levar a testes que dependem muito da lógica interna e não dos resultados observáveis.

**O que considerar ao escolher?**  
Use funções mock para garantir que a lógica do teste seja isolada e que os testes verifiquem os resultados esperados. Evite usar mocks para todas as dependências, pois isso pode levar a testes frágeis.

**Exemplos:**
- **Nível fácil:** Criando uma função simulada para verificar se foi chamada.
    ```javascript
    const funcaoSimulada = jest.fn();
    funcaoSimulada();
    expect(funcaoSimulada).toHaveBeenCalled();
    ```
- **Nível médio:** Verificando os argumentos passados para a função simulada.
    ```javascript
    const funcaoSimulada = jest.fn();
    funcaoSimulada('React', 2024);
    expect(funcaoSimulada).toHaveBeenCalledWith('React', 2024);
    ```
- **Nível difícil:** Substituindo uma função de módulo com uma função simulada.
    ```javascript
    jest.mock('./api', () => ({
      buscarDados: jest.fn().mockResolvedValue({ data: 'dados simulados' }),
    }));
    
    const { buscarDados } = require('./api');
    await buscarDados();
    expect(buscarDados).toHaveBeenCalled();
    ```

### 9. Testing Library: `getByRole`

**O que faz?**  
O `getByRole` é um método utilizado para buscar elementos no DOM baseado no seu papel (role), como botão, link, caixa de texto, etc. Ele facilita a busca de elementos acessíveis.

**Como funciona?**  
Esse método verifica o atributo `role` nos elementos do DOM, que indica o papel do elemento na interface. Pode-se utilizar uma combinação de nome e atributos para encontrar elementos específicos.

**Cenários recomendados**  
Use `getByRole` para buscar elementos interativos, como botões e campos de entrada, garantindo que a busca seja acessível e robusta.

**Prós e contras**  
- **Prós:** Garante testes mais acessíveis, pois foca em atributos utilizados por leitores de tela.
- **Contras:** Em casos raros, pode ser difícil encontrar um elemento se ele não tiver o papel correto.

**O que considerar ao escolher?**  
Use `getByRole` quando for importante garantir a acessibilidade dos testes, especialmente em componentes interativos.

**Exemplos:**
- **Nível fácil:** Encontrando um botão pelo nome.
    ```javascript
    render(<button>Enviar</button>);
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
    ```
- **Nível médio:** Encontrando um campo de texto com base no rótulo.
    ```javascript
    render(<input type="text" aria-label="Nome" />);
    expect(screen.getByRole('textbox', { name: 'Nome' })).toBeInTheDocument();
    ```
- **Nível difícil:** Verificando múltiplos elementos com diferentes papéis.
    ```javascript
    render(
      <>
        <button>Salvar</button>
        <button>Cancelar</button>
        <input type="checkbox" aria-label="Aceitar termos" />
      </>
    );
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeEnabled();
    expect(screen.getByRole('checkbox', { name: 'Aceitar termos' })).not.toBeChecked();
    ```

### 10. Testing Library: `queryByText`

**O que faz?**  
O `queryByText` é um método que procura um elemento no DOM baseado em seu conteúdo de texto. Se o elemento não for encontrado, retorna `null` em vez de lançar uma exceção.

**Como funciona?**  
Ao contrário de métodos como `getByText`, que lançam um erro se o elemento não for encontrado, o `queryByText` simplesmente retorna `null`. Isso é útil para verificar a ausência de elementos.

**Cenários recomendados**  
Utilize `queryByText` quando quiser verificar se um elemento não está presente no DOM ou testar componentes que mudam dinamicamente.

**Prós e contras**  
- **Prós:** Ideal para verificar a ausência de elementos sem lançar erros desnecessários.
- **Contras:** Se usado em cenários onde o elemento deve estar presente, pode ocultar falhas nos testes.

**O que considerar ao escolher?**  
Use `queryByText` para verificar se um elemento foi removido do DOM ou nunca foi adicionado.

**Exemplos:**
- **Nível fácil:** Verificando se um elemento não existe.
    ```javascript
    render(<div />);
    expect(screen.queryByText('Texto não existente')).toBeNull();
    ```
- **Nível médio:** Verificando se uma mensagem de erro desapareceu após uma ação.
    ```javascript
    render(<Formulario />);
    const botaoEnviar = screen.getByText('Enviar');
    fireEvent.click(botaoEnviar);
    expect(screen.queryByText('Erro')).not.toBeInTheDocument();
    ```
- **Nível difícil:** Testando componentes que alternam o conteúdo.
    ```javascript
    const { rerender } = render(<Componente mensagem="Carregando..." />);
    expect(screen.queryByText('Carregando...')).toBeInTheDocument();
    
    rerender(<Componente mensagem="Dados carregados" />);
    expect(screen.queryByText('Carregando...')).toBeNull();
    expect(screen.getByText('Dados carregados')).toBeInTheDocument();
    ```

### 11. Jest: `beforeEach` e `afterEach`

**O que fazem?**  
As funções `beforeEach` e `afterEach` são executadas antes e depois de cada teste, respectivamente. Elas são úteis para configurar e limpar o estado dos testes.

**Como funcionam?**  
O `beforeEach` executa uma função antes de cada teste no arquivo. Da mesma forma, o `afterEach` executa uma função após cada teste. Ambos ajudam a evitar repetição de código nos testes.

**Cenários recomendados**  
Use `beforeEach` para configurar mocks ou estados comuns a todos os testes, e `afterEach` para limpar ou redefinir configurações.

**Prós e contras**  
- **Prós:** Facilita a configuração e limpeza dos testes, melhorando a organização do código.
- **Contras:** Pode dificultar o rastreamento de configurações específicas dos testes se usado excessivamente.

**O que considerar ao escolher?**  
Utilize essas funções para configuração e limpeza comuns, mas evite adicionar complexidade excessiva que dificulte o entendimento dos testes.

**Exemplos:**
- **Nível fácil:** Configurando uma variável comum.
    ```javascript
    let contador;
    
    beforeEach(() => {
      contador = 0;
    });
    
    test('incrementa contador', () => {
      contador++;
      expect(contador).toBe(1);
    });
    
    test('decrementa contador', () => {
      contador--;
      expect(contador).toBe(-1);
    });
    ```
- **Nível médio:** Resetando um mock.
    ```javascript
    const funcaoMock = jest.fn();
    
    afterEach(() => {
      funcaoMock.mockReset();
    });
    
    test('chama a função', () => {
      funcaoMock();
      expect(funcaoMock).toHaveBeenCalledTimes(1);
    });
    
    test('a função não foi chamada', () => {
      expect(funcaoMock).not.toHaveBeenCalled();
    });
    ```
- **Nível difícil:** Configurando mocks e restaurando implementações.
    ```javascript
    jest.mock('./api', () => ({
      buscarDados: jest.fn(),
    }));
    
    const { buscarDados } = require('./api');
    
    beforeEach(() => {
      buscarDados.mockImplementation(() => Promise.resolve({ data: 'dados' }));
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    });
    
    test('busca dados corretamente', async () => {
      await buscarDados();
      expect(buscarDados).toHaveBeenCalled();
    });
    
    test('retorna os dados esperados', async () => {
      const resultado = await buscarDados();
      expect(resultado.data).toBe('dados');
    });
    ```
    Vou continuar explorando mais funcionalidades e métodos fundamentais do Jest e Testing Library para te ajudar a escrever testes unitários de alta qualidade para aplicações React, Next.js, TypeScript e MUI.

### 13. Jest: `jest.spyOn()`

**O que faz?**  
A função `jest.spyOn()` cria um espião para uma função específica de um objeto, permitindo monitorar chamadas, argumentos e valores de retorno dessa função sem substituir sua implementação original.

**Como funciona?**  
Quando você usa `jest.spyOn()`, ele intercepta a função de um objeto e permite verificar se foi chamada, com quais argumentos, e quantas vezes. Pode ser combinado com `mockImplementation` para modificar o comportamento temporariamente.

**Cenários recomendados**  
Use `jest.spyOn()` para espiar funções de bibliotecas ou métodos de objetos e classes. Isso é útil em cenários onde você não deseja substituir a função, mas quer rastrear chamadas.

**Prós e contras**  
- **Prós:** Permite monitorar funções sem modificar sua implementação. Muito útil para testar efeitos colaterais.
- **Contras:** Pode levar a testes que dependem muito de detalhes de implementação interna.

**O que considerar ao escolher?**  
Use `jest.spyOn()` quando precisar verificar a execução de métodos ou funções de terceiros ou quando estiver testando métodos de instância.

**Exemplos:**
- **Nível fácil:** Espiando uma função de um objeto.
    ```javascript
    const consoleSpy = jest.spyOn(console, 'log');
    console.log('Hello, World!');
    expect(consoleSpy).toHaveBeenCalledWith('Hello, World!');
    consoleSpy.mockRestore(); // Limpeza do espião
    ```
- **Nível médio:** Espiando um método de uma classe.
    ```javascript
    class Pessoa {
      cumprimentar() {
        return 'Olá!';
      }
    }
    const pessoa = new Pessoa();
    const cumprimentarSpy = jest.spyOn(pessoa, 'cumprimentar');
    
    pessoa.cumprimentar();
    expect(cumprimentarSpy).toHaveBeenCalled();
    cumprimentarSpy.mockRestore();
    ```
- **Nível difícil:** Espiando uma função e alterando temporariamente seu comportamento.
    ```javascript
    const moduloApi = {
      buscarDados: () => 'dados reais',
    };
    
    const spyBuscarDados = jest.spyOn(moduloApi, 'buscarDados').mockImplementation(() => 'dados simulados');
    
    expect(moduloApi.buscarDados()).toBe('dados simulados');
    
    spyBuscarDados.mockRestore(); // Restaurar a função original
    ```

### 14. Testing Library: `findBy`

**O que faz?**  
O `findBy` é utilizado para buscar elementos assíncronos no DOM, retornando uma Promise que é resolvida quando o elemento é encontrado ou rejeitada se não for encontrado após um tempo.

**Como funciona?**  
Esse método é útil quando os elementos podem não estar presentes imediatamente, como quando são carregados após uma requisição assíncrona. Ele espera que o elemento apareça dentro de um período de tempo antes de lançar uma exceção.

**Cenários recomendados**  
Use `findBy` para testar componentes que carregam dados dinamicamente ou qualquer situação onde o elemento não seja renderizado instantaneamente.

**Prós e contras**  
- **Prós:** Facilita a escrita de testes para componentes assíncronos.
- **Contras:** Pode resultar em testes mais lentos se usado indiscriminadamente para elementos que não necessitam de espera.

**O que considerar ao escolher?**  
Use `findBy` quando estiver lidando com operações assíncronas, como requisições de API, e precisa verificar a presença de elementos que serão carregados posteriormente.

**Exemplos:**
- **Nível fácil:** Buscando um elemento que aparece após uma pequena espera.
    ```javascript
    render(<CarregandoDados />);
    const elemento = await screen.findByText('Dados carregados');
    expect(elemento).toBeInTheDocument();
    ```
- **Nível médio:** Esperando que um botão fique habilitado após uma ação assíncrona.
    ```javascript
    render(<Formulario />);
    fireEvent.click(screen.getByText('Carregar dados'));
    
    const botaoEnviar = await screen.findByRole('button', { name: 'Enviar' });
    expect(botaoEnviar).toBeEnabled();
    ```
- **Nível difícil:** Verificando múltiplos elementos que são carregados dinamicamente.
    ```javascript
    render(<ListaDeItens />);
    
    const primeiroItem = await screen.findByText('Item 1');
    const segundoItem = await screen.findByText('Item 2');
    
    expect(primeiroItem).toBeInTheDocument();
    expect(segundoItem).toBeInTheDocument();
    ```

### 15. Jest: `jest.useFakeTimers` e `jest.advanceTimersByTime`

**O que fazem?**  
`jest.useFakeTimers()` substitui o temporizador real do JavaScript por um temporizador simulado, enquanto `jest.advanceTimersByTime()` avança o temporizador simulado em um período específico.

**Como funcionam?**  
Usar temporizadores falsos permite simular o avanço do tempo em testes, controlando melhor funções baseadas em tempo, como `setTimeout` e `setInterval`. Você pode avançar o tempo e verificar comportamentos que dependem de temporizadores.

**Cenários recomendados**  
Use essas funcionalidades para testar funcionalidades que dependem de atrasos ou intervalos, como animações, contagens regressivas ou carregamento de dados.

**Prós e contras**  
- **Prós:** Permite testes rápidos e precisos de funcionalidades que envolvem temporização.
- **Contras:** Pode ser complicado em testes de componentes que fazem uso intenso de temporizadores.

**O que considerar ao escolher?**  
Utilize temporizadores simulados para manter os testes rápidos e evitar esperar realmente o tempo passar.

**Exemplos:**
- **Nível fácil:** Testando uma função com `setTimeout`.
    ```javascript
    jest.useFakeTimers();
    
    const funcaoDemorada = jest.fn();
    setTimeout(funcaoDemorada, 1000);
    
    jest.advanceTimersByTime(1000);
    expect(funcaoDemorada).toHaveBeenCalled();
    
    jest.useRealTimers(); // Restaurar temporizadores reais
    ```
- **Nível médio:** Testando um componente com temporizador.
    ```javascript
    jest.useFakeTimers();
    render(<ComponenteContagem />);
    
    jest.advanceTimersByTime(5000);
    expect(screen.getByText('5 segundos')).toBeInTheDocument();
    
    jest.useRealTimers();
    ```
- **Nível difícil:** Testando várias chamadas de temporizador usando `setInterval`.
    ```javascript
    jest.useFakeTimers();
    
    const funcaoRepetida = jest.fn();
    setInterval(funcaoRepetida, 1000);
    
    jest.advanceTimersByTime(3000);
    expect(funcaoRepetida).toHaveBeenCalledTimes(3);
    
    jest.useRealTimers();
    ```

### 16. Testing Library: `fireEvent`

**O que faz?**  
O `fireEvent` simula eventos do DOM, como cliques, digitação, foco, entre outros. É utilizado para testar interações do usuário com a interface.

**Como funciona?**  
Você pode usar `fireEvent` para disparar eventos específicos em elementos, replicando ações do usuário. Pode ser combinado com verificações subsequentes para garantir que a interface responde como esperado.

**Cenários recomendados**  
Utilize `fireEvent` para testar interações do usuário, como cliques em botões, digitação em campos de entrada, ou ações de arrastar e soltar.

**Prós e contras**  
- **Prós:** Fácil de usar e flexível para testar uma ampla gama de interações.
- **Contras:** Não imita totalmente o comportamento do usuário real em alguns casos.

**O que considerar ao escolher?**  
Use `fireEvent` para testar a maioria das interações simples, mas considere usar `userEvent` para simulações mais próximas do comportamento do usuário real.

**Exemplos:**
- **Nível fácil:** Simulando um clique em um botão.
    ```javascript
    render(<Botao texto="Enviar" />);
    const botao = screen.getByText('Enviar');
    
    fireEvent.click(botao);
    expect(botao).toBeEnabled();
    ```
- **Nível médio:** Simulando digitação em um campo de entrada.
    ```javascript
    render(<input type="text" placeholder="Digite seu nome" />);
    const campoTexto = screen.getByPlaceholderText('Digite seu nome');
    
    fireEvent.change(campoTexto, { target: { value: 'Fulano' } });
    expect(campoTexto.value).toBe('Fulano');
    ```
- **Nível difícil:** Simulando eventos de foco e desfoco.
    ```javascript
    render(<input type="text" placeholder="Digite algo" />);
    const campoTexto = screen.getByPlaceholderText('Digite algo');
    
    fireEvent.focus(campoTexto);
    expect(campoTexto).toHaveFocus();
    
    fireEvent.blur(campoTexto);
    expect(campoTexto).not.toHaveFocus();
    ```
