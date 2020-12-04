import 'firebase/firestore';
//import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBjVe9zaDd0HFY0W9cFmLveiiNUgBMSAeg",
    authDomain: "project-react-aad27.firebaseapp.com",
    databaseURL: "https://project-react-aad27.firebaseio.com",
    projectId: "project-react-aad27",
    storageBucket: "project-react-aad27.appspot.com",
    messagingSenderId: "131550011353",
    appId: "1:131550011353:web:169fc92a662b8cb6ec83c8"
};

const fire = firebase.initializeApp(firebaseConfig)

export const firebaseService = {
    fire: fire,
    auth: fire.auth,
    firestore: fire.firestore,
    userID: fire.auth().currentUser?.uid,
    addNewCompany: async function (nameOfCompany: string | undefined) {
        if (fire.auth().currentUser?.uid === undefined)
            return alert('Error.You need to register')
        if (!nameOfCompany)
            alert('Сompany name cannot be an empty string!!!')
        else if (!isNaN(+nameOfCompany))
            alert('Сompany name cannot be an number\'s string!!!')
        else if (true) {
            console.log('_-_-', nameOfCompany, fire.auth().currentUser?.uid)
            const findCompanyForName = await fire.firestore().collection('Company').where('name', '==', nameOfCompany).get();

            fire.firestore().collection('User').doc(fire.auth().currentUser?.uid).get()
                .then(doc => {
                    if (doc.exists) {
                        let listCompany = doc.data()?.idCompany
                        if (findCompanyForName.empty) {
                            const newCompany = fire.firestore().collection('Company').doc()
                            const newCompanyID = newCompany.id;

                            fire.firestore().collection('User').doc(fire.auth().currentUser?.uid).update({
                                idCompany: [...listCompany, newCompanyID]
                            })
                                .then(resp => console.log('it\'s okay', resp))
                                .catch(error => console.log(new Error(error)))

                            newCompany.set({
                                name: nameOfCompany,
                                risks: {},
                            })
                                .then(resp => console.log('it\'s okay', resp))
                                .catch(error => console.log(new Error(error)))


                            alert("You added yourself a company")
                        }
                        else {
                            alert("This company already exists")
                        }
                    }
                    else {
                        alert('Error. Doc not exists.')
                    }
                })
        }
    },
    addNewRisk: async function (nameOfCompanyForAddRisk: string | undefined, nameOfRisk: string | undefined, valueOfRisk: string | undefined) {
        if (fire.auth().currentUser?.uid === undefined)
            return alert('Error.You need to register')
        const objForName = await this.firestore().collection('Company').where('name', '==', nameOfCompanyForAddRisk).get();

        if (objForName.empty) {
            alert(`company named ${nameOfCompanyForAddRisk} does not exist`)
        }
        else {
            fire.firestore().collection('User').doc(fire.auth().currentUser?.uid).get()
                .then(doc => {
                    if (doc.exists) {
                        let listIdCompany = doc.data()?.idCompany

                        let risksObj: object = {}
                        let companyID: string = ''
                        objForName.forEach(doc => {
                            risksObj = doc.data()?.risks
                            companyID = doc.id
                        });

                        if (listIdCompany.includes(companyID)) {
                            if (nameOfRisk && isNaN(+nameOfRisk)) {
                                fire.firestore().collection('Company').doc(companyID).update({ risks: { ...risksObj, [nameOfRisk]: [valueOfRisk] } })
                                    .then(resp => console.log('it\'s okay', resp))
                                    .catch(error => console.log(new Error(error)))
                                alert(`You added a new risk ${nameOfRisk}`)
                                console.log(risksObj);
                            }
                            else {
                                alert(`Invalid value of name risk ${nameOfRisk}`)
                            }
                        }
                        else {
                            alert('This is not your company, you cannot add your risk to it')
                        }
                    }
                })
        }
    },
    logIn: function (email: string, pass: string) {
        console.log(email, pass)
        this.fire.auth().signInWithEmailAndPassword(email, pass)
            .then(resp => {
                console.log(resp.user?.uid)
                return alert(`You sign in with ${email}`)
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found')
                    return alert('USER NOT FOUND!!! GO TO REGISTRATION')
                else
                    if (error.code === 'auth/wrong-password')
                        return alert('WRONG PASSWORD!!! TRY AGAIN!!!')
                return console.log(error)
            })
        console.log(email, pass)
    },
    register: function (email: string, pass: string) {
        console.log('1')
        fire.auth().createUserWithEmailAndPassword(email, pass)
            .then(resp => {
                console.log('2')
                console.log(resp.user)
                fire.firestore().collection('User').doc(resp.user?.uid).set({
                    email: email,
                    password: pass,
                    idCompany: [],
                })
                    .then(resp => alert(`created account ${email}`))
                    .catch(error => {
                        console.log('4')
                        if (error.code === "auth/invalid-email")
                            return alert(error.message)
                    })
            })
            .catch(error => {
                console.log('5', error.message)
            })
    },

};