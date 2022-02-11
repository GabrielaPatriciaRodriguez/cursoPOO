//creando un objeto literal Natalia

const natalia = {
    name: "Natalia",
    age: 20,
    cursosAprobados: [
        "CSS",
        "HTML"
    ],
    //el objeto natalia tendra un metodo, la palabra reservada this hace ref
    //al objeto natalia

    aprobarCurso(nuevoCursito) {
        this.cursosAprobados.push(nuevoCursito);
    }
};

//hacer que Natalia apruebe un curso

//natalia.cursosAprobados.push("JS")

//Como queremos tener varios estudiantes, no solo a Natalia
//Creamos una funcion Estudiantes, un molde para todos los estudiantes

function Estudiante(nombre, edad, cursosAprobados) {
    this.nombre = nombre;
    this.edad = edad;
    this.cursosAprobados = cursosAprobados;

    //Una forma de hacerlo es esta, crear metodos dentro de los prototipos

    // this.aprobarCurso = function(nuevoCurso){
    //     this.cursosAprobados.push(nuevoCurso)
    // }
}

// Tambien podemos crear metodos por fuera de nuestro prototipo Estudiante con
//prototype

Estudiante.prototype.aprobarCurso = function (nuevoCurso) {
    this.cursosAprobados.push(nuevoCurso)
}

//Creando una instancia del objeto estudiante
const juanita = new Estudiante("Juanita", 18, ["javascript", "Desarrollo Web"])

juanita.aprobarCurso("React")

//Prototipos con la sintaxis de clases pero pasando en los parametros del constructor
//un objeto, entonces cuando armemos las instancias sera mas facil, lo podemos hacer 
//desordenada y sin memorizar todos los atributos que necesitamos, y sin necesidad
//que tenga todos esos atributos

class Estudiante2 {
    constructor({
        name,
        username,
        age,
        email,
        facebook = undefined,
        twiter = undefined,
        instagram = undefined,
        cursesAproved = [],
        rutasDeAprendizaje = [],
    }) {
        this.name = name;
        this.username = username;
        this.age = age;
        this.email = email;
        this.socialMedia = {
            facebook,
            twiter,
            instagram
        }
        this.cursesAproved = cursesAproved;
        this.rutasDeAprendizaje = rutasDeAprendizaje;
    }
}

//Asi es mucho mas facil instanciar y trabajar 
const miguelito = new Estudiante2(
    {
        name: "Miguelito",
        username: "miguelitoFeliz",
        age: 18,
        email: "miguelito@gmail.com"
    }
);

//Prototipo Cursos

class Cursos {
    constructor({
        name,
        clases = [],
        comentarios,
        preguntas,
        isFree = false,
        lang = "spanish",
    }){
        this.name = name;
        this.clases = clases;
        this.comentarios = comentarios;
        this.preguntas = preguntas;
        this.isFree = isFree;
        this.lang = lang;
    }
}

const cursoBasicoDeProgramacion = new Cursos({
    name: "Curso Basico de Programacion",
    clases: [],
    isFree: true,
})

const cursoPracticoDeProgramacion = new Cursos({
    name: "Curso Practico de Programacion",
    clases: [],
})

const cursoBasicoDeHtml = new Cursos({
    name: "Curso Basico de HTML",
    clases: [],
    lang: "english",
})

//Prototipo Rutas de Aprendizaje

class RutasDeAprendizaje{
    constructor({
        nombre,
        cursos = [],
    }){
        this.nombre = nombre;
        this.cursos = cursos;
    }
}

const escuelaDesarrolloWeb = new RutasDeAprendizaje({
    nombre: "Escuela de Desarrollo Web",
    cursos: [
        cursoBasicoDeProgramacion,
        cursoPracticoDeProgramacion,
        cursoBasicoDeHtml,
    ],
})

const escuelaDeData = new RutasDeAprendizaje({
    nombre: "Escuela de Data",
    cursos: [],
})

//Encapsulamiento con get y set es para protegernos de errores que puedan tener
//nuestros usuarios



//Creando una super clase, que sea la clase madre de la cual derivaran las subclases

class EstudianteMama {
    constructor({
        name,
        username,
        age,
        email,
        facebook = undefined,
        twiter = undefined,
        instagram = undefined,
        cursesAproved = [],
        rutasDeAprendizaje = [],  
    }){
        this.name = name;
        this.username = username;
        this.age = age;
        this.email = email;
        this.socialMedia = {
            facebook,
            twiter,
            instagram
        }
        this.cursesAproved = cursesAproved;
        this.rutasDeAprendizaje = rutasDeAprendizaje;
    }
    publicarComentario(contenidoDelComentario){
        //crear una instancia de la clase comentario
        const comentario = new Comentario({
            comentario: contenidoDelComentario,
            nombreDelQueComenta: this.name,
        });
        comentario.publicar();
    }
}

// Subclases que heredaran de la clase madre con la palabra reservada extend
//Extiendo todo, hereda, de la clase madre 
//con la palabra super llamamos al constructor de nuestra clase madre

class EstudiantesFree extends EstudianteMama{
    constructor(props){
        super(props);
    }
    aprobarCurso(nuevoCurso){
        if(nuevoCurso.isFree === true){
            this.cursesAproved.push(nuevoCurso);
        } else{
            console.warn("Lo siento " + this.name + " solo puedes tomar cursos gratis...")
        }
    }
}

class EstudiantesBasic extends EstudianteMama{
    constructor(props){
        super(props);
    }
    aprobarCurso(nuevoCurso){
        if(nuevoCurso.lang !== "english"){
            this.cursesAproved.push(nuevoCurso);
        } else{
            console.warn("Lo siento " + this.name + " no puedes tomar cursos en ingles...")
        }
    }
}

class EstudiantesExpert extends EstudianteMama{
    constructor(props){
        super(props);
    }
    aprobarCurso(nuevoCurso){
        this.cursesAproved.push(nuevoCurso);
    }
}

class EstudiantesTeacher extends EstudianteMama{
    constructor(props){
        super(props);
    }
    aprobarCurso(nuevoCurso){
        this.cursesAproved.push(nuevoCurso);
    }
    publicarComentario(contenidoDelComentario){
        //crear una instancia de la clase comentario
        const comentario = new Comentario({
            comentario: contenidoDelComentario,
            nombreDelQueComenta: this.name,
            rolDelQueComenta: "profesor",
        });
        comentario.publicar();
    }
}
//Ahora nuestros estudiantes seran instancias de las subclases pero heredaran la superclase
const miguelito2 = new EstudiantesFree(
    {
        name: "Miguelito",
        username: "miguelitoFeliz",
        age: 18,
        email: "miguelito@gmail.com",
        cursesAproved: [],
    }
);

const patricia = new EstudiantesBasic(
    {
        name: "Patricia",
        username: "gabypat",
        age: 38,
        email: "gaby@gmail.com"
    }
);

const mauri = new EstudiantesExpert(
    {
        name: "Mauricio",
        username: "mauOasis",
        age: 28,
        email: "mau@gmail.com"
    }
);

//Polimorfismo: Permite cambiar los metodos que hereda de la clase madre.

class Comentario {
    constructor({
        comentario,
        nombreDelQueComenta,
        rolDelQueComenta = "estudiante",
    }){
        this.comentario = comentario;
        this.nombreDelQueComenta = nombreDelQueComenta;
        this.rolDelQueComenta = rolDelQueComenta;
    }
    publicar(){
        console.log(this.nombreDelQueComenta + " (" + this.rolDelQueComenta + ")");
        console.log(this.comentario);
    }
}

const freddy = new EstudiantesTeacher(
    {
        name: "Freddy",
        username: "freddyVega",
        age: 38,
        email: "freddier@gmail.com",
    }
);
