import { Request, Response } from "express";
import { Users } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "class-validator";

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
      return res.send({
        message: "Completa los campos obligatorios",
      });
    else {
      // Debemos comprobar que sigue el nombre, email y contraseña cumple con los requisitos.

      // Tras recuperar la información, debemos encriptar la contraseña antes de guardarla.
      const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
      const Uservalidate = new Users();
      Uservalidate.name = name;
      Uservalidate.surname =surname;
      Uservalidate.phone = phone;
      Uservalidate.email = email;
      Uservalidate.password = password

      const errorValidate = await validate(Uservalidate);

      if(errorValidate.length>0){
        return res.status(404).json(errorValidate);
      }
      const newUser = await Users.create({
        name: name.trim(),
        surname: surname.trim(),
        phone,
        email: email.trim(),
        password: encryptedPassword,
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
     // Recuperamos los datos guardados en body
     const { email, password } = req.body;
    if (
      !req.body.email ||
      !req.body.password ||
      req.body.email.trim() === "" ||
      req.body.password.trim() === ""
    ) {
      return res.json({
        success: true,
        message: "Credenciales incorrectas",
      });
    }

    // Validación de que el email sea @
    // Validación que el password contiene como mínimo y como máximo.
   
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
    console.log(user.password)
    if (bcrypt.compareSync(password.trim(), user.password)) {
      //En caso de que hayamos verificado que el usuario es correcto y se corresponde a la contraseña que hemos indicado, generar token
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          is_active: user.is_active,
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
    } else {
      return res.status(403).json ({ message: "Usuario o contraseña incorrecta."})
    }
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

// Superadmin y usuario puede actualizar la información de usuario, dependiendo de la ruta.
const updateUser = async (req: Request, res: Response) => {
  try {
    
    let user;
    if (
      req.token.role == "super_admin" &&
      req.token.is_active == true &&
      req.params.id
    ) {
      console.log(req.params.id);
      user = await Users.findOne({
        where: { id: parseInt(req.params.id) },
      });
    } else if (
      req.token.role !== "super_admin" &&
      req.token.is_active == true
    ) {
      //Lógica para actualizar usuarios por su Id
      user = await Users.findOne({
        where: { id: req.token.id },
      });
    } else {
      return res.status(403).json({ message: "Usuario no autorizado" });
    }

    // Indicamos los datos que se pueden actualizar a través de esta ruta.
    const { name, surname, phone, email, is_active } = req.body;

    //Comprobamos que el usuario exista
    if (!user) {
      return res.status(403).json({ message: "Usuario no encontrado" });
    }
    // Declaramos el id, de esta forma, podemos indicar en el caso que sea super admin, el id del usuario que queremos modificar lo recuperaremos de la búsqueda o bien,
    //en el caso que sea el propio usuario que quiera modificar sus datos, el id lo recuperamos del token.
    let id;

    if (req.token.role === "super_admin" && req.params.id) {
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

    return res.json(`El usuario de ${name},ha sido actualizado con éxito.`);
  } catch (error) {
    console.log("error", error);
    return res.json({
      succes: false,
      message: "El usuario no ha sido actualizado.",
      error: error,
    });
  }
};

// Usuario puede actualizar el password.
const updatePassword = async (req: Request, res: Response) => {
  try {
    //Lógica actualizar el password
    let user;

    if (req.token.is_active == true) {
      //Lógica para actualizar usuarios por su Id
      user = await Users.findOne({
        where: { id: req.token.id },
      });
    } else {
      return res.status(403).json({ message: "Usuario no autorizado" });
    }

    // Campos que nos pueden enviar a través del body para ser modificados.
    const { password, passwordOld } = req.body;
    if (password.trim() == ""){
      return res.json ("Debes añadir un campo.")
    }

    //Comprobamos que el usuario exista
    if (!user) {
      return res.status(403).json({ message: "Usuario no encontrado" });
    }


    if (passwordOld !== password) {

      if (bcrypt.compareSync(passwordOld, user.password)) {
        console.log("aqui entra");
        const encryptedPassword = bcrypt.hashSync(password, 10);
        await Users.update(
          {
            id: req.token.id,
          },
          {
            password: encryptedPassword,
          }
        );
        return res.status(202).json("Contraseña modificada")
      } else {
        return res.status(401).json({
          message: "La contraseña no coincide, vuelva a intentarlo.",
        });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Recuerda: La contraseña debe ser diferente." });
    }
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
  updatePassword,
  deleteUserbyId,
};
