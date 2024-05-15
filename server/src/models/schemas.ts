import { Request, Response } from "express";
import db from "../config/dbConnect";

const createSchemas = async(req: Request, res: Response)=> {
    try {
        //Connect to the PostgreSQL server
        // db.connect;

        // Create the schemas
        await db.pool.query(
            `
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            
            CREATE TABLE IF NOT EXISTS users (
                _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                timestamps TIMESTAMP DEFAULT NOW()
            );
            
            CREATE TABLE IF NOT EXISTS passwords (
                _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                websiteName VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                iv VARCHAR(255) NOT NULL,
                timestamps TIMESTAMP DEFAULT NOW(),
                createdBy UUID REFERENCES users(_id)
            )
            `
        );
        res.status(200).json('Schemas created successfully!');
        
    } 
    catch(error) {
      console.error('Error creating schemas:', error);
      res.status(500).json('internal server error')
    }
}

export default createSchemas;