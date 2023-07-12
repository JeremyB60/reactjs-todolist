import { useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Tache from './Tache'
import TacheForm from './TacheForm'


function ToDoList() {
    //State (état, données)
    const [taches, setTaches] = useState([
        { id: 1, nom: "Envoyer un mail", priorité: "faible" },
        { id: 2, nom: "Faire un projet reactjs", priorité: "importante" },
        { id: 3, nom: "Apprendre Laravel", priorité: "normale" }
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
    };

    const handlePriorityChange = (tacheId, event) => {
        const updatedtaches = taches.map(tache => {
            if (tache.id === tacheId) {
                tache.priorité = event.target.value;
            }
            return tache;
        });

        setTaches(updatedtaches);
    };
    console.log(taches)

    //Affichage
    return (
        <main className='bg-light pt-3'>
            <TacheForm handleAdd={handleAdd} />
            <ol className='list-group list-group-numbered'>
                {taches.map((tache) => (
                    <Tache
                        tacheInfo={tache}
                        onClick={() => handleDelete(tache.id)}
                        onClick2={() => handleDuplicate(tache.id)}
                        handleRename={handleRename}
                        handlePriorityChange={handlePriorityChange}
                        key={tache.id} />
                ))}
            </ol>
        </main>
    )
}

export default ToDoList