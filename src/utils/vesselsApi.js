import tokenUtils from "./token.js";

const BASE_URL = import.meta.env.VITE_URL;

class VasosApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _handleServerResponse(res) {
    if (!res.ok) {
      return res.json().then((err) => Promise.reject(err));
    }

    if (res.status === 204) {
      return {};
    }

    return res.json();
  }

  _getHeaders() {
    return {
      Authorization: `Bearer ${tokenUtils.getToken()}`,
      "Content-Type": "application/json",
    };
  }

  createVaso(data) {
    const payload = {
      tag: data.tag,
      nome: data.nome,
      fabricante: data.fabricante || undefined,
      modelo: data.modelo || undefined,
      numeroserie: data.numeroserie || undefined,
      volume: data.volume === "" ? undefined : Number(data.volume),
      pressaotrabalho:
        data.pressaotrabalho === "" ? undefined : Number(data.pressaotrabalho),
      pressaoprojeto:
        data.pressaoprojeto === "" ? undefined : Number(data.pressaoprojeto),
      temperaturaprojeto:
        data.temperaturaprojeto === ""
          ? undefined
          : Number(data.temperaturaprojeto),
      fluido: data.fluido || undefined,
      material: data.material || undefined,
      anofabricacao:
        data.anofabricacao === "" ? undefined : Number(data.anofabricacao),
      localizacao: data.localizacao || undefined,
      datainspecao: data.datainspecao || undefined,
      proximainspecao: data.proximainspecao || undefined,
      imagem: data.imagem || undefined,
      observacoes: data.observacoes || undefined,
    };

    return fetch(`${this._baseUrl}/vessel/cadastrarVaso`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(payload),
    }).then((res) => this._handleServerResponse(res));
  }

  getVasos() {
    return fetch(`${this._baseUrl}/vessel`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then((res) => this._handleServerResponse(res));
  }

  deleteVaso(id) {
    return fetch(`${this._baseUrl}/vessel/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => this._handleServerResponse(res));
  }
}

export const vasosApi = new VasosApi({
  baseUrl: BASE_URL,
});
