"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.RegisterController = void 0;
var common_1 = require("@nestjs/common");
var RegisterController = /** @class */ (function () {
    function RegisterController(registerService) {
        this.registerService = registerService;
    }
    RegisterController.prototype.create = function (createRegisterDto) {
        return this.registerService.create(createRegisterDto);
    };
    RegisterController.prototype.findAll = function (query) {
        return this.registerService.findAll(query);
    };
    RegisterController.prototype.findOne = function (username) {
        return this.registerService.findOne(username);
    };
    RegisterController.prototype.findStudent = function (query) {
        console.log('body', query);
        return this.registerService.findStudent(query);
    };
    RegisterController.prototype.update = function (id, updateRegisterDto) {
        return this.registerService.update(+id, updateRegisterDto);
    };
    RegisterController.prototype.remove = function (id) {
        return this.registerService.remove(+id);
    };
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], RegisterController.prototype, "create");
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query())
    ], RegisterController.prototype, "findAll");
    __decorate([
        common_1.Get(':username'),
        __param(0, common_1.Param('username'))
    ], RegisterController.prototype, "findOne");
    __decorate([
        common_1.Post('student'),
        __param(0, common_1.Query())
    ], RegisterController.prototype, "findStudent");
    __decorate([
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], RegisterController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], RegisterController.prototype, "remove");
    RegisterController = __decorate([
        common_1.Controller('register')
    ], RegisterController);
    return RegisterController;
}());
exports.RegisterController = RegisterController;
