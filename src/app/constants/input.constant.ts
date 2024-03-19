/** Costante con i testi da usare negli input */
export const INPUT_CONSTANT = {
  nome: 'Nome',
  cognome: 'Cognome',
  dataNascita: 'Data di nascita',
  luogoNascita: 'Luogo di nascita',
  email: 'Email',
  telefono: 'Telefono',
  note: 'Note',
  password: 'Password',
  elimina: 'Elimina',
  azioni_di_gruppo: 'Azioni di gruppo',
  ruolo: 'Ruolo',
  nome_cognome: 'Nome o Cognome',
  stato: 'Stato',
  ricerca: 'Ricerca',
  pageNumber: 0,
  pageSize: 10,
  tags: 'Tags',
  tag: 'Tag',
  descrizione: 'Descrizione',
  data_inizio: 'Data inizio',
  data_fine: 'Data fine',
  nome_e_cognome: 'Nome e cognome',
  email_recupero: 'Email di recupero',
  campi_obbligatori: '* Campi obbligatori',
  quantita: 'Quantità',
  name: 'Nome',
  surname: 'Cognome',
  idOrder:'ID ORDINE',
  dateOrder: 'DATA ORDINE',
  priceOrder:'COSTO',
  namep:"NOME PRODOTTO"
};

/** Costante con i testi da usare negli input di una tabella*/
export const TABLE_INPUT_CONSTANT = {
  email: 'Mail',
  //name: 'Nome',
  surname: 'Conome',
  usertype: 'Ruolo',
  id: 'ID',
  idOrder:"ID ORDINE", 
  dateOrder:"DATA ORDINE", 
  priceOrder:"COSTO",
  product: 'PRODOTTO',
  name: "NOME PRODOTTO",
  category:"CATEGORIA",
  quantity:"QUANTITÀ",
  price:"PREZZO"
};


/** Costante con i testi da usare nella select della azioni di gruppo */
export const TABLE_GROUP_ACTIONS_CONSTANT = [
  {
    icon: 'delete',
    value: 'Elimina',
  },
];

export const TABLE_GROUP_ACTIONS_CONSTANT_VISUAL = [
  {
    icon: 'visibility',
    value: 'Visualizza',
  },
];

export const TABLE_COLUMNS = {
  utenti: ['select', 'name', 'surname', 'email', 'action'],
  historical:['idOrder', 'dateOrder', 'priceOrder','action'],
  orderDetail:['product', 'quantity', 'price'],
  storico_admin:['name', 'category', 'price', 'quantity', 'action']
};
