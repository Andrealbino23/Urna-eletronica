import { CARGOS, CANDIDATOS } from "../Data/Candidatos";

export default function Apuracao({ votos, onReiniciar }) {
  return (
    <div className="apuracao">
      <h1>📊 Resultado da Apuração</h1>

      {CARGOS.map((cargo) => {
        const v = votos[cargo.chave];
        const total =
          Object.values(v.validos).reduce((a, b) => a + b, 0) +
          v.brancos +
          v.nulos;

        return (
          <div key={cargo.chave} style={{ marginBottom: 30 }}>
            <h3>{cargo.nome}</h3>
            <table>
              <thead>
                <tr>
                  <th>Candidato</th>
                  <th>Partido</th>
                  <th>Número</th>
                  <th>Votos</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(v.validos).map(([num, qtd]) => {
                  const c = CANDIDATOS[cargo.chave][num];
                  const pct = total ? ((qtd / total) * 100).toFixed(1) : "0.0";
                  return (
                    <tr key={num}>
                      <td>{c ? c.nome : "—"}</td>
                      <td>{c ? c.partido : "—"}</td>
                      <td>{num}</td>
                      <td>{qtd}</td>
                      <td>{pct}%</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={3}>
                    <i>Brancos</i>
                  </td>
                  <td>{v.brancos}</td>
                  <td>
                    {total ? ((v.brancos / total) * 100).toFixed(1) : "0.0"}%
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <i>Nulos</i>
                  </td>
                  <td>{v.nulos}</td>
                  <td>
                    {total ? ((v.nulos / total) * 100).toFixed(1) : "0.0"}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}

      <button onClick={onReiniciar}>Nova votação</button>
    </div>
  );
}