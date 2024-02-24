// server.ts
import express from "express"

// Create a new express application instance
const app = express()

// Express middleware parse json
app.use(express.json())

// Import the user routes
import userRoutes from "./routes/UserRoutes"

// Use the user routes
app.use("/users", userRoutes)

// Start the server
const port = process.env.PORT || 3000
app.listen(3000, () => {
  console.log(`Server listening on port ${port}`)
})
