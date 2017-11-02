Guided Tour 3.0
===============

Supporting multiple Business Intelligence dashboard applications with a unified touring functionality.

Support BI Applications:
	- Microstrategy (Under construction)
	- Tableau (Under construction)
	- Spotfire (Under construction)
	- Qlik (Under construction)


## Using

### Loading of script
1. Go to any Reports page and choose a report where Guided Tour is to added
2. Add the script with `id="guided-tour-script"` to the page header, e.g. `<script id="guided-tour-script" src="url-of-builded-script"></script>`
3. Add proper attributes described guided popup forms need to be opened on user actions, e.g. `<button gt-onclick="showConfigPopup">Config</button>`.
   <br>List of allowed attributes:
    * onclick: `gt-onclick`

**Attention:**
The script adds a tag `<div id="guided-tour-root"></div>` to the end of body of the document. 


## Development	
	
### Requirements
* Optional: Node Version Manager to switch between NodeJS versions (this item can be skipped if the proper NodeJS version is already installed). Check it with `nvm --version`
* NodeJS v6.11+. Check it with `node -v`
* Node Package Manager v3.10+. Check it with `npm -v`

### Installation of dependencies
1. Clone a repository: `git clone git@gitbud.epam.com:epm-eard/guided-tour-3.0.git`
2. Go to the cloned repository: `cd guided-tour-3.0`
3. Make sure that NodeJS version is right:
    * if NVM is installed choose necessary NodeJS version: e.g. `nvm use 6.11.1`
    * otherwise just check that the NodeJS version is 6.11+ with `node -v`
4. Install dependencies with Node Package Manager: `npm install`

### Build creation
1. Go to the repository: `cd guided-tour-3.0`
2. Run a build script: `npm run build`
3. Go to a repository where the build is deployed: `cd dist`
4. Copy all content of `dist` to a server's repository

### Test on local server
1. Go to the repository: `cd guided-tour-3.0`
2. Start local server: `npm start`
3. Open <http://localhost:9090> where webpack dev server will be launched 
