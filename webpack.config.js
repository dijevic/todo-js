
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const miniCssExtractPluging = require('mini-css-extract-plugin');
const optimizeWebPackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode : 'development',

    optimization:{
        minimizer:[new optimizeWebPackPlugin()]
    },

    module : {
        rules : [
            {
                test: /\.css$/,
                exclude: /style\.css$/,
                use : [
                    'style-loader',
                    'css-loader',
                ]

            },
            {
                test: /style\.css$/,
                use : [
                    miniCssExtractPluging.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.html/i,
                loader : 'html-loader',
                options: {
                    attributes : false,
                    minimize : true
                },
                
                
            },
            {
                test : /\.(png|svg|gif|jpg|)$/,
                use : [
                    {
                        loader : 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }


        ]
    },

    plugins: [
        new HtmlWebpackPlugin ({
            template : './src/index.html',
            filename : './index.html'
        }),
       new miniCssExtractPluging ({
           filename: '[name].css',
           ignoreOrder: false,

       }),
       new CopyPlugin({
        patterns: [
          { from: 'src/assets', to: 'assets/' },
        ],
      }),
      new CleanWebpackPlugin()

      
    ]



}