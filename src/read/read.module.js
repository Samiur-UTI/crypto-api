"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReadModule = void 0;
var common_1 = require("@nestjs/common");
var read_controller_1 = require("./read.controller");
var read_service_1 = require("./read.service");
var typeorm_1 = require("@nestjs/typeorm");
var transaction_entity_1 = require("../entities/transaction.entity");
var parsing_1 = require("../utils/parsing");
var ReadModule = /** @class */ (function () {
    function ReadModule() {
    }
    ReadModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([transaction_entity_1.Transactions])],
            providers: [read_service_1.ReadService, parsing_1.ParsingService],
            controllers: [read_controller_1.ReadController]
        })
    ], ReadModule);
    return ReadModule;
}());
exports.ReadModule = ReadModule;
