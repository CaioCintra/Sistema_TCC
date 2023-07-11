import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LabelStatus from "./LabelStatus";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

export default function LinhaAluno() {
  return (
    <div className="px-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between">
      <text>1234567</text>
      <text>João da Silva Medeiros</text>
      <LabelStatus></LabelStatus>
      <text>10/07/2023</text>
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
