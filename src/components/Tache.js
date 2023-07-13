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
    background-color: black;
    font-weight: bold;
    font-size: 10px
    `
const StyledLi = styled.li`
    background-color: ${props => (props.priority === 'faible' ? 'papayawhip' : props.priority === 'normale' ? 'orange' : 'red')};
    `

const StyledButton2 = styled.button`
    background-color: black;
    color: orange;
    `
const StyledButton3 = styled.button`
    background-color: cornsilk;
    font-weight: bold
    `

export default function Tache({ tacheInfo, onClick, onClick2, handleRename, handlePriorityChange }) {
    const [nouveauNom, setNouveauNom] = useState('');

    const handleChangeNom = (e) => {
        if (e.target.value !== '') {
            setNouveauNom(e.target.value);
        }
    };

    const handleRenameClick = () => {
        handleRename(tacheInfo.id, nouveauNom);
        setNouveauNom('');
    }

    //affichage
    return (
        <StyledLi priority={tacheInfo.priorité} className='list-group-item d-flex flex-wrap justify-content-evenly align-items-center'>{tacheInfo.nom}
            <StyledButton onClick={onClick} title='Supprimer la tâche'>&#10060;</StyledButton>
            <StyledButton2 onClick={onClick2} title='Dupliquer la tâche'>&#x29C9;</StyledButton2>
            <div className='flex-nowrap p-2'>
                <input
                    className='text-center'
                    type="text"
                    value={nouveauNom}
                    placeholder='Renommer la tâche'
                    onChange={handleChangeNom} />
                <StyledButton3 onClick={handleRenameClick} title='Renommer la tâche'>&#10003;</StyledButton3>
            </div>
            <div>
                <label htmlFor="priority">Priorité :&nbsp;</label>
                <select
                    className='text-center'
                    value={tacheInfo.priorité}
                    onChange={event => handlePriorityChange(tacheInfo.id, event)}>
                    <option value="faible">Faible</option>
                    <option value="normale">Normale</option>
                    <option value="importante">Importante</option>
                </select>
            </div>
        </StyledLi>
    )
}