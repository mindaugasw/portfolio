# portfolio

### Building website

- Copy variables file: `cp src/variables.example.json src/variables.json` and fill variables
- Start builder container: `docker compose -f builder/docker-compose.yml up --build`
- Open shell inside the container: `docker exec -it portfolio-builder bash`

Commands inside the container:
- Rebuild app: `gulp build`
- Watch & rebuild: `gulp watch`
- Serve files & hot reload: `gulp reload`
