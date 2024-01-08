# MongoExpressResourceOpenerNg

## Development

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.11.
- actual code to work on is situated in `/mongo-express-resource-opener-ng` subfolder
- Angular (and TypeScript) is only used for "popup" part of this extension (`/src/app`)
- content scripts and background worker(s) are located in `/src/assets` folder and are written in pure JS and not transpiled. 
  However there are (maybe) plans to rewrite this part of application into TypeScript too 

## Development run

*For development purposes, it is possible to run extension (at least "popup" part) like normal angular 
frontend app* 

- Run `devel_run_script.sh` to run extension as Angular app.
- navigate to `http://localhost:4200`, You should be able to see what is normally extension main popup 
  (popup window which appears when clicked on extension icon).
- it is possible to navigate to *"extension pages"* like *"settings"* by modifying last URL part, currently in use:
  - extension settings page: `index.html#/options`
  - extension main popup: `index.html#/popup`

## Build

- Run `build_script.sh`
- Extension in unpacked format is situated inside `/extension` subfolder
