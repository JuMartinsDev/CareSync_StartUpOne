import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="sidebar">

      <h2 className="logo">
        HumanaCare
      </h2>

      <nav className="menu">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/pacientes">
          Pacientes
        </Link>

        <Link to="/medicamentos">
          Medicamentos
        </Link>

        <Link to="/tarefas">
          Tarefas
        </Link>

        <Link to="/perfil">
          Perfil
        </Link>

      </nav>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Sair
      </button>

    </div>

  );
}

export default Sidebar;