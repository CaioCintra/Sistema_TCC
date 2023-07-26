import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LabelStatus from "./LabelStatus";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";

export default function LinhaBancaConfirmada() {
  return (
    <div className="px-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between">
      <text>João da Silva Medeiros</text>
      <text>João da Silva Medeiros</text>
      <LabelStatus status="Banca TCC1 Confirmada"></LabelStatus>
      <text>10/07/2023</text>
      <text>10h</text>
      <text>E103</text>
      <text className="bold">Mais Informações</text>
      <div>
        <Tooltip title="Editar">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remover">
          <IconButton>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
