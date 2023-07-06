# Table Common

This repo will hold shared Components, hooks and util functions between sn-table and sn-pivot-table.



PRESERVE REACT IMPORTS ON MODULES
https://stackoverflow.com/questions/72644994/prettier-removes-react-import-on-pressing-save-button-ctrl-s-how-to-fix



SO FAR WORKING SOLUTION 

linking sn-pivot table and sn-table react -> to use the react instance from table-common since making sure what ever project using react (and creating it's own instance) points to one single instance that comes from source of shared repo

in this case shared repo is table-common So for local development what ever project using table-common should point to that react instance!

### why not table-repo's react points to host projects react instance? 
because in that case if you want to test samoultaniously with both repos (sn-table + sn-pivot-table) it will fail to manage react instances