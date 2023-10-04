import { rotasAlunos } from "./alunos";
import { rotasProfessores } from "./professores";
import { rotasTextos } from "./textos";
import { rotasPeriodos } from "./periodos";
import { rotasLogin } from "./login";
import { rotasAlunoAuth } from "./alunoAuth";
import { rotasBanca } from "./banca";

export const registerRoutes = (app: any) => {
  app.register(rotasAlunos);
  app.register(rotasProfessores);
  app.register(rotasTextos);
  app.register(rotasPeriodos);
  app.register(rotasLogin);
  app.register(rotasAlunoAuth);
  app.register(rotasBanca);
};
