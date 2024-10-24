"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatutReservation = exports.UserRoleEnum = void 0;
var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum["admin"] = "ADMIN";
    UserRoleEnum["user"] = "USER";
})(UserRoleEnum || (exports.UserRoleEnum = UserRoleEnum = {}));
var StatutReservation;
(function (StatutReservation) {
    StatutReservation["AWAITING"] = "en_attente";
    StatutReservation["CONFIRMATION"] = "confirm\u00E9e";
    StatutReservation["PAID"] = "pay\u00E9e";
    StatutReservation["CANCEL"] = "annul\u00E9e";
    StatutReservation["FINISHED"] = "termin\u00E9e";
})(StatutReservation || (exports.StatutReservation = StatutReservation = {}));
