import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import { useState } from 'react'


const StyledButton = styled.button`
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 2px;
    background-color: orange;
    font-weight: bold;
    font-size: 15px
    `
const StyledLi = styled.li`
    background-color: orange;
    `

const StyledButton2 = styled.button`
    background-color: black;
    color: orange;
    `

export default function Tache({ tacheInfo, onClick, onClick2, handleRename }) {
    const [nouveauNom, setNouveauNom] = useState('');

    const handleChangeNom = (e) => {
        setNouveauNom(e.target.value);
    };

    const handleRenameClick = () => {
        handleRename(tacheInfo.id, nouveauNom);
        setNouveauNom('');
    }

    //affichage
    return (
        <StyledLi className='list-group-item d-flex flex-wrap justify-content-center gap-3 align-items-start'>{tacheInfo.nom}
            <StyledButton onClick={onClick}>X</StyledButton>
            <StyledButton2 onClick={onClick2}>Dupliquer</StyledButton2>
            <input
                className='text-center'
                type="text"
                value={nouveauNom}
                placeholder='Renommer la tâche'
                onChange={handleChangeNom} />
            <StyledButton2
                onClick={handleRenameClick}>Renommer</StyledButton2>
        </StyledLi>
    )
}