default() {
    start
}

start(){
    sudo docker-compose -f docker/docker-compose.dev.yml up && sudo docker-compose -f docker/docker-compose.dev.yml down
}