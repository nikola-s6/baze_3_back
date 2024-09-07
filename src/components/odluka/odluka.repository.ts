import { Pool, PoolClient } from 'pg'
import { CreateOdlukaDTO } from '../../models/odluka.mode'

export function getOdlukaByJavniPoziv(client: PoolClient, data: { referentniBrojJP }) {
  return client.query({
    text: `
        select o."odlukaODodeliUgovoraId", o."referentniBrojJP", o."referentniBrojPonude", o."datumOdluke",
z1."zaposleniId" as k1id, z1."imeIPrezime" as k1ime, ps1."nazivPrivrednogSubjekta" as p1naziv,
z2."zaposleniId" as k2id, z2."imeIPrezime" as k2ime, ps2."nazivPrivrednogSubjekta" as p2naziv,
z3."zaposleniId" as k3id, z3."imeIPrezime" as k3ime, ps3."nazivPrivrednogSubjekta" as p3naziv
from "OdlukaODodeliUgovora" o
left join "Zaposleni" z1 on z1."zaposleniId" = o."komisijaPrviClan"
    left join "PrivredniSubjekt" ps1 on ps1."maticniBroj" = z1."maticniBroj"
left join "Zaposleni" z2 on z2."zaposleniId" = o."komisijaDrugiClan"
    left join "PrivredniSubjekt" ps2 on ps2."maticniBroj" = z2."maticniBroj"
left join "Zaposleni" z3 on z3."zaposleniId" = o."komisijaTreciClan"
    left join "PrivredniSubjekt" ps3 on ps3."maticniBroj" = z3."maticniBroj"
where o."referentniBrojJP" = ${data.referentniBrojJP}
        `
  })
}

export function createOdluka(client: PoolClient, data: { odluka: CreateOdlukaDTO }) {
  const { odluka } = data
  const text = `insert into "OdlukaODodeliUgovora"("datumOdluke", "komisijaPrviClan", "komisijaDrugiClan", "komisijaTreciClan", "referentniBrojJP", "referentniBrojPonude")
values ($1, $2, $3, $4, $5, $6);`

  return client.query({
    text,
    values: [
      odluka.datumOdluke,
      odluka.komisijaPrviClan,
      odluka.komisijaDrugiClan,
      odluka.komisijaTreciClan,
      odluka.referentniBrojJP,
      odluka.referentniBrojPonude
    ]
  })
}
