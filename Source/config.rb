##
## This file is only needed for Compass/Sass integration. If you are not using
## Compass, you may safely ignore or delete this file.
##
## If you'd like to learn more about Sass and Compass, see the sass/README.txt
## file for more information.
##

# Default to development if environment is not set.
saved = environment
if (environment.nil?)
  environment = :development
else
  environment = saved
end

# Location of the resources.
css_dir = "app/assets/css"
sass_dir = "app/assets/sass"
images_dir = "app/assets/images"
generated_images_dir = images_dir + "/generated"
javascripts_dir = "app/assets/js"

# Require any additional compass plugins installed on your system.
require 'compass-normalize'
require 'rgbapng'
require 'toolkit'
require 'susy'
require 'sass-globbing'

##
## You probably don't need to edit anything below this.
##

# You can select your preferred output style here (:expanded, :nested, :compact
# or :compressed).
output_style = (environment == :production) ? :expanded : :nested

# To enable relative paths to assets via compass helper functions.
relative_assets = true

# Conditionally enable line comments when in development mode.
line_comments = (environment == :production) ? false : false

# Output debugging info in development mode.
sass_options = (environment == :production) ? {} : {:debug_info => false}

# Add the 'sass' directory itself as an import path to ease imports.
add_import_path 'app/assets/sass'
