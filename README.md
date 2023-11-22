# Sistema_TCC

## Executar

Garanta que em seu sistema estejam instalados o Node e o npm.

Em seguida, tanto na pasta raíz do projeto quanto nas pastas backend e frontend insira o comando:
```console
npm install
```
## Executar back e front simultaneamente

Para executar o projeto como um todo, vá até a pasta raiz do projeto e digite o comando:
```console
npm start
```

## Executar separadamente

### Backend (Servidor)

Vá até a pasta raiz do projeto e digite o comando:
```console
cd Backend/
npm run dev
```

### Frontend (Telas)

Vá até a pasta raiz do projeto e digite o comando:
```console
cd frontend/
npm run dev
```

## Acessar
Quando o sistema estiver executando acesse em seu navegador o endereço para acessar o sistema, o padrão é http://localhost:3000

# Fluxo

O sistema gerencia o fluxo de um aluno pelos TCCs, conforme ele avança ele troca seu *status*, dentro do sistema existem o *status* "Matriculado", "Orientador Definido", "Banca Agendada", "Banca Confirmada", e após defender seu trabalho ele recebe o *status* de "Aprovado" ou "Reprovado", reiniciando este fluxo no TCC2. Estes *status* sempre aparecem nas instâncias de aluno presentes nas telas.

# Telas

O sistema contém as telas Matrícula, Orientador, Banca e Defesa nas partes de TCC1 e TCC2, além delas existem as páginas de Admin e de Dashboard

### Matricula 

A tela de matrícula mostra todos os alunos recém matriculados em TCC, ou seja que ainda não foram atribuídos a um orientador, existindo botões para cadastrar novos alunos. Cada botão deste cadastra de uma maneira diferente, um deles é individual, ao clicar abre um modal que basta preencher um formulário sobre o aluno e confirmar os dados. O outro botão faz isso de uma forma mais eficiente caso seja necessário cadastrar mais de um aluno, ele recebe um arquivo equivalente a um .csv que contenha as informações necessárias, dividindo os campos por vírgula e as instâncias por quebra de linha, após isso apenas confirmar.
Cada instância de aluno também contém um botão para editar e outro para remover o cadastro do sistema.

### Orientador

Na aba "Orientador" aparecem alunos com *status* de matriculado e alunos com Orientador Definido, esta é a tela onde ele pode ser definido, cada aluno contém um botão onde o próprio administrador do sistema pode atribuir um aluno a seu orientador e coorientador se houver, mas também existe um botão de envio de email, para se comunicar de qualquer forma com o aluno, além disso o email pode gerar um link para que o aluno acesse um formulário e ele mesmo preencha suas informações, este link é autenticado com as informações do aluno onde ele só pode acessar esta tela com o link, ja que ele possui um token que irá identificar o RA do aluno para fazer as consultas e cadastros, além deste botão de envio de email existe um em lote que enviará o email para todos os alunos que estão sem orientador.

### Banca

Esta tela é dividida em duas partes. Ficarão todas as instâncias de alunos que possuem um orientador mas ainda não agendaram a sua banca na parte superior, nestes pode ser feito o agendamento das bancas pelo professor administrador, abrindo o modal pelo botão e preenchendo o formulário, mas também existe a opção de mandar o email com o link autenticado, assim como na tela de orientador.
Na parte inferior da tela ficarão os alunos que já agendaram a banca e estão esperando a confirmação e os que têm a banca já confirmada também. Aqui podem ser editadas as bancas, assim como caso já esteja tudo resolvido e possível confirmá-la para atualizar o *status* do aluno, já que ele só pode defender seu TCC se sua banca for confirmada.

### Defesa

A defesa é a etapa final dos TCCs após o aluno apresentar seu TCC e realizar sua defesa, e nesta tela que será registrado seus resultados, na tela aparecerão todos alunos com a banca confirmada com um botão que abre um modal para poder registrar sua nota e uma possível observação, caso o aluno tenha a nota igual ou superior a 6 ele troca seu *status* para "Aprovado", caso contrario ele é reprovado. Nesta tela também é possível gerar todos os documentos de declaração de presença na banca e de orientação que serão atribuídos aos professores participantes.

### Admin

A tela de Admin é onde é feita a configuração geral de cadastros, nela o usuário tem acesso para ser redirecionado para tela de cadastrar e editar professores, e uma para cadastrar e editar textos, tanto de padrões de email quanto de documentos.
No caso de professores cadastrados com o departamento diferente de DACOM eles não podem ser usados para orientar um aluno, apenas participar de banca, considerando que este é um sistema desenvolvido pensando no curso de Bacharelado em Ciência da Computação.

### Dashboard

A tela de Dashboard é uma parte estatística, nela existem dados que fazem contagens para acompanhar alunos, assim como a aba de histórico, nela aparecem todos alunos do período e ao clicar em um deles é possível ver todas as trocas de *status* que ele teve, assim como o dia que isso aconteceu.

# Workspaces

Os workspaces representam um período onde são realizados os TCCs, é cadastrado o ano e a etapa do ano (ex: 2023/2) e quando um novo é criado, o anterior fica indisponível para alteração, porém ainda pode ser visualizado, ao alterar o período no canto superior esquerdo da tela, o administrador pode alternar entre o período atual e os anteriores e fazer comparações entre os alunos de cada um. Ao lado da seleção de período é possível abrir um modal que possibilitará finalizar o período atual ou criar um novo, o que tam bém irá finalizar o anterior e deixar o atual como ativo, assim ele é adicionado na caixa de seleção do componente, começando um novo período.

