import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import '../assets/css/style.css'

const StyledBanner = styled.div`
padding: 20px 5px;
text-align: center;
font-family: 'Exo';
`;

const StyledSpan = styled.span`
color: orange
`

function Banner({ longueur }) {

  return <StyledBanner className='bg-dark text-light d-flex justify-content-center flex-column align-items-center'>
    <h1 className='fs-4'>Liste de tâches à&nbsp;réaliser&nbsp;(<StyledSpan>{longueur}</StyledSpan>)</h1>
  </StyledBanner>
}

export default Banner