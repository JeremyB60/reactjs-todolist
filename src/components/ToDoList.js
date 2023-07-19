import { useState, useEffect } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import Tache from './Tache'
import TacheForm from './TacheForm'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Banner from './Banner'

const UlStyled = styled.ul`
    text-align: center;
`
const MainStyled = styled.div`
    font-family: Exo;
    width: 330px;
    border-radius: 20px;
    border: 10px outset black;
`

const reorder = (liste, indexDebut, indexFin) => {
    const resultat = Array.from(liste);
    const [elementRetire] = resultat.splice(indexDebut, 1);
    resultat.splice(indexFin, 0, elementRetire);
    return resultat;
};

// const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
});

function ToDoList() {

    //State (état, données)

    const [taches, setTaches] = useState(() => {
        const tachesStockees = localStorage.getItem('taches');
        return tachesStockees ? JSON.parse(tachesStockees) : [];
    });
    
    useEffect(() => {
        localStorage.setItem('taches', JSON.stringify(taches));
    }, [taches]);
    
    useEffect(() => {
        const tachesStockees = JSON.parse(localStorage.getItem('taches'));
        if (tachesStockees) {
            setTaches(tachesStockees);
        }
    }, []);
    


    //Comportement

    const handleDelete = (id) => {
        //1. Copie du state
        const tachesCopie = [...taches];
        //2. Manipuler la copie
        const tachesCopieMisesAJour = tachesCopie.filter(tache => tache.id !== id);
        //3. Modifier avec le setter
        setTaches(tachesCopieMisesAJour);
    }   

    const handleAdd = (tacheAAjouter) => {
        //1. Copie du state
        const tachesCopie = [...taches]
        //2. Manipulation de la copie
        tachesCopie.push(tacheAAjouter)
        //3. Modifier le state avec le setter
        setTaches(tachesCopie)
    }

    const handleDuplicate = (id) => {
        //1. Copie du state
        const tachesCopie = [...taches]
        //2. Manipulation de la copie
        const ligneTrouvee = tachesCopie.find(element => element.id === id);
        if (ligneTrouvee) {
            const nouvelId = new Date().getTime()
            const ligneDupliquee = { ...ligneTrouvee, id: nouvelId };
            tachesCopie.push(ligneDupliquee);
        }
        //3. Modifier le state avec le setter
        setTaches(tachesCopie)
    }

    const handleRename = (idTache, nouveauNomTache) => {
        // Mettre à jour le nom de la tâche avec l'ID spécifié
        const tachesMisesAJour = taches.map((tache) => {
            if ((tache.id === idTache) && (nouveauNomTache !== "")) {
                return { ...tache, nom: nouveauNomTache };
            }
            return tache;
        });
        setTaches(tachesMisesAJour);
    }

    const handlePriorityChange = (tacheId, event) => {
        const tachesMisesAJour = taches.map(tache => {
            if (tache.id === tacheId) {
                tache.priorité = event.target.value;
            }
            return tache;
        });

        setTaches(tachesMisesAJour);
    }

    const onDragEnd = (resultat) => {
        if (!resultat.destination) {
            return;
        }
        const tachesMisesAJour = reorder(
            taches,
            resultat.source.index,
            resultat.destination.index
        );
        setTaches(tachesMisesAJour);
    };


    const longueurTableau = taches.length;

    //Affichage
    return (
        <MainStyled className='bg-secondary'>
            <Banner longueur={longueurTableau} />
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