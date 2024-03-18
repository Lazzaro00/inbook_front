/** Costante per il menù di navigazione laterale */
export const SIDENAV_MENU_CONSTANT = [
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
    wip: true,
    name: 'Il tuo profilo',
    icon: 'person',
    path: '/login/profile',
  },
  {
    name: 'Prodotti',
    icon: 'group',
    childrenPath: [
      '/book/get-all-book'
    ],
    children: [
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Tutti i prodotti',
        path: 'user/book/get-all-book',
      },
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Aggiungi prodotto',
        path: 'user/book/insert-product',
      }
    ]
  }

]
