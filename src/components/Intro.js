import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components';

const StyledIntro = styled.p`
padding: 20px 5px;
text-align: center;
font-family: 'Exo';
`;

export default function Intro() {
    //Affichage
    return (
        <StyledIntro>
            <b>Premier mini-projet en ReactJS</b><br />
            Ajouter, Renommer, Dupliquer et Supprimer<br />
            Priorité avec changement du background<br />
            Drag N Drop - react-beautiful-dnd<br />
            Bootstrap, jQuery, CSS - styled-components<br />
            Données en localstorage.
        </StyledIntro>
    );
}