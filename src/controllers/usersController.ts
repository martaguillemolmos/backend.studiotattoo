import { Request, Response } from "express";
import { Users } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Crear nuevos usuarios
const createUser = async (req: Request, res: Response) => {
  //Lógica para crear usuarios
  try {
    // Recuperamos la información que nos envían desde el body
    const { name, surname, phone, email, password } = req.body;

    //Comprobamos que los campos requeridos para la creación están completos.
    if (
      !name ||
      !email ||
      !password ||
      name.trim() == "" ||
      email.trim() == "" ||
      password.trim() == ""
    )
      res.send({
        message: "Completa los campos obligatorios",
      });
    else {
      // Debemos comprobar que sigue el nombre, email y contraseña cumple con los requisitos.

      // Tras recuperar la información, debemos encriptar la contraseña antes de guardarla.
      const encryptedPassword = bcrypt.hashSync(password, 10);
      const newUser = await Users.create({
        name: name.trim(),
        surname: surname.trim(),
        phone,
        email: email.trim(),
        password: encryptedPassword.trim(),
      }).save();
      return res.send(newUser);
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

//Recuperar todos los usuarios
const getAllUsers = async (req: Request, res: Response) => {
  try {
    // lógica de la infor que recuperamos la información de TODOS los usuarios
    const users = await Users.find();
    if (users.length == 0) {
      return res.json("No hay usuarios registrados.");
    } else {
      return res.json(users);
    }
  } catch (error) {
    return res.json({
      succes: false,
      message: "No hemos podido recuperar los usuarios",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

//Login
const loginUser = async (req: Request, res: Response) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      req.body.email === "" ||
      req.body.password === ""
    ) {
      res.json({
        success: true,
        message: "Credenciales incorrectas",
      });
    }

    // Validación de que el email sea @
    // Validación que el password contiene como mínimo y como máximo.
    // Recuperamos los datos guardados en body
    const { email, password } = req.body;

    //Consultar en BD si el usuario existe
    const user = await Users.findOneBy({
      email: email.trim(),
    });

    // En el caso que el usuario no sea el mismo
    if (!user) {
      return res.status(403).json("Usuario o contraseña incorrecta");
    }
    //Comprobamos si el usuario está activo
    if (!user?.is_active) {
      return res.status(404).json("Usuario no activo.");
    }
    //Si el usuario si es correcto, compruebo la contraseña
    if (bcrypt.compareSync(password.trim(), user.password)) {
    }

    //En caso de que hayamos verificado que el usuario es correcto y se corresponde a la contraseña que hemos indicado, generar token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        is_active: user.is_active
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h",
      }
    );

    return res.json({
      success: true,
      message: `Bienvenid@ a tu perfil, ${user.name}`,
      token: token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Profile
const profileUser = async (req: any, res: Response) => {
  try {
    //para saber que usuario está accediendo
    const user = await Users.findOneBy({
      id: req.token.id,
    });
    // Añadimos que, si el usuario en el momento desactive la cuenta, ya no se le permite acceder a su perfil.
    if (!user) {
      return res.status(403).json("Usuario o contraseña incorrecta.");
    }
    
    if (!user?.is_active) {
      return res.status(404).json("Usuario no activo.");
    }

    return res.json({
      message: "Datos del perfil",
      data: user,
    });
  } catch (error) {
    return res.json({
      succes: false,
      message: "No se puede procesar la respuesta",
      // esto lo utilizamos para que nos salte el tipo de error
      error: error,
    });
  }
};

// Un usuario pueda modificar datos de su cuenta o inactivarla.
const updateUser = async (req: Request, res: Response) => {
  try {

    //Lógica actualizar usuario superadmin
    let user;
    if(req.token.role == 'super_admin' && req.token.is_active == true && req.params.id){
      console.log(req.params.id)
      user = await Users.findOne({
        where: {id: parseInt(req.params.id)},
      })
    } else if( req.token.role !== 'super_admin' && req.token.is_active == true){
    //Lógica para actualizar usuarios por su Id
      user = await Users.findOne({
      where: { id: req.token.id },
    });
    } else {
      return res.status(403).json({ message: "Usuario no autorizado"});
    }


    // Añadimos la siguiente función: verificar la contraseña que queremos modificar antes de realizar el cambio.
    const { name, surname, phone, email, is_active, password, passwordOld } =
      req.body;

    //Comprobamos que el usuario exista
    if (!user) {
      return res.status(403).json({ message: "Usuario no encontrado"});
    }
      // Comprobamos que la contraseña que se quiere modificar, no sea la misma que la actual y que coincida.
        //  Realizar la actualización en el caso que no se quiera actualizar el password
      let id;

      if( req.token.role === 'super_admin' && req.params.id){
        id = parseInt(req.params.id);
      } else {
        id = req.token.id;
      }
      await Users.update(
        {
          id: id,
        },
        {
          name,
          surname,
          phone,
          email,
          is_active,
        }
      );
      
      return res.json(
        `El usuario de ${name},ha sido actualizado con éxito.`
      );
    } catch (error) {
    console.log("error",error);
    return res.json({
      succes: false,
      message: "El usuario no ha sido actualizado.",
      error: error,
    });
  }
};

// Superadmin y usuario puede actualizar la información de usuario, dependiendo de la ruta.
const updateUsersById = async (req: Request, res: Response) => {
  try {
    //Lógica para actualizar usuarios por su Id
    const userId = req.body.id;

    // Añadimos la siguiente función: verificar la contraseña que queremos modificar antes de realizar el cambio.
    const { name, surname, phone, email, is_active, password, role } = req.body;

    // Comprobamos que el usuario exista y, recuperamos la información de user.name para poder mostrarla más tarde.
    const user = await Users.findOne({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (password) {
      const encryptedPassword = bcrypt.hashSync(password, 10);
      await Users.update(
        {
          id: parseInt(userId),
        },
        {
          name,
          surname,
          phone,
          email,
          is_active,
          password: encryptedPassword,
          role,
        }
      );
    } else {
      //  Realizar la actualización en el caso que no se introduzca el password
      await Users.update(
        {
          id: parseInt(userId),
        },
        {
          name,
          surname,
          phone,
          email,
          is_active,
          role,
        }
      );
    }
    return res.json(
      `El usuario de ${user.name},ha sido actualizado con éxito.`
    );
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

//Lógica para eliminar usuario por el Id
const deleteUserbyId = async (req: Request, res: Response) => {
  try {
    // Recuperamos el valor del id a eliminar por el body.
    const userIdToDelete = req.body.id;
    const userToRemove = await Users.findOneBy({
      id: parseInt(userIdToDelete),
    });
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

export {
  getAllUsers,
  loginUser,
  profileUser,
  createUser,
  updateUser,
  updateUsersById,
  deleteUserbyId,
};
