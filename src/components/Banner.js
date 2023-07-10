import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const StyledBanner = styled.div`
height: 150px;
`;

const StyledText = styled.p`
  color: orange;
`;


function Banner() {
    return <StyledBanner className='bg-dark text-light d-flex justify-content-center flex-column align-items-center'>
        <h1>To do list by Jeremy</h1>
        <StyledText>Premier mini-projet Reactjs</StyledText>
    </StyledBanner>
}

export default Banner