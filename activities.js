/**
 * =====================================================================
 * FICHIER DE CONFIGURATION CENTRALISÉ DES ACTIVITÉS
 * =====================================================================
 * SEUL fichier à modifier pour changer :
 *  - les textes de l'accueil (thème "Passeport d'Aventurière")
 *  - les images, titres, descriptions, liens de chaque page
 *
 * IMPORTANT : l'image affichée dans le polaroid de l'accueil est
 * totalement INDEPENDANTE des 11 photos du passeport. Elle est définie
 * directement dans index.html (balise <img> à l'intérieur de la classe
 * .polaroid-photo) et pointe vers "images/polaroid-cover.JPG".
 * Remplacer vos photos 01.JPG à 11.JPG n'affecte jamais le polaroid.
 *
 * Structure de chaque activité :
 * {
 *   id: 1,
 *   image: "images/01.JPG",
 *   alt: "...",
 *   title: "...",
 *   description: "...",
 *   stamp: "01",
 *   links: [ { label: "...", url: "https://...", icon: "music" } ]
 * }
 *
 * ICONES DISPONIBLES : "music", "video", "map", "photo", "link", "heart"
 * =====================================================================
 */

const PASSPORT_CONFIG = {
  home: {
    kicker: "République des Rêves",
    title: "Passeport",
    titleScript: "d'Aventurière",
    edition: "Édition Anniversaire — 2026",
    subtitle: "Un voyage unique,<br>des souvenirs inoubliables,<br>et surtout... toi !",
    // Légende affichée sous le polaroid décoratif de l'accueil
    polaroidCaption: "Le monde<br>t'attend...",
    badgeLabel: "Destination",
    badgeValue: "30 ANS",
    badgeNote: "Parce que tu mérites<br>le plus beau<br>des voyages !",
    openButton: "Ouvrir mon passeport",
    footer: "Un passeport pour une vie pleine d'aventures"
  },
  restartButtonLabel: "Recommencer",
  imagesFolder: "images/"
};

const activities = [
  {
    id: 1,
    image: "images/01.JPG",
    alt: "Photo souvenir 1",
    title: "Le tout début",
    description: "Une petite aventure commence ici...",
    stamp: "01",
    links: [
      { label: "Écouter la musique", url: "https://open.spotify.com/", icon: "music" },
      { label: "Voir le lieu", url: "https://maps.google.com/", icon: "map" }
    ]
  },
  {
    id: 2,
    image: "images/02.JPG",
    alt: "Photo souvenir 2",
    title: "Chapitre deux",
    description: "",
    stamp: "02",
    links: [
      { label: "Regarder la vidéo", url: "https://youtube.com/", icon: "video" }
    ]
  },
  {
    id: 3,
    image: "images/03.JPG",
    alt: "Photo souvenir 3",
    title: "",
    description: "",
    stamp: "03",
    links: []
  },
  {
    id: 4,
    image: "images/04.JPG",
    alt: "Photo souvenir 4",
    title: "Un moment à part",
    description: "Petite note pour se rappeler ce jour-là.",
    stamp: "04",
    links: [
      { label: "Voir la photo", url: "images/04.JPG", icon: "photo" }
    ]
  },
  {
    id: 5,
    image: "images/05.JPG",
    alt: "Photo souvenir 5",
    title: "",
    description: "",
    stamp: "05",
    links: []
  },
  {
    id: 6,
    image: "images/06.JPG",
    alt: "Photo souvenir 6",
    title: "À mi-chemin",
    description: "",
    stamp: "06",
    links: [
      { label: "En savoir plus", url: "https://example.com/", icon: "link" }
    ]
  },
  {
    id: 7,
    image: "images/07.JPG",
    alt: "Photo souvenir 7",
    title: "",
    description: "",
    stamp: "07",
    links: []
  },
  {
    id: 8,
    image: "images/08.JPG",
    alt: "Photo souvenir 8",
    title: "",
    description: "",
    stamp: "08",
    links: []
  },
  {
    id: 9,
    image: "images/09.JPG",
    alt: "Photo souvenir 9",
    title: "Presque à la fin",
    description: "",
    stamp: "09",
    links: [
      { label: "Écouter", url: "https://open.spotify.com/", icon: "music" }
    ]
  },
  {
    id: 10,
    image: "images/10.JPG",
    alt: "Photo souvenir 10",
    title: "",
    description: "",
    stamp: "10",
    links: []
  },
  {
    id: 11,
    image: "images/11.JPG",
    alt: "Photo souvenir 11",
    title: "Merci pour tout",
    description: "La fin de ce petit passeport, mais pas de l'aventure.",
    stamp: "11",
    links: [
      { label: "Un dernier mot", url: "https://example.com/", icon: "heart" }
    ]
  }
];
