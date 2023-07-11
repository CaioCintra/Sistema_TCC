import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalMatricula() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <text className="text-2xl font-bold">Matricular TCC1</text>
      <Button
        variant="contained"
        className="uppercase bg-[var(--primary-color)] hover:bg-slate-800 float-right"
        onClick={handleOpen}
      >
        Matricular
      </Button>
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
            <text className="p-3 text-2xl font-bold">Matricular Aluno</text>
            <p className="p-3 mt-8 font-bold">
              Insira os alunos para matricular
            </p>
            <Button
              variant="contained"
              className="uppercase bg-[var(--primary-color)] hover:bg-slate-800 float-right bottom-0 right-0"
              onClick={handleClose}
            >
              {" "}
              Matricular
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
