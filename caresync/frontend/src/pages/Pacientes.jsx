import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./Pacientes.css";

function Pacientes() {

  // =========================
  // STATES
  // =========================
  const [pacientes, setPacientes] = useState([]);

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [observacoes, setObservacoes] = useState("");

  // =========================
  // TOKEN
  // =========================
  const token = localStorage.getItem("token");

  // =========================
  // BUSCAR PACIENTES
  // =========================
  const buscarPacientes = async () => {

    try {

      const response = await fetch(
        "http://localhost:3000/pacientes",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      setPacientes(data);

    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // CRIAR PACIENTE
  // =========================
  const criarPaciente = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:3000/pacientes",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            nome,
            data_nascimento: dataNascimento,
            observacoes
          })
        }
      );

      if (response.ok) {

        alert("Paciente cadastrado!");

        setNome("");
        setDataNascimento("");
        setObservacoes("");

        buscarPacientes();

      } else {

        alert("Erro ao cadastrar paciente");
      }

    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // CARREGAR AO ABRIR
  // =========================
  useEffect(() => {
    buscarPacientes();
  }, []);

  return (

      <Layout>

    <div className="pacientes-container">

      <div className="pacientes-card">

        <h2>Pacientes</h2>

        {/* FORMULÁRIO */}
        <form
          onSubmit={criarPaciente}
          className="paciente-form"
        >

          <input
            type="text"
            placeholder="Nome do paciente"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
          />

          <input
            type="date"
            value={dataNascimento}
            onChange={(e) =>
              setDataNascimento(e.target.value)
            }
          />

          <textarea
            placeholder="Observações"
            value={observacoes}
            onChange={(e) =>
              setObservacoes(e.target.value)
            }
          />

          <button type="submit">
            Cadastrar Paciente
          </button>

        </form>

        {/* LISTA */}
        <div className="lista-pacientes">

          {pacientes.map((paciente) => (

            <div
              key={paciente.id}
              className="paciente-item"
            >

              <h3>
                {paciente.nome}
              </h3>

              <p>
                <strong>Nascimento:</strong>{" "}
                {paciente.data_nascimento}
              </p>

              <p>
                <strong>Observações:</strong>{" "}
                {paciente.observacoes}
              </p>

            </div>

          ))}

        </div>

      </div>

      </div>

  </Layout>

  );
}

export default Pacientes;