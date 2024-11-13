BACKEND_CONTAINER=$(docker ps -aq --filter 'name=backend')

WORKDIR="/usr/src/app"

docker exec -w $WORKDIR -i $BACKEND_CONTAINER npx sequelize-cli db:create
docker exec -w $WORKDIR -i $BACKEND_CONTAINER npx sequelize-cli db:migrate
docker exec -w $WORKDIR -i $BACKEND_CONTAINER npx sequelize-cli db:seed:all

echo "Database setup completed."