import { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

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
const StyledButton2 = styled.button`
background-color: black;
color: orange
`

const StyledLi = styled.li`
    background-color: orange;
    font-weight: bold
`


function ToDoList() {
    //State (état, données)
    const [taches, setTaches] = useState([
        { id: 1, nom: "Envoyer un mail" },
        { id: 2, nom: "Faire un projet reactjs" },
        { id: 3, nom: "Apprendre Laravel" }
    ]);

    const [nouvelleTache, setNouvelleTache] = useState("")

    //Comportement
    const handleDelete = (id) => {
        //1. Creer une copie du state
        const tachesCopy = [...taches]

        //2. Manipuler la copie
        const tachesCopyUpdated = tachesCopy.filter(tache => tache.id !== id)

        //3. Modifier avec le setter
        setTaches(tachesCopyUpdated)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //1. Copie du state
        const tachesCopy = [...taches]

        //2. Manipulation de la copie
        const id = new Date().getTime()
        const nom = nouvelleTache
        const tacheAAjouter = ({ id, nom })
        tachesCopy.push(tacheAAjouter)

        //3. Modifier le state avec le setter
        setTaches(tachesCopy)
        setNouvelleTache("")
    }

    const handleChange = (event) => {
        setNouvelleTache(event.target.value)
    }

    //Affichage
    return (
        <main className='bg-light'>
            <h1 className='text-center'>Liste de choses à faire</h1>
            <form action="submit" onSubmit={handleSubmit}  className='text-center mb-3'>
                <input className='text-center'
                    value={nouvelleTache}
                    type='text'
                    placeholder='Ajouter une tâche'
                    onChange={handleChange} />
                <StyledButton2>Ajouter</StyledButton2>
            </form>
            <ol className='list-group list-group-numbered'>
                {taches.map((tache) => (
                    <StyledLi className='list-group-item d-flex justify-content-between align-items-start' key={tache.id}>{tache.nom} <StyledButton onClick={() => handleDelete(tache.id)}>X</StyledButton></StyledLi>
                ))}
            </ol>
        </main>
    )
}

export default ToDoList

//Gestion du formulaire
//1.Creation du formulaire
//2.soumission du formulaire (onSubmit / handleSubmit)
//3.collecte des données du formulaire (onChange / handleChange)