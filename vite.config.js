import { defineConfig, loadEnv } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import WindiCSS from 'vite-plugin-windicss'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };


  return defineConfig({

    define: {
    'process.env': process.env
    },

    plugins: [reactRefresh(), WindiCSS()],

    server: {
      port: process.env.VITE_PORT,
    },
  });
}

