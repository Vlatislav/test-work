import { useState } from "react"
import { firebaseService } from '../../../services/firebase'

export default function CreateRisk(): JSX.Element {
    const [nameOfRisk, setNameOfRisk] = useState('')
    const [valueOfRisk, setValueOfRisk] = useState('Minimum')
    const [nameOfCompanyForAddRisk, setNameOfCompanyForAddRisk] = useState('')

    const handleChangeNameOfRisk = (event: React.FormEvent<HTMLInputElement>): void => setNameOfRisk(event.currentTarget.value)

    const handleChangeValueOfRisk = (event: React.ChangeEvent<HTMLSelectElement>) => setValueOfRisk(event.currentTarget.value)

    const handleChangeNameOfCompanyForAddRisk = (event: React.FormEvent<HTMLInputElement>): void => setNameOfCompanyForAddRisk(event.currentTarget.value)

    const createNewRisk = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        firebaseService.addNewRisk(nameOfCompanyForAddRisk, nameOfRisk, valueOfRisk)
    }

    return (
        <div id="addRisk" >
            <div><h1>New risk create</h1></div>
            <input placeholder="name of company" id="companyNameForAddRisk" onChange={handleChangeNameOfCompanyForAddRisk}></input>
            <input placeholder="name of risk" id="riskName" onChange={handleChangeNameOfRisk}></input>
            <select id="select" onChange={handleChangeValueOfRisk}>
                <option>Minimum</option>
                <option>Middle</option>
                <option>High</option>
            </select>
            <button onClick={createNewRisk}>Add new Risk</button>
        </div>
    )
}