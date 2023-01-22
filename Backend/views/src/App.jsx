import { useState } from "react"
import Axios from "axios"
import './index.css'


function App() {
  const [userName, setUsername] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="flex">
      <h1>Register</h1>
      <form className="flex">
        <label htmlFor="firstname">Firstname</label><input type="text" onChange={ (e) => setFirstname(e.target.value)} />
        <label htmlFor="lastname">Email</label><input type="text" onChange={ (e) => setLastName(e.target.value)} />
        <label htmlFor="username">Username</label><input type="text" onChange={ (e) => setUsername(e.target.value)} />
        <label htmlFor="email">Email</label><input type="text" onChange={ (e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label><input type="password" onChange={e => setPassword(e.target.value)} />
        <button onClick={() => Axios.post('http://localhost:3200/register', { firstname: firstname, lastname: lastname, userName: userName, email: email, pw: password}).then((response) => {
      console.log(response);
    })}>submit</button>
      </form>
    </div>
  )
}

export default App
