import { Request, Response } from "express";
import { validate } from 'class-validator'
import { Users } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createUser = async (req: Request, res: Response) => {
  //Lógica para crear usuarios
  try {
    // Recuperamos la información que nos envían desde el body
    const { name, surname, phone, email, password, role } = req.body;
    // Tras recuperar la información, debemos encriptar la contraseña antes de guardarla.
    const encryptedPassword = bcrypt.hashSync (password, 10)
    const newUser = new Users(); 
    
    newUser.name = name;
    newUser.email = email;
    newUser.surname = surname;
    newUser.password = encryptedPassword;
    newUser.phone = phone;
    

    const errors = await validate(newUser);
    console.log("LOS ERRORES",errors)
     if(errors.length > 0 ){
      return res.json(errors);
     } else {
      const user = await Users.create({...newUser}).save();
      return res.json(user);
     }
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha creado usuario",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    // lógica de la infor que recuperamos la información de TODOS los usuarios
    const users = await Users.find();
    return res.json(users);
  } catch (error) {
    return res.json({
      succes: false,
      message: "No hemos podido recuperar los usuarios",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    //Lógica para poder acceder

    // Recuperamos los datos guardados en body
    const { email, password } = req.body;

    //Consultar en BD si el usuario existe
    const user = await Users.findOneBy({
      email,
    });

    // En el caso que el usuario no sea el mismo
    if (!user) {
      return res.status(404).json("Usuario o contraseña incorrecta");
    }

    //Si el usuario si es correcto, compruebo la contraseña
    if (bcrypt.compareSync(password, user.password)) {
      // return res.json("Bienvenido " + user.name);
    }

    //generar token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      "akiXi",
      {
        expiresIn: "2h",
      }
    );

    return res.json({
      success: true,
      message: "User logged successfully",
      token: token,
    });

  } catch (error) {
    return res.status(500).json(error);
  }
}

// una vez ya hemos añadido nuestro middleware, que en este caso es auth, podemos chequear la ruta.
const profileUser = async(req: any, res: Response) => {
  try {
      //para saber que usuario está accediendo
  const user = await Users.findOneBy(
    {
      id:req.token.id
    },
    
  )
  return res.json({
    message: "Datos del perfil",
    data: user
  });
  } catch (error) {
    return res.json ({
      succes: false,
      message: "No se puede procesar la respuesta",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error
  })
  }

};

const updateUserById = async (req: Request, res: Response) => {
  try {
    //Lógica para actualizar usuarios por su Id
    const userId = req.params.id;
    const { name, password } = req.body;
    
    await Users.update(
      {
        id: parseInt(userId),
      },
      {
        name,
        password
      }
    );
    return res.json("Ha sido actualizado con éxito.");
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha actualizado el usuario",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

const deleteUserbyId = async(req: Request, res: Response) => {
  try {
      //Lógica para eliminar usuario por el Id
      const userIdToDelete = req.params.id;
      const userToRemove = await Users.findOneBy (
        {
        id: parseInt(userIdToDelete),
      }
      )
  
      const userRemoved = await Users.remove(userToRemove as Users);
      if (userRemoved) {
        return res.json("Se ha eliminado el usuario correctamente");
      }

  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      message: "No se ha eliminado el usuario",
      error: error,
    });
  }
};

export { getUser, loginUser, profileUser, createUser, updateUserById, deleteUserbyId };
