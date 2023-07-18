import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import '../assets/css/style.css'

const StyledBanner = styled.div`
padding: 20px 5px;
text-align: center;
font-family: 'Exo';
`;

const StyledText = styled.p`
  color: orange;
`;

function Banner({ longueur }) {

  return <StyledBanner className='bg-dark text-light d-flex justify-content-center flex-column align-items-center'>
    <h1 className='fs-4 pt-2 m-1'>Liste de tâches à&nbsp;réaliser&nbsp;({longueur})</h1>
    <StyledText className='m-0'>Premier mini-projet Reactjs</StyledText>
  </StyledBanner>
}

export default Banner