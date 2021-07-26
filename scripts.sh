default() {
    start
}

start(){
    docker-compose -f docker/docker-compose.dev.yml up && sudo docker-compose -f docker/docker-compose.dev.yml down
}