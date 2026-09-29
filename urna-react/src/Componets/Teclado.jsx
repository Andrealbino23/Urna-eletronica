export default function Teclado({
  onDigito,
  onBranco,
  onCorrige,
  onConfirma,
}) {
  return (
    <div className="teclado">
      <div className="teclas-numericas">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
          <button
            key={n}
            className="tecla"
            onClick={() => onDigito(String(n))}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="teclas-acoes">
        <button className="tecla acao branco" onClick={onBranco}>
          BRANCO
        </button>
        <button className="tecla acao corrige" onClick={onCorrige}>
          CORRIGE
        </button>
        <button className="tecla acao confirma" onClick={onConfirma}>
          CONFIRMA
        </button>
      </div>
    </div>
  );
}