import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import { useState } from 'react'


const StyledButton = styled.button`
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    font-size: 12px;
    color: orange;
    font-family: var(--bs-body-font-family);

    &:hover {
        background-color : white;
        color: black;
        font-weight: bold;
    `

const StyledLi = styled.li`
    background-color: ${props => (props.priority === 'faible' ? 'papayawhip' : props.priority === 'normale' ? 'orange' : 'red')};
    color: black
    `
const StyledButton3 = styled.button`
    background-color: cornsilk;
    font-weight: bold;

    &:hover {
        background-color: pink
    }
    `
const StyledSelect = styled.select`
    background-color: #00000000;
    border: 0;
`

export default function Tache({ tacheInfo, onClick, onClick2, handleRename, handlePriorityChange }) {
    const [nouveauNom, setNouveauNom] = useState('');
    const [estVisible, setEstVisible] = useState(false);

    const handleChangeNom = (e) => {
        if (e.target.value !== null) {
            setNouveauNom(e.target.value);
        }
    };

    const handleRenameClick = () => {
        handleRename(tacheInfo.id, nouveauNom);
        setNouveauNom('');
        if (nouveauNom !== '') {
            setEstVisible(false)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleRename(tacheInfo.id, nouveauNom);
            setNouveauNom('');
            if (nouveauNom !== '') {
                setEstVisible(false)
            }
        }
    }

    //affichage
    return (
        <StyledLi priority={tacheInfo.priorité} className='list-group-item d-flex flex-wrap gap-1 justify-content-evenly align-items-center flex-column'>{tacheInfo.nom}
            <div className='d-flex flex-row-reverse gap-1'>
                <StyledButton onClick={onClick} title='Supprimer la tâche'>&#10060;</StyledButton>
                <StyledButton onClick={onClick2} title='Dupliquer la tâche'>&#x29C9;</StyledButton>
                <StyledButton onClick={() => setEstVisible(!estVisible)} title='Renommer la tâche'>{((!estVisible) ? <span dangerouslySetInnerHTML={{__html: '&#x270F;'}}></span> : <span dangerouslySetInnerHTML={{__html: '&#9650;'}}></span>)}</StyledButton>
                <div>
                    <label htmlFor={tacheInfo.id+"priority"}>Priorité :&nbsp;</label>
                    <StyledSelect
                        id={tacheInfo.id+"priority"}
                        className='text-center'
                        value={tacheInfo.priorité}
                        onChange={event => handlePriorityChange(tacheInfo.id, event)}>
                        <option value="faible">Faible</option>
                        <option value="normale">Normale</option>
                        <option value="importante">Importante</option>
                    </StyledSelect>
                </div>
            </div>
            {estVisible && <div>
                <div className='flex-nowrap p-2'>
                    <input
                        id={tacheInfo.id+1}
                        autoFocus
                        className='text-center'
                        type="text"
                        // value={nouveauNom}
                        placeholder='Renommer la tâche'
                        onChange={handleChangeNom}
                        onKeyDown={handleKeyDown} />
                    <StyledButton3 onClick={handleRenameClick} title='Valider'>&#10003;</StyledButton3>
                </div>
            </div>
            }

        </StyledLi>
    )
}