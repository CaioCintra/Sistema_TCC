import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: 390,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function ModalEmail(props: any) {
  const email = props.email;
  const [data, setData] = useState(null);
  const [selectedTexto, setSelectedTexto] = useState(null);

  const [content, setContent] = useState({
    assunto: "",
    corpo: "",
  });

  function trocarTemplate(e) {
    const textoSelecionado = data.find(
      (texto) => texto.nome === e.target.value
    );

    setContent({
      assunto: textoSelecionado.assunto,
      corpo: textoSelecionado.conteudo,
    });
    setSelectedTexto(textoSelecionado);
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
      assunto: "",
      corpo: "",
    });
  };

  async function enviarEmail() {
    try {
      const response = await fetch(
        `http://localhost:3333/email/${email}/${selectedTexto.nome}/${selectedTexto.conteudo}`,
        {
          method: "POST",
          body: JSON.stringify(content),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    setOpen(false);
    resetarValores();
  }

  return (
    <div>
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
          <text className="mt-3 mb-3 text-2xl font-bold">
              Enviar email para {props.nome}
            </text>
            <label className="block text-gray-700 font-medium mt-3 mb-2">
              Selecione o motivo do email
            </label>
            <select
              id="assunto"
              name="assunto"
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
              required
            />
            <Button
              type="submit"
              variant="contained"
              className="mt-3 uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right bottom-0 right-0"
              onClick={() => enviarEmail()}
            >
              Enviar Email
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
