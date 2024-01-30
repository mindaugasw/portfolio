# portfolio

### Building website

- Start builder container: `docker compose up --build`
- Open shell inside the container: `docker exec -it portfolio-builder bash`

Commands inside the container:
- Rebuild app: `gulp build`
- Watch & rebuild: `gulp watch`
- Serve files & hot reload: `gulp reload`

Optionally, you can create local variables file (`cp src/variables.json src/variables.local.json`) to locally override variables. E.g. to enable `devEnvironment`. 
