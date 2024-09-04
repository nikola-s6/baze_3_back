-- drzava 1
insert into "Drzava"("nazivDrzave", "pozivniBroj", "clanstvoEU")
values ('Srbija', '+381', false);

-- grad 2
insert into "Grad"("nazivGrada", "postanskiBroj", "drzavaId")
values('Beograd', 11000, 1);

-- adresa 3
insert into "Adresa"(ulica, broj, "gradId")
values ('Jove Ilica', '154', 1);

-- privredni subjekt 4
insert into "PrivredniSubjekt"("maticniBroj", pib, "nazivPrivrednogSubjekta", stranica, "adresaId")
values (11111111,222222222, 'Fakultet organizacionih nauka', 'https://fon.bg.ac.rs/', 1);

insert into "PrivredniSubjekt"("maticniBroj", pib, "nazivPrivrednogSubjekta", stranica, "adresaId")
values (22222222,333333333, 'Moj kiosk', 'https://mojkiosk.rs/', 1);

-- zaposleni 5
insert into "Zaposleni"("imeIPrezime", email, sifra, "brojTelefona", "datumZaposlenja", "maticniBroj")
values ('Milos Milosevic', 'milos@gmail.com', 'd47ad83f1353e5dec390bf65cc5d6fa49d6b882b86c38c3be4dc4b92980a90b5','0603829238', '2020-11-11', 11111111);

insert into "Zaposleni"("imeIPrezime", email, sifra,"brojTelefona", "datumZaposlenja", "maticniBroj")
values ('Marko Markovic', 'marko@gmail.com', 'e3c4a8e68c23890091f9b9531ef3e0f805ce0a9378d6fb4bbcb6eed403c91342','0609784731', '2020-07-17', 11111111);

insert into "Zaposleni"("imeIPrezime", email, sifra,"brojTelefona", "datumZaposlenja", "maticniBroj")
values ('Nikola Stojilkovic', 'nikola@gmail.com', '3eaf0ff39b53c1e893971406e247f70fcad2b1d40674d696eea726e6953089c7','069038239', '2021-02-08', 11111111);

-- valuta 6
insert into "Valuta"("nazivValute", "oznakaValute")
values ('Dinar', 'rsd');

-- oznaka 7
insert into "Oznaka"("nazivOznake")
values ('Kancelarijski materijal');

-- javni poziv 8
insert into view_javni_poziv("nazivPoziva", datumi, "procenjenaVrednost", "oznakaValute", "oznakaId", "valutaId", "zaposleniId", opis, "dodatniPodaci", "dozvoljeneVarijante", "adresaDostavljanja", "podlozanProduzenju", "obrazlozenjeProduzenja", "osnovnaDelatnost")
values ('Nabavka kancelarijskog materijala', row('2023-12-14 11:00:00', '2023-12-28 11:00:00'), row(100000), 'proba', 1, 1, 1, 'Nabavka kancelarijskog materijala za FON', 'Nema dodatnih podataka', false, 'konkurs@fon.bg.ac.rs', false, '', 'Elektricna energija');

-- kriterijum poziva 9
insert into "KriterijumPoziva"("nazivKriterijumaPoziva", "referentniBrojJP")
values ('cena', 1);

-- jedinica mere 10
insert into "JedinicaMere"("nazivJediniceMere", "oznakaJediniceMere")
values ('Dinar', 'rsd');

-- ponuda 11
insert into "Ponuda"(datum, "ukljucujeProizvodjace", samostalna, "izjavaOIntegritetu", "cenaBezPDV", "cenaSaPDV", "valutaId", "referentniBrojJP", "zaposleniId")
values ('2023-12-16 13:12:22', false, true, true, row(80000), row(96000), 1, 1, 2);

-- dostavljeni dokumenti 12
insert into "DostavljeniDokument"("nazivDokumenta", velicina, poverljiv, "obrazlozenjePoverljivosti", adresa, "referentniBrojPonude")
values ('ponuda1.pdf', 141, false, '', 'www.nesto.com/ponuda1.pdf', 1);

-- ponuda kriterijuma 13
insert into "PonudaKriterijuma"("referentniBrojPonude", "kriterijumPozivaId", "jedinicaMereId", vrednost, "nazivKriterijumaPoziva")
values (1, 1, 1, 96000, 'proba');

-- zapisnik ponuda 14
insert into "ZapisnikPonuda"("datumKreiranja")
values ('2023-12-29');

-- ponuda zapisnik ponuda 15
insert into "PonudaZapisnikPonuda"("referentniBrojPonude", "referentniBrojZP")
values (1, 1);

-- odluka o dodeli ugovora 16
insert into "OdlukaODodeliUgovora"("datumOdluke", "komisijaPrviClan", "komisijaDrugiClan", "komisijaTreciClan", "referentniBrojJP", "referentniBrojPonude")
values ('2023-12-30', 1, 2, 3, 1, 1);

-- tip ugovora 17
insert into "TipUgovora"("nazivTipa")
values ('Prodajni ugovor');

insert into "Ugovor"("datumPotpisa", "tipUgovoraId", "odlukaODodeliUgovoraId", "potpisnikA", "potpisnikB")
values ('2024-01-01', 1, 1, 11111111, 22222222);

insert into "ClanUgovora"("clanBroj", "referentniBrojUgovora", "datumPotpisa", naslov, "opisClana")
values (1, 1, '2024-01-01', 'Dogovor o dostavljanju sredstava', 'Neki opis clana');

select * from "Ugovor_2024";
