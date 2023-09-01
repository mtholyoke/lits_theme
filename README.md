# LITS theme for a Drupal 9 and Drupal 10 world

lits_theme theme, generated from starterkit_theme. Additional information on generating themes can be found in the [Starterkit documentation](https://www.drupal.org/docs/core-modules-and-themes/core-themes/starterkit-theme).

## Adding the theme to the LITS website
### Set up for development
- Clone the LITS website project (`lits`) to your machine (usually into `~/Projects/lits`) and run `composer install`.
- From the project directory, delete the copy of the LITS theme that Composer brought in automatically:
  - `rm -r web/themes/contrib/lits_theme`
- Clone the `lits_theme` project into the `contrib` themes directory.

**NOTE** You will need to repeat the second and third steps (remove and re-clone `lits_theme`) any time that the `lits_theme` is updated in the LITS project (when we release and install a new version of `lits_theme` from Packagist).

### Enable the theme, if not enabled (it should already be enabled and default, but just in case)
- Build/start the LITS website development environment.
- At the command line, from `$project_root`: `lando drush then lits_theme`
- Log into the web interface for the LITS website as Administrator, then visit https://lits.lndo.site/admin/appearance
- Set `lits_theme` as default
- Done!

## Transpile `lits_theme` JavaScript and SASS
You can do a one-time transpile with `lando transpile`, or watch for changes with `lando transpile-watch`
