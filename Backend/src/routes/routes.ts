import { rotasAlunos } from "./alunos";
import { rotasProfessores } from "./professores";
import { rotasTextos } from "./textos";
import { rotasPeriodos } from "./periodos";
import { rotasLogin } from "./login";
import { rotasAlunoAuth } from "./alunoAuth";
import { rotasBanca } from "./banca";
import { rotasEmail } from "./email";
import { rotasWorkspace } from "./workspace";
import { rotasTCC } from "./TCC";
import { rotasBancaProfessor } from "./bancaProfessor";

export const registerRoutes = (app: any) => {
  app.register(rotasAlunos);
  app.register(rotasProfessores);
  app.register(rotasTextos);
  app.register(rotasPeriodos);
  app.register(rotasLogin);
  app.register(rotasAlunoAuth);
  app.register(rotasBanca);
  app.register(rotasEmail);
  app.register(rotasWorkspace);
  app.register(rotasTCC);
  app.register(rotasBancaProfessor);
};
