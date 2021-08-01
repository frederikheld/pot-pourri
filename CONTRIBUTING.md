# How to Contribute

Contributions to this repository are very welcome. To see where you can help, please have a look into the issues (especially those that are tagged as "help wanted") and see if you can submit a pull request that implements one of it. Also, specific areas I need help with are listed in the section _Help Wanted_ below.

I'm happy to discuss details with you before you start to work.

You can also submit pull requests for fixes and features that are not listed in the issues. If I like it, I will merge it ;-)

## Contributors License Agreement

With submitting a Pull Request, you confirm that you own the intellectual property to the changes you have submitted and have the right to license your contribution.

You also agree to transfer the copyright to said changes to the owner of this repository.

In exchange, you are free to use the code in this repository under the terms of the license stated in [LICENSE.md](LICENSE.md).

## Submit a Pull Request

Before you open a pull request, make sure that your branch is up to date with _master_.

Also make sure that all tests run through. You can run all tests with

```sh
$ cd services
$ sh run_all_tests.sh
```

## Help Wanted

_service/webapp_ lacks e2e tests because I don't know enough about Cypress yet. I would appreciate your help with testing it! Most useful would be checks if all views render without throwing errors on the console.

## Recommended Reads

* [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)