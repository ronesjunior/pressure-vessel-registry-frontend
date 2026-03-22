import { useEffect, useState } from "react";
import { uploadJobImage } from "../../utils/storage";

export default function CadastroPopup({ isOpen, onClose, onCreateJob }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!imageFile) {
      setPreview("");
      return;
    }

    const imageUrl = URL.createObjectURL(imageFile);
    setPreview(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageFile]);

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
      setImageFile(null);
      setPreview("");
      setIsSaving(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    let imagePromise = Promise.resolve("");

    if (imageFile) {
      imagePromise = uploadJobImage(imageFile);
    }

    imagePromise
      .then((image) => {
        return onCreateJob({
          title,
          description,
          image,
        });
      })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao enviar imagem");
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup" onClick={onClose}>
      <div className="popup__content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="popup__close" onClick={onClose}>
          ×
        </button>

        <h2 className="popup__title">Cadastrar vaga</h2>

        <form className="popup__form" onSubmit={handleSubmit}>
          <label htmlFor="job-title" className="popup__label">
            Nome da vaga
          </label>
          <input
            id="job-title"
            type="text"
            placeholder="Nome da vaga"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={25}
            required
          />

          <label htmlFor="job-description" className="popup__label">
            Descrição
          </label>
          <textarea
            id="job-description"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            required
          />

          <div className="popup__file-row">
            <label htmlFor="job-image" className="popup__label">
              Imagem
            </label>
            <input
              id="job-image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0] || null)}
              required
            />

            {preview && (
              <img
                src={preview}
                alt="Prévia da imagem"
                className="popup__preview"
              />
            )}
          </div>

          <button type="submit" className="popup__save" disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
}
