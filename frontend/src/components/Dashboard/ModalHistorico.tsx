import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HistoryIcon from "@mui/icons-material/History";
import LabelStatus from "../LabelStatus";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  overflowY: "auto",
};

export default function ModalHistorico(props: any) {
  const [data, setData] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3333/historico/${props.ra}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formatarData = (data: any) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    };
    const formatoBrasileiro = new Intl.DateTimeFormat("pt-BR", options);
    const dataFormatada = formatoBrasileiro.format(new Date(data));
    return dataFormatada;
  };

  return (
    <div>
      <Tooltip title="Ver histórico">
        <IconButton>
          <HistoryIcon onClick={handleOpen} />
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <text className="text-2xl font-bold">
              Histórico de {props.nome}
            </text>
            <div className="mt-5">
              {data ? (
                data.map((aluno: any) => (
                  <div
                    className="px-6 mb-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between"
                    key={aluno.id}
                  >
                    <text className="w-1/8">
                      {formatarData(aluno.timestamp)}
                    </text>
                    <LabelStatus
                      className="w-1/4"
                      status={aluno.status_processo}
                    ></LabelStatus>
                    <div />
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
