# Base Wordpress Project

> The skeleton for a Wordpress project. Includes Docker a dev environment, automated build scripts, and some useful theme files.

The dev environment runs as two Docker containers (`www` and `db`). They are managed by Docker Compose. If you have Docker installed, you'll have Docker Compose as well.

You'll need to go through all the files and change any instances `project_name` or something like that to your actual project name.

## Docker

### Build Docker Images

```
docker-compose build
```

### Start Docker

```
docker-compose up -d
```

When docker is up, your app should be available at `http:/localhost`.

### Stop Docker

```
docker-compose down
```

### Enter Docker Container

You can get into either Docker container using:

```
docker exec -it project_name_db bash
docker exec -it project_name_www bash
```

This is useful to access database logs, etc.

### Mounted Folders

You can see the folders mounted by Docker in `docker-compose.yml`. Basically the `theme` folder is mounted in the container's Wordpress `wp-content/themes` folder, the database files are mounted locally in `.data/db`, and the Wordpress install is mounted locally in `/.www`.

## Email

The `www` Docker container traps all outgoing email and delivers it to the `root` user's mailbox. This is useful because it prevents emails from accidently getting into the real world and also because it allows you to see those emails, no matter what the destinatio email address was. To read them, get into the `www` container and run the `mutt` command:

```
docker exec -it project_name_www bash
mutt
```


## Wordpress

To make Wordpress work with, you just need to add these lines to your `wp-config.php` file:

```
define('DB_NAME', 'wordpress');
define('DB_USER', 'wordpress');
define('DB_PASSWORD', 'wordpress');
define('DB_HOST', 'db:3306');
```

## Theme

The theme folder just has some essential files in it.  It isn't a complete theme.

`functions.php` includes a few files from `lib/setup`. One is `Autoload.php`, which adds an autoloader for composer and for anything namespaced in the project.

Another interesting file is `lib/setup/LayoutWrapper.php`. This allows you to render your templates inside a layout, rather than explicitly including things like the header, footer, etc. in every template. The layout itself is in `layout.php`.  `LayoutWrapper.php` will render the current template and then pass the rendered content to `layout.php` which will output it within the layout itself.

## CSS

CSS is compiled using PostCSS and some processors. It allows you to use: imports, nested classes, variables, and ancestor references. See `tasks/css.js` for a list of all processors.

Put your css files in `/css`. The build script will load `/css/main.css`, so if you want to have more than one css file, then import them in `/css/main.css`.

## Images

The build script has task for processing images. Put your images in `/assets/images` if you want the task to be run on them. They will be output in `/theme/build/images`.

## Javascript

Javascript is compiled using Webpack. Put your Javascript in `/js`. Webpack will load `/js/main.js`, so if you want to have more than on JS file, then import them in `/js/main.js`.

## Development

Install dependencies:

```
npm install
```

Watch for file changes:

```
npm run watch       # for css, images, and php
npm run js:watch    # for javascript
```

Production build:

```
npm run build
```

## Misc

The project includes an ESLint for for Javascript. You don't need to use it. If you remove it, remove the eslint-loader from the webpack file.

The `npm run watch` script will run a PHP "linter" as well. This will show you static-analysis errors in your code. It's kinda useful.
