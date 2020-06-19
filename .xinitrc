#exec setxkbmap -layout us,ru
#exec setxkbmap -option 'grp:alt_shift_toggle'
exec setxkbmap -option caps:escape
exec `xset +fp /usr/share/fonts/envypn/ && xset fp rehash`
exex xrdb .Xresources
exec i3

