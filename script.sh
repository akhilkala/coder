default() {
    start
}

start(){
     docker-compose -f docker/docker-compose.dev.yml up &&  docker-compose -f docker/docker-compose.dev.yml down
}

stop(){
    docker-compose -f docker/docker-compose.dev.yml down
}

"${@:-default}"
