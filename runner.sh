docker compose up --build -d


npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all