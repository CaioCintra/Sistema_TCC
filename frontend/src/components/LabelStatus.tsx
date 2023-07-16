import Chip from "@mui/material/Chip";

export default function LabelStatus(props: any) {
    switch (props.status) {
        case ('Matriculado TCC1'):
            return (<Chip label="Matriculado TCC1" className="bg-[#f5dd7a] font-extrabold" />)
        case ('Orientador Definido'):
            return (<Chip label="Orientador Definido" className="bg-[#927bd8] text-white font-extrabold " />)
        case ('Matriculado TCC1'):
            return (<Chip label="Matriculado TCC1" className="bg-[#FBCA04] font-extrabold " />)
        case ('Matriculado TCC1'):
            return (<Chip label="Matriculado TCC1" className="bg-[#FBCA04] font-extrabold " />)
    }
}