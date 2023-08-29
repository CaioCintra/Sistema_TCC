import MatricularTCC from "./Matricula/MatricularTCC"
import DefinirOrientador from "./Orientador/DefinirOrientador"

export default function PageSelect(props: any) {
    switch (props.pagina) {
        case ('MatricularTCC1'):
            return (<MatricularTCC/>);
        case ('DefinirOrientadorTCC1'):
            return (<DefinirOrientador/>);
    }
}