# LITS theme for a Drupal 9 and Drupal 10 world

lits_theme theme, generated from starterkit_theme. Additional information on generating themes can be found in the [Starterkit documentation](https://www.drupal.org/docs/core-modules-and-themes/core-themes/starterkit-theme).



## Installing the theme

```bash
composer require mtholyoke/lits_theme
```

Enable the theme from the command line (`drush then lits_theme`) or through the admin UI, and use the admin UI to select it as the default theme for the site.


## Set up for development

In your working copy of the LITS website:

```bash
cd web/themes/contrib
rm -r lits_theme
git clone git@github.com:mtholyoke/lits_theme.git
cd lits_theme
lando npm install
cd ../../../..
```

**NOTE:** You will need to repeat this any time that the `lits_theme` is updated in the LITS project (when we release and install a new version of `lits_theme` from Packagist).



## Transpile `lits_theme` JavaScript and SASS

You can do a one-time transpile with `lando transpile`, or watch for changes with `lando transpile-watch`.

It’s usually best to `lando drush cr` afterwards.

## Known issues
- `npm audit` flags 4 moderate issues in `node-sass-glob-importer` (`node-sass-glob-importer > node-sass-magic-importer > css-selector-extract > postcss`) that can't be automatically fixed. 
  - [NPM's instructions for audit results that require manual intervention](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities#update-dependent-packages-if-a-fix-exists)
  - There's [a PR for `css-selector-extract`](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities#update-dependent-packages-if-a-fix-exists), but given the PR's age and the frequency of updates in the downstream dependency (`node-sass-magic-importer`), probably this is a package that should be replaced entirely. 
