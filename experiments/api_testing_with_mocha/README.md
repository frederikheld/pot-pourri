# Example on testing a NodeJS microservice

This example shows end-to-end-testing for your api. It will fire up a real server inside a Docker container and run the tests against the real api.

## Excursion on what to test

Best practice in unit testing is to mock out all dependencies and just test what you have developed.

In this case the microservice is as small as a unit would usually be (that's why it's called "micro") and it's functionality heavily depends on express, which itself depends on many packages. This adds up to a kind of fragile construct. One of the downsides of the NodeJS environment. A mocking library for express might be even more unstable.

So to be sure that the service is running fine under real condition, it is tested by running the real express. This requires a environmet without side-effects and therefore the tests are running inside a Docker container.

# How to run the app

There's separate docker configurations for productive and testing environment.

## For production

For starting the production simply run

```
$ docker-compose up
```

To shut it down run

```
$ docker-compose down
```

## For testing without side-effects

If you you have defined volumes in your _docker-compose.test.yml_ you should make sure that they are removed before the containers are re-build:

```
$ docker-compose -f docker-compose.test.yml rm -f
```

For starting the testing environment run

```
$ docker-compose -f docker-compose.test.yml up --build
```

If you want to run multiple containers in your test environment, you have to add two arguments to the `docker-compose up` command to terminate all containers and return the exit code from the container that is running the tests:

```
$ docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from <container_name>
```

> If you have to run multiple containers, your app most probably is not a *micro*service anymore. Consider testing them separately!

The containers will automatically shut down and return an exit code (0 for "tests ok", 1 for "tests failed") after the tests are finished.

## For quick testing

Re-building and firing up the container takes some time. This might be annoying if you want to test in quick cycles like when developing test-driven.

In this case you can test the app outside a container by just running

```
$ npm test
```

Be aware that you have to make sure that there are no side-effects like another app running on the same port!

# Further readings

## Running tests inside Docker containers

- https://dzone.com/articles/testing-nodejs-application-using-mocha-and-docker
- https://stackoverflow.com/questions/32612650/how-to-get-docker-compose-to-always-re-create-containers-from-fresh-images

## Basics on testing

- How to Write Assertions Right: http://lucasfcosta.com/2017/01/02/How-to-Write-Assertions-Right.html
- Why Most Unit Testing Is Waste: https://rbcs-us.com/documents/Why-Most-Unit-Testing-is-Waste.pdf
- Eradicating Non-Determinism in Tests: https://martinfowler.com/articles/nonDeterminism.html

## Testing in NodeJS

- Testing NodeJS in 2018: https://hackernoon.com/testing-node-js-in-2018-10a04dd77391 #mocha #chai #sinon #nock #mock-require #istanbul
