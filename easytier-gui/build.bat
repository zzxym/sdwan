cd ../tauri-plugin-vpnservice
pnpm install
pnpm build

cd ../easytier-web/frontend-lib
pnpm install
pnpm build

cd ../../easytier-gui
pnpm install
pnpm tauri build