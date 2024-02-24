"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
// Create a new express application instance
const app = (0, express_1.default)();
// Express middleware parse json
app.use(express_1.default.json());
// Import the user routes
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
// Use the user routes
app.use("/users", UserRoutes_1.default);
// Start the server
const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map