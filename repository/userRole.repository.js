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
exports.UserRoleRepository = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
class UserRoleRepository {
    static getInstance() {
        if (!this.Instance) {
            this.Instance = new UserRoleRepository();
        }
        return this.Instance;
    }
    addUserRole(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, roleId, }) {
            try {
                return yield prisma_1.default.userRole.create({
                    data: {
                        userId,
                        roleId,
                    },
                });
            }
            catch (e) {
                throw Error(e.message);
            }
        });
    }
    findUserRole(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.userRole.findMany({
                where: Object.assign({}, data),
            });
        });
    }
    deleteUserRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.default.userRole.delete({
                    where: {
                        id,
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.UserRoleRepository = UserRoleRepository;
