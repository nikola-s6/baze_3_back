import { types } from 'pg'
import * as db from '../../db/db'
import { Datumi } from '../../models/shared/datumi.model'

export async function setTypeParesrs() {
	types.setTypeParser(types.builtins.TIMESTAMPTZ, val => {
		if (!val) return val
		return new Date(val)
	})
	const oids = await db.transaction(async client => {
		const res = await client.query(`select oid, typname from pg_type where typname in ('dates', 'price_type')`)
		const obj: any = {}
		res.rows.forEach(row => {
			obj[row.typname] = row.oid
		})
		return obj
	})

	const datesOid = oids['dates']
	const priceTypeOid = oids['price_type']

	if (!datesOid || !priceTypeOid) {
		throw new Error('Unable to initiate type parsers!')
	}
	types.setTypeParser(datesOid, val => {
		if (!val) return val
		const dates = val.slice(1, -1).split(',')
		return {
			datumIzdavanja: new Date(dates[0].trim().slice(1, -1)),
			datumZatvaranja: new Date(dates[1].trim().slice(1, -1))
		} satisfies Datumi
	})

	types.setTypeParser(priceTypeOid, val => {
		if (!val) return val
		return +val
	})

	types.setTypeParser(types.builtins.INT8, val => {
		if (!val) return val
		return +val
	})
}
