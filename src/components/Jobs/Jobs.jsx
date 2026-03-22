import { useEffect, useState } from "react";
import { job } from "../../utils/jobsApi";
import Preloader from "../Preloader/Preloader";
import CadastroPopup from "../../components/ModalWithForm/popupRegister";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setMessage("");

    job
      .getJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => {
        console.log(err);
        setMessage(
          "Desculpe, algo deu errado durante a solicitação. Pode haver um problema de conexão ou o servidor pode estar inativo. Por favor, tente novamente mais tarde.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleCreateJob = ({ title, description, image }) => {
    job
      .createJob({
        title,
        description,
        image,
      })
      .then((newJob) => {
        setJobs((prevJobs) => [newJob, ...prevJobs]);
        setIsPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Erro ao cadastrar vaga.");
      });
  };

  const visibleJobs = jobs.slice(0, visibleCount);
  const hasMoreJobs = visibleCount < jobs.length;

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <section className="jobs">
      <h1>Lista de vagas</h1>

      <div className="jobs__top">
        <button
          type="button"
          className="jobs__button jobs__button--create"
          onClick={() => setIsPopupOpen(true)}
        >
          Cadastrar vaga
        </button>
      </div>

      <CadastroPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onCreateJob={handleCreateJob}
      />

      {isLoading ? (
        <Preloader />
      ) : message ? (
        <p>{message}</p>
      ) : jobs.length === 0 ? (
        <p className="jobs__message">Nada encontrado</p>
      ) : (
        <>
          <div className="jobs__list">
            {visibleJobs.map((item) => (
              <article key={item.id} className="jobs__card">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <img
                  src={item.image}
                  alt={item.title}
                  className="jobs__image"
                />
              </article>
            ))}
          </div>

          {hasMoreJobs && (
            <div className="jobs__actions">
              <button
                type="button"
                className="jobs__button"
                onClick={handleShowMore}
              >
                Mostrar mais
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
