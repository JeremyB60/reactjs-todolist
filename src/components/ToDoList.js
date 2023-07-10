import { useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Tache from './Tache'
import TacheForm from './TacheForm'

function ToDoList() {
    //State (état, données)
    const [taches, setTaches] = useState([
        { id: 1, nom: "Envoyer un mail" },
        { id: 2, nom: "Faire un projet reactjs" },
        { id: 3, nom: "Apprendre Laravel" }
    ]);

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
        tachesCopy.push(tacheAAjouter)

        //3. Modifier le state avec le setter
        setTaches(tachesCopy)

    }

    //Affichage
    return (
        <main className='bg-light'>
            <h1 className='text-center'>Liste de choses à faire</h1>
            <TacheForm handleAdd={handleAdd} />
            <ol className='list-group list-group-numbered'>
                {taches.map((tache) => (
                    <Tache tacheInfo={tache} onTacheDelete={handleDelete} key={tache.id}/>
                ))}
            </ol>
        </main>
    )
}

export default ToDoList