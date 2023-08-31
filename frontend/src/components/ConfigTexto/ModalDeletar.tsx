import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function ModalMatricula(props: any) {
  const deletarTexto = async (e: any) => {
    try {
      await fetch(`http://localhost:3333/textos/${props.texto}`, {
        method: "DELETE",
      });
      handleClose()
      location.reload()
    } catch (err) {
      console.log("Erro ao remover texto");
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Remover">
        <IconButton>
          <RemoveCircleOutlineIcon onClick={handleOpen} />
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
            <p className="m-4 font-extrabold text-5xl text-center">Atenção</p>
            <p className="m-7 text-xl text-center">
              Este texto está prestes a ser excluído, deseja continuar e
              removê-lo?
            </p>
            <div className="flex justify-around">
              <Button
                variant="contained"
                className="p-3 w-2/5 uppercase bg-[var(--primary-color)] hover:bg-slate-900"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                className="p-3 w-2/5 uppercase bg-[var(--alert-color)] hover:bg-red-500"
                onClick={deletarTexto}
              >
                Remover texto
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
