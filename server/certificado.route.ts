import {Request, Response} from 'express';
import {sessionStore} from "./user/session-store";
import {agregarRespuestasPorUsuario} from "./encuestas/respuestas-mongo";
const fs = require('fs')
const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});




const pdf = require('html-pdf');

const options = {
  width: "900px",
  height: "550px"
}


export function generarCertificado(request: Request, response: Response) {

  const sessionId = request.cookies['SESSIONID'];
  let s3 = new AWS.S3({apiVersion: '2006-03-01'})
  const user = sessionStore.findUserBySessionId(sessionId);




  if (!sessionStore.isSessionValid(sessionId)) {
    response.sendStatus(403);
  } else {
    const html: string = crearCertificado(
      request.body.fechaEmision,
      request.body.participante,
      request.body.horasCurso,
      request.body.curso.nombre,
      request.body.instructorCurso,
      request.body.pagina
    )



    pdf.create(html,options).toStream(function(err,stream){

      let uploadParams = {Bucket: 'encuestas-cdis', Key: '', Body: ''}

      uploadParams.Body = stream;
      const path = require ('path')

      uploadParams.Key = path.basename(`/certificados/${request.body.participante}`)



      agregarRespuestasPorUsuario(user, request.body.preguntasEncuesta, request.body.curso, response).then(
        (value)=> {
          if(value === 1){

            s3.upload(uploadParams, function(err,data){
              if(err){
                console.log("Error", err);
              } if(data){
                console.log("Upload Sucess", data.Location)
                console.log(`Certificado de ${request.body.participante} creado con éxito`);
                response.status(200).json({mensaje: 'Certificado creado con éxito'})
              }
            })
          }else if(value === 0){
            response.sendStatus(403);
          }

        }
      )
    });

  }
}


/**
 *
 * @param req
 * @param res
 */
export function obtenerCertificadoPorUsuarioAndCurso(req: Request, res: Response){
  /**
   * En base al nombre del usuario voy a obtener el certificado de ese usuario
   * */

  const sessionId = req.cookies['SESSIONID'];

  const nombre = req.body.nombre;
  const cursoAbr = req.body.cursoAbr;
  console.log(req.body.nombre)
  console.log('Body obtener certificado')
  console.log(req.body);


  if (!sessionStore.isSessionValid(sessionId)) {
    res.sendStatus(403);
  }else{
    res.sendFile(`./certificados/${nombre}/${cursoAbr}.pdf`,{root: __dirname});
  }


}


function crearCertificado(fechaEmision: string, participante: string, horas: string, capacitacion: string, instructor: string, pagina: string) {
  const html = `<!doctype html>
        <html>
           <head>
                <meta charset="utf-8">
                <title>PDF Result Template</title>
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">
                <style>
                /*
                  oscuro : #343434
                  blancoso: #ffffff
                */
                body,html{
                  position: relative;
                  margin: 0;
                  font-family: 'Ubuntu', sans-serif;
                  letter-spacing: 2.5px;
                }

                .reksai-container{
                  width: 100%;
                  height: 900px;
                  background-color: #ffffff;
                  color: white;

                }

                .header{
                  width: 100%;
                  height: 150px;
                  background-color: #343434;
                  color: white;
                }



                .header img{
                    margin-left: 15px;
                }

                .header div{
                    margin-right: 45px;
                    float: right;
                    margin-top: 60px;
                }

                .curso-info{
                  text-align: center;
                  color: #343434;
                }

                .curso-info .cabecera{
                  font-size: 2.5em;
                  margin-bottom: 0px;
                }

                .curso-info .bold-text{
                  font-size: 3.4em;
                  font-weight: bold;
                  margin-bottom: 0px;
                  margin-top : 0px;
                }

                .curso-info .simple-text{
                  font-size: 1.5em;
                }


                .footer{
                  position: absolute;
                  bottom: 0;
                  width: 100%;
                  text-align: left;
                  color: #343434;
                }

                .cnt-instructor{
                  margin-top: 110px;
                  font-size: 1.5em;
                }

                .cnt-instructor hr{
                  width: 20%;
                  margin-top: 0px;
                }

                .footer p{
                  margin-left: 30px;
                }
                </style>
            </head>
            <body>
                <div class="reksai-container">
                <div class="header">
                <div>Emitido el ${fechaEmision}</div>
                <img src="https://raw.githubusercontent.com/pedro-deleon/my-assets/master/cdis-logo.png" alt="logo cdis uanl" width="220">

                </div>

                <div class="curso-info">
                <p class="cabecera">Esto certifica que</p>
                <p class="bold-text">${participante}</p>
                <p class="simple-text">completo exitosamente la capacitación:</p>
                <p class="bold-text">${capacitacion}</p>
                <p class="simple-text">representando aproximadamente ${horas} horas de trabajo</p>
                <div class="firma-instructor">

                </div>

                <div class="cnt-instructor">
                    <img src="https://raw.githubusercontent.com/pedro-deleon/my-assets/master/sign.png" alt="firma instructor" width="150">
                    <hr>
                    <p class="instructor">${instructor}</p>
                    <p class="instructor">Instructor, CDIS UANL</p>
                </div>
                </div>


                <div class="footer">
                <p>Puedes verificar esta certificación en: ${pagina}</p>
                </div>

                </div>
            </body>
        </html>
    `;

  return html;
}


