//import { firestore,auth } from "../index"
//import {useState} from 'react'


export default function ChoiceCompany(): JSX.Element {


    //const handleHange = (event:any) =>{
    //    console.log(event.target.value)
    //}
    //const [STR,setStr] = useState('')
    //const arrayCompanyName: any[] = []
    //let listIdCompany
    //let userID : string | undefined = auth.currentUser?.uid
    //console.log('asds',userID)
    //firestore.collection('User').doc(userID).get()
    //.then(doc =>{
    //    if(doc.exists){
    //        listIdCompany = doc.data()?.idCompany
    //        console.log('LIC',listIdCompany)
    //        listIdCompany.forEach((item:string)=>{
    //            firestore.collection('Company').doc(item).get()
    //            .then(doc =>{
    //                if(doc.exists)
    //                    arrayCompanyName.push(doc.data()?.name)
    //                    setStr(STR+`${doc.data()?.name}`)
    //            })
    //            .catch(error => console.log(error))
    //        })
    //    }
    //})
    //.catch(error => console.log(error))
    //let str = ''
    //arrayCompanyName.forEach((item,index)=>{
    //    str+=`${item}`
    //})
    //console.log('12345',arrayCompanyName)

    return (
        <div>
            {//<h1 dangerouslySetInnerHTML={{__html: ''}} ></h1>
            }
            <select id="select">

            </select>
        </div>
    )
}