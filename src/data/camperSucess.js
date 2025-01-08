import christopherImg from "../assets/Christopher.svg";
import silviaImg from "../assets/Silvia.svg";
import hernanImg from "../assets/Hernan.svg";
import angieImg from "../assets/Angie.svg";
import jhonImg from "../assets/Jhon.svg";
import davidImg from "../assets/David.svg";

const campersData = [
  {
    id: 1,
    name: "Angie Ardila",
    role: "🏅Espiritu Guerrero🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: davidImg,
    skills: [
      { name: "Espiritu Guerrero ⚔️" },
      { name: "Nuevos horizontes🌅" },
      { name: "Trota mundos 🌎"},
      { name: "Primer programador 💻"},
      { name: "Gran jefe 👑"},

      { name: "Cabeza de familia 👨‍👩‍👧‍👦"},
      { name: "Mujer de Impacto 💪"},
      { name: "Emprendedor 💼"},
      { name: "Rompe Esquemas 💥"}
     ]
  },
  {
    id: 2,
    name: "Cristopher Buitrago",
    role: "🏅Nuevos horizontes🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: christopherImg,
    skills: [
      { name: "Espiritu Guerrero ⚔️" },
      { name: "Nuevos horizontes🌅" },
      { name: "Trota mundos 🌎"},
      { name: "Mujer de Impacto 💪"},
      { name: "Emprendedor 💼"},
      { name: "Despegue Digital 🚀"},
      { name: "Rompe Esquemas 💥"}
    ]
  },
  {
    id: 3,
    name: "Silvia Angarita",
    role: "🏅Cabeza de familia🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: silviaImg,
    skills: [
      { name: "Nuevos horizontes🌅" },
      { name: "Emprendedor 💼"},
      { name: "Gran jefe 👑"},
      { name: "Despegue Digital 🚀"},
      { name: "Rompe Esquemas 💥"},
      { name: "Emprendedor 💼"},
      { name: "Mujer de Impacto 💪"},

    ]
  },
  {
    id: 4,
    name: "Hernan Mendez",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: hernanImg,
    skills: [
      { name: "Espiritu Guerrero ⚔️" },
      { name: "Trota mundos 🌎"},
      { name: "Mujer de Impacto 💪"},
      { name: "Primer programador 💻"},
      { name: "Gran jefe 👑"},
      { name: "Rompe Esquemas 💥"}
    ]
  },
  {
    id: 5,
    name: "Angie Ardila",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: angieImg,
    skills: [
      { name: "Nuevos horizontes🌅" },
      { name: "Cabeza de familia 👨‍👩‍👧‍👦"},
      { name: "Mujer de Impacto 💪"},
      { name: "Emprendedor 💼"},
      { name: "Gran jefe 👑"},
      { name: "Despegue Digital 🚀"},
    ]
  },
  {
    id: 6,
    name: "David Lopez",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: jhonImg,
    skills: [
      { name: "Espiritu Guerrero ⚔️" },
      { name: "Trota mundos 🌎"},
      { name: "Mujer de Impacto 💪"},
      { name: "Emprendedor 💼"},
      { name: "Despegue Digital 🚀"},
      { name: "Rompe Esquemas 💥"}
    ]
  },
  {
    id: 9,
    name: "Cristopher Buitrago",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: christopherImg,
    skills: [
      { name: "Espiritu Guerrero ⚔️" },
      { name: "Trota mundos 🌎"},
      { name: "Cabeza de familia 👨‍👩‍👧‍👦"},
      { name: "Mujer de Impacto 💪"},
      { name: "Emprendedor 💼"},
      { name: "Rompe Esquemas 💥"}
    ]
  },
  {
    id: 10,
    name: "Silvia Angarita",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: silviaImg,
    skills: [
      { name: "Nuevos horizontes🌅" },
      { name: "Trota mundos 🌎"},
      { name: "Cabeza de familia 👨‍👩‍👧‍👦"},
      { name: "Emprendedor 💼"},
      { name: "Primer programador 💻"},
      { name: "Gran jefe 👑"},
    ]
  },
  {
    id: 11,
    name: "Hernan Mendez",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: hernanImg,
    skills: [
      { name: "Nuevos horizontes🌅" },
      { name: "Trota mundos 🌎"},
      { name: "Mujer de Impacto 💪"},
      { name: "Emprendedor 💼"},
      { name: "Gran jefe 👑"},
      { name: "Rompe Esquemas 💥"}
    ]
  },
  {
    id: 12,
    name: "Angie Ardila",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: davidImg,
    skills: [
      { name: "Espiritu Guerrero ⚔️" },
      { name: "Trota mundos 🌎"},
      { name: "Cabeza de familia 👨‍👩‍👧‍👦"},
      { name: "Mujer de Impacto 💪"},
      { name: "Emprendedor 💼"},
      { name: "Gran jefe 👑"},
      { name: "Rompe Esquemas 💥"}
    ]
  },
  {
    id: 13,
    name: "Cristopher Buitrago",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: christopherImg,
    skills: [
      { name: "Espiritu Guerrero ⚔️" },
      { name: "Nuevos horizontes🌅" },
      { name: "Trota mundos 🌎"},
      { name: "Mujer de Impacto 💪"},
      { name: "Emprendedor 💼"},
      { name: "Primer programador 💻"},
      { name: "Rompe Esquemas 💥"}
    ]
  },
  {
    id: 14,
    name: "Silvia Angarita",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: silviaImg,
    skills: [
      { name: "Nuevos horizontes🌅" },
      { name: "Trota mundos 🌎"},
      { name: "Mujer de Impacto 💪"},
      { name: "Emprendedor 💼"},
      { name: "Primer programador 💻"},
      { name: "Gran jefe 👑"},
      { name: "Despegue Digital 🚀"},
    ]
  },
  {
    id: 15,
    name: "Hernan Mendez",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: hernanImg,
    skills: [
      { name: "Espiritu Guerrero ⚔️" },
      { name: "Cabeza de familia 👨‍👩‍👧‍👦"},
      { name: "Mujer de Impacto 💪"},
      { name: "Emprendedor 💼"},
      { name: "Primer programador 💻"},
      { name: "Rompe Esquemas 💥"}
    ]
  },
  {
    id: 16,
    name: "Angie Ardila",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: angieImg,
    skills: [
      { name: "Espiritu Guerrero ⚔️" },
      { name: "Nuevos horizontes🌅" },
      { name: "Trota mundos 🌎"},
      { name: "Cabeza de familia 👨‍👩‍👧‍👦"},
      { name: "Mujer de Impacto 💪"},
      { name: "Emprendedor 💼"},
      { name: "Primer programador 💻"},
    ]
  },
  {
    id: 17,
    name: "David Lopez",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: jhonImg,
    skills: [
      { name: "Espiritu Guerrero ⚔️" },
      { name: "Nuevos horizontes🌅" },
      { name: "Trota mundos 🌎"},
      { name: "Cabeza de familia 👨‍👩‍👧‍👦"},
      { name: "Rompe Esquemas 💥"}
    ]
  },
  {
    id: 20,
    name: "Cristopher Buitrago",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: christopherImg,
    skills: [
      { name: "Trota mundos 🌎"},
      { name: "Cabeza de familia 👨‍👩‍👧‍👦"},
      { name: "Mujer de Impacto 💪"},
      { name: "Emprendedor 💼"},
      { name: "Primer programador 💻"},
      { name: "Gran jefe 👑"},
      { name: "Despegue Digital 🚀"},
      { name: "Rompe Esquemas 💥"}
    ]
  },
  {
    id: 21,
    name: "Silvia Angarita",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: silviaImg,
    skills: [
      { name: "Espiritu Guerrero ⚔️" },
      { name: "Nuevos horizontes🌅" },
      { name: "Trota mundos 🌎"},
      { name: "Emprendedor 💼"},
      { name: "Primer programador 💻"},
      { name: "Gran jefe 👑"},
      { name: "Despegue Digital 🚀"},
    ]
  },
  {
    id: 22,
    name: "Hernan Mendez",
    role: "🏅Emprendedor🏅",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Justo suscipit pharetra semectus duis, modi himenaeos liquido dopibus fermentum pellentesque vivamus vulputate mollis magnus sed.",
    image: hernanImg,
    skills: [
      { name: "Espiritu Guerrero ⚔️" },
      { name: "Nuevos horizontes🌅" },
      { name: "Trota mundos 🌎"},
      { name: "Cabeza de familia 👨‍👩‍👧‍👦"},
      { name: "Mujer de Impacto 💪"},
      { name: "Rompe Esquemas 💥"},
    ]
  }
];

export default campersData;
