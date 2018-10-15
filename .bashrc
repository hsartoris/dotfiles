#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls -A --color=auto'
PS1='[\u@\h \W]\$ '
TERM='rxvt-unicode'
COLORTERM='rxvt-unicode-256color'

export PATH=$PATH:$HOME/bin:$HOME/cmsc326/PointersSuck/pintos/src/utils/:$HOME/sproj/:$HOME/.local/bin/:$HOME/sproj/utils/
alias ethernet='sudo systemctl stop dhcpcd@enp1s0f0; sudo systemctl start dhcpcd@enp1s0f0'
alias pull='git pull'
alias sproj='sprojGit; cd ~/sproj/'
alias ahead='git add .; git diff-index -C --compact-summary HEAD'
alias tensorboard='ssh 10.60.10.50 -t "tensorboard --logdir=sproj/model/checkpoints/"'
alias beans='cd $HOME/cmsc326/PointersSuck/pintos/src/'
alias nvidia-smi='ssh 10.60.10.50 -t "watch -n 0.5 nvidia-smi"'
alias ':q'=exit

export PYTHONPATH=$HOME/sproj/utils/:$HOME/sproj/model/scripts/

alias vim='vim --servername foo'

export BIBINPUTS=$HOME/sproj/writeup/resources/bib/
alias bio='ssh -Y 10.60.10.50'
alias ableton='wine ~/.wine/drive_c/ProgramData/Ableton/Live\ 10\ Suite/Program/Ableton\ Live\ 10\ Suite.exe'

export MYPYPATH=$HOME/.mypy/stubs/
