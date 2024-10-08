import { PoolClient } from 'pg'
import { PonudaKriterijuma } from '../../models/ponuda.model'

export function createPonudaKriterijuma(client: PoolClient, data: { ponudaKriterijuma: PonudaKriterijuma }) {
  const text = `insert into "PonudaKriterijuma"("referentniBrojPonude", "kriterijumPozivaId", "jedinicaMereId", vrednost, "nazivKriterijumaPoziva")
    values ($1, $2, $3, $4, $5);`

  const { ponudaKriterijuma } = data
  return client.query({
    text,
    // naziv nebitan zbog trigera
    values: [
      ponudaKriterijuma.referentniBrojPonude,
      ponudaKriterijuma.kriterijumPozivaId,
      ponudaKriterijuma.jedinicaMereId,
      ponudaKriterijuma.vrednost,
      ponudaKriterijuma.nazivKriterijumaPoziva
    ]
  })
}

export function getPonudeKriterijuma(client: PoolClient, data: { referentniBrojPonude: number }) {
  const text = `select * from "PonudaKriterijuma" p left join "JedinicaMere" j on j."jedinicaMereId" = p."jedinicaMereId" where "referentniBrojPonude" = ${data.referentniBrojPonude}`
  return client.query({ text })
}
