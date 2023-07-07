# Table Common

This repo will hold shared Components, hooks and util functions between sn-table and sn-pivot-table.


PRESERVE REACT IMPORTS ON MODULES
https://stackoverflow.com/questions/72644994/prettier-removes-react-import-on-pressing-save-button-ctrl-s-how-to-fix




# Local development
1. Make sure you run `chmod +x on ./build-copy.sh` first
2. Create a `.env.local` file in root of your project
3. Add an env variable called `PVT_NODE_MODULES_DIR` assign it to the `node_modules` folder of pivot table in your local machine, relative to the root directory of this repository.
```
PVT_NODE_MODULES_DIR="../PIVOT_TABLE/node_modules"
```

4. now if you run `yarn build:watch`, whatever change you make into this directory will be copied to the node_modules of your local pivot table project. 

**NOTE:** Pls keep in mind that this is a temporary solution, we will fix this as soon as we can
