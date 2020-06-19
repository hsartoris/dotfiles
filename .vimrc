source $HOME/.vim/Vim-ShareLaTeX-Plugin/sharelatex.vim
source $VIMRUNTIME/defaults.vim
call plug#begin('~/.vim/plugged')
Plug 'lervag/vimtex'
Plug 'tpope/vim-dispatch'
call plug#end()

set exrc

let g:vimtex_view_method = 'zathura'

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

" autocmd BufWritePost *.tex Dispatch! latexmk -pdf main.tex

" let g:sharelatex_password = "suxeo8Ie"


" autocmd FileType tex setlocal tw=80 fo=aw2tq
autocmd FileType tex inoremap II \textit{
autocmd FileType tex command! VC VimtexCompile
let g:tex_flavor = "latex"


" disable callbacks, since they don't work anyway
" let g:vimtex_compiler_latexmk = {'callback' : 0}

if !exists("g:GitSendPrefix")
	let g:GitSendPrefix = "Send"
endif

execute "command! -nargs=1" g:GitSendPrefix "call GitSend(<q-args>)"

function! GitSend(args)
	let args = a:args
	let command = "! send \"" . args . "\""
	let output = system(command)
	echo output
endfunction
