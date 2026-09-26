/**
 * =====================================================================
 * FICHIER DE CONFIGURATION CENTRALISÉ DES ACTIVITÉS
 * =====================================================================
 * Version "photo plein écran" : chaque page du passeport affiche
 * uniquement l'image en plein cadre, sans titre, description ni boutons
 * de liens visibles. Seul un petit tampon numéroté (champ "stamp") reste
 * affiché en overlay discret.
 *
 * Les champs "title", "description" et "links" sont conservés dans la
 * structure de données ci-dessous pour une évolution future (voir
 * README, section "Évolutions possibles"), mais ne sont plus affichés
 * à l'écran par script.js dans cette version.
 *
 * Structure de chaque activité :
 * {
 *   id: 1,
 *   image: "images/01.jpg",   -> seul champ vraiment utilisé pour l'affichage
 *   alt: "...",               -> toujours utilisé (accessibilité)
 *   stamp: "01",              -> toujours affiché (petit tampon en coin)
 *   title: "...",             -> conservé, non affiché actuellement
 *   description: "...",       -> conservé, non affiché actuellement
 *   links: []                 -> conservé, non affiché actuellement
 * }
 * =====================================================================
 */

const PASSPORT_CONFIG = {
  home: {
    kicker: "République des Rêves",
    title: "Passeport",
    titleScript: "d'Aventurière",
    edition: "Édition Anniversaire — 2026",
    subtitle: "Un voyage unique,<br>des souvenirs inoubliables,<br>et surtout... toi !",
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
    image: "images/01.jpg",
    alt: "Photo souvenir 1",
    stamp: "01",
    title: "Le tout début",
    description: "Une petite aventure commence ici...",
    links: [
      { label: "Écouter la musique", url: "https://open.spotify.com/", icon: "music" },
      { label: "Voir le lieu", url: "https://maps.google.com/", icon: "map" }
    ]
  },
  {
    id: 2,
    image: "images/02.jpg",
    alt: "Photo souvenir 2",
    stamp: "02",
    title: "Chapitre deux",
    description: "",
    links: [
      { label: "Regarder la vidéo", url: "https://youtube.com/", icon: "video" }
    ]
  },
  {
    id: 3,
    image: "images/03.jpg",
    alt: "Photo souvenir 3",
    stamp: "03",
    title: "",
    description: "",
    links: []
  },
  {
    id: 4,
    image: "images/04.jpg",
    alt: "Photo souvenir 4",
    stamp: "04",
    title: "Un moment à part",
    description: "Petite note pour se rappeler ce jour-là.",
    links: [
      { label: "Voir la photo", url: "images/04.jpg", icon: "photo" }
    ]
  },
  {
    id: 5,
    image: "images/05.jpg",
    alt: "Photo souvenir 5",
    stamp: "05",
    title: "",
    description: "",
    links: []
  },
  {
    id: 6,
    image: "images/06.jpg",
    alt: "Photo souvenir 6",
    stamp: "06",
    title: "À mi-chemin",
    description: "",
    links: [
      { label: "En savoir plus", url: "https://example.com/", icon: "link" }
    ]
  },
  {
    id: 7,
    image: "images/07.jpg",
    alt: "Photo souvenir 7",
    stamp: "07",
    title: "",
    description: "",
    links: []
  },
  {
    id: 8,
    image: "images/08.jpg",
    alt: "Photo souvenir 8",
    stamp: "08",
    title: "",
    description: "",
    links: []
  },
  {
    id: 9,
    image: "images/09.jpg",
    alt: "Photo souvenir 9",
    stamp: "09",
    title: "Presque à la fin",
    description: "",
    links: [
      { label: "Écouter", url: "https://open.spotify.com/", icon: "music" }
    ]
  },
  {
    id: 10,
    image: "images/10.jpg",
    alt: "Photo souvenir 10",
    stamp: "10",
    title: "",
    description: "",
    links: []
  },
  {
    id: 11,
    image: "images/11.jpg",
    alt: "Photo souvenir 11",
    stamp: "11",
    title: "Merci pour tout",
    description: "La fin de ce petit passeport, mais pas de l'aventure.",
    links: [
      { label: "Un dernier mot", url: "https://example.com/", icon: "heart" }
    ]
  }
];
