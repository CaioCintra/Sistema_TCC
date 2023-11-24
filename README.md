# Sistema_TCC

Este sistema tem como objetivo facilitar o trabalho do Professor responsável pelas atividades de TCC, fornecendo interfaces que farão o que ele já costumava fazer de uma forma mais simples e automática.

O sistema será estruturado em frontend e backend, o frontend sendo a camada de
aplicação, onde ficarão as telas, o produto que irá comunicar-se diretamente com o usuário,
enquanto o backend fará a parte funcional do sistema, ele irá manipular o banco de dados e
enviar todas as informações necessárias para o frontend.

Clique abaixo para ver mais sobre cada uma:

[Backend](Backend/README.md)

[Frontend](frontend/README.md)

# Introdução

Este sistema foi criado para auxiliar no processo do Trabalho de Conclusão de Curso (TCC) no Bacharelado em Ciência da Computação da Universidade Tecnológica Federal do Paraná (UTFPR). O TCC é dividido em duas disciplinas, TCC1 e TCC2, abrangendo etapas como submissão de proposta, avaliação do projeto e defesa. O Professor Responsável pelas Atividades do TCC (PRATCC) monitora o progresso dos alunos, intervindo quando necessário para garantir o cumprimento de prazos. Diante das complexidades de gerenciamento, o objetivo deste projeto foi desenvolver um sistema para auxiliar o PRATCC nesse processo, abrangendo desde o acompanhamento do aluno até a gestão da burocracia associada ao TCC. O presente manual fornece uma visão abrangente do sistema desenvolvido para facilitar a administração eficiente do TCC ao longo das disciplinas de TCC1 e TCC2.

# Fluxo

O sistema gerencia o fluxo de um aluno pelos TCCs; conforme ele avança, ele altera seu *status*. Dentro do sistema existem os *status* "Matriculado", "Orientador Definido", "Banca Agendada", "Banca Confirmada", e após defender seu trabalho ele recebe o *status* de "Aprovado" ou "Reprovado", reiniciando assim o fluxo no TCC2. Esses *status* sempre aparecem nas instâncias de aluno presentes nas telas.

