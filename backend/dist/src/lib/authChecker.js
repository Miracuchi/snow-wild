"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAuthChecker = void 0;
const customAuthChecker = ({ context }, roles) => {
    if (context.user) {
        //si l 'utilisateur est connecté
        //vérifier que le user à le role demandé si le tableau de roles à une longueur > 1
        console.log('context: ', context);
        if (roles.length > 0) {
            // si un role est indiqué au décorateur
            console.log('role: ', roles);
            if (roles.includes(context.user.role)) {
                //et que le user a le role parmi ce tableau
                return true; //on laisse passer
            }
            else {
                //sinon
                return false; //on bloque
            }
        }
        return true; //si le user est connecté et qu'on a pas spécifié de rôle, on laisse passer
    }
    return false; //si le user n'est pas connecté quand on utilise le décorateur, on bloque
};
exports.customAuthChecker = customAuthChecker;
