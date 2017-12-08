package main

import (
	"log"

	"github.com/glassechidna/codechk/actions"
)

func main() {
	app := actions.App()
	if err := app.Serve(); err != nil {
		log.Fatal(err)
	}
}
