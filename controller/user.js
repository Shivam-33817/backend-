import { json } from "express";
import User from "../model/user.js";
import  jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    if (!email || !firstname || !password || !lastname) {
      res.json({
        message: "Missing field",
        statusCode: 404
      })
    }

    const existUser = await User.findOne({ email });

    console.log("exist user", existUser)

    if (existUser) {
      res.json({
        message: "Email already exit.",
        statusCode: 404,
      })
    }

    const user = await User.create({
      email,
      firstname,
      lastname,
      password,
    })

    res.json({
      statusCode: 200,
      message: "User created successfully",
      user
    })

  } catch (error) {
    console.log("error", error)
  }
}

export const login = async (req, res) => {

  try {
    const { email, password } = req.body;

    // Checkinh user in db
    const existUser = await User.findOne({ email })
    if (!existUser) {
      res.json({
        message: "user does  not exist",
        statusCode: 200

      })
    }
     
    if(existUser?.password !== password){
       res.json({
        message: "Your password is incorrect",
        statusCode: 404,
       })
    }



    // const passwordMatch = await bcrypt.compare(password, user.password);

    // if (!passwordMatch) {
    //   return res.status(401).json({
    //     message: "Invalid email or password"
    //   });
    // }

    const token = jwt.sign(
      {
        userId: existUser?._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
      }
    );

    res.json({
      message: "Login successful",
      token
    });


  } catch (error) {
    console.log("error", error)
  }



}
