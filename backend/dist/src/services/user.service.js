"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = __importDefault(require("../entities/user.entity"));
const db_1 = __importDefault(require("../db"));
class UserService {
    constructor() {
        this.db = db_1.default.getRepository(user_entity_1.default);
    }
    async findUser(id) {
        const user = await this.db.findOneBy({ id });
        if (!user) {
            throw new Error("Ce matériel n'existe pas");
        }
        return user;
    }
    async listUser() {
        return this.db.find();
    }
    async findUserByEmail(email) {
        return await this.db.findOneBy({ email });
    }
    async findUserById(id) {
        return await this.db.findOne({
            where: { id },
            relations: {
                reservations: true
            }
        });
    }
    async createUser({ email, password, lastName, firstName, phone, }) {
        const newUser = this.db.create({
            email,
            password,
            lastName,
            firstName,
            phone,
        });
        return await this.db.save(newUser);
    }
    async deleteUser(id) {
        const user = (await this.findUser(id));
        await this.db.remove(user);
        return { ...user, id };
    }
    async updateUser(infos, id) {
        const userToUpdate = (await this.findUser(id));
        const userToSave = this.db.merge(userToUpdate, {
            ...infos
        });
        return await this.db.save(userToSave);
    }
    async createAdminUser(infos) {
        const createdAdminUser = this.db.create(infos);
        console.log('createdAdminUser: ', createdAdminUser);
        return await this.db.save(createdAdminUser);
    }
    async adminDeleteUser(id) {
        const user = (await this.findUserById(id));
        const deletedUser = await this.db.remove(user);
        return { ...deletedUser, id };
    }
}
exports.default = UserService;
