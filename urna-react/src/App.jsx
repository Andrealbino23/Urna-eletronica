import { useState, useEffect, useCallback } from "react";
import Monitor from "./Componets/Monitor";
import Teclado from "./Componets/Teclado";
import Apuracao from "./Componets/Apuracao";
import { CARGOS, CANDIDATOS } from "./Data/Candidatos";
import { useSom } from "./hooks/useSom";
import "./App.css";

function votosIniciais() {
  const v = {};
  CARGOS.forEach((c) => {
    v[c.chave] = { validos: {}, brancos: 0, nulos: 0 };
  });
  return v;
}

export default function App() {
  const [cargoAtual, setCargoAtual] = useState(0);
  const [numeros, setNumeros] = useState([]);
  const [votos, setVotos] = useState(votosIniciais);
  const [finalizado, setFinalizado] = useState(false);
  const [mostrarApuracao, setMostrarApuracao] = useState(false);
  const bipe = useSom();

  const cargo = CARGOS[cargoAtual];
  const numeroStr = numeros.join("");
  const completo = numeros.length === cargo?.digitos;
  const candidato = completo ? CANDIDATOS[cargo.chave][numeroStr] : null;
  const nulo = completo && !candidato;

  const digitar = useCallback(
    (num) => {
      if (finalizado || !cargo) return;
      if (numeros.length < cargo.digitos) {
        bipe(1200, 0.05);
        setNumeros((n) => [...n, num]);
      }
    },
    [numeros, cargo, finalizado, bipe]
  );

  const corrigir = useCallback(() => {
    if (finalizado || numeros.length === 0) return;
    bipe(500, 0.1);
    setNumeros([]);
  }, [numeros, finalizado, bipe]);

  const votarBranco = useCallback(() => {
    if (finalizado) return;
    bipe(700, 0.15);
    setVotos((v) => ({
      ...v,
      [cargo.chave]: { ...v[cargo.chave], brancos: v[cargo.chave].brancos + 1 },
    }));
    avancarCargo();
  }, [cargo, finalizado, bipe]);

  const confirmar = useCallback(() => {
    if (finalizado) return;
    if (numeros.length < cargo.digitos) {
      bipe(300, 0.3);
      alert("Digite todos os números ou aperte BRANCO.");
      return;
    }

    if (candidato) {
      bipe(1000, 0.2);
      setVotos((v) => ({
        ...v,
        [cargo.chave]: {
          ...v[cargo.chave],
          validos: {
            ...v[cargo.chave].validos,
            [numeroStr]: (v[cargo.chave].validos[numeroStr] || 0) + 1,
          },
        },
      }));
    } else {
      bipe(400, 0.3);
      setVotos((v) => ({
        ...v,
        [cargo.chave]: {
          ...v[cargo.chave],
          nulos: v[cargo.chave].nulos + 1,
        },
      }));
    }

    avancarCargo();
  }, [cargo, candidato, numeroStr, numeros, finalizado, bipe]);

  const avancarCargo = () => {
    setNumeros([]);
    if (cargoAtual + 1 >= CARGOS.length) {
      setFinalizado(true);
      bipe(1500, 0.5);
      setTimeout(() => setMostrarApuracao(true), 1500);
    } else {
      setCargoAtual((c) => c + 1);
    }
  };

 
  useEffect(() => {
    const handler = (e) => {
      if (finalizado) return;
      if (/^[0-9]$/.test(e.key)) digitar(e.key);
      if (e.key === "Enter") confirmar();
      if (e.key === "Backspace") corrigir();
      if (e.key.toLowerCase() === "b") votarBranco();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [digitar, confirmar, corrigir, votarBranco, finalizado]);

  const reiniciar = () => {
    setCargoAtual(0);
    setNumeros([]);
    setVotos(votosIniciais());
    setFinalizado(false);
    setMostrarApuracao(false);
  };

  if (mostrarApuracao) {
    return (
      <div className="app">
        <Apuracao votos={votos} onReiniciar={reiniciar} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="urna">
        <Monitor
          cargo={cargo?.nome || ""}
          digitos={cargo?.digitos || 0}
          numeros={numeros}
          candidato={candidato}
          nulo={nulo}
          finalizado={finalizado}
        />
        <Teclado
          onDigito={digitar}
          onBranco={votarBranco}
          onCorrige={corrigir}
          onConfirma={confirmar}
        />
      </div>
    </div>
  );
}