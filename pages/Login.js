import { View, Text, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { postUser } from '../api/loginApi'

const Login = ({navigation}) => {

    const [nombre, setNombre] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const [mail, setMail] = useState('')
    const [peso, setPeso] = useState(0)
    const [sangre, setSangre] = useState('')

    const [error, setError] = useState(false)

    const handleLogin = async() => {

        if (nombre.trim().length > 0 && contrasenia.trim().length > 0 && mail.trim().length > 0 && peso > 0 && sangre.trim().length > 0) {
            setError(false)
            const resp = await postUser(nombre, contrasenia, mail, peso, sangre)
            
            if(resp.data) {
                setNombre('')
                setContrasenia('')
                setMail('')
                setPeso('')
                setSangre('')
                navigation.navigate('Home', {
                    name: nombre
                })
            } else {
                setError('El usuario no se pudo subir')
            }
        } else {
            setError('Rellene todos los datos')
        }
    }


    return (
        <View style={{padding: 10}}>
            <Text style={{fontWeight: 'bold', textAlign: 'center', paddingTop:120, fontSize: 20}}>Bienvenido a Glume</Text>

            {
                error && <Text style={{marginVertical: 10, color: 'red'}}>{error}</Text>
            }

            <Text style={{ paddingBottom:10, paddingTop:10}} >Nombre</Text>
            <TextInput placeholder="Juan Glume" style={{backgroundColor: 'white', borderRadius: 10, color: 'black',  width: 395, height: 25, paddingLeft: 20, fontWeight: '600', elevation: 2}} onChangeText={(value) => setNombre(value)} value={nombre}/>
            
            <Text style={{ paddingBottom:10, paddingTop:10}}>Contraseña</Text>
            <TextInput placeholder="Password" style={{backgroundColor: 'white', color: 'black', borderRadius: 10, width: 395, height: 25, paddingLeft: 20, fontWeight: '600', elevation: 2}} onChangeText={(value) => setContrasenia(value)}  value={contrasenia}/>

            <Text style={{ paddingBottom:10, paddingTop:10}}>Email</Text>
            <TextInput placeholder="glume@gmail.com" style={{backgroundColor: 'white', color: 'black', borderRadius: 10,  width: 395, height: 25,paddingLeft: 20, fontWeight: '600', elevation: 2}} onChangeText={(value) => setMail(value)} value={mail}/>

            <Text style={{ paddingBottom:10, paddingTop:5}}>Peso (Kg)</Text>
            <TextInput placeholder="55kg" style={{backgroundColor: 'white',  color: 'black', borderRadius: 10,  width: 395, height: 25, paddingLeft: 20, fontWeight: '600', elevation: 2}} onChangeText={(value) => setPeso(Number(value))} keyboardType="number-pad" value={peso}/>

            <Text style={{ paddingBottom:10, paddingTop:10}}>Tipo de Sangre</Text>
            <TextInput placeholder="A+" style={{backgroundColor: 'white',  color: 'black',  borderRadius: 10,  width: 395, height: 25, paddingLeft: 20, fontWeight: '600', elevation: 2}} onChangeText={(value) => setSangre(value)} value={sangre}/>

            <TouchableOpacity onPress={handleLogin} style={{backgroundColor: 'green', padding: 15, width: '40%', marginHorizontal: 120, marginTop: 20, borderRadius: 30}}><Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Ingresar</Text></TouchableOpacity>

            
        </View>
    )
}

export default Login