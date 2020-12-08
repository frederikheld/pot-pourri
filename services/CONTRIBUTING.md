# Contributing

Here's some notes for contributors.

## Styleguide

Some best practices to keep things clean and maintainable.

### Self-Sufficiency

Treat each service as it would be a completely independend project. Document everything the users and devops people need to know to deal with the service. Make it run independently from other services, even if it would usually operated together with other services.

### Docker & docker-compose

Always use the specific version of a Docker image as base image instead of `latest`. This makes sure that major changes don't break the service. If the base image adheres to [Semantic Versioning](https://semver.org/) use the tag of the respective minor version. This way non-breaking patches are applied automatically which improves security.