
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;
const Dotenv = require('dotenv-webpack');

module.exports = env => ({
	entry: "./src/index.ts",
	mode: "development",
	devServer: {
		port: 3002,
		open: true,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules:[
      {
        test: /\.(png|jpe?g|gif|ico|json)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // CSS Loader
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      

    ],
	},
	
	plugins: [
		new Dotenv({
			path: `./src/environments/.env.${env.goal}`
		}),
		new ModuleFederationPlugin({
			name: env.goal,
			filename: "remoteEntry.js",
			exposes: {
				// expose each component
				"./App": "./src/App",
			},
			shared: {
				...deps,
				react: { singleton: true, eager: true, requiredVersion: deps.react },
				"react-dom": {
					singleton: true,
					eager: true,
					requiredVersion: deps["react-dom"],
				}
			},
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
});
