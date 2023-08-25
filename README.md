# LITS theme for a Drupal 9 and Drupal 10 world

lits_theme theme, generated from starterkit_theme. Additional information on generating themes can be found in the [Starterkit documentation](https://www.drupal.org/docs/core-modules-and-themes/core-themes/starterkit-theme).

## Adding the theme to the LITS website
### Set up
- Clone the LITS website project (`lits`) to your machine in `$project_root` (your choice, usually `~/Projects/lits`).
- From `$project_root`, create a `contrib` themes directory: 
  - `mkdir web/themes/contrib`
- Clone the `lits_theme` project into the `contrib` themes directory.

### Enable the theme, if not enabled
- Build/start the LITS website development environment.
- At the command line, from `$project_root`: `lando drush then lits_theme`
- Log into the web interface for the LITS website as Administrator, then visit https://lits.lndo.site/admin/appearance
- Set `lits_theme` as default
- Done!

## Transpile `lits_theme` JavaScript and SASS
`lando transpile --prefix=/app/web/themes/contrib/lits_theme`
