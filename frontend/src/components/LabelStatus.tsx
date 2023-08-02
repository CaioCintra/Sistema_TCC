import Chip from "@mui/material/Chip";

export default function LabelStatus(props: any) {
    switch (props.status) {
        case ('Matriculado TCC1'):
            return (<Chip label="Matriculado TCC1" className="bg-[#f5dd7a] font-extrabold" />)
        case ('Orientador Definido'):
            return (<Chip label="Orientador Definido" className="bg-[#927bd8] text-white font-extrabold " />)
        case ('Banca TCC1 Agendada'):
            return (<Chip label="Banca TCC1 Agendada" className="bg-[#78b5f7] text-white font-extrabold " />)
        case ('Banca TCC1 Confirmada'):
            return (<Chip label="Banca TCC1 Confirmada" className="bg-[#f7a578] text-white font-extrabold " />)
        case ('Aprovado TCC1'):
            return (<Chip label="Aprovado TCC1" className="bg-[#7fbd83] text-white font-extrabold " />)
        case ('Reprovado TCC1'):
            return (<Chip label="Reprovado TCC1" className="bg-[#ef7b78] text-white font-extrabold " />)
    }
}