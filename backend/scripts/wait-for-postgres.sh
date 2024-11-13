POSTGRES_CONTAINER=$(docker ps -a -q -f name=postgres)

if ! timeout 90s bash -c "until docker exec ${POSTGRES_CONTAINER} pg_isready; do
  echo 'Waiting for PostgreSQL service...'
  sleep 5
done"; then
  echo "Timeout reached. PostgreSQL is not ready."
  exit 1
fi

echo ">> PostgreSQL is up!"