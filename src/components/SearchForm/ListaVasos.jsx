import { useEffect, useState } from "react";
import { vasosApi } from "../../utils/vesselsApi";
import Preloader from "../Preloader/Preloader";

export default function ListaVasos() {
  const [vasos, setVasos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    vasosApi
      .getVasos()
      .then((data) => {
        console.log("VASOS RECEBIDOS:", data);
        setVasos(data || []);
      })
      .catch((error) => {
        console.log("Erro ao buscar vasos:", error);
        setErrorMessage(
          "Desculpe, algo deu errado durante a solicitação. Pode haver um problema de conexão ou o servidor pode estar inativo. Por favor, tente novamente mais tarde.",
        );
        setVasos([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Deseja excluir este vaso?");

    if (!confirmed) {
      return;
    }

    try {
      await vasosApi.deleteVaso(id);

      setVasos((prevVasos) => prevVasos.filter((vaso) => vaso.id !== id));
      setSuccessMessage("Vaso excluído com sucesso.");
    } catch (error) {
      console.log("Erro ao excluir vaso:", error);
      setErrorMessage(error.message || error.msg || "Erro ao excluir vaso.");
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleVasos = vasos.slice(0, visibleCount);
  const hasMore = visibleCount < vasos.length;

  return (
    <main className="lista-vasos">
      <div className="lista-vasos__card">
        <h1 className="lista-vasos__title">Vasos cadastrados</h1>

        {successMessage && (
          <p className="lista-vasos__message">{successMessage}</p>
        )}

        {isLoading ? (
          <Preloader />
        ) : errorMessage ? (
          <p className="lista-vasos__message">{errorMessage}</p>
        ) : vasos.length === 0 ? (
          <p className="lista-vasos__message">Nada encontrado</p>
        ) : (
          <>
            <div className="lista-vasos__table-wrapper">
              <table className="lista-vasos__table">
                <thead>
                  <tr>
                    <th>Tag</th>
                    <th>Nome</th>
                    <th>Fabricante</th>
                    <th>Modelo</th>
                    <th>Nº Série</th>
                    <th>Volume</th>
                    <th>Pressão Trab.</th>
                    <th>Fluido</th>
                    <th>Localização</th>
                    <th>Próx. inspeção</th>
                    <th>Imagem</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleVasos.map((vaso) => (
                    <tr key={vaso.id}>
                      <td>{vaso.tag}</td>
                      <td>{vaso.nome}</td>
                      <td>{vaso.fabricante || "-"}</td>
                      <td>{vaso.modelo || "-"}</td>
                      <td>{vaso.numeroserie || "-"}</td>
                      <td>{vaso.volume ?? "-"}</td>
                      <td>{vaso.pressaotrabalho ?? "-"}</td>
                      <td>{vaso.fluido || "-"}</td>
                      <td>{vaso.localizacao || "-"}</td>
                      <td>{vaso.proximainspecao || "-"}</td>
                      <td>
                        {vaso.imagem ? (
                          <img
                            src={vaso.imagem}
                            alt={vaso.nome || "Imagem do vaso"}
                            className="lista-vasos__image"
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="lista-vasos__delete-button"
                          onClick={() => handleDelete(vaso.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {hasMore && (
              <div className="lista-vasos__actions">
                <button
                  type="button"
                  className="lista-vasos__more-button"
                  onClick={handleShowMore}
                >
                  Mostrar mais
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
