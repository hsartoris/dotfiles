source $VIMRUNTIME/defaults.vim

set exrc

set clipboard=unnamedplus
command W w
command Q q
set splitbelow
nmap <silent> <C-n> :tabnext<CR>
nmap <silent> <C-p> :tabprev<CR>
set sw=4 ts=4 sts=4

autocmd FileType yaml set sw=2 ts=2 sts=2

" let's see how this goes...
"set tw=80 fo=aw2tq
