import { PoolClient } from 'pg'

export function getPonudasForJp(client: PoolClient, data: { referentniBroj: number }) {
  const text = `select * from "Ponuda" as p
left join "Valuta" v on v."valutaId" = p."valutaId"
left join "Zaposleni" z on z."zaposleniId" = p."zaposleniId"
left join "PrivredniSubjekt" ps on ps."maticniBroj" = z."maticniBroj"
where p."referentniBrojJP" = ${data.referentniBroj}`
  return client.query({ text })
}
