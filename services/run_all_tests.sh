#!/bin/sh

# Service metastore

cd metastore
npm install

npm test

if [ $? -eq 0 ]
then
    echo "\n### Metastore passed.\n"
else
    echo "\n### Metastore failed. See output above!\n"
    exit 1
fi

cd ..


# Service webapp

cd webapp
npm install

npm run lint

if [ $? -eq 0 ]
then
    echo "\n### Webapp linting passed.\n"
else
    echo "\n### Webapp linting failed. See output above!\n"
    exit 1
fi


npm run test:unit

if [ $? -eq 0 ]
then
    echo "\n### Webapp unit tests passed.\n"
else
    echo "\n### Webapp unit tests failed. See output above!\n"
    exit 1
fi

# npm run test:e2e

# if [ $? -eq 0 ]
# then
#     echo "\nWebapp e2e tests passed.\n"
# else
#     echo "\nWebapp e2e tests failed. See output above!\n"
# fi

echo "\n### Webapp e2e tests skipped - not utilized yet."

cd ..

echo "\n### All testes have passed :-)\n"