# Nebula Table utils

This repo will hold shared Components, hooks and util functions between sn-table and sn-pivot-table.

## Local development setup (Temporary)

Since we have issues with setting up and linking this repo to work properly within nebula environment, here is the temporay solution in case if you want to develop locally, otherwise install the package and it should be fine.

1. Make sure you run `chmod +x on ./build-utils/build-copy.sh` first
2. Create a `.env.local` file in root of your project
3. Add an env variable called `PVT_NODE_MODULES_DIR` assign it to the `node_modules` folder of pivot table in your local machine, relative to the root directory of this repository.

```bash
PVT_NODE_MODULES_DIR="../PIVOT_TABLE/node_modules"
```

4. now if you run `yarn build:watch`, whatever change you make into this directory will be copied to the node_modules of your local pivot table project.

**NOTE:** Pls keep in mind that this is a temporary solution, we will fix this as soon as we can
