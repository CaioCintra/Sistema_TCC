import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Alert, AlertTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function InfoTexto(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex items-center">
      <label className="block text-gray-700 font-medium mb-2">Conteúdo</label>
      <div className="ml-auto">
        <IconButton aria-label="delete" size="small" onClick={handleOpen}>
          <InfoIcon fontSize="inherit" />
        </IconButton>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          handleClose();
        }}
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
            <text className="mt-3 mb-3 text-2xl font-bold">
              Variáveis de texto
            </text>
            <p className="mt-5 mb-5 font-bold">
              Abaixo cada variável e seu respectivo valor, para usá-las
              coloque-as entre tags &lt;&gt;
            </p>
            <p className="mt-5 mb-5 font-semibold">
              &lt;aluno&gt;: Nome do Aluno.
            </p>
            <p className="mt-5 mb-5 font-semibold">
              &lt;linkOrientador&gt;: Link para cadastrar orientador.
            </p>
            <p className="mt-5 mb-5 font-semibold">
              &lt;linkBanca&gt;: Link para cadastrar banca.
            </p>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
