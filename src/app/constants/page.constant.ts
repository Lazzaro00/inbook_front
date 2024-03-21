/** Costante per il menù di navigazione laterale */
export const SIDENAV_MENU_CONSTANT = [
  {
    wip:false,
    name: 'Il tuo profilo',
    icon: 'person',
    path: '/gestionale/adminprofile',
  },
  {
    name: 'Utenti',
    icon: 'group',
    childrenPath: [
      '/gestionale/utenti/lista'
    ],
    children: [
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Tutti gli utenti',
        path: '/gestionale/utenti/lista',
      }
    ]
  },
  {
    name: 'Prodotti',
    icon: 'photo',
    childrenPath: [
      '/book/get-all-book'
    ],
    children: [
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Tutti i prodotti',
        path: 'gestionale/book/storico-admin',
      },
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Aggiungi prodotto',
        path: 'user/book/insert-product',
      }
    ]
  }

]
