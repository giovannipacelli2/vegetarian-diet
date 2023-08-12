const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpack = require("webpack");
// Plugin per l'estrazione separata del file .css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Plugin per la minificazione e ottimizzazione del file .js
const TerserJSPlugin = require("terser-webpack-plugin");
// Plugin per la minificazione e ottimizzazione del file .css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

//DOTENV
const Dotenv = require( "dotenv-webpack" );
const mode = process.env.NODE_ENV;
/* const envPath = `.env.${process.env.NODE_ENV}`; */
const envPath = mode!==undefined ? `.env.${mode}` : '.env';

require("dotenv").config({ path: envPath });

module.exports = (env, argv) => {
  return {
    // File Javascript di entrata pre-compilato
    entry: {
      main: {
        import: path.resolve(__dirname,'src/index.js'),
      },
    },
    // Cartella di output per i file compilati e nome del file Javascript
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: argv.mode === "production" ? "[name].[contenthash].js" : "[name].js",
      clean: true,
      assetModuleFilename: "[hash][ext][query]",
    },
    // Configurazione di sviluppo per l'Hot Module Replacement
    devtool: "source-map",

    devServer: {
      static: "./dist",
      devMiddleware: {
        publicPath: "/dist/",
      },
      hot: true,
    },
    module: {
      rules: [
        // Loaders per i file di tipo CSS e SCSS
        {
          test: /\.(sa|sc|pc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        // Risorse assets
        {
          test: /\.(jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 8192,
            },
          },
        },
        // Loader e configurazione di Babel per il transpiling
        {
          test: /\.(m?js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.html$/i,				
          use : [ 'html-loader' ]		/* Gestisce immagini e media collegati alla index.html */
        }
        
      ],
    },

    resolve: { extensions: ["*", ".js", ".jsx"] },

    // Assegnazione dei plugin di minificazione e ottimizzazione
    optimization: {
      runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
        },

      minimize: true,
      minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin({})],
    },

    experiments: {
      topLevelAwait: true
    },
    
    plugins: [

      new Dotenv({
        path: envPath,
      }),

      new webpack.HotModuleReplacementPlugin(),

      // Nome del file di output .css
      new MiniCssExtractPlugin({
        filename: argv.mode === "production" ? "[name].[contenthash].css" : "[name].css",
      }),

   
    new HtmlWebpackPlugin(
      {
        /* title : 'Nuova applicazione', */  // Crea un file html con questo title
        template: './src/index.html'	
        /* Si può creare un nuovo dile Html a partire da un certo template */
      }
    ),
         
    ],
  };
};
