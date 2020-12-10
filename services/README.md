# Pot Pourri Services

Pot Pourri consists of a collection of independent services that run in Docker containers.

## For Users

To make usage easier, they all follow the same pattern:

You can start and stop them individually using `docker-compose`. See the individual docs of each service for details!

You can start and stop all at once using the `start_all.sh` and `stop_all.sh` scripts, which help you to start and stop them in the right order. `start_all.sh` also allows you to run the core services only. This is especially useful if your run _Pot Pourri_ on low-spec hardware like the _Raspberry Pi_.

## For Developers

For developers there's a helper script `run_all_tests.sh` that runs all tests. You can use it in your CI pipeline, but be aware that this is very limited at the moment, as most services aren't sufficiently testes yet and also the script doesn't run them in parallel, which would save a lot of time.

Please have a look into the [CONTRIBUTING.md](./CONTRIBUTING.md) to read the styleguide for developing the services.
