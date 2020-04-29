import { Request, Response } from 'express';
const pdf = require('html-pdf');





const options = {
    format: 'A3',
    orientation: 'landscape'
}






export function obtenerCertificado(request: Request, response: Response) {

    pdf.create(html, options).toFile('./html-pdf.pdf', function (err, res) {
        if (err) {
            console.log(err);
        } else {
            response.sendStatus(200);
            console.log(res);
        }
    });

    /**
     * Aquí debo obtener el request que tiene la info para generar el certificado
     * Y enviar como response el certificado
     */
}

function crearCertificado(participante: string, horas: string, capacitacion: string, instructor: string, pagina: string) {
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
                  margin: 0;
                  font-family: 'Ubuntu', sans-serif;
                }
                
                .reksai-container{
                  position: relative;
                  width: 100%;
                  height: 1122px;
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
                  margin-top: 150px;
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
                <div>{{fecha}}</div>
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


/** crear certificado */