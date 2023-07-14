import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import '../assets/css/style.css'

const StyledBanner = styled.div`
height: 150px;
width: 330px;
margin: auto;
text-align: center;
font-family: 'Exo';
`;

const StyledText = styled.p`
  color: orange;
`;


function Banner() {
  return <StyledBanner className='bg-dark text-light d-flex justify-content-center flex-column align-items-center'>
    <h1>Liste de tâches à&nbsp;réaliser</h1>
    <StyledText>Premier mini-projet Reactjs</StyledText>
  </StyledBanner>
}

export default Banner