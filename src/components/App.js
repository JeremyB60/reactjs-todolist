import Banner from "./Banner"
import ToDoList from "./ToDoList";
import { StyleSheetManager } from 'styled-components';

function App() {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'priority'}>
      <ToDoList />
    </StyleSheetManager>
  );
}

export default App;
