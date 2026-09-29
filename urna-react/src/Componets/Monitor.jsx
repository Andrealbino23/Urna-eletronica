export default function Monitor({
  cargo,
  digitos,
  numeros,
  candidato,
  nulo,
  finalizado,
}) {
  return (
    <div className="monitor">
      <div className="tela">
        {finalizado ? (
          <div className="fim">
            <h1>FIM</h1>
            <p>Obrigado por votar!</p>
          </div>
        ) : (
          <>
            <div className="cabecalho">
              <span>SEU VOTO PARA</span>
              <span id="cargo">{cargo}</span>
            </div>

            <div className="conteudo">
              <div className="numeros">
                <span className="label">Número:</span>
                <div className="display-numeros">
                  {Array.from({ length: digitos }).map((_, i) => (
                    <div
                      key={i}
                      className={`digito ${numeros[i] ? "" : "vazio"}`}
                    >
                      {numeros[i] || ""}
                    </div>
                  ))}
                </div>
              </div>

              <div className="info-candidato">
                {nulo ? (
                  <p style={{ color: "red", fontWeight: "bold", fontSize: 20 }}>
                    VOTO NULO
                  </p>
                ) : candidato ? (
                  <>
                    <p className="nome">{candidato.nome}</p>
                    <p className="partido">{candidato.partido}</p>

                    {}
                    {candidato.vice && candidato.vice.trim() !== "" && (
                      <p className="suplentes">Vice: {candidato.vice}</p>
                    )}

                    {}
                    {candidato.suplentes && (
                      <p className="suplentes">
                        1º Suplente: {candidato.suplentes[0]}
                        <br />
                        2º Suplente: {candidato.suplentes[1]}
                      </p>
                    )}

                    {}
                    {candidato.foto ? (
                      <img src={candidato.foto} alt={candidato.nome} />
                    ) : (
                      <div className="avatar-vazio">
                        <span>👤</span>
                        <p>Sem foto</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p>Digite o número do candidato</p>
                )}
              </div>
            </div>

            <div className="rodape">
              Aperte a tecla:
              <br />
              VERDE para CONFIRMAR
              <br />
              LARANJA para REINICIAR
            </div>
          </>
        )}
      </div>
    </div>
  );
}