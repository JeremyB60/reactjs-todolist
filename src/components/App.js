import ToDoList from "./ToDoList";
import { StyleSheetManager } from 'styled-components';

function App() {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'priorite'}>
      <ToDoList />
    </StyleSheetManager>
  );
}

export default App;
