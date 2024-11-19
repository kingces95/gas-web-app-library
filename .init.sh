# Paths
export WAL_PROJ_DIR="/workspaces/$(basename "$PWD")"
export WAL_SRC_DIR="$WAL_PROJ_DIR/src"
export WAL_TEST_DIR="$WAL_PROJ_DIR/tests"
export WAL_SCRIPT_ID="$WAL_PROJ_DIR/tests"

# Check if clasp is already installed
if ! command -v clasp &> /dev/null; then
  echo "Installing clamp."
  npm install -g @google/clasp
  echo "Clasp installed successfully."
fi

# Attempt to list projects to verify authentication
if ! clasp list > /dev/null 2>&1; then
  clasp login
fi

if ! nodemon > /dev/null 2>&1; then
  npm install -g nodemon
fi

# nodemon --watch src --ext js,json --exec "clasp push"