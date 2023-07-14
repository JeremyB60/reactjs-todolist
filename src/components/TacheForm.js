import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import { useState } from 'react'

const StyledButton2 = styled.button`
    background-color: black;
    color: orange;

&:hover {
    color: black;
    background-color: orange;
}
`
export default function TacheForm({ handleAdd }) {
    //state
    const [nouvelleTache, setNouvelleTache] = useState("")

    //comportement
    const handleSubmit = (event) => {
        event.preventDefault();
        const id = new Date().getTime()
        const nom = nouvelleTache
        const tacheAAjouter = ({ id: id, nom: nom, priorité: "normale" })
        if (nom !== '') {
            handleAdd(tacheAAjouter)
            setNouvelleTache("")
        }
    }

    const handleChange = (event) => {
        setNouvelleTache(event.target.value)
    }

    //affichage
    return (
        <form action="submit" onSubmit={handleSubmit} className='text-center mb-3'>
            <input
                id='ajouterTache'
                className='text-center'
                value={nouvelleTache}
                type='text'
                placeholder='Ajouter une tâche'
                onChange={handleChange} />
            <StyledButton2 title='Ajouter une tâche'>Ajouter</StyledButton2>
        </form>
    )
}

//Gestion du formulaire
//1.Creation du formulaire
//2.soumission du formulaire (onSubmit / handleSubmit)
//3.collecte des données du formulaire (onChange / handleChange)