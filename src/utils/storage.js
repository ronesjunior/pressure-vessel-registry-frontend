const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const BUCKET_JOB = import.meta.env.VITE_SUPABASE_BUCKET_JOB;
const BUCKET_VESSEL = import.meta.env.VITE_SUPABASE_BUCKET_VESSEL;

export function uploadJobImage(file) {
  const extension = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${extension}`;

  const filePath = `jobs/${fileName}`;
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET_JOB}/${filePath}`;

  const formData = new FormData();
  formData.append("", file);

  return fetch(uploadUrl, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "x-upsert": "false",
    },
    body: formData,
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        console.log("Supabase Storage error:", text);
        throw new Error(text || "Erro ao enviar imagem");
      });
    }

    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_JOB}/${filePath}`;
  });
}

export function uploadVesselImage(file) {
  const extension = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${extension}`;

  const filePath = `vasos/${fileName}`;
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET_VESSEL}/${filePath}`;

  const formData = new FormData();
  formData.append("", file);

  return fetch(uploadUrl, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "x-upsert": "false",
    },
    body: formData,
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        console.log("Supabase Storage error:", text);
        throw new Error(text || "Erro ao enviar imagem do vaso");
      });
    }

    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_VESSEL}/${filePath}`;
  });
}
