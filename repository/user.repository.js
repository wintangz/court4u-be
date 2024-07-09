"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
class UserRepository {
    static getInstance() {
        if (!UserRepository.Instance) {
            UserRepository.Instance = new UserRepository();
        }
        return UserRepository.Instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.user.findMany();
        });
    }
    getUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ options }) {
            return yield prisma_1.default.user.findFirst(options);
        });
    }
    // create new user
    createNewUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ options }) {
            return yield prisma_1.default.user.create(options);
        });
    }
    updateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ options }) {
            return yield prisma_1.default.user.update(options);
        });
    }
    upsertUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ options }) {
            try {
                return yield prisma_1.default.user.upsert(options);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.UserRepository = UserRepository;
