import { useState, useEffect } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import Tache from './Tache'
import TacheForm from './TacheForm'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const UlStyled = styled.ul`
    text-align: center;
`
const MainStyled = styled.div`
    font-family: Exo;
    width: 330px;
    border-radius: 0 0 20px 20px;
    border: 10px outset black;
    border-top: 0;
`

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
});

function ToDoList() {

    //State (état, données)

    const [taches, setTaches] = useState(() => {
        const storedTaches = localStorage.getItem('taches');
        return storedTaches ? JSON.parse(storedTaches) : [];
    });

    useEffect(() => {
        localStorage.setItem('taches', JSON.stringify(taches));
    }, [taches]);

    useEffect(() => {
        const storedTaches = JSON.parse(localStorage.getItem('taches'));
        if (storedTaches) {
            setTaches(storedTaches);
        }
    }, []);


    //Comportement
    const handleDelete = (id) => {
        //1. Creer une copie du state
        const tachesCopy = [...taches]

        //2. Manipuler la copie
        const tachesCopyUpdated = tachesCopy.filter(tache => tache.id !== id)

        //3. Modifier avec le setter
        setTaches(tachesCopyUpdated)
    }

    const handleAdd = (tacheAAjouter) => {
        //1. Copie du state
        const tachesCopy = [...taches]

        //2. Manipulation de la copie
        // tachesCopy.push({ ...tacheAAjouter, priorité: "normale" });
        tachesCopy.push(tacheAAjouter)
        //3. Modifier le state avec le setter
        setTaches(tachesCopy)
    }

    const handleDuplicate = (id) => {
        //1. Copie du state
        const tachesCopy = [...taches]

        //2. Manipulation de la copie
        const ligneTrouvee = tachesCopy.find(element => element.id === id);

        if (ligneTrouvee) {
            const nouvelId = new Date().getTime()
            const ligneDupliquee = { ...ligneTrouvee, id: nouvelId };
            tachesCopy.push(ligneDupliquee);
        }

        //3. Modifier le state avec le setter
        setTaches(tachesCopy)

    }

    const handleRename = (taskId, newTaskName) => {
        // Mettre à jour le nom de la tâche avec l'ID spécifié
        const updatedTasks = taches.map((tache) => {
            if ((tache.id === taskId) && (newTaskName !== "")) {
                return { ...tache, nom: newTaskName };
            }
            return tache;
        });
        setTaches(updatedTasks);
    }

    const handlePriorityChange = (tacheId, event) => {
        const updatedtaches = taches.map(tache => {
            if (tache.id === tacheId) {
                tache.priorité = event.target.value;
            }
            return tache;
        });

        setTaches(updatedtaches);
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const updatedTaches = reorder(
            taches,
            result.source.index,
            result.destination.index
        );
        setTaches(updatedTaches);
    };

    //Affichage
    return (
        <MainStyled className='bg-secondary pt-3'>
            <TacheForm handleAdd={handleAdd} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <UlStyled
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            className='list-group m-auto'
                        >
                            {taches.map((tache, index) => (
                                <Draggable key={tache.id} draggableId={tache.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {<Tache
                                                tacheInfo={tache}
                                                onClick={() => handleDelete(tache.id)}
                                                onClick2={() => handleDuplicate(tache.id)}
                                                handleRename={handleRename}
                                                handlePriorityChange={handlePriorityChange}
                                            />}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </UlStyled>
                    )}
                </Droppable>
            </DragDropContext>
        </MainStyled>
    );
}


export default ToDoList