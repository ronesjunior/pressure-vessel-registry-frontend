import { useEffect, useState } from "react";
import { vasosApi } from "../../utils/vesselsApi";
import { uploadVesselImage } from "../../utils/storage";
import folderIcon from "../../images/foto.png";

export default function Cadastro() {
  const initialFormData = {
    tag: "",
    nome: "",
    fabricante: "",
    modelo: "",
    numeroserie: "",
    volume: "",
    pressaotrabalho: "",
    pressaoprojeto: "",
    temperaturaprojeto: "",
    fluido: "",
    material: "",
    anofabricacao: "",
    localizacao: "",
    datainspecao: "",
    proximainspecao: "",
    imagem: null,
    observacoes: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] || null : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    if (!formData.imagem || typeof formData.imagem === "string") {
      setPreview("");
      return;
    }

    const imageUrl = URL.createObjectURL(formData.imagem);
    setPreview(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [formData.imagem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const uploadPromise =
      formData.imagem instanceof File
        ? uploadVesselImage(formData.imagem)
        : Promise.resolve("");

    uploadPromise
      .then((imagemUrl) => {
        const payload = {
          ...formData,
          imagem: imagemUrl,
        };

        return vasosApi.createVaso(payload);
      })
      .then((result) => {
        console.log("Dados do vaso salvos:", result);
        setMessage("Cadastro salvo com sucesso.");
        setFormData(initialFormData);
        setPreview("");
      })
      .catch((error) => {
        console.log("Erro completo:", error);
        setMessage(error.message || error.msg || "Erro ao salvar cadastro.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <main className="cadastro">
      <div className="cadastro__card">
        <h1 className="cadastro__title">Cadastro de Vaso de Pressão</h1>
        <p className="cadastro__subtitle">
          Preencha os dados técnicos e administrativos do equipamento.
        </p>

        <form className="cadastro__form" onSubmit={handleSubmit}>
          <div className="cadastro__grid">
            <div className="cadastro__field">
              <label htmlFor="tag">Tag</label>
              <input
                id="tag"
                name="tag"
                type="text"
                value={formData.tag}
                onChange={handleChange}
                placeholder="Ex.: VP-001"
                required
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="nome">Nome do equipamento</label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex.: Vaso separador"
                required
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="fabricante">Fabricante</label>
              <input
                id="fabricante"
                name="fabricante"
                type="text"
                value={formData.fabricante}
                onChange={handleChange}
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="modelo">Modelo</label>
              <input
                id="modelo"
                name="modelo"
                type="text"
                value={formData.modelo}
                onChange={handleChange}
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="numeroserie">Número de série</label>
              <input
                id="numeroserie"
                name="numeroserie"
                type="text"
                value={formData.numeroserie}
                onChange={handleChange}
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="anofabricacao">Ano de fabricação</label>
              <input
                id="anofabricacao"
                name="anofabricacao"
                type="number"
                value={formData.anofabricacao}
                onChange={handleChange}
                placeholder="Ex.: 2022"
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="volume">Volume (L)</label>
              <input
                id="volume"
                name="volume"
                type="number"
                value={formData.volume}
                onChange={handleChange}
                placeholder="Ex.: 500"
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="pressaotrabalho">Pressão de trabalho (bar)</label>
              <input
                id="pressaotrabalho"
                name="pressaotrabalho"
                type="number"
                step="0.01"
                value={formData.pressaotrabalho}
                onChange={handleChange}
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="pressaoprojeto">Pressão de projeto (bar)</label>
              <input
                id="pressaoprojeto"
                name="pressaoprojeto"
                type="number"
                step="0.01"
                value={formData.pressaoprojeto}
                onChange={handleChange}
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="temperaturaprojeto">
                Temperatura de projeto (°C)
              </label>
              <input
                id="temperaturaprojeto"
                name="temperaturaprojeto"
                type="number"
                step="0.01"
                value={formData.temperaturaprojeto}
                onChange={handleChange}
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="fluido">Fluido</label>
              <input
                id="fluido"
                name="fluido"
                type="text"
                value={formData.fluido}
                onChange={handleChange}
                placeholder="Ex.: Ar comprimido, GLP"
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="material">Material</label>
              <input
                id="material"
                name="material"
                type="text"
                value={formData.material}
                onChange={handleChange}
                placeholder="Ex.: Aço carbono"
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="localizacao">Localização</label>
              <input
                id="localizacao"
                name="localizacao"
                type="text"
                value={formData.localizacao}
                onChange={handleChange}
                placeholder="Ex.: Área de utilidades"
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="datainspecao">Data da última inspeção</label>
              <input
                id="datainspecao"
                name="datainspecao"
                type="date"
                value={formData.datainspecao}
                onChange={handleChange}
              />
            </div>

            <div className="cadastro__field">
              <label htmlFor="proximainspecao">Próxima inspeção</label>
              <input
                id="proximainspecao"
                name="proximainspecao"
                type="date"
                value={formData.proximainspecao}
                onChange={handleChange}
              />
            </div>

            <div className="cadastro__field cadastro__field--image">
              <div className="cadastro__image-input-group">
                <label htmlFor="imagem">Imagem / Tirar foto</label>
                <input
                  id="imagem"
                  name="imagem"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="cadastro__file-input"
                />

                <label htmlFor="imagem" className="cadastro__file-button">
                  <img
                    src={folderIcon}
                    alt="Anexar arquivo ou tirar foto"
                    className="cadastro__file-button-icon"
                  />
                </label>

                {formData.imagem && formData.imagem.name && (
                  <p className="cadastro__file-name">
                    Arquivo: {formData.imagem.name}
                  </p>
                )}
              </div>

              {preview && (
                <img
                  src={preview}
                  alt="Pré-visualização"
                  className="cadastro__image-preview"
                />
              )}
            </div>
          </div>

          <div className="cadastro__field cadastro__field--full">
            <label htmlFor="observacoes">Observações</label>
            <textarea
              id="observacoes"
              name="observacoes"
              rows="5"
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Digite observações complementares"
            ></textarea>
          </div>

          {message && <p className="cadastro__message">{message}</p>}

          <div className="cadastro__actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar cadastro"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
