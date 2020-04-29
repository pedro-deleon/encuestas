
cursos
    nombre : string
    descripcion: string
    instructor : string
    preguntas: Array<string>

participante
    nombre : string
    apellido paterno : string
    apellido materno : string
    correo electrónico : string
    github repo : string
    res_curso: Array<res_curso>


res_curso 
    nombre  : string
    respuestas : Array<qa>  


qa
    pregunta : string
    respuesta : string