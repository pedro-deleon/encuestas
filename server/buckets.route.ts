import {Request, Response} from "express"
const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-1'})
let s3 = new AWS.S3({apiVersion: '2006-03-01'})


export function obtenerBuckets(req: Request, res: Response){

  s3.listBuckets(function(err,data){
    if(err){
      res.status(404).json(err)
    }else{
      res.status(200).json(data);
    }
  })
}

