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
2. Add the script with `id="guided-tour-script"` to the page header, e.g. `<script id="guided-tour-script" src="url-of-builded-script" async defer></script>`
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
2. Run a build script: (e.g. `npm run build` - see the [table 1](#table-1) below) 
3. Go to a repository where the build is deployed: `cd dist-[tool-name-you-build-for]`
4. Copy all content of `dist-[tool-name-you-build-for]` to a server's repository

<a name="table-1"></a>**Table 1.** Commands for build creation

 NPM command                   | Description                              | Repository build name
------------------------------ |----------------------------------------- | ---------------------
 npm run build                 | Builds GT bundle for the default tool    | dist-default 
 npm run build-microstrategy   | Builds GT bundle for MicroStrategy       | dist-microstrategy 
 npm run build-tableau         | Builds GT bundle for Tableau             | dist-tableau




### Test on local server
1. Go to the repository: `cd guided-tour-3.0`
2. Start local server (e.g. `npm start` - see the [table 2](#table-2) below) 
3. Open <http://localhost:9090> (or a specific link from the [table 2](#table-2) below) where webpack dev server will be launched 



<a name="table-2"></a>**Table 2.** Commands for local server tests

 NPM command                   | Description                                    | Test link
------------------------------ |----------------------------------------------- | ---------------------------------------------------------
 npm start                     | Launches GT local server for the default tool  | [Default](http://localhost:9090/default.html)
 npm run start-microstrategy   | Launches GT local server for MicroStrategy     | [MicroStrategy](http://localhost:9090/microstrategy.html)
 npm run start-tableau         | Launches GT local server for Tableau           | [Tableau](http://localhost:9090/tableau.html)


