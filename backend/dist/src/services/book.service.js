"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const book_entity_1 = __importDefault(require("../entities/book.entity"));
class BookService {
    constructor() {
        this.db = db_1.default.getRepository(book_entity_1.default);
    }
    async listBooks() {
        return this.db.find();
    }
}
exports.default = BookService;
