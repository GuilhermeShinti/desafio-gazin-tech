docker compose up --build -d

./backend/scripts/wait-for-postgres.sh
./backend/scripts/prepare_database.sh