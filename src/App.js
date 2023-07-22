import ToDoList from "./components/ToDoList";
import Intro from "./components/Intro";
import { StyleSheetManager } from 'styled-components';

function App() {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'priorite'}>
      <Intro />
      <ToDoList />
    </StyleSheetManager>
  );
}

export default App;
