import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,  // Male is true and Female is false
                roleId: data.roleId, // default user
            });
            resolve('Create new user success');
        } catch(err){} {
            reject(err);
            console.log('error: ', err);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try{
            var hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword);
        } catch(err){
            reject(err);
        }
        
    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,// để chỉ query dữ liệu gốc
            });
            resolve(users);
        } catch (err) {
            reject(err);
        }
    })
}

let getUserInfoById = (userId) => {
   return new Promise(async (resolve, reject) => {
       try {
           let user = await db.User.findOne({
               where: { id: userId },
               raw: true,
           });
           if(user){
               resolve(user);
           } else {
               resolve({});
           }
       } catch (err) {
           reject(err);
       }
   }) 
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
       try {
            let user = await db.User.findOne({
                where:{id : data.id},
                raw: false,
            });
            // console.log('user: ', user);
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                // await db.User.update({user});
                let allUsers = await db.User.findAll()
                resolve(allUsers);
            } else {
                console.log("User is not instance of Sequelize!")
                resolve({});
            }
       } catch (err) {
            console.log('err: ', err);
            reject(err);
       }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: { id: userId },
                raw: false,// dòng này để đảm bảo user là instance của Sequelize
            });
            
            if (user) {
                // await db.User.destroy({
                //     where: { id: id },
                // });
                await user.destroy();
                resolve('Delete user success!'); // === return
            } else {
                resolve('User not found!');
            }
        } catch(err){
            console.log('err: ', err);
            reject(err);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}