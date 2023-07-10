# Nebula Table utils

This repo will hold shared Components, hooks and util functions between sn-table and sn-pivot-table.

## Local development setup (Temporary)

Since we have issues with setting up and linking this repo to work properly within nebula environment, here is the temporay solution in case if you want to develop locally, otherwise install the package and it should be fine.

1. Make sure you run `chmod +x on ./build-utils/build-copy.sh` first
2. Create a `.env.local` file in your pkg project root
3. To Support and update `sn-pivot-table` and `sn-table` project with latest build, you will need two variables that points to the root directory of those project in your local machine called: `PV_TABLE_DIR` and `SN_TABLE_DIR`. Please note that the value of those variable **should be relative to the root directory of pkg repository**.

```bash
SN_TABLE_DIR="../SN_TABLE/in/your/machine"
PV_TABLE_DIR="../PIVOT_TABLE/in/your/machine"
```

4. now if you run `yarn build:watch`, whatever change you make into this directory will be copied to the node_modules of your local pivot table project.

**NOTE:** Pls keep in mind that this is a temporary solution, we will fix this as soon as possible.
