import express from "express"

let app = express()

app.get("/", (req, res) => {
	return res.send("hello there boi")
})

app.use(express.static("public"))

app.listen(3000)
