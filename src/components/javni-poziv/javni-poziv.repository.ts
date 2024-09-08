import { PoolClient } from 'pg'
import { JavniPozivFilters, SaveJavniPoziv } from '../../models/javni-poziv.model'

export function getJavniPozivAll(
  client: PoolClient,
  data?: Omit<JavniPozivFilters, 'procenjenaVrednostOd' | 'procenjenaVrednostDo'> & {
    procenjenaVrednostOd?: number
    procenjenaVrednostDo?: number
  }
) {
  let queryText = `select JP.*, PS."nazivPrivrednogSubjekta", Z."imeIPrezime", O."nazivOznake" from "JavniPoziv" as JP
  left join "Zaposleni" Z on Z."zaposleniId" = JP."zaposleniId"
  left join "PrivredniSubjekt" PS on PS."maticniBroj" = Z."maticniBroj"
  left join "Oznaka" O on O."brojOznake" = JP."oznakaId"
  where 1=1`

  if (data.referentniBroj) {
    queryText += ` and "referentniBrojJP" = ${data.referentniBroj}`
    return client.query({
      text: queryText
    })
  }

  if (data.nazivPoziva) {
    queryText += ` and "nazivPoziva" ilike '${data.nazivPoziva}%'`
  }

  if (data.datumIzdavanjaOd) {
    queryText += ` and (datumi)."datumIzdavanja" >= '${data.datumIzdavanjaOd}'`
  }

  if (data.datumIzdavanjaDo) {
    queryText += ` and (datumi)."datumIzdavanja" <= '${data.datumIzdavanjaDo}'`
  }

  if (data.datumZatvaranjaOd) {
    queryText += ` and (datumi)."datumZatvaranja" >= '${data.datumZatvaranjaOd}'`
  }

  if (data.datumZatvaranjaDo) {
    queryText += ` and (datumi)."datumZatvaranja" <= '${data.datumZatvaranjaDo}'`
  }

  if (data.procenjenaVrednostOd) {
    queryText += ` and price_type_to_numeric("procenjenaVrednost") >= ${data.procenjenaVrednostOd}`
  }

  if (data.procenjenaVrednostDo) {
    queryText += ` and price_type_to_numeric("procenjenaVrednost") <= ${data.procenjenaVrednostDo}`
  }

  // maticni broj privredng subjekta
  if (data.privredniSubjekt) {
    queryText += ` and JP."zaposleniId" in (select "Zaposleni"."zaposleniId" from "Zaposleni" where "maticniBroj" = ${data.privredniSubjekt})`
  }

  queryText += ' order by (datumi)."datumIzdavanja"'

  return client.query({
    text: queryText
  })
}

export function getJpDetails(client: PoolClient, data: { referentniBroj: number }) {
  const text = `select * from view_javni_poziv as jp
         left join "Zaposleni" z on jp."zaposleniId" = z."zaposleniId"
         left join "PrivredniSubjekt" ps on ps."maticniBroj" = z."maticniBroj"
         left join "Adresa" ad on ps."adresaId" = ad."adresaId"
         left join "Grad" g on g."gradId" = ad."gradId"
         left join "Drzava" dr on dr."drzavaId" = g."drzavaId"
         left join "Oznaka" oz on oz."brojOznake" = jp."oznakaId"
         where "referentniBrojJP"=${data.referentniBroj}`
  return client.query({
    text
  })
}

export function saveJavniPoziv(client: PoolClient, data: { jp: SaveJavniPoziv }) {
  const { jp } = data
  const text = `insert into view_javni_poziv("nazivPoziva", datumi, "procenjenaVrednost", "oznakaValute", "oznakaId", "valutaId", "zaposleniId", opis, "dodatniPodaci", "dozvoljeneVarijante", "adresaDostavljanja", "podlozanProduzenju", "obrazlozenjeProduzenja", "osnovnaDelatnost")
values ($1, row($2, $3), row($4), $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning "referentniBrojJP";`
  return client.query({
    text,
    values: [
      jp.nazivPoziva,
      jp.datumi.datumIzdavanja,
      jp.datumi.datumZatvaranja,
      jp.procenjenaVrednost,
      '',
      jp.oznakaId,
      jp.valutaId,
      jp.zaposleniId,
      jp.opis,
      jp.dodatniPodaci,
      jp.dozvoljeneVarijante,
      jp.adresaDostavljanja,
      jp.podlozanProduzenju,
      jp.obrazlozenjeProduzenja,
      jp.osnovnaDelatnost
    ]
  })
}
