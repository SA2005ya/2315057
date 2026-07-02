const express = require("express")
const app = express()
const logRoutes = require("./router/logrouter")

app.use(express.json())
app.use("/api/log", logRoutes)

const port = 4000

app.listen(port, () => {
  console.log(`server running on ${port}`)
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Stop the existing server or choose another port.`)
    process.exit(1)
  } else {
    console.error(err)
    process.exit(1)
  }
})