import "./Main.css";
import vesselImage from "../../images/pressure-vessel.png";

export default function Main() {
  return (
    <main className="main">
      <section className="main__hero">
        <div className="main__content">
          <p className="main__eyebrow">Sistema Industrial</p>
          <h1 className="main__title">
            Bem-vindo ao aplicativo de registro de vasos de pressão
          </h1>
          <p className="main__subtitle">
            Este sistema foi desenvolvido para auxiliar no cadastro, controle e
            acompanhamento de vasos de pressão, reunindo informações técnicas,
            dados operacionais, documentos e histórico de inspeções em um único
            ambiente.
          </p>
          <p className="main__text">
            A plataforma permite uma visualização mais organizada dos ativos da
            empresa, contribuindo para a rastreabilidade das informações e para
            o acompanhamento do status de conformidade dos equipamentos.
          </p>
        </div>

        <div className="main__image-box">
          <img
            src={vesselImage}
            alt="Vaso de pressão industrial"
            className="main__image"
          />
        </div>
      </section>

      <section className="main__section">
        <h2 className="main__section-title">Dados da empresa</h2>

        <div className="main__cards">
          <div className="main__card">
            <h3>Empresa</h3>
            <p>Pressure Vessel Solutions Ltda.</p>
          </div>

          <div className="main__card">
            <h3>CNPJ</h3>
            <p>00.000.000/0001-00</p>
          </div>

          <div className="main__card">
            <h3>Segmento</h3>
            <p>Inspeção, manutenção e gestão de equipamentos industriais</p>
          </div>

          <div className="main__card">
            <h3>Endereço</h3>
            <p>Av. Industrial, 1500 - Vila Velha - ES</p>
          </div>

          <div className="main__card">
            <h3>Responsável técnico</h3>
            <p>Eng. Mecânico João da Silva - CREA 0000000000</p>
          </div>

          <div className="main__card">
            <h3>Contato</h3>
            <p>(27) 99999-9999 | contato@pvsolutions.com.br</p>
          </div>
        </div>
      </section>

      <section className="main__section">
        <h2 className="main__section-title">Sobre o sistema</h2>

        <div className="main__info-box">
          <p>
            O aplicativo de registro de vasos de pressão foi pensado para
            centralizar informações importantes sobre os equipamentos da
            empresa, facilitando o acompanhamento técnico e administrativo.
          </p>
          <p>
            Entre os dados que podem ser organizados no sistema estão a
            identificação dos vasos, fabricante, volume, pressão de operação,
            localização, documentação técnica, relatórios de inspeção e status
            de conformidade.
          </p>
          <p>
            Com isso, a empresa passa a contar com uma ferramenta mais prática
            para consulta de informações, padronização de registros e apoio ao
            controle interno dos equipamentos industriais.
          </p>
        </div>
      </section>
    </main>
  );
}
