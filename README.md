Brand new Stickerity
====================

1. Install [docker-ce](https://www.docker.com/community-edition).

2. Copy and modify configuration files.

    ```sh
    cp docker-compose.dev.yml.sample docker-compose.dev.yml
    cp .env.sample .env.dev
    ```

3. Run docker-compose.

    ```sh
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
    ```

4. Open `http://localhost:5000/` in your browser.

