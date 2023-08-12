import { Button } from "@mui/material";
import { Logout } from "../config/firebase";

const Dashboard = () => {
    
    const onLogout =()=>{
        try {
            Logout()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <h1>Dashboard</h1>
        <hr />
        <h3>
            (Ruta Protegida)
        </h3>
        <Button variant="contained" onClick={onLogout} >
            Salir
        </Button>
        </>
    );
};

export default Dashboard;
