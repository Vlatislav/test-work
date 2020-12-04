import React from 'react'
import './company.css'
import CreateCompany from './createCompany/CreateCompany'
import CreateRisk from './createRisk/CreateRisk'

export default function Company(): JSX.Element {
    return (
        <form>
            <CreateCompany />
            <CreateRisk />
        </form>
    )
}

