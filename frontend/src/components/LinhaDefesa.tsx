import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LabelStatus from "./LabelStatus";
import EditIcon from "@mui/icons-material/Edit";
import FeedIcon from '@mui/icons-material/Feed';

export default function LinhaDefesa(props: any) {
  return (
    <div className="px-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between">
      <text>João da Silva Medeiros</text>
      <text>João da Silva Medeiros</text>
      <LabelStatus status={props.status}></LabelStatus>
      <text>10/07/2023</text>
      <text>9,0</text>
      <text>Bom trabalho</text>
      <div>
      <Tooltip title="Declarações">
          <IconButton>
            <FeedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
