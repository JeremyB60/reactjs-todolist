import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'

    const StyledButton = styled.button`
    border-radius: 50%;
    width: 25px;
    height: 25px;
    padding: 0; 
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: orange;
    font-weight: bold
    `
    const StyledLi = styled.li`
    background-color: orange;
    font-weight: bold
    `

export default function Tache({tacheInfo, onTacheDelete}) {
    //etat

    //comportement

    //affichage
    return (
        <StyledLi className='list-group-item d-flex justify-content-between align-items-start'>{tacheInfo.nom}
            <StyledButton onClick={() => onTacheDelete(tacheInfo.id)}>X</StyledButton>
        </StyledLi>
    )
}