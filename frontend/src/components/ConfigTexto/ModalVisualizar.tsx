import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function ModalCadastrarTexto(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Visualizar">
        <IconButton>
          <VisibilityIcon onClick={handleOpen} />
        </IconButton>
      </Tooltip>
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
          <Box sx={style} className="h-auto max-h-[80%]">
            <text className="mt-3 mb-3 text-2xl font-bold">{props.nome} - {props.tipo}</text>
            <p className="mt-5 mb-5">{props.conteudo}</p>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
