import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { Alert, AlertTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: 520,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function ModalEmail(props: any) {
  const ra = props.ra;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [content, setContent] = useState({
    template: "",
    assunto: "",
    corpo: "",
  });

  function trocarTemplate(e) {
    const textoSelecionado = data.find(
      (texto) => texto.nome === e.target.value
    );

    setContent({
      template: textoSelecionado.assunto,
      assunto: e.target.value,
      corpo: textoSelecionado.conteudo,
    });
    onChangeInput;
  }

  const onChangeInput = (e: any) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/textos");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const resetarValores = () => {
    setContent({
      template: "",
      assunto: "",
      corpo: "",
    });
  };

  const enviarEmail = async () => {
    console.log(content.corpo);
    if (content.corpo === "") {
      setError("Corpo de email vazio");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3333/email", {
        ra: props.ra,
        nome: props.nome,
        email: props.email,
        assunto: content.assunto,
        corpo: content.corpo,
      });

      if (response.status === 200) {
        setSuccess("Email enviado com sucesso");
      } else {
        throw new Error(`Erro ao enviar email: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setError("Erro ao enviar o email");
    }

    setOpen(false);
    resetarValores();
  };

  return (
    <div>
      {error && (
        <Alert
          className="z-50 absolute bottom-2 right-0"
          severity="error"
          variant="filled"
          action={
            <Button color="inherit" size="small" onClick={() => setError(null)}>
              <CloseIcon />
            </Button>
          }
          onClose={() => setError(null)}
        >
          <AlertTitle className="font-bold">Erro</AlertTitle>
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          className="z-50 absolute bottom-2 right-0"
          severity="success"
          variant="filled"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setSuccess(null)}
            >
              <CloseIcon />
            </Button>
          }
          onClose={() => setSuccess(null)}
        >
          <AlertTitle className="font-bold">Concluído</AlertTitle>
          {success}
        </Alert>
      )}
      <Tooltip title="Email">
        <IconButton>
          <MailOutlinedIcon onClick={handleOpen} />
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
          <Box sx={style}>
            <form onSubmit={() => enviarEmail()}>
              <text className="mt-3 mb-3 text-2xl font-bold">
                Enviar email para {props.nome}
              </text>
              <label className="block text-gray-700 font-medium mt-3 mb-2">
                Selecione o motivo do email
              </label>
              <select
                id="template"
                name="template"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                onChange={trocarTemplate}
                value={content.assunto}
                required
              >
                <option value="">Selecione o assunto</option>
                {data ? (
                  data.map((texto: any) => (
                    <option key={texto.nome} value={texto.nome}>
                      {texto.nome}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
              <label className="block text-gray-700 font-medium mt-3 mb-2">
                Edite o assunto do email se necessário
              </label>
              <input
                type="text"
                id="assunto"
                name="assunto"
                placeholder={content.assunto}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                onChange={onChangeInput}
                value={content.assunto}
              />
              <label className="block text-gray-700 font-medium mt-5 mb-2">
                Edite o corpo do email se necessário
              </label>
              <textarea
                id="corpo"
                name="corpo"
                rows="5"
                placeholder={content.corpo}
                className="w-full h-1/3 resize-none  border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                onChange={onChangeInput}
                value={content.corpo}
              />
              <Button
                type="submit"
                variant="contained"
                className="mt-3 uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right bottom-0 right-0"
              >
                Enviar Email
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
