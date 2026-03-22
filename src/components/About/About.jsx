export default function About() {
  return (
    <main className="about">
      <section className="about__hero">
        <h1 className="about__title">Sobre</h1>
        <p className="about__subtitle">
          Entre em contato conosco e veja nossa localização em Vila Velha/ES.
        </p>
      </section>

      <section className="about__content">
        <div className="about__card">
          <h2 className="about__card-title">Informações</h2>

          <div className="about__info">
            <p>
              <strong>Empresa:</strong> Pressure Vessel Solutions Ltda.
            </p>
            <p>
              <strong>Telefone:</strong> (27) 99999-9999
            </p>
            <p>
              <strong>E-mail:</strong> contato@pvsolutions.com.br
            </p>
            <p>
              <strong>Endereço:</strong> Vila Velha - ES
            </p>
            <p>
              <strong>Horário:</strong> Segunda a sexta, das 8h às 18h
            </p>
          </div>
        </div>

        <div className="about__card">
          <h2 className="about__card-title">Localização</h2>

          <div className="about__map">
            <iframe
              title="Mapa de Vila Velha ES"
              src="https://www.google.com/maps?q=Vila%20Velha%20ES&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
