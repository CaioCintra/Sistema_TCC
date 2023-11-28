import { Box, Fade, IconButton, Modal, Tooltip } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import FeedIcon from "@mui/icons-material/Feed";
import { useState, useEffect } from "react";
import * as React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados da API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return null;
  }
}

async function nomeProfessor(id: number) {
  return fetchData(`http://localhost:3333/professores/${id}`)
    .then((data) => (data ? data.nome : ""))
    .catch(() => "");
}

export default function ModalDeclaracoes(props: any) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState("");
  const [data2, setData2] = useState("");
  const [banca, setBanca] = useState([]);
  const [copied, setCopied] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchDataAndPopulateState = async () => {
      const orientadorData = await fetchData(
        `http://localhost:3333/professores/${props.orientador}`
      );
      if (orientadorData) {
        setData(orientadorData.nome);
      }

      if (props.coorientador !== 0) {
        const coorientadorData = await fetchData(
          `http://localhost:3333/professores/${props.coorientador}`
        );
        if (coorientadorData) {
          setData2(coorientadorData.nome);
        }
      }

      const bancaData = await fetchData(
        `http://localhost:3333/bancas_professores/${props.idBanca}`
      );
      if (bancaData) {
        setBanca(bancaData);
      }
    };

    fetchDataAndPopulateState();
    extrairHoraEDia(props.data);
  }, [props.data, props.orientador, props.coorientador, props.idBanca]);

  async function getBancaNames() {
    const namesPromises = banca.map(
      async (bancaInstance: any, index: number) => {
        const professorName = await nomeProfessor(bancaInstance.professor);
        return `${
          index > 0 && index === banca.length - 1 ? " e " : ", "
        }${professorName}`;
      }
    );

    const names = await Promise.all(namesPromises);
    return names.join("");
  }

  function extrairHoraEDia(datetimeString: any) {
    const dataHora = new Date(datetimeString);

    const horaMinuto =
      ("0" + dataHora.getHours()).slice(-2) +
      ":" +
      ("0" + dataHora.getMinutes()).slice(-2);

    const dataFormatada =
      ("0" + dataHora.getDate()).slice(-2) +
      "/" +
      ("0" + (dataHora.getMonth() + 1)).slice(-2) +
      "/" +
      dataHora.getFullYear();

    setTime(horaMinuto);
    setDate(dataFormatada);
  }

  const handleCopyClick = async () => {
    try {
      const textToCopy = `Às ${time} do dia ${date} foi realizada na sala ${
        props.local
      } da UTFPR-CM a sessão pública da defesa do Trabalho de Conclusão do Curso de Bacharelado em Ciência da Computação do(a) acadêmico(a) ${
        props.nome
      } com o título ${
        props.titulo
      }. Estavam presentes, além do(a) acadêmico(a), os membros da banca examinadora composta por: ${data} (orientador(a))${
        props.coorientador !== 0
          ? `, ${data2 ? data2 : ""} (co-orientador(a))`
          : ""
      }${
        banca.length > 0 && ` ${await getBancaNames()}`
      } . Inicialmente, o(a) acadêmico(a) fez a apresentação do seu trabalho, sendo, em seguida, arguido(a) pela banca examinadora. Após as arguições, sem a presença do(a) acadêmico(a), a banca examinadora o(a) considerou ______________ na disciplina de Trabalho de Conclusão de Curso ${
        props.etapa === "TCC1" ? "1" : "2"
      } e atribuiu, em consenso, a nota _______ (_________________). Esse resultado foi comunicado ao (à) acadêmico(a) e aos presentes na sessão pública e, posteriormente, deverá ser registrado no sistema acadêmico pelo professor responsável de TCC. Em seguida foi encerrada a sessão e, para constar, foi lavrada a presente Ata que segue assinada pelos membros da banca examinadora, após lida e considerada conforme.`;

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
    } catch (error) {
      console.error("Erro ao copiar para a área de transferência:", error);
    }
  };

  const handleCopyClickOrientacao = async (orientador: string) => {
    try {
      const textToCopy = `Eu, ${orientador}, na condição de orientador(a) do Trabalho de Conclusão de Curso intitulado ${props.titulo}, realizado pelo acadêmico ${props.nome}, gostaria de lhe informar que o referido trabalho foi corrigido e está de acordo com as considerações contidas na ata de defesa.`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
    } catch (error) {
      console.error("Erro ao copiar para a área de transferência:", error);
    }
  };

  return (
    <>
      <Tooltip title="Declarações">
        <IconButton onClick={handleOpen}>
          <FeedIcon />
        </IconButton>
      </Tooltip>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <text className="mt-3 mb-7 text-2xl font-bold">Declarações</text>
            <div className="px-4 bg-[var(--secondary-color)] mt-3 h-16 flex items-center mb-2">
              <p className="w-56">{props.nome}</p>
              <p className="w-56 font-bold">Ata de defesa de TCC</p>
              <Tooltip title="Copiar texto">
                <IconButton onClick={handleCopyClick}>
                  <FeedIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4 bg-[var(--secondary-color)] mt-3 h-16 flex items-center mb-2">
              <p className="w-56">{data}</p>
              <p className="w-56 font-bold">Declaração de orientação</p>
              <Tooltip title="Copiar texto">
                <IconButton onClick={() => handleCopyClickOrientacao(data)}>
                  <FeedIcon />
                </IconButton>
              </Tooltip>
            </div>
            {props.coorientador !== 0 ? (
              <div className="px-4 bg-[var(--secondary-color)] mt-3 h-16 flex items-center mb-2">
                <p className="w-56">{data2}</p>
                <p className="w-56 font-bold">Declaração de orientação</p>
                <Tooltip title="Copiar texto">
                  <IconButton onClick={() => handleCopyClickOrientacao(data2)}>
                    <FeedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <></>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
