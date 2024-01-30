# portfolio

### Building website

- Start builder container: `docker compose -f builder/docker-compose.yml up --build`
- Open shell inside the container: `docker exec -it portfolio-builder bash`

Commands inside the container:
- Rebuild app: `gulp build`
- Watch & rebuild: `gulp watch`
- Serve files & hot reload: `gulp reload`
