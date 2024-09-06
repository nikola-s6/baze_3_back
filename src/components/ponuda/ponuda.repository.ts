import { PoolClient } from 'pg'
import { CreatePonudaDTO } from '../../models/ponuda.model'

export function getPonudasForJp(client: PoolClient, data: { referentniBroj: number }) {
  const text = `select * from "Ponuda" as p
left join "Valuta" v on v."valutaId" = p."valutaId"
left join "Zaposleni" z on z."zaposleniId" = p."zaposleniId"
left join "PrivredniSubjekt" ps on ps."maticniBroj" = z."maticniBroj"
where p."referentniBrojJP" = ${data.referentniBroj}`
  return client.query({ text })
}

export function createPonuda(client: PoolClient, data: { ponuda: CreatePonudaDTO; zaposleniId: number }) {
  const { ponuda } = data
  const text = `insert into "Ponuda"(datum, "ukljucujeProizvodjace", samostalna, "izjavaOIntegritetu", "cenaBezPDV", "cenaSaPDV", "valutaId", "referentniBrojJP", "zaposleniId")
   values ($1, $2, $3, $4, row($5), row($6), $7, $8, $9) returning "referentniBrojPonude";`

  return client.query({
    text,
    values: [
      ponuda.datum,
      ponuda.ukljucujeProizvodjace,
      ponuda.samostalna,
      ponuda.izjavaOIntegritetu,
      ponuda.cenaBezPdv,
      ponuda.cenaSaPdv,
      ponuda.valutaId,
      ponuda.referentniBrojJP,
      data.zaposleniId
    ]
  })
}
