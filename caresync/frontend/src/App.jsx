import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboards";
import Pacientes from "./pages/Pacientes";
import Medicamentos from "./pages/Medicamentos";
import Tarefas from "./pages/Tarefas";
import Perfil from "./pages/Perfil";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/pacientes"
          element={<Pacientes />}
        />

        <Route
          path="/medicamentos"
          element={<Medicamentos />}
        />

        <Route
          path="/tarefas"
          element={<Tarefas />}
        />

        <Route
          path="/perfil"
          element={<Perfil />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;