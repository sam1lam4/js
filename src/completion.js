function logCompletionScript() {
  const script = `
_get_sam1lam4_completion()  {
  compopt +o default
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"
  DIR_PATH=${__dirname}

  if [ $COMP_CWORD -eq 1 ] || [[ \${prev:0:1} == '-' ]]; then
    OPTS_FROM_CURRENT_DIR=( $(compgen -f \${cur}) )
    OPTS_FROM_PACKAGE_DIR=$(cd $DIR_PATH && find es5 -maxdepth 1 -mindepth 1 -type d | tr '\n' ' ')
    opts=""
    for y in \${OPTS_FROM_CURRENT_DIR[@]}; do opts="$opts $y"; done
    for y in \${OPTS_FROM_PACKAGE_DIR[@]}; do opts="$opts $y"; done
    COMPREPLY=( $(compgen -W "\${opts}" -- \${cur}) )
    return 0
  fi

  # default
  compopt -o default
  COMPREPLY=()
  return 0
}

complete -F _get_sam1lam4_completion sam1lam4
`

  console.log(script)
}

module.exports = {
  COMPLETION_CMD: "_get_bash_completion",
  logCompletionScript,
}
