#! /bin/bash
echo "---------------"
echo "Before"
echo "---------------"
grep -Eo "rgba?\(.*\)" components/fa-2026-styles.scss  | sort | uniq
grep -Eo "#[0-9a-h]+" components/fa-2026-styles.scss | sort | uniq



sed -i .bak 's/rgba(0, 0, 0, 0)/$fully-transparent/g' components/fa-2026-styles.scss 
sed -i .bak 's/rgba(0, 0, 0, 0.2)/$dropdown-menu-shadow/g' components/fa-2026-styles.scss 
sed -i .bak 's/rgba(0, 0, 0, 0.4)/$main-wrapper-shadow/g' components/fa-2026-styles.scss 

sed -i .bak 's/#004876/$dark-blue/g' components/fa-2026-styles.scss 
sed -i .bak 's/#014876/$dark-blue/g' components/fa-2026-styles.scss # looks like a typo
sed -i .bak 's/#00a9e0/$light-blue/g' components/fa-2026-styles.scss 
sed -i .bak 's/#0277cc/$med-blue/g' components/fa-2026-styles.scss # looks like a typo
sed -i .bak 's/#07c/$med-blue/g' components/fa-2026-styles.scss 
sed -i .bak 's/#1a1a1a/$charcoal/g' components/fa-2026-styles.scss 
sed -i .bak 's/black/$charcoal/g' components/fa-2026-styles.scss 
sed -i .bak 's/#2c3e50/$dropdown-menu-hover-link-color/g' components/fa-2026-styles.scss 
sed -i .bak 's/#333/$gray-darker/g' components/fa-2026-styles.scss 
sed -i .bak 's/#34495e/$dropdown-menu-bg/g' components/fa-2026-styles.scss 
sed -i .bak 's/#5c7f1a/$green/g' components/fa-2026-styles.scss 
sed -i .bak 's/#6e6259/$gray/g' components/fa-2026-styles.scss 
sed -i .bak 's/#6f263d/$dark-red/g' components/fa-2026-styles.scss 
sed -i .bak 's/#a20067/$raspberry/g' components/fa-2026-styles.scss 
sed -i .bak 's/#ccdae3/$pale-blue/g' components/fa-2026-styles.scss 
sed -i .bak 's/#e2dfdd/$pale-gray/g' components/fa-2026-styles.scss 
sed -i .bak 's/#e5e5e5/$gray-lightest/g' components/fa-2026-styles.scss 
sed -i .bak 's/#f1c400/$yellow/g' components/fa-2026-styles.scss # looks like a typo
sed -i .bak 's/#f5f5f5/$barely-gray/g' components/fa-2026-styles.scss 
sed -i .bak 's/#ff9e1b/$light-orange/g' components/fa-2026-styles.scss 
sed -i .bak 's/#ef3340/$red/g' components/fa-2026-styles.scss 
sed -i .bak 's/color: white/color: $white/g' components/fa-2026-styles.scss 


echo
echo "---------------"
echo "After"
echo "---------------"
grep -Eo "rgba?\(.*\)" components/fa-2026-styles.scss  | sort | uniq
grep -Eo "#[0-9a-h]+" components/fa-2026-styles.scss | sort | uniq
